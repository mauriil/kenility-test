# Dockerfile

# Usa la imagen oficial de Node como base
FROM node:16-alpine

# Establece el directorio de trabajo en la carpeta de la aplicación
WORKDIR /app

# Copia el archivo package.json primero para instalar las dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install --only=production

# Copia el resto de la aplicación
COPY . .

# Expone el puerto 3000 para que pueda ser accesible desde fuera del contenedor
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]
