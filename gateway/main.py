from fastapi import FastAPI, Request, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware

import httpx, os
from pydantic import BaseModel
from typing import Optional

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse

# Retrieve environment variables with default values
AUTH_SERVICE_URL = os.getenv('AUTH_SERVICE_URL', 'http://localhost:3000/api')  # Microservicio de Autenticación
CATALOG_SERVICE_URL = os.getenv('CATALOG_SERVICE_URL', 'http://localhost:4001')  # Microservicio de Catálogo
ORDERS_SERVICE_URL = os.getenv('ORDERS_SERVICE_URL', 'http://localhost:4000')  # Microservicio de Pedidos

tags_metadata = [
    {
        "name": "users",
        "description": "Operations with users. The **login** and **register** logic is here.",
    },
    {
        "name": "catalog",
        "description": "Manage products in the catalog.",
    },
    {
        "name": "orders",
        "description": "Handle customer orders.",
    }
]

app = FastAPI(openapi_tags=tags_metadata)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Mount the static directory for static files (e.g., HTML files)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Redirect root to index.html (or home page)
@app.get("/")
async def read_root():
    return RedirectResponse(url="/static/index.html")

# You can also add a specific endpoint for the catalog page if needed
@app.get("/catalog-page")
async def read_catalog():
    return RedirectResponse(url="/static/productos.html")

client = httpx.Client()

# Models for user authentication
class UserRegister(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

# Models for managing product catalog
class ProductItem(BaseModel):
    name: str
    description: str
    price: float
    stock: int

# Models for orders
class OrderItem(BaseModel):
    product_id: int
    quantity: int
    price: float

class UpdateOrderItem(BaseModel):
    product_id: Optional[int] = None
    quantity: Optional[int] = None
    price: Optional[float] = None

# Authentication endpoints
@app.post("/auth/register", tags=["users"], status_code=status.HTTP_201_CREATED)
async def register_user(user: UserRegister):
    response = client.post(f"{AUTH_SERVICE_URL}/register", json=user.dict())
    if response.status_code == 201:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail="Error registering user")

@app.post("/auth/login", tags=["users"])
async def login_user(user: UserLogin):
    response = client.post(f"{AUTH_SERVICE_URL}/login", json=user.dict())
    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail="Invalid credentials")

# Catalog endpoints
@app.post("/catalog/products", tags=["catalog"], response_model=ProductItem)
async def create_product(product: ProductItem):
    response = client.post(f"{CATALOG_SERVICE_URL}/products", json=product.dict())
    return response.json()

@app.get("/catalog/products", tags=["catalog"])
async def get_products():
    response = client.get(f"{CATALOG_SERVICE_URL}/products")
    return response.json()

@app.get("/catalog/products/{product_id}", tags=["catalog"], response_model=ProductItem)
async def get_product(product_id: int):
    response = client.get(f"{CATALOG_SERVICE_URL}/products/{product_id}")
    return response.json()

# Order endpoints
@app.post("/orders/", tags=["orders"], response_model=OrderItem)
async def create_order(order: OrderItem):
    response = client.post(f"{ORDERS_SERVICE_URL}/orders", json=order.dict())
    return response.json()

@app.get("/orders/", tags=["orders"])
async def get_orders():
    response = client.get(f"{ORDERS_SERVICE_URL}/orders")
    return response.json()

@app.put("/orders/{order_id}", tags=["orders"], response_model=OrderItem)
async def update_order(order_id: int, order: UpdateOrderItem):
    response = client.put(f"{ORDERS_SERVICE_URL}/orders/{order_id}", json=order.dict())
    return response.json()

@app.delete("/orders/{order_id}", tags=["orders"], status_code=status.HTTP_204_NO_CONTENT)
async def delete_order(order_id: int):
    response = client.delete(f"{ORDERS_SERVICE_URL}/orders/{order_id}")
    if response.status_code == 204:
        return {"message": "Order deleted successfully"}
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
