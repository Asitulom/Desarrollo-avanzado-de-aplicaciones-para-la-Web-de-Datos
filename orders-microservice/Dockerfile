# Usar la imagen oficial de Node.js como base
FROM node:16

# Configurar el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 4000

# Comando para iniciar la aplicación
CMD [ "node", "main.js" ]
