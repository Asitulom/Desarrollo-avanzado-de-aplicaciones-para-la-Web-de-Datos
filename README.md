LANZAR MANUALMENTE

1) Auth Microservice
cd C:\Users\Asier\Downloads\Deusto scooters\auth-microservice
npm install
node server.js
http://localhost:3000/docs/

2) Catalog Microservice
cd C:\Users\Asier\Downloads\Deusto scooters\catalog-microservice
pip install -r requirements.txt
uvicorn main:app --reload
http://localhost:8000/docs

3) Orders Microservice
cd C:\Users\Asier\Downloads\Deusto scooters\orders-microservice
npm install
node main.js
http://localhost:4000/orders

4) Gateway
cd C:\Users\Asier\Downloads\Deusto scooters\gateway
pip install fastapi uvicorn httpx
pip install -r requirements.txt
uvicorn main:app --reload --port 8080
http://localhost:8080


LANZAR CON DOCKER 


pip install sqlalchemy mysqlclient
pip install fastapi sqlalchemy mysql-connector-python
pip install mysql-connector-python
pip install pymysql


cd C:\Users\Asier\Downloads\Deusto scooters\Desarrollo-avanzado-de-aplicaciones-para-la-Web-de-Datos

npm install async-retry
npm install


Abrir Docker Desktop

(ABRIR CMD COMO ADMIN)

netstat -ano | findstr "3306"
netstat -ano | findstr "3000"
taskkill /PID 7056 /F

docker-compose down -v --remove-orphans
docker-compose down
docker-compose down --volumes
docker network ls

sudo systemctl restart docker

docker-compose up --build


http://localhost:8080/
http://localhost:8001/docs/
http://localhost:8002/docs
http://localhost:8003/orders

























