FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .
RUN chmod 755 /usr/app/

RUN npm run migrate:prod

RUN sleep 10


RUN npm run build

EXPOSE 5555


CMD ["npm", "run", "start"]
