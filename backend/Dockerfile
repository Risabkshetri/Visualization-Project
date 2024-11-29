FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY server.js server.js
COPY model ./model
COPY . .

RUN npm install

ENTRYPOINT [ "node", "server.js" ]