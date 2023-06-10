# reflectiz backend assignment

## Description

We want you to write a system that provides security and identity information about domains. The system will scan the domains in the database at a given interval and gather information about them. Past results should be stored for future use.

The system must support an asynchronous REST API. It should provide two endpoints:

- An endpoint that will return current information about the domain. If there is no information about the domain, the endpoint should add the domain to the list for analysis and reply with a message telling the user to check back later.
- An endpoint that will add a domain to a list for analysis.

All requests should be stored for future analysis. The information to be collected about each domain:

- Information from VirusTotal
- Information from WHOIS
- Potentially other information.

You will have to use different APIs to gather this information.

### Execution

You can write the project using any language or library you like. We at Reflectiz use TypeScript on Node.js, but you can use Python, Go, or any other well-known language. Your code should maintain the standards of the language of your choice.

- **Use any database you like.**

Pay attention to input validation and security, as well as different edge-cases - such as if a site already exists, or is currently being scanned. Divide the system into several services and describe how they should communicate. Use a scalable, long-term solution. Write a short description of the design.

- **Use any scheduling system you like.**

The analysis interval should be global but configurable and start at once a month.

### Deployment

Include a Dockerfile or docker-compose.yml that can be used to set up the system, including the DB. The Dockerfile should install the required packages and build the project (if needed).

If you’re not familiar with Docker, you can skip this step and just explain how to set up the system. We’ll still look at the rest of your work.

### Finishing Up

Host your code on GitHub. If you choose to make the repository private, add our GitHub account reflectizCR as a member.

Send an email with the link to developers@reflectiz.com when you’re done. You can send any questions there as well.
We look forward to seeing your work.

**Thank you.**

## Table of Contents (Optional)

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Prerequisites

Docker,Docker-compose,Nodejs,npm installed.

## Installation

### Docker-compose

the first step we should init all ENV files env files example in the code below.

postgres.admin.env

```sh
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
PGADMIN_LISTEN_PORT=5433
```

postgres.env

```sh
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=reflectiz
```

place them in the root dir

for the **Request Service**:

.env file below.

```sh
PORT = 3000
DATABASE_URL="postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@<postgres_docker_service_hostname>:5432/<POSTGRES_DB>?schema=public"
AMQP_URL = "amqp://<USERNAME>:<PASSWORD>@<RABBIT_MQ_DOCKER_SERVICE_HOSTNAME>:5672"
SERVER_API_KEY = "API KEY GENERATED using openssl rand -base64 32"
```

for the **Domain Analysis Service**:

.env file below.

```sh
PORT = 3001
AMQP_URL = "amqp://<USERNAME>:<PASSWORD>@<RABBIT_MQ_DOCKER_SERVICE_HOSTNAME>:5672"
VIRUS_TOTAL_API_KEY = "VIRUS_TOTAL_API_KEY"
WHOIS_XML_API_KEY = "WHOIS_XML_API_KEY"
DATABASE_URL="postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@<postgres_docker_service_hostname>:5432/<POSTGRES_DB>?schema=public"
```

after setting all those .env files run those commands

```sh
docker-compose up -d
```

in the root dir where the docker-compose file located.

next step is **mandatory** to init the DB scheme:

```sh
$ docker exec -it <CONTAINER-ID> /bin/sh
```

inside the integrated terminal run this command.

```sh
npx prisma migrate deploy
```

## Usage

after running all containers from the docker-compose file
you will have 5 services , postgresDB,postgres-admin,rabbitmq,API service,Domain Analysis Service.

now we can test our endpoint by quering them.

```
GET localhost:3000/api/v1/domain/:hostname
headers: {reflectiz-api-key:value}


POST localhost:3000/api/v1/domain
headers: {reflectiz-api-key:value}
body:{"hostname":"string"}
```

ive added POSTMAN collection for the enpoints.
