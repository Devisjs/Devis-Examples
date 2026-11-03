# Devis examples
 <img  src="https://avatars3.githubusercontent.com/u/21971184?v=4&amp;s=200" href="http://devisjs.surge.sh" width="250" />

>Runnable examples for the [Devis](https://github.com/Devisjs/devis) microservices framework.

<p align="center">
  <a href="https://github.com/Devisjs/Devis-Examples/actions/workflows/ci.yml"><img src="https://github.com/Devisjs/Devis-Examples/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
</p>

Node.js 22 or later is required.

```bash
npm install
```

| Example | What it shows | Run |
| --- | --- | --- |
| [local](local/index.js) | register and call a pattern in one process | `node local/index.js` |
| [tcp](tcp) | call a microservice over TCP | `node tcp/service.js`, then `node tcp/client.js` |
| [balance](balance) | spread calls over two instances of a service | `PORT=3031 node balance/service.js`, `PORT=3032 node balance/service.js`, then `node balance/client.js` |
| [mongodb](mongodb/index.js) | store and read documents with [devis-mongo-client](https://github.com/Devisjs/devis-mongo-client) | `node mongodb/index.js` |
| [redis](redis/index.js) | publish and subscribe with [devis-pub_sub-redis](https://github.com/Devisjs/devis-pub_sub-redis) | `node redis/index.js` |
| [rabbitmq](rabbitmq) | call a microservice through RabbitMQ with [devis_rabbitmq](https://github.com/Devisjs/devis_rabbitmq) | `node rabbitmq/server.js`, then `node rabbitmq/client.js` |

The plugin examples expect local servers. `MONGO_URL`, `REDIS_URL`, `RABBITMQ_HOST` and `RABBITMQ_PORT` override the defaults. To start them with Docker:

```bash
docker run -d -p 27017:27017 mongo:7
docker run -d -p 6379:6379 redis:7-alpine
docker run -d -p 5672:5672 rabbitmq:4-alpine
```

`npm test` runs every example and checks its output.

To scaffold a new project instead, use [generator-devis](https://github.com/Devisjs/generator-devis).

The former `Library` application was removed: it relied on the Devis 1 API, Wakanda and AngularJS, which no longer work.
