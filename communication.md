## Here's how the communication would work:

The design of the system involves two services, the Domain Analysis Service and the Request Service, which communicate through RabbitMQ. Here's a short description of the design:

- ## Domain Analysis Service:
  - Consuming Messages: The Domain Analysis Service consume messages from **RabbitMQ**, such as messages indicating that new domain analysis has been requested.
- ## Request Service:
  - Publishing Messages: When a new domain analysis request is received, the Request Service will publish a message to the **RabbitMQ** exchange indicating the request.

By using **RabbitMQ** as the communication medium, the Domain Analysis Service and Request Service can effectively exchange messages and decouple their interactions. This enables asynchronous and scalable communication, where services can operate independently and at their own pace.

The system utilizes a database (**postgreSQL**) to store domain information, analysis results, and request history. Both services establish connections to the database to perform CRUD operations and maintain data integrity.

The API Gateway handles incoming requests from clients and routes them to the appropriate service. It provides **REST API** endpoints for clients to interact with the system.

The system can be scaled horizontally by deploying multiple instances of the Domain Analysis Service and Request Service behind a **load balancer**. This allows for handling increased loads and ensuring high availability.

A scheduling system triggers periodic domain analysis based on the global analysis interval. The analysis interval is configurable, starting with a monthly interval using **cron job**.
