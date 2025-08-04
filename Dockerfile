# Usa una imagen oficial de Node.js
FROM node:19-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu backend
COPY . .

# Instala dependencias
RUN npm install

# Expone el puerto en el que corre tu backend (ajústalo si usas otro)
EXPOSE 5000

# Comando para iniciar el servidor
CMD ["npm", "start"]
