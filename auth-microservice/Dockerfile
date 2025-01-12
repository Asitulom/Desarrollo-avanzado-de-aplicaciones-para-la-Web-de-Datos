# Usar una imagen base oficial de Node.js (versión 16)
FROM node:16

# Configurar el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación al contenedor
COPY . .

# Exponer el puerto que usa la aplicación (3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]