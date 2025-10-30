# frontend Dockerfile for Railway (serve on PORT)
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci && npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm i -g serve
COPY --from=build /app/dist ./dist
ENV PORT=80
EXPOSE 80
CMD sh -c "serve -s dist -l ${PORT}"
