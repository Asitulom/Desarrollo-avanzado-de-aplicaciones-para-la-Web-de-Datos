from fastapi import FastAPI, Request, HTTPException
import httpx

app = FastAPI()

# Define the microservices URLs
AUTH_SERVICE_URL = "http://localhost:3000"  
CATALOG_SERVICE_URL = "http://localhost:8000" 
ORDERS_SERVICE_URL = "http://localhost:4000"

# HTTP Client
client = httpx.Client()

# Ruta para el microservicio de autenticación
@app.api_route("/auth/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def auth_service_proxy(path: str, request: Request):
    return await proxy_request(request, AUTH_SERVICE_URL)

# Ruta para el microservicio de catálogo
@app.api_route("/catalog/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def catalog_service_proxy(path: str, request: Request):
    return await proxy_request(request, CATALOG_SERVICE_URL)

# Ruta para el microservicio de pedidos
@app.api_route("/orders/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def orders_service_proxy(path: str, request: Request):
    return await proxy_request(request, ORDERS_SERVICE_URL)

# Función para redirigir las solicitudes al microservicio correspondiente
async def proxy_request(request: Request, service_url: str):
    method = request.method
    url = f"{service_url}/{request.url.path}"  
    headers = dict(request.headers)
    content = await request.body()

    try:
        response = await client.request(method, url, headers=headers, content=content)
        return response.content, response.status_code, response.headers.items()
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=500, detail=str(exc))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("gateway:app", host="0.0.0.0", port=8080, reload=True)
