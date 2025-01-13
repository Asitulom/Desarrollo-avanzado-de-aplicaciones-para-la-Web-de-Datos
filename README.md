
REQUISITOS PREVIOS

instalar:

- [Docker](https://www.docker.com/) 
- [Docker Compose](https://docs.docker.com/compose/)
- [Python](https://www.python.org/)
- [Node.js](https://nodejs.org/)


SERVICIOS DISPONIBLES

El proyecto está compuesto por los siguientes servicios:

- **Auth Microservice**: Servicio de autenticación (puerto `3000`).
- **Catalog Microservice**: Gestión del catálogo de productos (puerto `8000`).
- **Orders Microservice**: Gestión de pedidos (puerto `4000`).
- **MySQL Database**: Base de datos (puerto `3307` en la máquina local).
- **Gateway**: Enrutador principal para conectar microservicios con el frontend (puerto `8080`).


DEPENDENCIAS QUE HAY QUE INSTALAR

pip install sqlalchemy mysqlclient
pip install fastapi sqlalchemy mysql-connector-python
pip install mysql-connector-python
pip install pymysql
npm install async-retry
npm install
cd C:\Users\Asier\Downloads\Deusto scooters\Desarrollo-avanzado-de-aplicaciones-para-la-Web-de-Datos\catalog-microservice
pip install -r requirements.txt
cd C:\Users\Asier\Downloads\Deusto scooters\Desarrollo-avanzado-de-aplicaciones-para-la-Web-de-Datos\gateway
pip install -r requirements.txt


LANZAR MANUALMENTE

1) Auth Microservice
cd C:\Users\Asier\Downloads\Deusto scooters\Desarrollo-avanzado-de-aplicaciones-para-la-Web-de-Datos\auth-microservice
npm install
node server.js
http://localhost:3000/docs/

2) Catalog Microservice
cd C:\Users\Asier\Downloads\Deusto scooters\Desarrollo-avanzado-de-aplicaciones-para-la-Web-de-Datos\catalog-microservice
pip install -r requirements.txt
uvicorn main:app --reload
http://localhost:8000/docs

3) Orders Microservice
cd C:\Users\Asier\Downloads\Deusto scooters\Desarrollo-avanzado-de-aplicaciones-para-la-Web-de-Datos\orders-microservice
npm install
node main.js
http://localhost:4000/orders

4) Gateway
cd C:\Users\Asier\Downloads\Deusto scooters\Desarrollo-avanzado-de-aplicaciones-para-la-Web-de-Datos\gateway
pip install fastapi uvicorn httpx
pip install -r requirements.txt
uvicorn main:app --reload --port 8080
http://localhost:8080




LANZAR CON DOCKER 

cd C:\Users\Asier\Downloads\Deusto scooters\Desarrollo-avanzado-de-aplicaciones-para-la-Web-de-Datos
Abrir Docker Desktop
docker-compose up --build


<!-- 

docker-compose down -v --remove-orphans
docker-compose down
docker-compose down --volumes
docker network ls 

-->


http://localhost:8080/
http://localhost:8001/docs/
http://localhost:8002/docs
http://localhost:8003/orders


























