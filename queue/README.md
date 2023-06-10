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

### Prerequisites

- npm,nodeJS,Docker,Docker-compose installed.

```shell
npm install npm@latest -g
```

## Installation

```shell
# git clone git@github.com:kartowka/roundforest-assignment.git
npm install
```

deploy postgresql via docker compose file.

please include postgres.env file as well ,

**postgres.env file**

```js
POSTGRES_USER = username
POSTGRES_PASSWORD = password
POSTGRES_DB = reflectiz
```

```shell

docker-compose up -d
```

env.example provided

```js
PORT = 3000

DATABASE_URL = 'postgresql://<username>:<password>@localhost:5432/reflectiz?schema=public'
```

## Usage

```shell
npm run dev
```

alternative

```shell
npm run build
npm start
```
