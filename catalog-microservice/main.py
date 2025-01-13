from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Modelo de Producto
class Product(BaseModel):
    id: int
    name: str
    description: str
    price: float
    available: bool

# Base de datos en memoria (temporal)
products: List[Product] = [
    Product(id=1, name="Scooter Pro 3000", description="Scooter eléctrico avanzado", price=299.99, available=True),
    Product(id=2, name="EcoScooter X", description="Scooter ecológico y compacto", price=199.99, available=True),
    Product(id=3, name="Speedster 500", description="Scooter de alta velocidad", price=399.99, available=False),
]


@app.get("/products/", response_model=List[Product])
def get_products():
    """Obtener todos los productos"""
    return products

@app.get("/products/{product_id}", response_model=Product)
def get_product(product_id: int):
    """Obtener un producto por ID"""
    product = next((p for p in products if p.id == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.post("/products/", response_model=Product)
def create_product(product: Product):
    """Crear un nuevo producto"""
    if any(p.id == product.id for p in products):
        raise HTTPException(status_code=400, detail="Product with this ID already exists")
    products.append(product)
    return product

@app.put("/products/{product_id}", response_model=Product)
def update_product(product_id: int, updated_product: Product):
    """Actualizar un producto existente"""
    for index, product in enumerate(products):
        if product.id == product_id:
            products[index] = updated_product
            return updated_product
    raise HTTPException(status_code=404, detail="Product not found")

@app.delete("/products/{product_id}")
def delete_product(product_id: int):
    """Eliminar un producto"""
    global products
    products = [p for p in products if p.id != product_id]
    return {"message": "Product deleted successfully"}

@app.post("/products/{product_id}/buy")
def buy_product(product_id: int):
    """Comprar un producto"""
    product = next((p for p in products if p.id == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if not product.available:
        raise HTTPException(status_code=400, detail="Product is not available for purchase")
    
    product.available = False
    return {"message": "Purchase successful", "product_id": product_id, "product_name": product.name}
