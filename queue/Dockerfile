#specify node version
FROM node:alpine AS builder
RUN apk add --no-cache --virtual .gyp python3 make g++ curl bash && rm -rf /var/cache/apk/*
RUN curl -sfL curl -sf https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin
WORKDIR /app
# add `/usr/src/app/node_modules/.bin` to $PATH
# ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package*.json ./
COPY . .
RUN npm ci
RUN npm run build
RUN npm prune --production


RUN /usr/local/bin/node-prune
FROM node:alpine
WORKDIR /app
#passed arguments from cli --build-arg ARGUMENTNAME=VALUE
ARG port 
ARG database_url 
ARG amqp_url
ARG virus_total_api_key
ARG whois_xml_api_key 
#envirmental variables
ENV PORT $port
ENV DATABASE_URL $database_url
ENV AMQP_URL $amqp_url
ENV VIRUS_TOTAL_API_KEY $server_api_key
ENV WHOIS_XML_API_KEY $server_api_key

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
#command to run express server
# RUN npm run start
EXPOSE 3001

# CMD ["npm","run","start"]
CMD ["node","./build/index.js"]
#Alternative way to write command
# CMD [ "node", "index.js" ]
#specify outside port for docker

