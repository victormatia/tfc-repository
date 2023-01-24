FROM node:16.14-alpine
WORKDIR /app-backend
COPY ./package* .
RUN npm i
COPY . .
EXPOSE 3001
ENTRYPOINT [ "npm", "run", "build" ]
