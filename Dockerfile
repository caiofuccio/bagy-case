FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 8080
CMD ["yarn", "ts-node-dev", "-r", "tsconfig-paths/register", "--transpile-only", "--ignore-watch", "node_modules", "./src/shared/infra/http/server.ts"]
