<page>
---
title: Overview · Cloudflare Durable Objects docs
description: Durable Objects provide a building block for stateful applications
  and distributed systems.
lastUpdated: 2025-04-06T14:39:24.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/
  md: https://developers.cloudflare.com/durable-objects/index.md
---

Create AI agents, collaborative applications, real-time interactions like chat, and more without needing to coordinate state, have separate storage, or manage infrastructure.

Available on Free and Paid plans

Durable Objects provide a building block for stateful applications and distributed systems.

Use Durable Objects to build applications that need coordination among multiple clients, like collaborative editing tools, interactive chat, multiplayer games, live notifications, and deep distributed systems, without requiring you to build serialization and coordination primitives on your own.

[Get started](https://developers.cloudflare.com/durable-objects/get-started/)

Note

SQLite-backed Durable Objects are now available on the Workers Free plan with these [limits](https://developers.cloudflare.com/durable-objects/platform/pricing/).

[SQLite storage](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/) and corresponding [Storage API](https://developers.cloudflare.com/durable-objects/api/storage-api/) methods like `sql.exec` have moved from beta to general availability. New Durable Object classes should use wrangler configuration for [SQLite storage](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#wrangler-configuration-for-sqlite-durable-objects).

### What are Durable Objects?

A Durable Object is a special kind of [Cloudflare Worker](https://developers.cloudflare.com/workers/) which uniquely combines compute with storage. Like a Worker, a Durable Object is automatically provisioned geographically close to where it is first requested, starts up quickly when needed, and shuts down when idle. You can have millions of them around the world. However, unlike regular Workers:

* Each Durable Object has a **globally-unique name**, which allows you to send requests to a specific object from anywhere in the world. Thus, a Durable Object can be used to coordinate between multiple clients who need to work together.
* Each Durable Object has some **durable storage** attached. Since this storage lives together with the object, it is strongly consistent yet fast to access.

Therefore, Durable Objects enable **stateful** serverless applications.

For more information, refer to the full [What are Durable Objects?](https://developers.cloudflare.com/durable-objects/what-are-durable-objects/) page.

***

## Features

### In-memory State

Learn how Durable Objects coordinate connections among multiple clients or events.

[Use In-memory State](https://developers.cloudflare.com/durable-objects/reference/in-memory-state/)

### Storage API

Learn how Durable Objects provide transactional, strongly consistent, and serializable storage.

[Use Storage API](https://developers.cloudflare.com/durable-objects/api/storage-api/)

### WebSocket Hibernation

Learn how WebSocket Hibernation allows you to manage the connections of multiple clients at scale.

[Use WebSocket Hibernation](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#websocket-hibernation-api)

### Durable Objects Alarms

Learn how to use alarms to trigger a Durable Object and perform compute in the future at customizable intervals.

[Use Durable Objects Alarms](https://developers.cloudflare.com/durable-objects/api/alarms/)

***

## Related products

**[Workers](https://developers.cloudflare.com/workers/)**

Cloudflare Workers provides a serverless execution environment that allows you to create new applications or augment existing ones without configuring or maintaining infrastructure.

**[D1](https://developers.cloudflare.com/d1/)**

D1 is Cloudflare's SQL-based native serverless database. Create a database by importing data or defining your tables and writing your queries within a Worker or through the API.

**[R2](https://developers.cloudflare.com/r2/)**

Cloudflare R2 Storage allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

***

## More resources

[Built with Durable Objects](https://workers.cloudflare.com/built-with/collections/durable-objects/)

Browse what other developers are building with Durable Objects.

[Limits](https://developers.cloudflare.com/durable-objects/platform/limits/)

Learn about Durable Objects limits.

[Pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/)

Learn about Durable Objects pricing.

[Storage options](https://developers.cloudflare.com/workers/platform/storage-options/)

Learn more about storage and database options you can build with Workers.

[Developer Discord](https://discord.cloudflare.com)

Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.

[@CloudflareDev](https://x.com/cloudflaredev)

Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Developer Platform.

</page>

<page>
---
title: 404 - Page Not Found · Cloudflare Durable Objects docs
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/404/
  md: https://developers.cloudflare.com/durable-objects/404/index.md
---

# 404

Check the URL, try using our [search](https://developers.cloudflare.com/search/) or try our LLM-friendly [llms.txt directory](https://developers.cloudflare.com/llms.txt).

</page>

<page>
---
title: Workers Binding API · Cloudflare Durable Objects docs
lastUpdated: 2025-01-31T11:01:46.000Z
chatbotDeprioritize: true
source_url:
  html: https://developers.cloudflare.com/durable-objects/api/
  md: https://developers.cloudflare.com/durable-objects/api/index.md
---

* [Durable Object Base Class](https://developers.cloudflare.com/durable-objects/api/base/)
* [Durable Object Container](https://developers.cloudflare.com/durable-objects/api/container/)
* [Durable Object Namespace](https://developers.cloudflare.com/durable-objects/api/namespace/)
* [Durable Object ID](https://developers.cloudflare.com/durable-objects/api/id/)
* [Durable Object Stub](https://developers.cloudflare.com/durable-objects/api/stub/)
* [Durable Object State](https://developers.cloudflare.com/durable-objects/api/state/)
* [Durable Object Storage](https://developers.cloudflare.com/durable-objects/api/storage-api/)
* [Alarms](https://developers.cloudflare.com/durable-objects/api/alarms/)
* [WebGPU](https://developers.cloudflare.com/durable-objects/api/webgpu/)
* [Rust API](https://github.com/cloudflare/workers-rs?tab=readme-ov-file#durable-objects)

</page>

<page>
---
title: Best practices · Cloudflare Durable Objects docs
lastUpdated: 2025-01-31T11:01:46.000Z
chatbotDeprioritize: true
source_url:
  html: https://developers.cloudflare.com/durable-objects/best-practices/
  md: https://developers.cloudflare.com/durable-objects/best-practices/index.md
---

* [Invoke methods](https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/)
* [Access Durable Objects Storage](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/)
* [Use WebSockets](https://developers.cloudflare.com/durable-objects/best-practices/websockets/)
* [Error handling](https://developers.cloudflare.com/durable-objects/best-practices/error-handling/)

</page>

<page>
---
title: Demos and architectures · Cloudflare Durable Objects docs
description: Learn how you can use a Durable Object within your existing
  application and architecture.
lastUpdated: 2025-01-31T11:01:46.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/demos/
  md: https://developers.cloudflare.com/durable-objects/demos/index.md
---

Learn how you can use a Durable Object within your existing application and architecture.

## Demos

Explore the following demo applications for Durable Objects.

* [NBA Finals Polling and Predictor:](https://github.com/elizabethsiegle/nbafinals-cloudflare-ai-hono-durable-objects) This stateful polling application uses Cloudflare Workers AI, Cloudflare Pages, Cloudflare Durable Objects, and Hono to keep track of users' votes for different basketball teams and generates personal predictions for the series.
* [Cloudflare Workers Chat Demo:](https://github.com/cloudflare/workers-chat-demo) This is a demo app written on Cloudflare Workers utilizing Durable Objects to implement real-time chat with stored history.
* [Wildebeest:](https://github.com/cloudflare/wildebeest) Wildebeest is an ActivityPub and Mastodon-compatible server whose goal is to allow anyone to operate their Fediverse server and identity on their domain without needing to keep infrastructure, with minimal setup and maintenance, and running in minutes.
* [Multiplayer Doom Workers:](https://github.com/cloudflare/doom-workers) A WebAssembly Doom port with multiplayer support running on top of Cloudflare's global network using Workers, WebSockets, Pages, and Durable Objects.

## Reference architectures

Explore the following reference architectures that use Durable Objects:

[Optimizing and securing connected transportation systems](https://developers.cloudflare.com/reference-architecture/diagrams/iot/optimizing-and-securing-connected-transportation-systems/)

[This diagram showcases Cloudflare components optimizing connected transportation systems. It illustrates how their technologies minimize latency, ensure reliability, and strengthen security for critical data flow.](https://developers.cloudflare.com/reference-architecture/diagrams/iot/optimizing-and-securing-connected-transportation-systems/)

[Fullstack applications](https://developers.cloudflare.com/reference-architecture/diagrams/serverless/fullstack-application/)

[A practical example of how these services come together in a real fullstack application architecture.](https://developers.cloudflare.com/reference-architecture/diagrams/serverless/fullstack-application/)

[Control and data plane architectural pattern for Durable Objects](https://developers.cloudflare.com/reference-architecture/diagrams/storage/durable-object-control-data-plane-pattern/)

[Separate the control plane from the data plane of your application to achieve great performance and reliability without compromising on functionality.](https://developers.cloudflare.com/reference-architecture/diagrams/storage/durable-object-control-data-plane-pattern/)

</page>

<page>
---
title: REST API · Cloudflare Durable Objects docs
lastUpdated: 2025-01-31T11:01:46.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/durable-objects-rest-api/
  md: https://developers.cloudflare.com/durable-objects/durable-objects-rest-api/index.md
---


</page>

<page>
---
title: Examples · Cloudflare Durable Objects docs
description: Explore the following examples for Durable Objects.
lastUpdated: 2025-01-31T11:01:46.000Z
chatbotDeprioritize: true
source_url:
  html: https://developers.cloudflare.com/durable-objects/examples/
  md: https://developers.cloudflare.com/durable-objects/examples/index.md
---

Explore the following examples for Durable Objects.

[Build a counter](https://developers.cloudflare.com/durable-objects/examples/build-a-counter/)

Build a counter using Durable Objects and Workers with RPC methods.

[Build a rate limiter](https://developers.cloudflare.com/durable-objects/examples/build-a-rate-limiter/)

Build a rate limiter using Durable Objects and Workers.

[Build a WebSocket server](https://developers.cloudflare.com/durable-objects/examples/websocket-server/)

Build a WebSocket server using Durable Objects and Workers.

[Build a WebSocket server with WebSocket Hibernation](https://developers.cloudflare.com/durable-objects/examples/websocket-hibernation-server/)

Build a WebSocket server using WebSocket Hibernation on Durable Objects and Workers.

[Durable Object in-memory state](https://developers.cloudflare.com/durable-objects/examples/durable-object-in-memory-state/)

Create a Durable Object that stores the last location it was accessed from in-memory.

[Durable Object Time To Live](https://developers.cloudflare.com/durable-objects/examples/durable-object-ttl/)

Use the Durable Objects Alarms API to implement a Time To Live (TTL) for Durable Object instances.

[Testing with Durable Objects](https://developers.cloudflare.com/durable-objects/examples/testing-with-durable-objects/)

Write tests for Durable Objects.

[Use RpcTarget class to handle Durable Object metadata](https://developers.cloudflare.com/durable-objects/examples/reference-do-name-using-init/)

Access the name from within a Durable Object using RpcTarget.

[Use the Alarms API](https://developers.cloudflare.com/durable-objects/examples/alarms-api/)

Use the Durable Objects Alarms API to batch requests to a Durable Object.

[Use Workers KV from Durable Objects](https://developers.cloudflare.com/durable-objects/examples/use-kv-from-durable-objects/)

Read and write to/from KV within a Durable Object

</page>

<page>
---
title: Getting started · Cloudflare Durable Objects docs
description: "This guide will instruct you through:"
lastUpdated: 2025-06-26T18:43:59.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/get-started/
  md: https://developers.cloudflare.com/durable-objects/get-started/index.md
---

This guide will instruct you through:

* Writing a JavaScript class that defines a Durable Object.
* Using Durable Objects SQL API to query a Durable Object's private, embedded SQLite database.
* Instantiating and communicating with a Durable Object from another Worker.
* Deploying a Durable Object and a Worker that communicates with a Durable Object.

If you wish to learn more about Durable Objects, refer to [What are Durable Objects?](https://developers.cloudflare.com/durable-objects/what-are-durable-objects/).

## Quick start

If you want to skip the steps and get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/hello-world-do-template)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers. Use this option if you are familiar with Cloudflare Workers, and wish to skip the step-by-step guidance.

You may wish to manually follow the steps if you are new to Cloudflare Workers.

## Prerequisites

1. Sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [`Node.js`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1. Create a Worker project

You will access your Durable Object from a [Worker](https://developers.cloudflare.com/workers/). Your Worker application is an interface to interact with your Durable Object.

To create a Worker project, run:

* npm

  ```sh
  npm create cloudflare@latest -- durable-object-starter
  ```

* yarn

  ```sh
  yarn create cloudflare durable-object-starter
  ```

* pnpm

  ```sh
  pnpm create cloudflare@latest durable-object-starter
  ```

Running `create cloudflare@latest` will install [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), the Workers CLI. You will use Wrangler to test and deploy your project.

For setup, select the following options:

* For *What would you like to start with?*, choose `Hello World example`.
* For *Which template would you like to use?*, choose `Worker + Durable Objects`.
* For *Which language do you want to use?*, choose `TypeScript`.
* For *Do you want to use git for version control?*, choose `Yes`.
* For *Do you want to deploy your application?*, choose `No` (we will be making some changes before deploying).

This will create a new directory, which will include either a `src/index.js` or `src/index.ts` file to write your code and a [`wrangler.jsonc`](https://developers.cloudflare.com/workers/wrangler/configuration/) configuration file.

Move into your new directory:

```sh
cd durable-object-starter
```

## 2. Write a Durable Object class using SQL API

Before you create and access a Durable Object, its behavior must be defined by an ordinary exported JavaScript class.

Note

If you do not use JavaScript or TypeScript, you will need a [shim](https://developer.mozilla.org/en-US/docs/Glossary/Shim) to translate your class definition to a JavaScript class.

Your `MyDurableObject` class will have a constructor with two parameters. The first parameter, `ctx`, passed to the class constructor contains state specific to the Durable Object, including methods for accessing storage. The second parameter, `env`, contains any bindings you have associated with the Worker when you uploaded it.

* JavaScript

  ```js
  export class MyDurableObject extends DurableObject {
    constructor(ctx, env) {
      // Required, as we're extending the base class.
      super(ctx, env);
    }
  }
  ```

* TypeScript

  ```ts
  export class MyDurableObject extends DurableObject<Env> {
    constructor(ctx: DurableObjectState, env: Env) {
      // Required, as we're extending the base class.
      super(ctx, env)
    }
  }
  ```

* Python

  ```python
  from workers import DurableObject


  class MyDurableObject(DurableObject):
      def __init__(self, ctx, env):
          super().__init__(ctx, env)
  ```

Workers communicate with a Durable Object using [remote-procedure call](https://developers.cloudflare.com/workers/runtime-apis/rpc/#_top). Public methods on a Durable Object class are exposed as [RPC methods](https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/) to be called by another Worker.

Your file should now look like:

* JavaScript

  ```js
  export class MyDurableObject extends DurableObject {
    constructor(ctx, env) {
      // Required, as we're extending the base class.
      super(ctx, env);
    }


    async sayHello() {
      let result = this.ctx.storage.sql
        .exec("SELECT 'Hello, World!' as greeting")
        .one();
      return result.greeting;
    }
  }
  ```

* TypeScript

  ```ts
  export class MyDurableObject extends DurableObject<Env> {
    constructor(ctx: DurableObjectState, env: Env) {
      // Required, as we're extending the base class.
      super(ctx, env)
    }


    async sayHello(): Promise<string> {
      let result = this.ctx.storage.sql
        .exec("SELECT 'Hello, World!' as greeting")
        .one();
      return result.greeting;
    }
  }
  ```

* Python

  ```python
  from workers import DurableObject


  class MyDurableObject(DurableObject):
      def __init__(self, ctx, env):
          super().__init__(ctx, env)


      async def say_hello(self):
          result = self.ctx.storage.sql \
              .exec("SELECT 'Hello, World!' as greeting") \
              .one()


          return result.greeting
  ```

In the code above, you have:

1. Defined a RPC method, `sayHello()`, that can be called by a Worker to communicate with a Durable Object.
2. Accessed a Durable Object's attached storage, which is a private SQLite database only accessible to the object, using [SQL API](https://developers.cloudflare.com/durable-objects/api/storage-api/#exec) methods (`sql.exec()`) available on `ctx.storage` .
3. Returned an object representing the single row query result using `one()`, which checks that the query result has exactly one row.
4. Return the `greeting` column from the row object result.

## 3. Instantiate and communicate with a Durable Object

Note

Durable Objects do not receive requests directly from the Internet. Durable Objects receive requests from Workers or other Durable Objects. This is achieved by configuring a binding in the calling Worker for each Durable Object class that you would like it to be able to talk to. These bindings must be configured at upload time. Methods exposed by the binding can be used to communicate with particular Durable Objects.

A Worker is used to [access Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/).

To communicate with a Durable Object, the Worker's fetch handler should look like the following:

* JavaScript

  ```js
  export default {
    async fetch(request, env, ctx) {
      const id = env.MY_DURABLE_OBJECT.idFromName(new URL(request.url).pathname);


      const stub = env.MY_DURABLE_OBJECT.get(id);


      const greeting = await stub.sayHello();


      return new Response(greeting);
    },
  };
  ```

* TypeScript

  ```ts
  export default {
    async fetch(request, env, ctx): Promise<Response> {
      const id:DurableObjectId = env.MY_DURABLE_OBJECT.idFromName(new URL(request.url).pathname);


      const stub = env.MY_DURABLE_OBJECT.get(id);


      const greeting = await stub.sayHello();


      return new Response(greeting);
    },
  } satisfies ExportedHandler<Env>;
  ```

* Python

  ```python
  from workers import handler, Response
  from urllib.parse import urlparse


  @handler
  async def on_fetch(request, env, ctx):
      url = urlparse(request.url)
      id = env.MY_DURABLE_OBJECT.idFromName(url.path)
      stub = env.MY_DURABLE_OBJECT.get(id)
      greeting = await stub.say_hello()
      return Response(greeting)
  ```

In the code above, you have:

1. Exported your Worker's main event handlers, such as the `fetch()` handler for receiving HTTP requests.
2. Passed `env` into the `fetch()` handler. Bindings are delivered as a property of the environment object passed as the second parameter when an event handler or class constructor is invoked. By calling the `idFromName()` function on the binding, you use a string-derived object ID. You can also ask the system to [generate random unique IDs](https://developers.cloudflare.com/durable-objects/api/namespace/#newuniqueid). System-generated unique IDs have better performance characteristics, but require you to store the ID somewhere to access the Object again later.
3. Derived an object ID from the URL path. `MY_DURABLE_OBJECT.idFromName()` always returns the same ID when given the same string as input (and called on the same class), but never the same ID for two different strings (or for different classes). In this case, you are creating a new object for each unique path.
4. Constructed the stub for the Durable Object using the ID. A stub is a client object used to send messages to the Durable Object.
5. Called a Durable Object by invoking a RPC method, `sayHello()`, on the Durable Object, which returns a `Hello, World!` string greeting.
6. Received an HTTP response back to the client by constructing a HTTP Response with `return new Response()`.

Refer to [Access a Durable Object from a Worker](https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/) to learn more about communicating with a Durable Object.

## 4. Configure Durable Object bindings

[Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Workers to interact with resources on the Cloudflare developer platform. The Durable Object bindings in your Worker project's [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) will include a binding name (for this guide, use `MY_DURABLE_OBJECT`) and the class name (`MyDurableObject`).

* wrangler.jsonc

  ```jsonc
  {
    "durable_objects": {
      "bindings": [
        {
          "name": "MY_DURABLE_OBJECT",
          "class_name": "MyDurableObject"
        }
      ]
    }
  }
  ```

* wrangler.toml

  ```toml
  [[durable_objects.bindings]]
  name = "MY_DURABLE_OBJECT"
  class_name = "MyDurableObject"
  ```

The `bindings` section contains the following fields:

* `name` - Required. The binding name to use within your Worker.
* `class_name` - Required. The class name you wish to bind to.
* `script_name` - Optional. Defaults to the current [environment's](https://developers.cloudflare.com/durable-objects/reference/environments/) Worker code.

## 5. Configure Durable Object class with SQLite storage backend

A migration is a mapping process from a class name to a runtime state. You perform a migration when creating a new Durable Object class, or when renaming, deleting or transferring an existing Durable Object class.

Migrations are performed through the `[[migrations]]` configurations key in your Wrangler file.

The Durable Object migration to create a new Durable Object class with SQLite storage backend will look like the following in your Worker's Wrangler file:

* wrangler.jsonc

  ```jsonc
  {
    "migrations": [
      {
        "tag": "v1",
        "new_sqlite_classes": [
          "MyDurableObject"
        ]
      }
    ]
  }
  ```

* wrangler.toml

  ```toml
  [[migrations]]
  tag = "v1" # Should be unique for each entry
  new_sqlite_classes = ["MyDurableObject"] # Array of new classes
  ```

Refer to [Durable Objects migrations](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) to learn more about the migration process.

## 6. Develop a Durable Object Worker locally

To test your Durable Object locally, run [`wrangler dev`](https://developers.cloudflare.com/workers/wrangler/commands/#dev):

```sh
npx wrangler dev
```

In your console, you should see a`Hello world` string returned by the Durable Object.

## 7. Deploy your Durable Object Worker

To deploy your Durable Object Worker:

```sh
npx wrangler deploy
```

Once deployed, you should be able to see your newly created Durable Object Worker on the [Cloudflare dashboard](https://dash.cloudflare.com/), **Workers & Pages** > **Overview**.

Preview your Durable Object Worker at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

## Summary and final code

Your final code should look like this:

* JavaScript

  ```js
  import { DurableObject } from "cloudflare:workers";
  export class MyDurableObject extends DurableObject {
    constructor(ctx, env) {
      // Required, as we are extending the base class.
      super(ctx, env);
    }


    async sayHello() {
      let result = this.ctx.storage.sql
        .exec("SELECT 'Hello, World!' as greeting")
        .one();
      return result.greeting;
    }
  }
  export default {
    async fetch(request, env, ctx) {
      const id = env.MY_DURABLE_OBJECT.idFromName(new URL(request.url).pathname);


      const stub = env.MY_DURABLE_OBJECT.get(id);


      const greeting = await stub.sayHello();


      return new Response(greeting);
    },
  };
  ```

* TypeScript

  ```ts
  import { DurableObject } from "cloudflare:workers";
  export class MyDurableObject extends DurableObject<Env> {
    constructor(ctx: DurableObjectState, env: Env) {
      // Required, as we are extending the base class.
      super(ctx, env)
    }


    async sayHello():Promise<string> {
      let result = this.ctx.storage.sql
        .exec("SELECT 'Hello, World!' as greeting")
        .one();
      return result.greeting;
    }
  }
  export default {
    async fetch(request, env, ctx): Promise<Response> {
      const id:DurableObjectId = env.MY_DURABLE_OBJECT.idFromName(new URL(request.url).pathname);


      const stub = env.MY_DURABLE_OBJECT.get(id);


      const greeting = await stub.sayHello();


      return new Response(greeting);
    },
  } satisfies ExportedHandler<Env>;
  ```

* Python

  ```python
  from workers import DurableObject, handler, Response
  from urllib.parse import urlparse


  class MyDurableObject(DurableObject):
      def __init__(self, ctx, env):
          super().__init__(ctx, env)


      async def say_hello(self):
          result = self.ctx.storage.sql \
              .exec("SELECT 'Hello, World!' as greeting") \
              .one()


          return result.greeting


  @handler
  async def on_fetch(request, env, ctx):
      url = urlparse(request.url)
      id = env.MY_DURABLE_OBJECT.idFromName(url.path)
      stub = env.MY_DURABLE_OBJECT.get(id)
      greeting = await stub.say_hello()
      return Response(greeting)
  ```

By finishing this tutorial, you have:

* Successfully created a Durable Object
* Called the Durable Object by invoking a [RPC method](https://developers.cloudflare.com/workers/runtime-apis/rpc/)
* Deployed the Durable Object globally

## Related resources

* [Create Durable Object stubs](https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/)
* [Access Durable Objects Storage](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/)
* [Miniflare](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare) - Helpful tools for mocking and testing your Durable Objects.

</page>

<page>
---
title: Observability · Cloudflare Durable Objects docs
lastUpdated: 2025-01-31T11:01:46.000Z
chatbotDeprioritize: true
source_url:
  html: https://developers.cloudflare.com/durable-objects/observability/
  md: https://developers.cloudflare.com/durable-objects/observability/index.md
---

* [Troubleshooting](https://developers.cloudflare.com/durable-objects/observability/troubleshooting/)
* [Metrics and GraphQL analytics](https://developers.cloudflare.com/durable-objects/observability/graphql-analytics/)

</page>

<page>
---
title: Platform · Cloudflare Durable Objects docs
lastUpdated: 2025-03-14T10:22:37.000Z
chatbotDeprioritize: true
source_url:
  html: https://developers.cloudflare.com/durable-objects/platform/
  md: https://developers.cloudflare.com/durable-objects/platform/index.md
---

* [Known issues](https://developers.cloudflare.com/durable-objects/platform/known-issues/)
* [Pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/)
* [Limits](https://developers.cloudflare.com/durable-objects/platform/limits/)
* [Choose a data or storage product](https://developers.cloudflare.com/workers/platform/storage-options/)

</page>

<page>
---
title: Reference · Cloudflare Durable Objects docs
lastUpdated: 2025-03-14T10:22:37.000Z
chatbotDeprioritize: true
source_url:
  html: https://developers.cloudflare.com/durable-objects/reference/
  md: https://developers.cloudflare.com/durable-objects/reference/index.md
---

* [In-memory state in a Durable Object](https://developers.cloudflare.com/durable-objects/reference/in-memory-state/)
* [Durable Objects migrations](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/)
* [Data security](https://developers.cloudflare.com/durable-objects/reference/data-security/)
* [Data location](https://developers.cloudflare.com/durable-objects/reference/data-location/)
* [Environments](https://developers.cloudflare.com/durable-objects/reference/environments/)
* [Gradual Deployments](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/#gradual-deployments-for-durable-objects)
* [Glossary](https://developers.cloudflare.com/durable-objects/reference/glossary/)

</page>

<page>
---
title: Release notes · Cloudflare Durable Objects docs
description: Subscribe to RSS
lastUpdated: 2025-03-14T10:22:37.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/release-notes/
  md: https://developers.cloudflare.com/durable-objects/release-notes/index.md
---

[Subscribe to RSS](https://developers.cloudflare.com/durable-objects/release-notes/index.xml)

## 2025-04-07

**Durable Objects on Workers Free plan**

[SQLite-backed Durable Objects](https://developers.cloudflare.com/durable-objects/get-started/) are now available on the Workers Free plan with these [limits](https://developers.cloudflare.com/durable-objects/platform/pricing/).

## 2025-04-07

**SQLite in Durable Objects GA**

[SQLite-backed Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class) and corresponding [Storage API](https://developers.cloudflare.com/durable-objects/api/storage-api/) methods like `sql.exec` have moved from beta to general availability. New Durable Object classes should use wrangler configuration for SQLite storage over key-value storage.

SQLite storage per Durable Object has increased to 10GB for all existing and new objects.

## 2025-02-19

SQLite-backed Durable Objects now support `PRAGMA optimize` command, which can improve database query performance. It is recommended to run this command after a schema change (for example, after creating an index). Refer to [`PRAGMA optimize`](https://developers.cloudflare.com/d1/sql-api/sql-statements/#pragma-optimize) for more information.

## 2025-02-11

When Durable Objects generate an "internal error" exception in response to certain failures, the exception message may provide a reference ID that customers can include in support communication for easier error identification. For example, an exception with the new message might look like: `internal error; reference = 0123456789abcdefghijklmn`.

## 2024-10-07

**Alarms re-enabled in (beta) SQLite-backed Durable Object classes**

The issue identified with [alarms](https://developers.cloudflare.com/durable-objects/api/alarms/) in [beta Durable Object classes with a SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#sqlite-storage-backend) has been resolved and alarms have been re-enabled.

## 2024-09-27

**Alarms disabled in (beta) SQLite-backed Durable Object classes**

An issue was identified with [alarms](https://developers.cloudflare.com/durable-objects/api/alarms/) in [beta Durable Object classes with a SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#sqlite-storage-backend). Alarms have been temporarily disabled for only SQLite-backed Durable Objects while a fix is implemented. Alarms in Durable Objects with default, key-value storage backend are unaffected and continue to operate.

## 2024-09-26

**(Beta) SQLite storage backend & SQL API available on new Durable Object classes**

The new beta version of Durable Objects is available where each Durable Object has a private, embedded SQLite database. When deploying a new Durable Object class, users can [opt-in to a SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#sqlite-storage-backend) in order to access new [SQL API](https://developers.cloudflare.com/durable-objects/api/storage-api/#sql-api) and [point-in-time-recovery API](https://developers.cloudflare.com/durable-objects/api/storage-api/#pitr-point-in-time-recovery-api), part of Durable Objects Storage API.

You cannot enable a SQLite storage backend on an existing, deployed Durable Object class. Automatic migration of deployed classes from their key-value storage backend to SQLite storage backend will be available in the future.

During the initial beta, Storage API billing is not enabled for Durable Object classes using SQLite storage backend. SQLite-backed Durable Objects will incur [charges for requests and duration](https://developers.cloudflare.com/durable-objects/platform/pricing/#billing-metrics). We plan to enable Storage API billing for Durable Objects using SQLite storage backend in the first half of 2025 after advance notice with the following [pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/#sqlite-storage-backend).

## 2024-09-07

**New error message for overloaded Durable Objects**

Introduced a new overloaded error message for Durable Objects: "Durable Object is overloaded. Too many requests for the same object within a 10 second window."

This error message does not replace other types of overload messages that you may encounter for your Durable Object, and is only returned at more extreme levels of overload.

## 2024-06-24

[Exceptions](https://developers.cloudflare.com/durable-objects/best-practices/error-handling) thrown from Durable Object internal operations and tunneled to the caller may now be populated with a `.retryable: true` property if the exception was likely due to a transient failure, or populated with an `.overloaded: true` property if the exception was due to [overload](https://developers.cloudflare.com/durable-objects/observability/troubleshooting/#durable-object-is-overloaded).

## 2024-04-03

**Durable Objects support for Oceania region**

Durable Objects can reside in Oceania, lowering Durable Objects request latency for eyeball Workers in Oceania locations.

Refer to [Durable Objects](https://developers.cloudflare.com/durable-objects/reference/data-location/#provide-a-location-hint) to provide location hints to objects.

## 2024-04-01

**Billing reduction for WebSocket messages**

Durable Objects [request billing](https://developers.cloudflare.com/durable-objects/platform/pricing/#billing-metrics) applies a 20:1 ratio for incoming WebSocket messages. For example, 1 million Websocket received messages across connections would be charged as 50,000 Durable Objects requests.

This is a billing-only calculation and does not impact Durable Objects [metrics and analytics](https://developers.cloudflare.com/durable-objects/observability/graphql-analytics/).

## 2024-02-15

**Optional \`alarmInfo\` parameter for Durable Object Alarms**

Durable Objects [Alarms](https://developers.cloudflare.com/durable-objects/api/alarms/) now have a new `alarmInfo` argument that provides more details about an alarm invocation, including the `retryCount` and `isRetry` to signal if the alarm was retried.

</page>

<page>
---
title: Tutorials · Cloudflare Durable Objects docs
description: View tutorials to help you get started with Durable Objects.
lastUpdated: 2025-05-06T17:35:57.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/tutorials/
  md: https://developers.cloudflare.com/durable-objects/tutorials/index.md
---

View tutorials to help you get started with Durable Objects.

| Name | Last Updated | Type | Difficulty |
| - | - | - | - |
| [Build Live Cursors with Next.js, RPC and Durable Objects](https://developers.cloudflare.com/workers/tutorials/live-cursors-with-nextjs-rpc-do/) | 8 months ago | 📝 Tutorial | Intermediate |
| [Build an interview practice tool with Workers AI](https://developers.cloudflare.com/workers-ai/guides/tutorials/build-ai-interview-practice-tool/) | 8 months ago | 📝 Tutorial | Intermediate |
| [Build a seat booking app with SQLite in Durable Objects](https://developers.cloudflare.com/durable-objects/tutorials/build-a-seat-booking-app/) | 10 months ago | 📝 Tutorial | Intermediate |
| [Deploy a Browser Rendering Worker with Durable Objects](https://developers.cloudflare.com/browser-rendering/workers-bindings/browser-rendering-with-do/) | almost 2 years ago | 📝 Tutorial | Beginner |
| [Deploy a real-time chat application](https://developers.cloudflare.com/workers/tutorials/deploy-a-realtime-chat-app/) | almost 2 years ago | 📝 Tutorial | Intermediate |

</page>

<page>
---
title: Videos · Cloudflare Durable Objects docs
lastUpdated: 2025-03-12T13:36:32.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/video-tutorials/
  md: https://developers.cloudflare.com/durable-objects/video-tutorials/index.md
---

[Introduction to Durable Objects ](https://developers.cloudflare.com/learning-paths/durable-objects-course/series/introduction-to-series-1/)Dive into a hands-on Durable Objects project and learn how to build stateful apps using serverless architecture

</page>

<page>
---
title: What are Durable Objects? · Cloudflare Durable Objects docs
description: "A Durable Object is a special kind of Cloudflare Worker which
  uniquely combines compute with storage. Like a Worker, a Durable Object is
  automatically provisioned geographically close to where it is first requested,
  starts up quickly when needed, and shuts down when idle. You can have millions
  of them around the world. However, unlike regular Workers:"
lastUpdated: 2025-04-06T14:39:24.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/what-are-durable-objects/
  md: https://developers.cloudflare.com/durable-objects/what-are-durable-objects/index.md
---

A Durable Object is a special kind of [Cloudflare Worker](https://developers.cloudflare.com/workers/) which uniquely combines compute with storage. Like a Worker, a Durable Object is automatically provisioned geographically close to where it is first requested, starts up quickly when needed, and shuts down when idle. You can have millions of them around the world. However, unlike regular Workers:

* Each Durable Object has a **globally-unique name**, which allows you to send requests to a specific object from anywhere in the world. Thus, a Durable Object can be used to coordinate between multiple clients who need to work together.
* Each Durable Object has some **durable storage** attached. Since this storage lives together with the object, it is strongly consistent yet fast to access.

Therefore, Durable Objects enable **stateful** serverless applications.

## Durable Objects highlights

Durable Objects have properties that make them a great fit for distributed stateful scalable applications.

**Serverless compute, zero infrastructure management**

* Durable Objects are built on-top of the Workers runtime, so they support exactly the same code (JavaScript and WASM), and similar memory and CPU limits.
* Each Durable Object is [implicitly created on first access](https://developers.cloudflare.com/durable-objects/api/namespace/#get). User applications are not concerned with their lifecycle, creating them or destroying them. Durable Objects migrate among healthy servers, and therefore applications never have to worry about managing them.
* Each Durable Object stays alive as long as requests are being processed, and remains alive for several seconds after being idle before hibernating, allowing applications to [exploit in-memory caching](https://developers.cloudflare.com/durable-objects/reference/in-memory-state/) while handling many consecutive requests and boosting their performance.

**Storage colocated with compute**

* Each Durable Object has its own [durable, transactional, and strongly consistent storage](https://developers.cloudflare.com/durable-objects/api/storage-api/) (up to 10 GB[1](#user-content-fn-1)), persisted across requests, and accessible only within that object.

**Single-threaded concurrency**

* Each [Durable Object instance has an identifier](https://developers.cloudflare.com/durable-objects/api/id/), either randomly-generated or user-generated, which allows you to globally address which Durable Object should handle a specific action or request.
* Durable Objects are single-threaded and cooperatively multi-tasked, just like code running in a web browser. For more details on how safety and correctness are achieved, refer to the blog post ["Durable Objects: Easy, Fast, Correct — Choose three"](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

**Elastic horizontal scaling across Cloudflare's global network**

* Durable Objects can be spread around the world, and you can [optionally influence where each instance should be located](https://developers.cloudflare.com/durable-objects/reference/data-location/#provide-a-location-hint). Durable Objects are not yet available in every Cloudflare data center; refer to the [where.durableobjects.live](https://where.durableobjects.live/) project for live locations.
* Each Durable Object type (or ["Namespace binding"](https://developers.cloudflare.com/durable-objects/api/namespace/) in Cloudflare terms) corresponds to a JavaScript class implementing the actual logic. There is no hard limit on how many Durable Objects can be created for each namespace.
* Durable Objects scale elastically as your application creates millions of objects. There is no need for applications to manage infrastructure or plan ahead for capacity.

## Durable Objects features

### In-memory state

Each Durable Object has its own [in-memory state](https://developers.cloudflare.com/durable-objects/reference/in-memory-state/). Applications can use this in-memory state to optimize the performance of their applications by keeping important information in-memory, thereby avoiding the need to access the durable storage at all.

Useful cases for in-memory state include batching and aggregating information before persisting it to storage, or for immediately rejecting/handling incoming requests meeting certain criteria, and more.

In-memory state is reset when the Durable Object hibernates after being idle for some time. Therefore, it is important to persist any in-memory data to the durable storage if that data will be needed at a later time when the Durable Object receives another request.

### Storage API

The [Durable Object Storage API](https://developers.cloudflare.com/durable-objects/api/storage-api/) allows Durable Objects to access fast, transactional, and strongly consistent storage. A Durable Object's attached storage is private to its unique instance and cannot be accessed by other objects.

There are two flavors of the storage API, a [key-value (KV) API](https://developers.cloudflare.com/durable-objects/api/storage-api/#kv-api) and an [SQL API](https://developers.cloudflare.com/durable-objects/api/storage-api/#sql-api).

When using the [new SQLite in Durable Objects storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#enable-sqlite-storage-backend-on-new-durable-object-class-migration), you have access to both the APIs. However, if you use the previous storage backend you only have access to the key-value API.

### Alarms API

Durable Objects provide an [Alarms API](https://developers.cloudflare.com/durable-objects/api/alarms/) which allows you to schedule the Durable Object to be woken up at a time in the future. This is useful when you want to do certain work periodically, or at some specific point in time, without having to manually manage infrastructure such as job scheduling runners on your own.

You can combine Alarms with in-memory state and the durable storage API to build batch and aggregation applications such as queues, workflows, or advanced data pipelines.

### WebSockets

WebSockets are long-lived TCP connections that enable bi-directional, real-time communication between client and server. Because WebSocket sessions are long-lived, applications commonly use Durable Objects to accept either the client or server connection.

Because Durable Objects provide a single-point-of-coordination between Cloudflare Workers, a single Durable Object instance can be used in parallel with WebSockets to coordinate between multiple clients, such as participants in a chat room or a multiplayer game.

Durable Objects support the [WebSocket Standard API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#websocket-standard-api), as well as the [WebSockets Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#websocket-hibernation-api) which extends the Web Standard WebSocket API to reduce costs by not incurring billing charges during periods of inactivity.

### RPC

Durable Objects support Workers [Remote-Procedure-Call (RPC)](https://developers.cloudflare.com/workers/runtime-apis/rpc/) which allows applications to use JavaScript-native methods and objects to communicate between Workers and Durable Objects.

Using RPC for communication makes application development easier and simpler to reason about, and more efficient.

## Actor programming model

Another way to describe and think about Durable Objects is through the lens of the [Actor programming model](https://en.wikipedia.org/wiki/Actor_model). There are several popular examples of the Actor model supported at the programming language level through runtimes or library frameworks, like [Erlang](https://www.erlang.org/), [Elixir](https://elixir-lang.org/), [Akka](https://akka.io/), or [Microsoft Orleans for .NET](https://learn.microsoft.com/en-us/dotnet/orleans/overview).

The Actor model simplifies a lot of problems in distributed systems by abstracting away the communication between actors using RPC calls (or message sending) that could be implemented on-top of any transport protocol, and it avoids most of the concurrency pitfalls you get when doing concurrency through shared memory such as race conditions when multiple processes/threads access the same data in-memory.

Each Durable Object instance can be seen as an Actor instance, receiving messages (incoming HTTP/RPC requests), executing some logic in its own single-threaded context using its attached durable storage or in-memory state, and finally sending messages to the outside world (outgoing HTTP/RPC requests or responses), even to another Durable Object instance.

Each Durable Object has certain capabilities in terms of [how much work it can do](https://developers.cloudflare.com/durable-objects/platform/limits/#how-much-work-can-a-single-durable-object-do), which should influence the application's [architecture to fully take advantage of the platform](https://developers.cloudflare.com/reference-architecture/diagrams/storage/durable-object-control-data-plane-pattern/).

Durable Objects are natively integrated into Cloudflare's infrastructure, giving you the ultimate serverless platform to build distributed stateful applications exploiting the entirety of Cloudflare's network.

## Durable Objects in Cloudflare

Many of Cloudflare's products use Durable Objects. Some of our technical blog posts showcase real-world applications and use-cases where Durable Objects make building applications easier and simpler.

These blog posts may also serve as inspiration on how to architect scalable applications using Durable Objects, and how to integrate them with the rest of Cloudflare Developer Platform.

* [Durable Objects aren't just durable, they're fast: a 10x speedup for Cloudflare Queues](https://blog.cloudflare.com/how-we-built-cloudflare-queues/)
* [Behind the scenes with Stream Live, Cloudflare's live streaming service](https://blog.cloudflare.com/behind-the-scenes-with-stream-live-cloudflares-live-streaming-service/)
* [DO it again: how we used Durable Objects to add WebSockets support and authentication to AI Gateway](https://blog.cloudflare.com/do-it-again/)
* [Workers Builds: integrated CI/CD built on the Workers platform](https://blog.cloudflare.com/workers-builds-integrated-ci-cd-built-on-the-workers-platform/)
* [Build durable applications on Cloudflare Workers: you write the Workflows, we take care of the rest](https://blog.cloudflare.com/building-workflows-durable-execution-on-workers/)
* [Building D1: a Global Database](https://blog.cloudflare.com/building-d1-a-global-database/)
* [Billions and billions (of logs): scaling AI Gateway with the Cloudflare Developer Platform](https://blog.cloudflare.com/billions-and-billions-of-logs-scaling-ai-gateway-with-the-cloudflare/)
* [Indexing millions of HTTP requests using Durable Objects](https://blog.cloudflare.com/r2-rayid-retrieval/)

Finally, the following blog posts may help you learn some of the technical implementation aspects of Durable Objects, and how they work.

* [Durable Objects: Easy, Fast, Correct — Choose three](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/)
* [Zero-latency SQLite storage in every Durable Object](https://blog.cloudflare.com/sqlite-in-durable-objects/)
* [Workers Durable Objects Beta: A New Approach to Stateful Serverless](https://blog.cloudflare.com/introducing-workers-durable-objects/)

## Get started

Get started now by following the ["Get started" guide](https://developers.cloudflare.com/durable-objects/get-started/) to create your first application using Durable Objects.

## Footnotes

1. Storage per Durable Object with SQLite is currently 1 GB. This will be raised to 10 GB for general availability. [↩](#user-content-fnref-1)

</page>

<page>
---
title: Alarms · Cloudflare Durable Objects docs
description: Durable Objects alarms allow you to schedule the Durable Object to
  be woken up at a time in the future. When the alarm's scheduled time comes,
  the alarm() handler method will be called. Alarms are modified using the
  Storage API, and alarm operations follow the same rules as other storage
  operations.
lastUpdated: 2025-06-04T15:46:50.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/api/alarms/
  md: https://developers.cloudflare.com/durable-objects/api/alarms/index.md
---

## Background

Durable Objects alarms allow you to schedule the Durable Object to be woken up at a time in the future. When the alarm's scheduled time comes, the `alarm()` handler method will be called. Alarms are modified using the Storage API, and alarm operations follow the same rules as other storage operations.

Notably:

* Each Durable Object is able to schedule a single alarm at a time by calling `setAlarm()`.
* Alarms have guaranteed at-least-once execution and are retried automatically when the `alarm()` handler throws.
* Retries are performed using exponential backoff starting at a 2 second delay from the first failure with up to 6 retries allowed.

How are alarms different from Cron Triggers?

Alarms are more fine grained than [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/). A Worker can have up to three Cron Triggers configured at once, but it can have an unlimited amount of Durable Objects, each of which can have an alarm set.

Alarms are directly scheduled from within your Durable Object. Cron Triggers, on the other hand, are not programmatic. [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/) execute based on their schedules, which have to be configured through the Cloudflare dashboard or API.

Alarms can be used to build distributed primitives, like queues or batching of work atop Durable Objects. Alarms also provide a mechanism to guarantee that operations within a Durable Object will complete without relying on incoming requests to keep the Durable Object alive. For a complete example, refer to [Use the Alarms API](https://developers.cloudflare.com/durable-objects/examples/alarms-api/).

## Storage methods

### `getAlarm`

* `getAlarm()`: number | null

  * If there is an alarm set, then return the currently set alarm time as the number of milliseconds elapsed since the UNIX epoch. Otherwise, return `null`.

  * If `getAlarm` is called while an [`alarm`](https://developers.cloudflare.com/durable-objects/api/alarms/#alarm) is already running, it returns `null` unless `setAlarm` has also been called since the alarm handler started running.

### `setAlarm`

* `setAlarm(scheduledTimeMs number)` : void

  * Set the time for the alarm to run. Specify the time as the number of milliseconds elapsed since the UNIX epoch.
  * If you call `setAlarm` when there is already one scheduled, it will override the existing alarm.

Calling `setAlarm` inside the constructor

If you wish to call `setAlarm` inside the constructor of a Durable Object, ensure that you are first checking whether an alarm has already been set.

This is due to the fact that, if the Durable Object wakes up after being inactive, the constructor is invoked before the [`alarm` handler](https://developers.cloudflare.com/durable-objects/api/alarms/#alarm). Therefore, if the constructor calls `setAlarm`, it could interfere with the next alarm which has already been set.

### `deleteAlarm`

* `deleteAlarm()`: void

  * Unset the alarm if there is a currently set alarm.

  * Calling `deleteAlarm()` inside the `alarm()` handler may prevent retries on a best-effort basis, but is not guaranteed.

## Handler methods

### `alarm`

* `alarm(alarmInfoObject)`: void

  * Called by the system when a scheduled alarm time is reached.

  * The optional parameter `alarmInfo` object has two properties:

    * `retryCount` number: The number of times this alarm event has been retried.
    * `isRetry` boolean: A boolean value to indicate if the alarm has been retried. This value is `true` if this alarm event is a retry.

  * Only one instance of `alarm()` will ever run at a given time per Durable Object instance.

  * The `alarm()` handler has guaranteed at-least-once execution and will be retried upon failure using exponential backoff, starting at 2 second delays for up to 6 retries. This only applies to the most recent `setAlarm()` call. Retries will be performed if the method fails with an uncaught exception.

  * This method can be `async`.

## Example

This example shows how to both set alarms with the `setAlarm(timestamp)` method and handle alarms with the `alarm()` handler within your Durable Object.

* The `alarm()` handler will be called once every time an alarm fires.
* If an unexpected error terminates the Durable Object, the `alarm()` handler may be re-instantiated on another machine.
* Following a short delay, the `alarm()` handler will run from the beginning on the other machine.

```js
import { DurableObject } from "cloudflare:workers";


export default {
  async fetch(request, env) {
    let id = env.ALARM_EXAMPLE.idFromName("foo");
    return await env.ALARM_EXAMPLE.get(id).fetch(request);
  },
};


const SECONDS = 1000;


export class AlarmExample extends DurableObject {
  constructor(ctx, env) {
    this.ctx = ctx;
    this.storage = ctx.storage;
  }
  async fetch(request) {
    // If there is no alarm currently set, set one for 10 seconds from now
    let currentAlarm = await this.storage.getAlarm();
    if (currentAlarm == null) {
      this.storage.setAlarm(Date.now() + 10 * SECONDS);
    }
  }
  async alarm() {
    // The alarm handler will be invoked whenever an alarm fires.
    // You can use this to do work, read from the Storage API, make HTTP calls
    // and set future alarms to run using this.storage.setAlarm() from within this handler.
  }
}
```

The following example shows how to use the `alarmInfo` property to identify if the alarm event has been attempted before.

```js
class MyDurableObject extends DurableObject {
  async alarm(alarmInfo) {
    if (alarmInfo?.retryCount != 0) {
      console.log("This alarm event has been attempted ${alarmInfo?.retryCount} times before.");
    }
  }
}
```

## Related resources

* Understand how to [use the Alarms API](https://developers.cloudflare.com/durable-objects/examples/alarms-api/) in an end-to-end example.
* Read the [Durable Objects alarms announcement blog post](https://blog.cloudflare.com/durable-objects-alarms/).
* Review the [Storage API](https://developers.cloudflare.com/durable-objects/api/storage-api/) documentation for Durable Objects.

</page>

<page>
---
title: Durable Object Base Class · Cloudflare Durable Objects docs
description: The DurableObject base class is an abstract class which all Durable
  Objects inherit from. This base class provides a set of optional methods,
  frequently referred to as handler methods, which can respond to events, for
  example a webSocketMessage when using the WebSocket Hibernation API. To
  provide a concrete example, here is a Durable Object MyDurableObject which
  extends DurableObject and implements the fetch handler to return "Hello,
  World!" to the calling Worker.
lastUpdated: 2025-01-15T09:09:46.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/api/base/
  md: https://developers.cloudflare.com/durable-objects/api/base/index.md
---

The `DurableObject` base class is an abstract class which all Durable Objects inherit from. This base class provides a set of optional methods, frequently referred to as handler methods, which can respond to events, for example a webSocketMessage when using the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#websocket-hibernation-api). To provide a concrete example, here is a Durable Object `MyDurableObject` which extends `DurableObject` and implements the fetch handler to return "Hello, World!" to the calling Worker.

* JavaScript

  ```js
  export class MyDurableObject extends DurableObject {
    constructor(ctx, env) {
      super(ctx, env);
    }


    async fetch(request) {
      return new Response("Hello, World!");
    }
  }
  ```

* TypeScript

  ```ts
  export class MyDurableObject extends DurableObject {
    constructor(ctx: DurableObjectState, env: Env) {
      super(ctx, env);
    }


    async fetch(request: Request) {
      return new Response("Hello, World!");
    }
  }
  ```

## Methods

### `fetch`

* `fetch(Request)`: Response | Promise \<Response>

  * Takes an HTTP request object and returns an HTTP response object. This method allows the Durable Object to emulate an HTTP server where a Worker with a binding to that object is the client.

  * This method can be `async`.

### `alarm`

* `alarm(alarmInfoObject)`: Promise \<void>

  * Called by the system when a scheduled alarm time is reached.

  * The optional parameter `alarmInfo` object has two properties:

    * `retryCount` number: The number of times this alarm event has been retried.
    * `isRetry` boolean: A boolean value to indicate if the alarm has been retried. This value is `true` if this alarm event is a retry.

  * The `alarm()` handler has guaranteed at-least-once execution and will be retried upon failure using exponential backoff, starting at two second delays for up to six retries. Retries will be performed if the method fails with an uncaught exception.

  * This method can be `async`.

  * Refer to [`alarm`](https://developers.cloudflare.com/durable-objects/api/alarms/#alarm) for more information.

### `webSocketMessage`

* `webSocketMessage(ws WebSocket, message string | ArrayBuffer)`: void

  * Called by the system when an accepted WebSocket receives a message.

  * This method can be `async`.

  * This method is not called for WebSocket control frames. The system will respond to an incoming [WebSocket protocol ping](https://www.rfc-editor.org/rfc/rfc6455#section-5.5.2) automatically without interrupting hibernation.

### `webSocketClose`

* `webSocketClose(ws WebSocket, code number, reason string, wasClean boolean)`: void

  * Called by the system when a WebSocket is closed. `wasClean()` is true if the connection closed cleanly, false otherwise.

  * This method can be `async`.

### `webSocketError`

* `webSocketError(ws WebSocket, error any)` : void

  * Called by the system when any non-disconnection related errors occur.

  * This method can be `async`.

## Properties

### `DurableObjectState`

See [`DurableObjectState` documentation](https://developers.cloudflare.com/durable-objects/api/state/).

### `Env`

A list of bindings which are available to the Durable Object.

## Related resources

* Refer to [Use WebSockets](https://developers.cloudflare.com/durable-objects/best-practices/websockets/) for more information on examples of WebSocket methods and best practices.

</page>

<page>
---
title: Durable Object Container · Cloudflare Durable Objects docs
description: >-
  When using a Container-enabled Durable Object, you can access the Durable
  Object's associated container via

  the container object which is on the ctx property. This allows you to start,
  stop, and interact with the container.
lastUpdated: 2025-07-15T15:50:13.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/api/container/
  md: https://developers.cloudflare.com/durable-objects/api/container/index.md
---

## Description

When using a [Container-enabled Durable Object](https://developers.cloudflare.com/containers), you can access the Durable Object's associated container via the `container` object which is on the `ctx` property. This allows you to start, stop, and interact with the container.

Note

It is likely preferable to use the official `Container` class, which provides helper methods and a more idiomatic API for working with containers on top of Durable Objects.

* JavaScript

  ```js
  export class MyDurableObject extends DurableObject {
    constructor(ctx, env) {
      super(ctx, env);


      // boot the container when starting the DO
      this.ctx.blockConcurrencyWhile(async () => {
        this.ctx.container.start();
      });
    }
  }
  ```

* TypeScript

  ```ts
  export class MyDurableObject extends DurableObject {
    constructor(ctx: DurableObjectState, env: Env) {
      super(ctx, env);


        // boot the container when starting the DO
        this.ctx.blockConcurrencyWhile(async () => {
          this.ctx.container.start();
      });
      }


  }
  ```

## Attributes

### `running`

`running` returns `true` if the container is currently running. It does not ensure that the container has fully started and ready to accept requests.

```js
  this.ctx.container.running;
```

## Methods

### `start`

`start` boots a container. This method does not block until the container is fully started. You may want to confirm the container is ready to accept requests before using it.

```js
this.ctx.container.start({
  env: {
    FOO: "bar",
  },
  enableInternet: false,
  entrypoint: ["node", "server.js"],
});
```

#### Parameters

* `options` (optional): An object with the following properties:

  * `env`: An object containing environment variables to pass to the container. This is useful for passing configuration values or secrets to the container.
  * `entrypoint`: An array of strings representing the command to run in the container.
  * `enableInternet`: A boolean indicating whether to enable internet access for the container.

#### Return values

* None.

### `destroy`

`destroy` stops the container and optionally returns a custom error message to the `monitor()` error callback.

```js
this.ctx.container.destroy("Manually Destroyed");
```

#### Parameters

* `error` (optional): A string that will be sent to the error handler of the `monitor` method. This is useful for logging or debugging purposes.

#### Return values

* A promise that returns once the container is destroyed.

### `signal`

`signal` sends an IPC signal to the container, such as SIGKILL or SIGTERM. This is useful for stopping the container gracefully or forcefully.

```js
const SIGTERM = 15;
this.ctx.container.signal(SIGTERM);
```

#### Parameters

* `signal`: a number representing the signal to send to the container. This is typically a POSIX signal number, such as SIGTERM (15) or SIGKILL (9).

#### Return values

* None.

### `getTcpPort`

`getTcpPort` returns a TCP port from the container. This can be used to communicate with the container over TCP and HTTP.

```js
const port = this.ctx.container.getTcpPort(8080);
const res = await port.fetch("http://container/set-state", {
  body: initialState,
  method: "POST",
});
```

```js
const conn = this.ctx.container.getTcpPort(8080).connect('10.0.0.1:8080');
await conn.opened;


try {
  if (request.body) {
    await request.body.pipeTo(conn.writable);
  }
  return new Response(conn.readable);
} catch (err) {
  console.error("Request body piping failed:", err);
  return new Response("Failed to proxy request body", { status: 502 });
}
```

#### Parameters

* `port` (number): a TCP port number to use for communication with the container.

#### Return values

* `TcpPort`: a `TcpPort` object representing the TCP port. This object can be used to send requests to the container over TCP and HTTP.

### `monitor`

`monitor` returns a promise that resolves when a container exits and errors if a container errors. This is useful for setting up callbacks to handle container status changes in your Workers code.

```js
class MyContainer extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    function onContainerExit() {
      console.log("Container exited");
    }


    // the "err" value can be customized by the destroy() method
    async function onContainerError(err) {
      console.log("Container errored", err);
    }


    this.ctx.container.start();
    this.ctx.container.monitor().then(onContainerExit).catch(onContainerError);
  }
}
```

#### Parameters

* None

#### Return values

* A promise that resolves when the container exits.

## Related resources

* [Containers](https://developers.cloudflare.com/containers)
* [Get Started With Containers](https://developers.cloudflare.com/containers/get-started)

</page>

<page>
---
title: Durable Object ID · Cloudflare Durable Objects docs
description: A Durable Object ID is a 64-digit hexadecimal number used to
  identify a Durable Object. Not all 64-digit hex numbers are valid IDs. Durable
  Object IDs are constructed indirectly via the DurableObjectNamespace
  interface.
lastUpdated: 2024-12-04T15:21:02.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/api/id/
  md: https://developers.cloudflare.com/durable-objects/api/id/index.md
---

## Description

A Durable Object ID is a 64-digit hexadecimal number used to identify a Durable Object. Not all 64-digit hex numbers are valid IDs. Durable Object IDs are constructed indirectly via the [`DurableObjectNamespace`](https://developers.cloudflare.com/durable-objects/api/namespace) interface.

The `DurableObjectId` interface refers to a new or existing Durable Object. This interface is most frequently used by [`DurableObjectNamespace::get`](https://developers.cloudflare.com/durable-objects/api/namespace/#get) to obtain a [`DurableObjectStub`](https://developers.cloudflare.com/durable-objects/api/stub) for submitting requests to a Durable Object. Note that creating an ID for a Durable Object does not create the Durable Object. The Durable Object is created lazily after creating a stub from a `DurableObjectId`. This ensures that objects are not constructed until they are actually accessed.

Logging

If you are experiencing an issue with a particular Durable Object, you may wish to log the `DurableObjectId` from your Worker and include it in your Cloudflare support request.

## Methods

### `toString`

`toString` converts a `DurableObjectId` to a 64 digit hex string. This string is useful for logging purposes or storing the `DurableObjectId` elsewhere, for example, in a session cookie. This string can be used to reconstruct a `DurableObjectId` via `DurableObjectNamespace::idFromString`.

```js
// Create a new unique ID
const id = env.MY_DURABLE_OBJECT.newUniqueId();
// Convert the ID to a string to be saved elsewhere, e.g. a session cookie
const session_id = id.toString();


...
// Recreate the ID from the string
const id = env.MY_DURABLE_OBJECT.idFromString(session_id);
```

#### Parameters

* None.

#### Return values

* A 64 digit hex string.

### `equals`

`equals` is used to compare equality between two instances of `DurableObjectId`.

```js
const id1 = env.MY_DURABLE_OBJECT.newUniqueId();
const id2 = env.MY_DURABLE_OBJECT.newUniqueId();
console.assert(!id1.equals(id2), "Different unique ids should never be equal.");
```

#### Parameters

* A required `DurableObjectId` to compare against.

#### Return values

* A boolean. True if equal and false otherwise.

## Properties

### `name`

`name` is an optional property of a `DurableObjectId`, which returns the name that was used to create the `DurableObjectId` via [`DurableObjectNamespace::idFromName`](https://developers.cloudflare.com/durable-objects/api/namespace/#idfromname). This value is undefined if the `DurableObjectId` was constructed using [`DurableObjectNamespace::newUniqueId`](https://developers.cloudflare.com/durable-objects/api/namespace/#newuniqueid).

```js
const uniqueId = env.MY_DURABLE_OBJECT.newUniqueId();
const fromNameId = env.MY_DURABLE_OBJECT.idFromName("foo");
console.assert(uniqueId.name === undefined, "unique ids have no name");
console.assert(
  fromNameId.name === "foo",
  "name matches parameter to idFromName",
);
```

## Related resources

* [Durable Objects: Easy, Fast, Correct – Choose Three](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

</page>

<page>
---
title: Durable Object Namespace · Cloudflare Durable Objects docs
description: A Durable Object namespace is a set of Durable Objects that are
  backed by the same Durable Object class. There is only one Durable Object
  namespace per class. A Durable Object namespace can contain any number of
  Durable Objects.
lastUpdated: 2025-02-12T13:41:31.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/api/namespace/
  md: https://developers.cloudflare.com/durable-objects/api/namespace/index.md
---

## Description

A Durable Object namespace is a set of Durable Objects that are backed by the same Durable Object class. There is only one Durable Object namespace per class. A Durable Object namespace can contain any number of Durable Objects.

The `DurableObjectNamespace` interface is used to obtain a reference to new or existing Durable Objects. The interface is accessible from the fetch handler on a Cloudflare Worker via the `env` parameter, which is the standard interface when referencing bindings declared in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).

This interface defines several [methods](https://developers.cloudflare.com/durable-objects/api/namespace/#methods) that can be used to create an ID for a Durable Object. Note that creating an ID for a Durable Object does not create the Durable Object. The Durable Object is created lazily after calling [`DurableObjectNamespace::get`](https://developers.cloudflare.com/durable-objects/api/namespace/#get) to create a [`DurableObjectStub`](https://developers.cloudflare.com/durable-objects/api/stub) from a `DurableObjectId`. This ensures that objects are not constructed until they are actually accessed.

* JavaScript

  ```js
  import { DurableObject } from "cloudflare:workers";


  // Durable Object
  export class MyDurableObject extends DurableObject {
    ...
  }


  // Worker
  export default {
    async fetch(request, env) {
      // Every unique ID refers to an individual instance of the Durable Object class
      const id = env.MY_DURABLE_OBJECT.idFromName("foo");


      // A stub is a client Object used to invoke methods defined by the Durable Object
      const stub = env.MY_DURABLE_OBJECT.get(id);
      ...
    }
  }
  ```

* TypeScript

  ```ts
  import { DurableObject } from "cloudflare:workers";


  export interface Env {
    MY_DURABLE_OBJECT: DurableObjectNamespace<MyDurableObject>;
  }


  // Durable Object
  export class MyDurableObject extends DurableObject {
    ...
  }


  // Worker
  export default {
    async fetch(request, env) {
      // Every unique ID refers to an individual instance of the Durable Object class
      const id = env.MY_DURABLE_OBJECT.idFromName("foo");


      // A stub is a client Object used to invoke methods defined by the Durable Object
      const stub = env.MY_DURABLE_OBJECT.get(id);
      ...
    }
  } satisfies ExportedHandler<Env>;
  ```

## Methods

### `idFromName`

`idFromName` creates a unique [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) which refers to an individual instance of the Durable Object class. Named Durable Objects are the most common method of referring to Durable Objects.

```js
const fooId = env.MY_DURABLE_OBJECT.idFromName("foo");
const barId = env.MY_DURABLE_OBJECT.idFromName("bar");
```

#### Parameters

* A required string to be used to generate a [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) corresponding to the name of a Durable Object.

#### Return values

* A [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) referring to an instance of a Durable Object class.

### `newUniqueId`

`newUniqueId` creates a randomly generated and unique [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) which refers to an individual instance of the Durable Object class. IDs created using `newUniqueId`, will need to be stored as a string in order to refer to the same Durable Object again in the future. For example, the ID can be stored in Workers KV, another Durable Object, or in a cookie in the user's browser.

```js
const id = env.MY_DURABLE_OBJECT.newUniqueId();
const euId = env.MY_DURABLE_OBJECT.newUniqueId({ jurisdiction: "eu" });
```

`newUniqueId` results in lower request latency at first use

The first time you get a Durable Object stub based on an ID derived from a name, the system has to take into account the possibility that a Worker on the opposite side of the world could have coincidentally accessed the same named Durable Object at the same time. To guarantee that only one instance of the Durable Object is created, the system must check that the Durable Object has not been created anywhere else. Due to the inherent limit of the speed of light, this round-the-world check can take up to a few hundred milliseconds. `newUniqueId` can skip this check.

After this first use, the location of the Durable Object will be cached around the world so that subsequent lookups are faster.

#### Parameters

* An optional object with the key `jurisdiction` and value of a [jurisdiction](https://developers.cloudflare.com/durable-objects/reference/data-location/#restrict-durable-objects-to-a-jurisdiction) string.

#### Return values

* A [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) referring to an instance of the Durable Object class.

### `idFromString`

`idFromString` creates a [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) from a previously generated ID that has been converted to a string. This method throws an exception if the ID is invalid, for example, if the ID was not created from the same `DurableObjectNamespace`.

```js
// Create a new unique ID
const id = env.MY_DURABLE_OBJECT.newUniqueId();
// Convert the ID to a string to be saved elsewhere, e.g. a session cookie
const session_id = id.toString();


...
// Recreate the ID from the string
const id = env.MY_DURABLE_OBJECT.idFromString(session_id);
```

#### Parameters

* A required string corresponding to a [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) previously generated either by `newUniqueId` or `idFromName`.

#### Return values

* A [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) referring to an instance of a Durable Object class.

### `get`

`get` obtains a [`DurableObjectStub`](https://developers.cloudflare.com/durable-objects/api/stub) from a [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) which can be used to invoke methods on a Durable Object.

This method returns the stub immediately, often before a connection has been established to the Durable Object. This allows requests to be sent to the instance right away, without waiting for a network round trip.

```js
const id = env.MY_DURABLE_OBJECT.newUniqueId();
const stub = env.MY_DURABLE_OBJECT.get(id);
```

#### Parameters

* A required [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id)
* An optional object with the key `locationHint` and value of a [locationHint](https://developers.cloudflare.com/durable-objects/reference/data-location/#provide-a-location-hint) string.

#### Return values

* A [`DurableObjectStub`](https://developers.cloudflare.com/durable-objects/api/stub) referring to an instance of a Durable Object class.

### `jurisdiction`

`jurisdiction` creates a subnamespace from a namespace where all Durable Object IDs and references created from that subnamespace will be restricted to the specified [jurisdiction](https://developers.cloudflare.com/durable-objects/reference/data-location/#restrict-durable-objects-to-a-jurisdiction).

```js
const subnamespace = env.MY_DURABLE_OBJECT.jurisdiction("foo");
const euId = subnamespace.idFromName("foo");
```

#### Parameters

* A required [jurisdiction](https://developers.cloudflare.com/durable-objects/reference/data-location/#restrict-durable-objects-to-a-jurisdiction) string.

#### Return values

* A `DurableObjectNamespace` scoped to a particular geographic jurisdiction.

## Related resources

* [Durable Objects: Easy, Fast, Correct – Choose Three](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

</page>

<page>
---
title: Durable Object State · Cloudflare Durable Objects docs
description: The DurableObjectState interface is accessible as an instance
  property on the Durable Object class. This interface encapsulates methods that
  modify the state of a Durable Object, for example which WebSockets are
  attached to a Durable Object or how the runtime should handle concurrent
  Durable Object requests.
lastUpdated: 2025-06-26T11:08:06.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/api/state/
  md: https://developers.cloudflare.com/durable-objects/api/state/index.md
---

## Description

The `DurableObjectState` interface is accessible as an instance property on the Durable Object class. This interface encapsulates methods that modify the state of a Durable Object, for example which WebSockets are attached to a Durable Object or how the runtime should handle concurrent Durable Object requests.

The `DurableObjectState` interface is different from the Storage API in that it does not have top-level methods which manipulate persistent application data. These methods are instead encapsulated in the [`DurableObjectStorage`](https://developers.cloudflare.com/durable-objects/api/storage-api) interface and accessed by [`DurableObjectState::storage`](https://developers.cloudflare.com/durable-objects/api/state/#storage).

* JavaScript

  ```js
  import { DurableObject } from "cloudflare:workers";


  // Durable Object
  export class MyDurableObject extends DurableObject {
    // DurableObjectState is accessible via the ctx instance property
    constructor(ctx, env) {
      super(ctx, env);
    }
    ...
  }
  ```

* TypeScript

  ```ts
  import { DurableObject } from "cloudflare:workers";


  export interface Env {
    MY_DURABLE_OBJECT: DurableObjectNamespace<MyDurableObject>;
  }


  // Durable Object
  export class MyDurableObject extends DurableObject {
    // DurableObjectState is accessible via the ctx instance property
    constructor(ctx: DurableObjectState, env: Env) {
      super(ctx, env);
    }
    ...
  }
  ```

## Methods

### `waitUntil`

`waitUntil` waits until the promise which is passed as a parameter resolves and can extend a request context up to 30 seconds after the last client disconnects.

`waitUntil` is not necessary

A Durable Object will remain active for at least 70 seconds after the last client disconnects if the Durable Object is still waiting on any ongoing work or outbound I/O. So `waitUntil` is not necessary. It remains part of the `DurableObjectState` interface to remain compatible with [Workers Runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil).

#### Parameters

* A required promise of any type.

#### Return values

* None.

### `blockConcurrencyWhile`

`blockConcurrencyWhile` executes an async callback while blocking any other events from being delivered to the Durable Object until the callback completes. This method guarantees ordering and prevents concurrent requests. All events that were not explicitly initiated as part of the callback itself will be blocked. Once the callback completes, all other events will be delivered.

* `blockConcurrencyWhile` is commonly used within the constructor of the Durable Object class to enforce initialization to occur before any requests are delivered.
* Another use case is executing `async` operations based on the current state of the Durable Object and using `blockConcurrencyWhile` to prevent that state from changing while yielding the event loop.
* If the callback throws an exception, the object will be terminated and reset. This ensures that the object cannot be left stuck in an uninitialized state if something fails unexpectedly.
* To avoid this behavior, enclose the body of your callback in a `try...catch` block to ensure it cannot throw an exception.

To help mitigate deadlocks there is a 30 second timeout applied when executing the callback. If this timeout is exceeded, the Durable Object will be reset. It is best practice to have the callback do as little work as possible to improve overall request throughput to the Durable Object.

Note

You should only need `blockConcurrencyWhile` if you are making additional, asynchronous calls (such as to another API or service), and cannot tolerate other requests processed by the Durable Object changing its internal while the event loop is yielded from the original request.

In practice, this is quite rare, and most use cases do not need `blockConcurrencyWhile`.

```js
// Durable Object
export class MyDurableObject extends DurableObject {
  initialized = false;


  constructor(ctx, env) {
    super(ctx, env);


    // blockConcurrencyWhile will ensure that initialized will always be true
    this.ctx.blockConcurrencyWhile(async () => {
      this.initialized = true;
    });
  }
  ...
}
```

#### Parameters

* A required callback which returns a `Promise<T>`.

#### Return values

* A `Promise<T>` returned by the callback.

### `acceptWebSocket`

`acceptWebSocket` is part of the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#websocket-hibernation-api), which allows a Durable Object to be removed from memory to save costs while keeping its WebSockets connected.

`acceptWebSocket` adds a WebSocket to the set of WebSockets attached to the Durable Object. Once called, any incoming messages will be delivered by calling the Durable Object's `webSocketMessage` handler, and `webSocketClose` will be invoked upon disconnect. After calling `acceptWebSocket`, the WebSocket is accepted and its `send` and `close` methods can be used.

The [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#websocket-hibernation-api) takes the place of the standard [WebSockets API](https://developers.cloudflare.com/workers/runtime-apis/websockets/). Therefore, `ws.accept` must not have been called separately and `ws.addEventListener` method will not receive events as they will instead be delivered to the Durable Object.

The WebSocket Hibernation API permits a maximum of 32,768 WebSocket connections per Durable Object, but the CPU and memory usage of a given workload may further limit the practical number of simultaneous connections.

#### Parameters

* A required `WebSocket` with name `ws`.
* An optional `Array<string>` of associated tags. Tags can be used to retrieve WebSockets via [`DurableObjectState::getWebSockets`](https://developers.cloudflare.com/durable-objects/api/state/#getwebsockets). Each tag is a maximum of 256 characters and there can be at most 10 tags associated with a WebSocket.

#### Return values

* None.

### `getWebSockets`

`getWebSockets` is part of the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#websocket-hibernation-api), which allows a Durable Object to be removed from memory to save costs while keeping its WebSockets connected.

`getWebSockets` returns an `Array<WebSocket>` which is the set of WebSockets attached to the Durable Object. An optional tag argument can be used to filter the list according to tags supplied when calling [`DurableObjectState::acceptWebSocket`](https://developers.cloudflare.com/durable-objects/api/state/#acceptwebsocket).

`waitUntil` is not necessary

Disconnected WebSockets are not returned by this method, but `getWebSockets` may still return WebSockets even after `ws.close` has been called. For example, if the server-side WebSocket sends a close, but does not receive one back (and has not detected a disconnect from the client), then the connection is in the CLOSING 'readyState'. The client might send more messages, so the WebSocket is technically not disconnected.

#### Parameters

* An optional tag of type `string`.

#### Return values

* An `Array<WebSocket>`.

### `setWebSocketAutoResponse`

`setWebSocketAutoResponse` is part of the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#websocket-hibernation-api), which allows a Durable Object to be removed from memory to save costs while keeping its WebSockets connected.

`setWebSocketAutoResponse` sets an automatic response, auto-response, for the request provided for all WebSockets attached to the Durable Object. If a request is received matching the provided request then the auto-response will be returned without waking WebSockets in hibernation and incurring billable duration charges.

`setWebSocketAutoResponse` is a common alternative to setting up a server for static ping/pong messages because this can be handled without waking hibernating WebSockets.

#### Parameters

* An optional `WebSocketRequestResponsePair(request string, response string)` enabling any WebSocket accepted via [`DurableObjectState::acceptWebSocket`](https://developers.cloudflare.com/durable-objects/api/state/#acceptwebsocket) to automatically reply to the provided response when it receives the provided request. Both request and response are limited to 2,048 characters each. If the parameter is omitted, any previously set auto-response configuration will be removed. [`DurableObjectState::getWebSocketAutoResponseTimestamp`](https://developers.cloudflare.com/durable-objects/api/state/#getwebsocketautoresponsetimestamp) will still reflect the last timestamp that an auto-response was sent.

#### Return values

* None.

### `getWebSocketAutoResponse`

`getWebSocketAutoResponse` returns the `WebSocketRequestResponsePair` object last set by [`DurableObjectState::setWebSocketAutoResponse`](https://developers.cloudflare.com/durable-objects/api/state/#setwebsocketautoresponse), or null if not auto-response has been set.

inspect `WebSocketRequestResponsePair`

`WebSocketRequestResponsePair` can be inspected further by calling `getRequest` and `getResponse` methods.

#### Parameters

* None.

#### Return values

* A `WebSocketRequestResponsePair` or null.

### `getWebSocketAutoResponseTimestamp`

`getWebSocketAutoResponseTimestamp` is part of the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#websocket-hibernation-api), which allows a Durable Object to be removed from memory to save costs while keeping its WebSockets connected.

`getWebSocketAutoResponseTimestamp` gets the most recent `Date` on which the given WebSocket sent an auto-response, or null if the given WebSocket never sent an auto-response.

#### Parameters

* A required `WebSocket`.

#### Return values

* A `Date` or null.

### `setHibernatableWebSocketEventTimeout`

`setHibernatableWebSocketEventTimeout` is part of the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#websocket-hibernation-api), which allows a Durable Object to be removed from memory to save costs while keeping its WebSockets connected.

`setHibernatableWebSocketEventTimeout` sets the maximum amount of time in milliseconds that a WebSocket event can run for.

If no parameter or a parameter of `0` is provided and a timeout has been previously set, then the timeout will be unset. The maximum value of timeout is 604,800,000 ms (7 days).

#### Parameters

* An optional `number`.

#### Return values

* None.

### `getHibernatableWebSocketEventTimeout`

`getHibernatableWebSocketEventTimeout` is part of the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#websocket-hibernation-api), which allows a Durable Object to be removed from memory to save costs while keeping its WebSockets connected.

`getHibernatableWebSocketEventTimeout` gets the currently set hibernatable WebSocket event timeout if one has been set via [`DurableObjectState::setHibernatableWebSocketEventTimeout`](https://developers.cloudflare.com/durable-objects/api/state/#sethibernatablewebsocketeventtimeout).

#### Parameters

* None.

#### Return values

* A number, or null if the timeout has not been set.

### `getTags`

`getTags` is part of the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#websocket-hibernation-api), which allows a Durable Object to be removed from memory to save costs while keeping its WebSockets connected.

`getTags` returns tags associated with a given WebSocket. This method throws an exception if the WebSocket has not been associated with the Durable Object via [`DurableObjectState::acceptWebSocket`](https://developers.cloudflare.com/durable-objects/api/state/#acceptwebsocket).

#### Parameters

* A required `WebSocket`.

#### Return values

* An `Array<string>` of tags.

### `abort`

`abort` is used to forcibly reset a Durable Object. A JavaScript `Error` with the message passed as a parameter will be logged. This error is not able to be caught within the application code.

```js
// Durable Object
export class MyDurableObject extends DurableObject {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }


  async sayHello() {
    // Error: Hello, World! will be logged
    this.ctx.abort("Hello, World!");
  }
}
```

Not available in local development

`abort` is not available in local development with the `wrangler dev` CLI command.

#### Parameters

* An optional `string` .

#### Return values

* None.

## Properties

### `id`

`id` is a readonly property of type `DurableObjectId` corresponding to the [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) of the Durable Object.

### `storage`

`storage` is a readonly property of type `DurableObjectStorage` encapsulating the [Storage API](https://developers.cloudflare.com/durable-objects/api/storage-api).

## Related resources

* [Durable Objects: Easy, Fast, Correct – Choose Three](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

</page>

<page>
---
title: Durable Object Storage · Cloudflare Durable Objects docs
description: The Durable Object Storage API allows Durable Objects to access
  transactional and strongly consistent storage. A Durable Object's attached
  storage is private to its unique instance and cannot be accessed by other
  objects.
lastUpdated: 2025-06-12T16:32:08.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/api/storage-api/
  md: https://developers.cloudflare.com/durable-objects/api/storage-api/index.md
---

The Durable Object Storage API allows Durable Objects to access transactional and strongly consistent storage. A Durable Object's attached storage is private to its unique instance and cannot be accessed by other objects.

The Durable Object Storage API comes with several methods, including SQL, point-in-time recovery (PITR), key-value (KV), and alarm APIs. Available API methods depend on the storage backend for a Durable Objects class, either [SQLite](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class) or [KV](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-durable-object-class-with-key-value-storage).

| Methods 1 | SQLite-backed Durable Object class | KV-backed Durable Object class |
| - | - | - |
| SQL API | ✅ | ❌ |
| PITR API | ✅ | ❌ |
| KV API | ✅ 2, 3 | ✅ |
| Alarms API | ✅ | ✅ |

Footnotes

1 Each method is implicitly wrapped inside a transaction, such that its results are atomic and isolated from all other storage operations, even when accessing multiple key-value pairs.

2 KV API methods like `get()`, `put()`, `delete()`, or `list()` store data in a hidden SQLite table.

3 KV methods which were previously asynchronous with KV storage (for example, [`get`](https://developers.cloudflare.com/durable-objects/api/storage-api/#get), [`put`](https://developers.cloudflare.com/durable-objects/api/storage-api/#put), [`delete`](https://developers.cloudflare.com/durable-objects/api/storage-api/#delete), [`deleteAll`](https://developers.cloudflare.com/durable-objects/api/storage-api/#deleteall), [`list`](https://developers.cloudflare.com/durable-objects/api/storage-api/#list)) are synchronous, even though they return promises. These methods will have completed their operations before they return the promise.

Recommended SQLite-backed Durable Objects

Cloudflare recommends all new Durable Object namespaces use the [SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class). These Durable Objects can continue to use storage [key-value API](https://developers.cloudflare.com/durable-objects/api/storage-api/#kv-api).

Additionally, SQLite-backed Durable Objects allow you to store more types of data (such as tables), and offers Point In Time Recovery API which can restore a Durable Object's embedded SQLite database contents (both SQL data and key-value data) to any point in the past 30 days.

The [key-value storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-durable-object-class-with-key-value-storage) remains for backwards compatibility, and a migration path from KV storage backend to SQLite storage backend for existing Durable Object namespaces will be available in the future.

Storage billing on SQLite-backed Durable Objects

Storage billing is not yet enabled for Durable Object classes using the SQLite storage backend. SQLite-backed Durable Objects will incur [charges for requests and duration](https://developers.cloudflare.com/durable-objects/platform/pricing/#compute-billing). Storage billing for SQLite-backed Durable Objects will be enabled at a later date with advance notice with the [shared pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/#sqlite-storage-backend).

## Access storage

Durable Objects gain access to Storage API via the `DurableObjectStorage` interface and accessed by the `DurableObjectState::storage` property. This is frequently accessed via `this.ctx.storage` with the `ctx` parameter passed to the Durable Object constructor.

The following code snippet shows you how to store and retrieve data using the Durable Object Storage API.

* JavaScript

  ```js
  export class Counter extends DurableObject {
    constructor(ctx, env) {
      super(ctx, env);
    }


    async increment() {
      let value = (await this.ctx.storage.get("value")) || 0;
      value += 1;
      await this.ctx.storage.put("value", value);
      return value;
    }
  }
  ```

* TypeScript

  ```ts
  export class Counter extends DurableObject {
    constructor(ctx: DurableObjectState, env: Env) {
      super(ctx, env);
    }


      async increment(): Promise<number> {
        let value: number = (await this.ctx.storage.get('value')) || 0;
        value += 1;
        await this.ctx.storage.put('value', value);
        return value;
      }


  }
  ```

JavaScript is a single-threaded and event-driven programming language. This means that JavaScript runtimes, by default, allow requests to interleave with each other which can lead to concurrency bugs. The Durable Objects runtime uses a combination of input gates and output gates to avoid this type of concurrency bug when performing storage operations. Learn more in our [blog post](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

## SQL API

The `SqlStorage` interface encapsulates methods that modify the SQLite database embedded within a Durable Object. The `SqlStorage` interface is accessible via the [`sql` property](https://developers.cloudflare.com/durable-objects/api/storage-api/#sql) of `DurableObjectStorage` class.

For example, using `sql.exec()`, a user can create a table, then insert rows into the table.

```ts
import { DurableObject } from "cloudflare:workers";


export class MyDurableObject extends DurableObject {
  sql: SqlStorage;
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;


    this.sql.exec(`CREATE TABLE IF NOT EXISTS artist(
      artistid    INTEGER PRIMARY KEY,
      artistname  TEXT
    );INSERT INTO artist (artistid, artistname) VALUES
      (123, 'Alice'),
      (456, 'Bob'),
      (789, 'Charlie');`
    );
  }
}
```

* SQL API methods accessed with `ctx.storage.sql` are only allowed on [Durable Object classes with SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class) and will return an error if called on Durable Object classes with a key-value storage backend.
* When writing data, every index counts as an additional row. However, indexes may be beneficial for read-heavy use cases. Refer to [Index for SQLite Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#index-for-sqlite-durable-objects).
* Writing data to [SQLite virtual tables](https://www.sqlite.org/vtab.html) also counts towards rows written.

### `exec`

`exec(query: string, ...bindings: any[])`: SqlStorageCursor

#### Parameters

* `query`: string
  * The SQL query string to be executed. `query` can contain `?` placeholders for parameter bindings. Multiple SQL statements, separated with a semicolon, can be executed in the `query`. With multiple SQL statements, any parameter bindings are applied to the last SQL statement in the `query`, and the returned cursor is only for the last SQL statement.
* `...bindings`: any\[] Optional
  * Optional variable number of arguments that correspond to the `?` placeholders in `query`.

#### Returns

A cursor (`SqlStorageCursor`) to iterate over query row results as objects. `SqlStorageCursor` is a JavaScript [Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol), which supports iteration using `for (let row of cursor)`. `SqlStorageCursor` is also a JavaScript [Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol), which supports iteration using `cursor.next()`.

`SqlStorageCursor` supports the following methods:

* `next()`
  * Returns an object representing the next value of the cursor. The returned object has `done` and `value` properties adhering to the JavaScript [Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol). `done` is set to `false` when a next value is present, and `value` is set to the next row object in the query result. `done` is set to `true` when the entire cursor is consumed, and no `value` is set.

* `toArray()`
  * Iterates through remaining cursor value(s) and returns an array of returned row objects.

* `one()`
  * Returns a row object if query result has exactly one row. If query result has zero rows or more than one row, `one()` throws an exception.

* `raw()`: Iterator

  * Returns an Iterator over the same query results, with each row as an array of column values (with no column names) rather than an object.
  * Returned Iterator supports `next()` and `toArray()` methods above.
  * Returned cursor and `raw()` iterator iterate over the same query results and can be combined. For example:

```ts
let cursor = this.sql.exec("SELECT * FROM artist ORDER BY artistname ASC;");
let rawResult = cursor.raw().next();


if (!rawResult.done) {
  console.log(rawResult.value); // prints [ 123, 'Alice' ]
} else {
  // query returned zero results
}


console.log(cursor.toArray()); // prints [{ artistid: 456, artistname: 'Bob' },{ artistid: 789, artistname: 'Charlie' }]
```

`SqlStorageCursor` has the following properties:

* `columnNames`: string\[]
  * The column names of the query in the order they appear in each row array returned by the `raw` iterator.
* `rowsRead`: number
  * The number of rows read so far as part of this SQL `query`. This may increase as you iterate the cursor. The final value is used for [SQL billing](https://developers.cloudflare.com/durable-objects/platform/pricing/#sqlite-storage-backend).
* `rowsWritten`: number
  * The number of rows written so far as part of this SQL `query`. This may increase as you iterate the cursor. The final value is used for [SQL billing](https://developers.cloudflare.com/durable-objects/platform/pricing/#sqlite-storage-backend).
* Any numeric value in a column is affected by JavaScript's 52-bit precision for numbers. If you store a very large number (in `int64`), then retrieve the same value, the returned value may be less precise than your original number.

SQL transactions

Note that `sql.exec()` cannot execute transaction-related statements like `BEGIN TRANSACTION` or `SAVEPOINT`. Instead, use the [`ctx.storage.transaction()`](https://developers.cloudflare.com/durable-objects/api/storage-api/#transaction) or [`ctx.storage.transactionSync()`](https://developers.cloudflare.com/durable-objects/api/storage-api/#transactionsync) APIs to start a transaction, and then execute SQL queries in your callback.

#### Examples

[SQL API](https://developers.cloudflare.com/durable-objects/api/storage-api/#exec) examples below use the following SQL schema:

```ts
import { DurableObject } from "cloudflare:workers";


export class MyDurableObject extends DurableObject {
  sql: SqlStorage
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;


    this.sql.exec(`CREATE TABLE IF NOT EXISTS artist(
      artistid    INTEGER PRIMARY KEY,
      artistname  TEXT
    );INSERT INTO artist (artistid, artistname) VALUES
      (123, 'Alice'),
      (456, 'Bob'),
      (789, 'Charlie');`
    );
  }
}
```

Iterate over query results as row objects:

```ts
  let cursor = this.sql.exec("SELECT * FROM artist;");


  for (let row of cursor) {
    // Iterate over row object and do something
  }
```

Convert query results to an array of row objects:

```ts
  // Return array of row objects: [{"artistid":123,"artistname":"Alice"},{"artistid":456,"artistname":"Bob"},{"artistid":789,"artistname":"Charlie"}]
  let resultsArray1 = this.sql.exec("SELECT * FROM artist;").toArray();
  // OR
  let resultsArray2 = Array.from(this.sql.exec("SELECT * FROM artist;"));
  // OR
  let resultsArray3 = [...this.sql.exec("SELECT * FROM artist;")]; // JavaScript spread syntax
```

Convert query results to an array of row values arrays:

```ts
  // Returns [[123,"Alice"],[456,"Bob"],[789,"Charlie"]]
  let cursor = this.sql.exec("SELECT * FROM artist;");
  let resultsArray = cursor.raw().toArray();


  // Returns ["artistid","artistname"]
  let columnNameArray = this.sql.exec("SELECT * FROM artist;").columnNames.toArray();
```

Get first row object of query results:

```ts
  // Returns {"artistid":123,"artistname":"Alice"}
  let firstRow = this.sql.exec("SELECT * FROM artist ORDER BY artistname DESC;").toArray()[0];
```

Check if query results have exactly one row:

```ts
  // returns error
  this.sql.exec("SELECT * FROM artist ORDER BY artistname ASC;").one();


  // returns { artistid: 123, artistname: 'Alice' }
  let oneRow = this.sql.exec("SELECT * FROM artist WHERE artistname = ?;", "Alice").one()
```

Returned cursor behavior:

```ts
  let cursor = this.sql.exec("SELECT * FROM artist ORDER BY artistname ASC;");
  let result = cursor.next();
  if (!result.done) {
    console.log(result.value); // prints { artistid: 123, artistname: 'Alice' }
  } else {
    // query returned zero results
  }


  let remainingRows = cursor.toArray();
  console.log(remainingRows); // prints [{ artistid: 456, artistname: 'Bob' },{ artistid: 789, artistname: 'Charlie' }]
```

Returned cursor and `raw()` iterator iterate over the same query results:

```ts
  let cursor = this.sql.exec("SELECT * FROM artist ORDER BY artistname ASC;");
  let result = cursor.raw().next();


  if (!result.done) {
    console.log(result.value); // prints [ 123, 'Alice' ]
  } else {
    // query returned zero results
  }


  console.log(cursor.toArray()); // prints [{ artistid: 456, artistname: 'Bob' },{ artistid: 789, artistname: 'Charlie' }]
```

`sql.exec().rowsRead()`:

```ts
  let cursor = this.sql.exec("SELECT * FROM artist;");
  cursor.next()
  console.log(cursor.rowsRead); // prints 1


  cursor.toArray(); // consumes remaining cursor
  console.log(cursor.rowsRead); // prints 3
```

### `databaseSize`

`databaseSize`: number

#### Returns

The current SQLite database size in bytes.

```ts
let size = ctx.storage.sql.databaseSize;
```

## PITR (Point In Time Recovery) API

For [SQLite-backed Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class), the following point-in-time-recovery (PITR) API methods are available to restore a Durable Object's embedded SQLite database to any point in time in the past 30 days. These methods apply to the entire SQLite database contents, including both the object's stored SQL data and stored key-value data using the key-value `put()` API. The PITR API is not supported in local development because a durable log of data changes is not stored locally.

The PITR API represents points in time using 'bookmarks'. A bookmark is a mostly alphanumeric string like `0000007b-0000b26e-00001538-0c3e87bb37b3db5cc52eedb93cd3b96b`. Bookmarks are designed to be lexically comparable: a bookmark representing an earlier point in time compares less than one representing a later point, using regular string comparison.

### `getCurrentBookmark`

`ctx.storage.getCurrentBookmark()`: Promise\<string>

* Returns a bookmark representing the current point in time in the object's history.

### `getBookmarkForTime`

`ctx.storage.getBookmarkForTime(timestamp: number | Date)`: Promise\<string>

* Returns a bookmark representing approximately the given point in time, which must be within the last 30 days. If the timestamp is represented as a number, it is converted to a date as if using `new Date(timestamp)`.

### `onNextSessionRestoreBookmark`

`ctx.storage.onNextSessionRestoreBookmark(bookmark: string)`: Promise\<string>

* Configures the Durable Object so that the next time it restarts, it should restore its storage to exactly match what the storage contained at the given bookmark. After calling this, the application should typically invoke `ctx.abort()` to restart the Durable Object, thus completing the point-in-time recovery.

This method returns a special bookmark representing the point in time immediately before the recovery takes place (even though that point in time is still technically in the future). Thus, after the recovery completes, it can be undone by performing a second recovery to this bookmark.

```ts
let now = new Date();
// restore to 2 days ago
let bookmark = ctx.storage.getBookmarkForTime(now - 2);
ctx.storage.onNextSessionRestoreBookmark(bookmark);
```

## KV API

### `get`

* `get(key string, options Object optional)`: Promise\<any>

  * Retrieves the value associated with the given key. The type of the returned value will be whatever was previously written for the key, or undefined if the key does not exist.

* `get(keys Array<string>, options Object optional)`: Promise\<Map\<string, any>>

  * Retrieves the values associated with each of the provided keys. The type of each returned value in the [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) will be whatever was previously written for the corresponding key. Results in the `Map` will be sorted in increasing order of their UTF-8 encodings, with any requested keys that do not exist being omitted. Supports up to 128 keys at a time.

#### Supported options

* `allowConcurrency`: boolean

  * By default, the system will pause delivery of I/O events to the Object while a storage operation is in progress, in order to avoid unexpected race conditions. Pass `allowConcurrency: true` to opt out of this behavior and allow concurrent events to be delivered.

* `noCache`: boolean

  * If true, then the key/value will not be inserted into the in-memory cache. If the key is already in the cache, the cached value will be returned, but its last-used time will not be updated. Use this when you expect this key will not be used again in the near future. This flag is only a hint. This flag will never change the semantics of your code, but it may affect performance.

### `put`

* `put(key string, value any, options Object optional)`: Promise

  * Stores the value and associates it with the given key. The value can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which is true of most types.

    The size of keys and values have different limits depending on the Durable Object storage backend you are using. Refer to either:

    * [SQLite-backed Durable Object limits](https://developers.cloudflare.com/durable-objects/platform/limits/#sqlite-backed-durable-objects-general-limits)
    * [KV-backed Durable Object limits](https://developers.cloudflare.com/durable-objects/platform/limits/#key-value-backed-durable-objects-general-limits).

* `put(entries Object, options Object optional)`: Promise

  * Takes an Object and stores each of its keys and values to storage.

  * Each value can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which is true of most types.

  * Supports up to 128 key-value pairs at a time. The size of keys and values have different limits depending on the flavor of Durable Object you are using. Refer to either:

    * [SQLite-backed Durable Object limits](https://developers.cloudflare.com/durable-objects/platform/limits/#sqlite-backed-durable-objects-general-limits)
    * [KV-backed Durable Object limits](https://developers.cloudflare.com/durable-objects/platform/limits/#key-value-backed-durable-objects-general-limits)

### `delete`

* `delete(key string, options Object optional)`: Promise\<boolean>

  * Deletes the key and associated value. Returns `true` if the key existed or `false` if it did not.

* `delete(keys Array<string>, options Object optional)`: Promise\<number>

  * Deletes the provided keys and their associated values. Supports up to 128 keys at a time. Returns a count of the number of key-value pairs deleted.

#### Supported options

* `put()`, `delete()` and `deleteAll()` support the following options:

* `allowUnconfirmed` boolean

  * By default, the system will pause outgoing network messages from the Durable Object until all previous writes have been confirmed flushed to disk. If the write fails, the system will reset the Object, discard all outgoing messages, and respond to any clients with errors instead.

  * This way, Durable Objects can continue executing in parallel with a write operation, without having to worry about prematurely confirming writes, because it is impossible for any external party to observe the Object's actions unless the write actually succeeds.

  * After any write, subsequent network messages may be slightly delayed. Some applications may consider it acceptable to communicate on the basis of unconfirmed writes. Some programs may prefer to allow network traffic immediately. In this case, set `allowUnconfirmed` to `true` to opt out of the default behavior.

  * If you want to allow some outgoing network messages to proceed immediately but not others, you can use the allowUnconfirmed option to avoid blocking the messages that you want to proceed and then separately call the [`sync()`](https://developers.cloudflare.com/durable-objects/api/storage-api/#sync) method, which returns a promise that only resolves once all previous writes have successfully been persisted to disk.

* `noCache` boolean

  * If true, then the key/value will be discarded from memory as soon as it has completed writing to disk.

  * Use `noCache` if the key will not be used again in the near future. `noCache` will never change the semantics of your code, but it may affect performance.

  * If you use `get()` to retrieve the key before the write has completed, the copy from the write buffer will be returned, thus ensuring consistency with the latest call to `put()`.

Automatic write coalescing

If you invoke `put()` (or `delete()`) multiple times without performing any `await` in the meantime, the operations will automatically be combined and submitted atomically. In case of a machine failure, either all of the writes will have been stored to disk or none of the writes will have been stored to disk.

Write buffer behavior

The `put()` method returns a `Promise`, but most applications can discard this promise without using `await`. The `Promise` usually completes immediately, because `put()` writes to an in-memory write buffer that is flushed to disk asynchronously. However, if an application performs a large number of `put()` without waiting for any I/O, the write buffer could theoretically grow large enough to cause the isolate to exceed its 128 MB memory limit. To avoid this scenario, such applications should use `await` on the `Promise` returned by `put()`. The system will then apply backpressure onto the application, slowing it down so that the write buffer has time to flush. Using `await` will disable automatic write coalescing.

### `list`

* `list(options Object optional)`: Promise\<Map\<string, any>>

  * Returns all keys and values associated with the current Durable Object in ascending sorted order based on the keys' UTF-8 encodings.

  * The type of each returned value in the [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) will be whatever was previously written for the corresponding key.

  * Be aware of how much data may be stored in your Durable Object before calling this version of `list` without options because all the data will be loaded into the Durable Object's memory, potentially hitting its [limit](https://developers.cloudflare.com/durable-objects/platform/limits/). If that is a concern, pass options to `list` as documented below.

#### Supported options

* `start` string

  * Key at which the list results should start, inclusive.

* `startAfter` string

  * Key after which the list results should start, exclusive. Cannot be used simultaneously with `start`.

* `end` string

  * Key at which the list results should end, exclusive.

* `prefix` string

  * Restricts results to only include key-value pairs whose keys begin with the prefix.

* `reverse` boolean

  * If true, return results in descending order instead of the default ascending order.
  * Enabling `reverse` does not change the meaning of `start`, `startKey`, or `endKey`. `start` still defines the smallest key in lexicographic order that can be returned (inclusive), effectively serving as the endpoint for a reverse-order list. `end` still defines the largest key in lexicographic order that the list should consider (exclusive), effectively serving as the starting point for a reverse-order list.

* `limit` number

  * Maximum number of key-value pairs to return.

* `allowConcurrency` boolean

  * Same as the option to `get()`, above.

* `noCache` boolean

  * Same as the option to `get()`, above.

## Alarms

### `getAlarm`

* `getAlarm(options Object optional)`: Promise\<Number | null>

  * Retrieves the current alarm time (if set) as integer milliseconds since epoch. The alarm is considered to be set if it has not started, or if it has failed and any retry has not begun. If no alarm is set, `getAlarm()` returns `null`.

#### Supported options

* Same options as [`get()`](https://developers.cloudflare.com/durable-objects/api/storage-api/#get), but without `noCache`.

### `setAlarm`

* `setAlarm(scheduledTime Date | number, options Object optional)`: Promise

  * Sets the current alarm time, accepting either a JavaScript `Date`, or integer milliseconds since epoch.

    If `setAlarm()` is called with a time equal to or before `Date.now()`, the alarm will be scheduled for asynchronous execution in the immediate future. If the alarm handler is currently executing in this case, it will not be canceled. Alarms can be set to millisecond granularity and will usually execute within a few milliseconds after the set time, but can be delayed by up to a minute due to maintenance or failures while failover takes place.

### `deleteAlarm`

* `deleteAlarm(options Object optional)`: Promise

  * Deletes the alarm if one exists. Does not cancel the alarm handler if it is currently executing.

#### Supported options

* `setAlarm()` and `deleteAlarm()` support the same options as [`put()`](https://developers.cloudflare.com/durable-objects/api/storage-api/#put), but without `noCache`.

## Other

### `deleteAll`

* `deleteAll(options Object optional)`: Promise

  * Deletes all stored data, effectively deallocating all storage used by the Durable Object. For Durable Objects with a key-value storage backend, `deleteAll()` removes all keys and associated values for an individual Durable Object. For Durable Objects with a [SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class), `deleteAll()` removes the entire contents of a Durable Object's private SQLite database, including both SQL data and key-value data.
  * For Durable Objects with a key-value storage backend, an in-progress `deleteAll()` operation can fail, which may leave a subset of data undeleted. Durable Objects with a SQLite storage backend do not have a partial `deleteAll()` issue because `deleteAll()` operations are atomic (all or nothing).
  * `deleteAll()` does not proactively delete [alarms](https://developers.cloudflare.com/durable-objects/api/alarms/). Use [`deleteAlarm()`](https://developers.cloudflare.com/durable-objects/api/alarms/#deletealarm) to delete an alarm.

### `transactionSync`

* `transactionSync(callback)`: any

  * Only available when using SQLite-backed Durable Objects.

  * Invokes `callback()` wrapped in a transaction, and returns its result.

  * If `callback()` throws an exception, the transaction will be rolled back.

  - The callback must complete synchronously, that is, it should not be declared `async` nor otherwise return a Promise. Only synchronous storage operations can be part of the transaction. This is intended for use with SQL queries using [`ctx.storage.sql.exec()`](https://developers.cloudflare.com/durable-objects/api/storage-api/#exec), which complete sychronously.

### `transaction`

* `transaction(closureFunction(txn))`: Promise

  * Runs the sequence of storage operations called on `txn` in a single transaction that either commits successfully or aborts.

  * Explicit transactions are no longer necessary. Any series of write operations with no intervening `await` will automatically be submitted atomically, and the system will prevent concurrent events from executing while `await` a read operation (unless you use `allowConcurrency: true`). Therefore, a series of reads followed by a series of writes (with no other intervening I/O) are automatically atomic and behave like a transaction.

* `txn`

  * Provides access to the `put()`, `get()`, `delete()` and `list()` methods documented above to run in the current transaction context. In order to get transactional behavior within a transaction closure, you must call the methods on the `txn` Object instead of on the top-level `ctx.storage` Object.\
    \
    Also supports a `rollback()` function that ensures any changes made during the transaction will be rolled back rather than committed. After `rollback()` is called, any subsequent operations on the `txn` Object will fail with an exception. `rollback()` takes no parameters and returns nothing to the caller.

  * When using [the SQLite-backed storage engine](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#sqlite-storage-backend), the `txn` object is obsolete. Any storage operations performed directly on the `ctx.storage` object, including SQL queries using [`ctx.storage.sql.exec()`](https://developers.cloudflare.com/durable-objects/api/storage-api/#exec), will be considered part of the transaction.

### `sync`

* `sync()`: Promise

  * Synchronizes any pending writes to disk.

  * This is similar to normal behavior from automatic write coalescing. If there are any pending writes in the write buffer (including those submitted with [the `allowUnconfirmed` option](https://developers.cloudflare.com/durable-objects/api/storage-api/#supported-options-1)), the returned promise will resolve when they complete. If there are no pending writes, the returned promise will be already resolved.

## Storage properties

### `sql`

`sql` is a readonly property of type `DurableObjectStorage` encapsulating the [SQL API](https://developers.cloudflare.com/durable-objects/api/storage-api/#sql-api).

## Related resources

* [Durable Objects: Easy, Fast, Correct – Choose Three](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/)
* [Zero-latency SQLite storage in every Durable Object blog](https://blog.cloudflare.com/sqlite-in-durable-objects/)
* [WebSockets API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/)

</page>

<page>
---
title: Durable Object Stub · Cloudflare Durable Objects docs
description: The DurableObjectStub interface is a client used to invoke methods
  on a remote Durable Object. The type of DurableObjectStub is generic to allow
  for RPC methods to be invoked on the stub.
lastUpdated: 2024-12-04T15:21:02.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/api/stub/
  md: https://developers.cloudflare.com/durable-objects/api/stub/index.md
---

## Description

The `DurableObjectStub` interface is a client used to invoke methods on a remote Durable Object. The type of `DurableObjectStub` is generic to allow for RPC methods to be invoked on the stub.

Durable Objects implement E-order semantics, a concept deriving from the [E distributed programming language](https://en.wikipedia.org/wiki/E_\(programming_language\)). When you make multiple calls to the same Durable Object, it is guaranteed that the calls will be delivered to the remote Durable Object in the order in which you made them. E-order semantics makes many distributed programming problems easier. E-order is implemented by the [Cap'n Proto](https://capnproto.org) distributed object-capability RPC protocol, which Cloudflare Workers uses for internal communications.

If an exception is thrown by a Durable Object stub all in-flight calls and future calls will fail with [exceptions](https://developers.cloudflare.com/durable-objects/observability/troubleshooting/). To continue invoking methods on a remote Durable Object a Worker must recreate the stub. There are no ordering guarantees between different stubs.

* JavaScript

  ```js
  import { DurableObject } from "cloudflare:workers";


  // Durable Object
  export class MyDurableObject extends DurableObject {
    constructor(ctx, env) {
      super(ctx, env);
    }


    async sayHello() {
      return "Hello, World!";
    }
  }


  // Worker
  export default {
    async fetch(request, env) {
      // Every unique ID refers to an individual instance of the Durable Object class
      const id = env.MY_DURABLE_OBJECT.idFromName("foo");


      // A stub is a client used to invoke methods on the Durable Object
      const stub = env.MY_DURABLE_OBJECT.get(id);


      // Methods on the Durable Object are invoked via the stub
      const rpcResponse = await stub.sayHello();


      return new Response(rpcResponse);
    },
  };
  ```

* TypeScript

  ```ts
  import { DurableObject } from "cloudflare:workers";


  export interface Env {
    MY_DURABLE_OBJECT: DurableObjectNamespace<MyDurableObject>;
  }


  // Durable Object
  export class MyDurableObject extends DurableObject {
    constructor(ctx: DurableObjectState, env: Env) {
      super(ctx, env);
    }


    async sayHello(): Promise<string> {
      return "Hello, World!";
    }
  }


  // Worker
  export default {
    async fetch(request, env) {
      // Every unique ID refers to an individual instance of the Durable Object class
      const id = env.MY_DURABLE_OBJECT.idFromName("foo");


      // A stub is a client used to invoke methods on the Durable Object
      const stub = env.MY_DURABLE_OBJECT.get(id);


      // Methods on the Durable Object are invoked via the stub
      const rpcResponse = await stub.sayHello();


      return new Response(rpcResponse);
    },
  } satisfies ExportedHandler<Env>;
  ```

## Properties

### `id`

`id` is a property of the `DurableObjectStub` corresponding to the [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) used to create the stub.

```js
const id = env.MY_DURABLE_OBJECT.newUniqueId();
const stub = env.MY_DURABLE_OBJECT.get(id);
console.assert(id.equals(stub.id), "This should always be true");
```

### `name`

`name` is an optional property of a `DurableObjectStub`, which returns the name that was used to create the [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) via [`DurableObjectNamespace::idFromName`](https://developers.cloudflare.com/durable-objects/api/namespace/#idfromname) which was then used to create the `DurableObjectStub`. This value is undefined if the [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) used to create the `DurableObjectStub` was constructed using [`DurableObjectNamespace::newUniqueId`](https://developers.cloudflare.com/durable-objects/api/namespace/#newuniqueid).

```js
const id = env.MY_DURABLE_OBJECT.idFromName("foo");
const stub = env.MY_DURABLE_OBJECT.get(id);
console.assert(stub.name === "foo", "This should always be true");
```

## Related resources

* [Durable Objects: Easy, Fast, Correct – Choose Three](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

</page>

<page>
---
title: WebGPU · Cloudflare Durable Objects docs
description: The WebGPU API allows you to use the GPU directly from JavaScript.
lastUpdated: 2025-02-12T13:41:31.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/api/webgpu/
  md: https://developers.cloudflare.com/durable-objects/api/webgpu/index.md
---

Warning

The WebGPU API is only available in local development. You cannot deploy Durable Objects to Cloudflare that rely on the WebGPU API. See [Workers AI](https://developers.cloudflare.com/workers-ai/) for information on running machine learning models on the GPUs in Cloudflare's global network.

The [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) allows you to use the GPU directly from JavaScript.

The WebGPU API is only accessible from within [Durable Objects](https://developers.cloudflare.com/durable-objects/). You cannot use the WebGPU API from within Workers.

To use the WebGPU API in local development, enable the `experimental` and `webgpu` [compatibility flags](https://developers.cloudflare.com/workers/configuration/compatibility-flags/) in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) of your Durable Object.

```plaintext
compatibility_flags = ["experimental", "webgpu"]
```

The following subset of the WebGPU API is available from within Durable Objects:

| API | Supported? | Notes |
| - | - | - |
| [`navigator.gpu`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/gpu) | ✅ | |
| [`GPU.requestAdapter`](https://developer.mozilla.org/en-US/docs/Web/API/GPU/requestAdapter) | ✅ | |
| [`GPUAdapterInfo`](https://developer.mozilla.org/en-US/docs/Web/API/GPUAdapterInfo) | ✅ | |
| [`GPUAdapter`](https://developer.mozilla.org/en-US/docs/Web/API/GPUAdapter) | ✅ | |
| [`GPUBindGroupLayout`](https://developer.mozilla.org/en-US/docs/Web/API/GPUBindGroupLayout) | ✅ | |
| [`GPUBindGroup`](https://developer.mozilla.org/en-US/docs/Web/API/GPUBindGroup) | ✅ | |
| [`GPUBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/GPUBuffer) | ✅ | |
| [`GPUCommandBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/GPUCommandBuffer) | ✅ | |
| [`GPUCommandEncoder`](https://developer.mozilla.org/en-US/docs/Web/API/GPUCommandEncoder) | ✅ | |
| [`GPUComputePassEncoder`](https://developer.mozilla.org/en-US/docs/Web/API/GPUComputePassEncoder) | ✅ | |
| [`GPUComputePipeline`](https://developer.mozilla.org/en-US/docs/Web/API/GPUComputePipeline) | ✅ | |
| [`GPUComputePipelineError`](https://developer.mozilla.org/en-US/docs/Web/API/GPUPipelineError) | ✅ | |
| [`GPUDevice`](https://developer.mozilla.org/en-US/docs/Web/API/GPUDevice) | ✅ | |
| [`GPUOutOfMemoryError`](https://developer.mozilla.org/en-US/docs/Web/API/GPUOutOfMemoryError) | ✅ | |
| [`GPUValidationError`](https://developer.mozilla.org/en-US/docs/Web/API/GPUValidationError) | ✅ | |
| [`GPUInternalError`](https://developer.mozilla.org/en-US/docs/Web/API/GPUInternalError) | ✅ | |
| [`GPUDeviceLostInfo`](https://developer.mozilla.org/en-US/docs/Web/API/GPUDeviceLostInfo) | ✅ | |
| [`GPUPipelineLayout`](https://developer.mozilla.org/en-US/docs/Web/API/GPUPipelineLayout) | ✅ | |
| [`GPUQuerySet`](https://developer.mozilla.org/en-US/docs/Web/API/GPUQuerySet) | ✅ | |
| [`GPUQueue`](https://developer.mozilla.org/en-US/docs/Web/API/GPUQueue) | ✅ | |
| [`GPUSampler`](https://developer.mozilla.org/en-US/docs/Web/API/GPUSampler) | ✅ | |
| [`GPUCompilationMessage`](https://developer.mozilla.org/en-US/docs/Web/API/GPUCompilationMessage) | ✅ | |
| [`GPUShaderModule`](https://developer.mozilla.org/en-US/docs/Web/API/GPUShaderModule) | ✅ | |
| [`GPUSupportedFeatures`](https://developer.mozilla.org/en-US/docs/Web/API/GPUSupportedFeatures) | ✅ | |
| [`GPUSupportedLimits`](https://developer.mozilla.org/en-US/docs/Web/API/GPUSupportedLimits) | ✅ | |
| [`GPUMapMode`](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API#reading_the_results_back_to_javascript) | ✅ | |
| [`GPUShaderStage`](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API#create_a_bind_group_layout) | ✅ | |
| [`GPUUncapturedErrorEvent`](https://developer.mozilla.org/en-US/docs/Web/API/GPUUncapturedErrorEvent) | ✅ | |

The following subset of the WebGPU API is not yet supported:

| API | Supported? | Notes |
| - | - | - |
| [`GPU.getPreferredCanvasFormat`](https://developer.mozilla.org/en-US/docs/Web/API/GPU/getPreferredCanvasFormat) | | |
| [`GPURenderBundle`](https://developer.mozilla.org/en-US/docs/Web/API/GPURenderBundle) | | |
| [`GPURenderBundleEncoder`](https://developer.mozilla.org/en-US/docs/Web/API/GPURenderBundleEncoder) | | |
| [`GPURenderPassEncoder`](https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPassEncoder) | | |
| [`GPURenderPipeline`](https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPipeline) | | |
| [`GPUShaderModule`](https://developer.mozilla.org/en-US/docs/Web/API/GPUShaderModule) | | |
| [`GPUTexture`](https://developer.mozilla.org/en-US/docs/Web/API/GPUTexture) | | |
| [`GPUTextureView`](https://developer.mozilla.org/en-US/docs/Web/API/GPUTextureView) | | |
| [`GPUExternalTexture`](https://developer.mozilla.org/en-US/docs/Web/API/GPUExternalTexture) | | |

## Examples

* [workers-wonnx](https://github.com/cloudflare/workers-wonnx/) — Image classification, running on a GPU via the WebGPU API, using the [wonnx](https://github.com/webonnx/wonnx) model inference runtime.

</page>

<page>
---
title: Rust API · Cloudflare Durable Objects docs
lastUpdated: 2024-12-04T15:21:02.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/api/workers-rs/
  md: https://developers.cloudflare.com/durable-objects/api/workers-rs/index.md
---


</page>

<page>
---
title: Access Durable Objects Storage · Cloudflare Durable Objects docs
description: Durable Objects are a powerful compute API that provides a compute
  with storage building block. Each Durable Object has its own private,
  transactional, and strongly consistent storage. Durable Objects Storage API
  provides access to a Durable Object's attached storage.
lastUpdated: 2025-05-21T09:44:01.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/
  md: https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/index.md
---

Durable Objects are a powerful compute API that provides a compute with storage building block. Each Durable Object has its own private, transactional, and strongly consistent storage. Durable Objects Storage API provides access to a Durable Object's attached storage.

A Durable Object's [in-memory state](https://developers.cloudflare.com/durable-objects/reference/in-memory-state/) is preserved as long as the Durable Object is not evicted from memory. Inactive Durable Objects with no incoming request traffic can be evicted. There are normal operations like [code deployments](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/) that trigger Durable Objects to restart and lose their in-memory state. For these reasons, you should use Storage API to persist state durably on disk that needs to survive eviction or restart of Durable Objects.

## Access storage

Recommended SQLite-backed Durable Objects

Cloudflare recommends all new Durable Object namespaces use the [SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class). These Durable Objects can continue to use storage [key-value API](https://developers.cloudflare.com/durable-objects/api/storage-api/#kv-api).

Additionally, SQLite-backed Durable Objects allow you to store more types of data (such as tables), and offers Point In Time Recovery API which can restore a Durable Object's embedded SQLite database contents (both SQL data and key-value data) to any point in the past 30 days.

The [key-value storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-durable-object-class-with-key-value-storage) remains for backwards compatibility, and a migration path from KV storage backend to SQLite storage backend for existing Durable Object namespaces will be available in the future.

Storage billing on SQLite-backed Durable Objects

Storage billing is not yet enabled for Durable Object classes using the SQLite storage backend. SQLite-backed Durable Objects will incur [charges for requests and duration](https://developers.cloudflare.com/durable-objects/platform/pricing/#compute-billing). Storage billing for SQLite-backed Durable Objects will be enabled at a later date with advance notice with the [shared pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/#sqlite-storage-backend).

[Storage API methods](https://developers.cloudflare.com/durable-objects/api/storage-api/#methods) are available on `ctx.storage` parameter passed to the Durable Object constructor. Storage API has several methods, including SQL, point-in-time recovery (PITR), key-value (KV), and alarm APIs.

Only Durable Object classes with a SQLite storage backend can access SQL API.

### Create SQLite-backed Durable Object class

Use `new_sqlite_classes` on the migration in your Worker's Wrangler file:

* wrangler.jsonc

  ```jsonc
  {
    "migrations": [
      {
        "tag": "v1",
        "new_sqlite_classes": [
          "MyDurableObject"
        ]
      }
    ]
  }
  ```

* wrangler.toml

  ```toml
  [[migrations]]
  tag = "v1" # Should be unique for each entry
  new_sqlite_classes = ["MyDurableObject"] # Array of new classes
  ```

[SQL API](https://developers.cloudflare.com/durable-objects/api/storage-api/#exec) is available on `ctx.storage.sql` parameter passed to the Durable Object constructor.

SQLite-backed Durable Objects also offer [point-in-time recovery API](https://developers.cloudflare.com/durable-objects/api/storage-api/#pitr-point-in-time-recovery-api), which uses bookmarks to allow you to restore a Durable Object's embedded SQLite database to any point in time in the past 30 days.

### Initialize instance variables from storage

A common pattern is to initialize a Durable Object from [persistent storage](https://developers.cloudflare.com/durable-objects/api/storage-api/) and set instance variables the first time it is accessed. Since future accesses are routed to the same Durable Object, it is then possible to return any initialized values without making further calls to persistent storage.

```ts
import { DurableObject } from "cloudflare:workers";


export class Counter extends DurableObject {
  value: number;


  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);


    // `blockConcurrencyWhile()` ensures no requests are delivered until
    // initialization completes.
    ctx.blockConcurrencyWhile(async () => {
      // After initialization, future reads do not need to access storage.
      this.value = (await ctx.storage.get("value")) || 0;
    });
  }


  async getCounterValue() {
    return this.value;
  }
}
```

### Remove a Durable Object's storage

A Durable Object fully ceases to exist if, when it shuts down, its storage is empty. If you never write to a Durable Object's storage at all (including setting alarms), then storage remains empty, and so the Durable Object will no longer exist once it shuts down.

However if you ever write using [Storage API](https://developers.cloudflare.com/durable-objects/api/storage-api/), including setting alarms, then you must explicitly call [`storage.deleteAll()`](https://developers.cloudflare.com/durable-objects/api/storage-api/#deleteall) to empty storage and [`storage.deleteAlarm()`](https://developers.cloudflare.com/durable-objects/api/storage-api/#deletealarm) if you've configured an alarm. It is not sufficient to simply delete the specific data that you wrote, such as deleting a key or dropping a table, as some metadata may remain. The only way to remove all storage is to call `deleteAll()`. Calling `deleteAll()` ensures that a Durable Object will not be billed for storage.

```ts
export class MyDurableObject extends DurableObject<Env> {


  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }


  // Clears Durable Object storage
  async clearDo():Promise<void> {
    // If you've configured a Durable Object alarm
    await this.ctx.storage.deleteAlarm();


    // This will delete all the storage associated with this Durable Object instance
    // This will also delete the Durable Object instance itself
    await this.ctx.storage.deleteAll();
  }
}
```

## SQL API Examples

[SQL API](https://developers.cloudflare.com/durable-objects/api/storage-api/#exec) examples below use the following SQL schema:

```ts
import { DurableObject } from "cloudflare:workers";


export class MyDurableObject extends DurableObject {
  sql: SqlStorage
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;


    this.sql.exec(`CREATE TABLE IF NOT EXISTS artist(
      artistid    INTEGER PRIMARY KEY,
      artistname  TEXT
    );INSERT INTO artist (artistid, artistname) VALUES
      (123, 'Alice'),
      (456, 'Bob'),
      (789, 'Charlie');`
    );
  }
}
```

Iterate over query results as row objects:

```ts
  let cursor = this.sql.exec("SELECT * FROM artist;");


  for (let row of cursor) {
    // Iterate over row object and do something
  }
```

Convert query results to an array of row objects:

```ts
  // Return array of row objects: [{"artistid":123,"artistname":"Alice"},{"artistid":456,"artistname":"Bob"},{"artistid":789,"artistname":"Charlie"}]
  let resultsArray1 = this.sql.exec("SELECT * FROM artist;").toArray();
  // OR
  let resultsArray2 = Array.from(this.sql.exec("SELECT * FROM artist;"));
  // OR
  let resultsArray3 = [...this.sql.exec("SELECT * FROM artist;")]; // JavaScript spread syntax
```

Convert query results to an array of row values arrays:

```ts
  // Returns [[123,"Alice"],[456,"Bob"],[789,"Charlie"]]
  let cursor = this.sql.exec("SELECT * FROM artist;");
  let resultsArray = cursor.raw().toArray();


  // Returns ["artistid","artistname"]
  let columnNameArray = this.sql.exec("SELECT * FROM artist;").columnNames.toArray();
```

Get first row object of query results:

```ts
  // Returns {"artistid":123,"artistname":"Alice"}
  let firstRow = this.sql.exec("SELECT * FROM artist ORDER BY artistname DESC;").toArray()[0];
```

Check if query results have exactly one row:

```ts
  // returns error
  this.sql.exec("SELECT * FROM artist ORDER BY artistname ASC;").one();


  // returns { artistid: 123, artistname: 'Alice' }
  let oneRow = this.sql.exec("SELECT * FROM artist WHERE artistname = ?;", "Alice").one()
```

Returned cursor behavior:

```ts
  let cursor = this.sql.exec("SELECT * FROM artist ORDER BY artistname ASC;");
  let result = cursor.next();
  if (!result.done) {
    console.log(result.value); // prints { artistid: 123, artistname: 'Alice' }
  } else {
    // query returned zero results
  }


  let remainingRows = cursor.toArray();
  console.log(remainingRows); // prints [{ artistid: 456, artistname: 'Bob' },{ artistid: 789, artistname: 'Charlie' }]
```

Returned cursor and `raw()` iterator iterate over the same query results:

```ts
  let cursor = this.sql.exec("SELECT * FROM artist ORDER BY artistname ASC;");
  let result = cursor.raw().next();


  if (!result.done) {
    console.log(result.value); // prints [ 123, 'Alice' ]
  } else {
    // query returned zero results
  }


  console.log(cursor.toArray()); // prints [{ artistid: 456, artistname: 'Bob' },{ artistid: 789, artistname: 'Charlie' }]
```

`sql.exec().rowsRead()`:

```ts
  let cursor = this.sql.exec("SELECT * FROM artist;");
  cursor.next()
  console.log(cursor.rowsRead); // prints 1


  cursor.toArray(); // consumes remaining cursor
  console.log(cursor.rowsRead); // prints 3
```

## TypeScript and query results

You can use TypeScript [type parameters](https://www.typescriptlang.org/docs/handbook/2/generics.html#working-with-generic-type-variables) to provide a type for your results, allowing you to benefit from type hints and checks when iterating over the results of a query.

Warning

Providing a type parameter does *not* validate that the query result matches your type definition. In TypeScript, properties (fields) that do not exist in your result type will be silently dropped.

Your type must conform to the shape of a TypeScript [Record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) type representing the name (`string`) of the column and the type of the column. The column type must be a valid `SqlStorageValue`: one of `ArrayBuffer | string | number | null`.

For example,

```ts
type User = {
  id: string;
  name: string;
  email_address: string;
  version: number;
}
```

This type can then be passed as the type parameter to a `sql.exec()` call:

```ts
// The type parameter is passed between angle brackets before the function argument:
const result = this.ctx.storage.sql.exec<User>("SELECT id, name, email_address, version FROM users WHERE id = ?", user_id).one()
// result will now have a type of "User"


// Alternatively, if you are iterating over results using a cursor
let cursor = this.sql.exec<User>("SELECT id, name, email_address, version FROM users WHERE id = ?", user_id)
for (let row of cursor) {
  // Each row object will be of type User
}


// Or, if you are using raw() to convert results into an array, define an array type:
type UserRow = [
  id: string,
  name: string,
  email_address: string,
  version: number,
];


// ... and then pass it as the type argument to the raw() method:
let cursor = sql.exec("SELECT id, name, email_address, version FROM users WHERE id = ?", user_id).raw<UserRow>();


for (let row of cursor) {
  // row is of type User
}
```

You can represent the shape of any result type you wish, including more complex types. If you are performing a `JOIN` across multiple tables, you can compose a type that reflects the results of your queries.

## Indexes in SQLite

Creating indexes for your most queried tables and filtered columns reduces how much data is scanned and improves query performance at the same time. If you have a read-heavy workload (most common), this can be particularly advantageous. Writing to columns referenced in an index will add at least one (1) additional row written to account for updating the index, but this is typically offset by the reduction in rows read due to the benefits of an index.

## SQL in Durable Objects vs D1

Cloudflare Workers offers a SQLite-backed serverless database product - [D1](https://developers.cloudflare.com/d1/). How should you compare [SQLite in Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/) and D1?

**D1 is a managed database product.**

D1 fits into a familiar architecture for developers, where application servers communicate with a database over the network. Application servers are typically Workers; however, D1 also supports external, non-Worker access via an [HTTP API](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/query/), which helps unlock [third-party tooling](https://developers.cloudflare.com/d1/reference/community-projects/#_top) support for D1.

D1 aims for a "batteries included" feature set, including the above HTTP API, [database schema management](https://developers.cloudflare.com/d1/reference/migrations/#_top), [data import/export](https://developers.cloudflare.com/d1/best-practices/import-export-data/), and [database query insights](https://developers.cloudflare.com/d1/observability/metrics-analytics/#query-insights).

With D1, your application code and SQL database queries are not colocated which can impact application performance. If performance is a concern with D1, Workers has [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement/#_top) to dynamically run your Worker in the best location to reduce total Worker request latency, considering everything your Worker talks to, including D1.

**SQLite in Durable Objects is a lower-level compute with storage building block for distributed systems.**

By design, Durable Objects are accessed with Workers-only.

Durable Objects require a bit more effort, but in return, give you more flexibility and control. With Durable Objects, you must implement two pieces of code that run in different places: a front-end Worker which routes incoming requests from the Internet to a unique Durable Object, and the Durable Object itself, which runs on the same machine as the SQLite database. You get to choose what runs where, and it may be that your application benefits from running some application business logic right next to the database.

With SQLite in Durable Objects, you may also need to build some of your own database tooling that comes out-of-the-box with D1.

SQL query pricing and limits are intended to be identical between D1 ([pricing](https://developers.cloudflare.com/d1/platform/pricing/), [limits](https://developers.cloudflare.com/d1/platform/limits/)) and SQLite in Durable Objects ([pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/#sql-storage-billing), [limits](https://developers.cloudflare.com/durable-objects/platform/limits/)).

## Related resources

* [Zero-latency SQLite storage in every Durable Object blog post](https://blog.cloudflare.com/sqlite-in-durable-objects)

</page>

<page>
---
title: Invoke methods · Cloudflare Durable Objects docs
description: All new projects and existing projects with a compatibility date
  greater than or equal to 2024-04-03 should prefer to invoke Remote Procedure
  Call (RPC) methods defined on a Durable Object class. Legacy projects can
  continue to invoke the fetch handler on the Durable Object class indefinitely.
lastUpdated: 2025-04-06T14:39:24.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/
  md: https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/index.md
---

## Invoking methods on a Durable Object

All new projects and existing projects with a compatibility date greater than or equal to [`2024-04-03`](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#durable-object-stubs-and-service-bindings-support-rpc) should prefer to invoke [Remote Procedure Call (RPC)](https://developers.cloudflare.com/workers/runtime-apis/rpc/) methods defined on a Durable Object class. Legacy projects can continue to invoke the `fetch` handler on the Durable Object class indefinitely.

### Invoke RPC methods

By writing a Durable Object class which inherits from the built-in type `DurableObject`, public methods on the Durable Objects class are exposed as [RPC methods](https://developers.cloudflare.com/workers/runtime-apis/rpc/), which you can call using a [DurableObjectStub](https://developers.cloudflare.com/durable-objects/api/stub) from a Worker.

All RPC calls are [asynchronous](https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle/), accept and return [serializable types](https://developers.cloudflare.com/workers/runtime-apis/rpc/), and [propagate exceptions](https://developers.cloudflare.com/workers/runtime-apis/rpc/error-handling/) to the caller without a stack trace. Refer to [Workers RPC](https://developers.cloudflare.com/workers/runtime-apis/rpc/) for complete details.

* JavaScript

  ```js
  import { DurableObject } from "cloudflare:workers";


  // Durable Object
  export class MyDurableObject extends DurableObject {
    constructor(ctx, env) {
      super(ctx, env);
    }


    async sayHello() {
      return "Hello, World!";
    }
  }


  // Worker
  export default {
    async fetch(request, env) {
      // Every unique ID refers to an individual instance of the Durable Object class
      const id = env.MY_DURABLE_OBJECT.idFromName("foo");


      // A stub is a client used to invoke methods on the Durable Object
      const stub = env.MY_DURABLE_OBJECT.get(id);


      // Methods on the Durable Object are invoked via the stub
      const rpcResponse = await stub.sayHello();


      return new Response(rpcResponse);
    },
  };
  ```

* TypeScript

  ```ts
  import { DurableObject } from "cloudflare:workers";


  export interface Env {
    MY_DURABLE_OBJECT: DurableObjectNamespace<MyDurableObject>;
  }


  // Durable Object
  export class MyDurableObject extends DurableObject {
    constructor(ctx: DurableObjectState, env: Env) {
      super(ctx, env);
    }


    async sayHello(): Promise<string> {
      return "Hello, World!";
    }
  }


  // Worker
  export default {
    async fetch(request, env) {
      // Every unique ID refers to an individual instance of the Durable Object class
      const id = env.MY_DURABLE_OBJECT.idFromName("foo");


      // A stub is a client used to invoke methods on the Durable Object
      const stub = env.MY_DURABLE_OBJECT.get(id);


      // Methods on the Durable Object are invoked via the stub
      const rpcResponse = await stub.sayHello();


      return new Response(rpcResponse);
    },
  } satisfies ExportedHandler<Env>;
  ```

Note

With RPC, the `DurableObject` superclass defines `ctx` and `env` as class properties. What was previously called `state` is now called `ctx` when you extend the `DurableObject` class. The name `ctx` is adopted rather than `state` for the `DurableObjectState` interface to be consistent between `DurableObject` and `WorkerEntrypoint` objects.

Refer to [Build a Counter](https://developers.cloudflare.com/durable-objects/examples/build-a-counter/) for a complete example.

### Invoking the `fetch` handler

If your project is stuck on a compatibility date before [`2024-04-03`](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#durable-object-stubs-and-service-bindings-support-rpc), or has the need to send a [`Request`](https://developers.cloudflare.com/workers/runtime-apis/request/) object and return a `Response` object, then you should send requests to a Durable Object via the fetch handler.

* JavaScript

  ```js
  import { DurableObject } from "cloudflare:workers";


  // Durable Object
  export class MyDurableObject extends DurableObject {
    constructor(ctx, env) {
      super(ctx, env);
    }


    async fetch(request) {
      return new Response("Hello, World!");
    }
  }


  // Worker
  export default {
    async fetch(request, env) {
      // Every unique ID refers to an individual instance of the Durable Object class
      const id = env.MY_DURABLE_OBJECT.idFromName("foo");


      // A stub is a client used to invoke methods on the Durable Object
      const stub = env.MY_DURABLE_OBJECT.get(id);


      // Methods on the Durable Object are invoked via the stub
      const response = await stub.fetch(request);


      return response;
    },
  };
  ```

* TypeScript

  ```ts
  import { DurableObject } from "cloudflare:workers";


  export interface Env {
    MY_DURABLE_OBJECT: DurableObjectNamespace<MyDurableObject>;
  }


  // Durable Object
  export class MyDurableObject extends DurableObject {
    constructor(ctx: DurableObjectState, env: Env) {
      super(ctx, env);
    }


    async fetch(request: Request): Promise<Response> {
      return new Response("Hello, World!");
    }
  }


  // Worker
  export default {
    async fetch(request, env) {
      // Every unique ID refers to an individual instance of the Durable Object class
      const id = env.MY_DURABLE_OBJECT.idFromName("foo");


      // A stub is a client used to invoke methods on the Durable Object
      const stub = env.MY_DURABLE_OBJECT.get(id);


      // Methods on the Durable Object are invoked via the stub
      const response = await stub.fetch(request);


      return response;
    },
  } satisfies ExportedHandler<Env>;
  ```

The `URL` associated with the [`Request`](https://developers.cloudflare.com/workers/runtime-apis/request/) object passed to the `fetch()` handler of your Durable Object must be a well-formed URL, but does not have to be a publicly-resolvable hostname.

Without RPC, customers frequently construct requests which corresponded to private methods on the Durable Object and dispatch requests from the `fetch` handler. RPC is obviously more ergonomic in this example.

* JavaScript

  ```js
  import { DurableObject } from "cloudflare:workers";


  // Durable Object
  export class MyDurableObject extends DurableObject {
    constructor(ctx: DurableObjectState, env: Env) {
      super(ctx, env);
    }


    private hello(name) {
      return new Response(`Hello, ${name}!`);
    }


    private goodbye(name) {
      return new Response(`Goodbye, ${name}!`);
    }


    async fetch(request) {
      const url = new URL(request.url);
      let name = url.searchParams.get("name");
      if (!name) {
        name = "World";
      }


      switch (url.pathname) {
        case "/hello":
          return this.hello(name);
        case "/goodbye":
          return this.goodbye(name);
        default:
          return new Response("Bad Request", { status: 400 });
      }
    }
  }


  // Worker
  export default {
    async fetch(_request, env, _ctx) {
      // Every unique ID refers to an individual instance of the Durable Object class
      const id = env.MY_DURABLE_OBJECT.idFromName("foo");


      // A stub is a client used to invoke methods on the Durable Object
      const stub = env.MY_DURABLE_OBJECT.get(id);


      // Invoke the fetch handler on the Durable Object stub
      let response = await stub.fetch("http://do/hello?name=World");


      return response;
    },
  };
  ```

* TypeScript

  ```ts
  import { DurableObject } from "cloudflare:workers";


  export interface Env {
    MY_DURABLE_OBJECT: DurableObjectNamespace<MyDurableObject>;
  }


  // Durable Object
  export class MyDurableObject extends DurableObject {
    constructor(ctx: DurableObjectState, env: Env) {
      super(ctx, env);
    }


    private hello(name: string) {
      return new Response(`Hello, ${name}!`);
    }


    private goodbye(name: string) {
      return new Response(`Goodbye, ${name}!`);
    }


    async fetch(request: Request): Promise<Response> {
      const url = new URL(request.url);
      let name = url.searchParams.get("name");
      if (!name) {
        name = "World";
      }


      switch (url.pathname) {
        case "/hello":
          return this.hello(name);
        case "/goodbye":
          return this.goodbye(name);
        default:
          return new Response("Bad Request", { status: 400 });
      }
    }
  }


  // Worker
  export default {
    async fetch(_request, env, _ctx) {
      // Every unique ID refers to an individual instance of the Durable Object class
      const id = env.MY_DURABLE_OBJECT.idFromName("foo");


      // A stub is a client used to invoke methods on the Durable Object
      const stub = env.MY_DURABLE_OBJECT.get(id);


      // Invoke the fetch handler on the Durable Object stub
      let response = await stub.fetch("http://do/hello?name=World");


      return response;
    },
  } satisfies ExportedHandler<Env>;
  ```

</page>

<page>
---
title: Error handling · Cloudflare Durable Objects docs
description: Any uncaught exceptions thrown by a Durable Object or thrown by
  Durable Objects' infrastructure (such as overloads or network errors) will be
  propagated to the callsite of the client. Catching these exceptions allows you
  to retry creating the DurableObjectStub and sending requests.
lastUpdated: 2025-04-06T14:39:24.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/best-practices/error-handling/
  md: https://developers.cloudflare.com/durable-objects/best-practices/error-handling/index.md
---

Any uncaught exceptions thrown by a Durable Object or thrown by Durable Objects' infrastructure (such as overloads or network errors) will be propagated to the callsite of the client. Catching these exceptions allows you to retry creating the [`DurableObjectStub`](https://developers.cloudflare.com/durable-objects/api/stub) and sending requests.

JavaScript Errors with the property `.retryable` set to True are suggested to be retried if requests to the Durable Object are idempotent, or can be applied multiple times without changing the response. If requests are not idempotent, then you will need to decide what is best for your application.

JavaScript Errors with the property `.overloaded` set to True should not be retried. If a Durable Object is overloaded, then retrying will worsen the overload and increase the overall error rate.

It is strongly recommended to retry requests following the exponential backoff algorithm in production code when the error properties indicate that it is safe to do so.

## How exceptions are thrown

Durable Objects can throw exceptions in one of two ways:

* An exception can be thrown within the user code which implements a Durable Object class. The resulting exception will have a `.remote` property set to `True` in this case.
* An exception can be generated by Durable Object's infrastructure. Some sources of infrastructure exceptions include: transient internal errors, sending too many requests to a single Durable Object, and too many requests being queued due to slow or excessive I/O (external API calls or storage operations) within an individual Durable Object. Some infrastructure exceptions may also have the `.remote` property set to `True` -- for example, when the Durable Object exceeds its memory or CPU limits.

Refer to [Troubleshooting](https://developers.cloudflare.com/durable-objects/observability/troubleshooting/) to review the types of errors returned by a Durable Object and/or Durable Objects infrastructure and how to prevent them.

## Example

This example demonstrates retrying requests using the recommended exponential backoff algorithm.

```ts
import { DurableObject } from "cloudflare:workers";


export interface Env {
  ErrorThrowingObject: DurableObjectNamespace;
}


export default {
  async fetch(request, env, ctx) {
    let userId = new URL(request.url).searchParams.get("userId") || "";
    const id = env.ErrorThrowingObject.idFromName(userId);


    // Retry behavior can be adjusted to fit your application.
    let maxAttempts = 3;
    let baseBackoffMs = 100;
    let maxBackoffMs = 20000;


    let attempt = 0;
    while (true) {
      // Try sending the request
      try {
        // Create a Durable Object stub for each attempt, because certain types of
        // errors will break the Durable Object stub.
        const doStub = env.ErrorThrowingObject.get(id);
        const resp = await doStub.fetch("http://your-do/");


        return Response.json(resp);
      } catch (e: any) {
        if (!e.retryable) {
          // Failure was not a transient internal error, so don't retry.
          break;
        }
      }
      let backoffMs = Math.min(
        maxBackoffMs,
        baseBackoffMs * Math.random() * Math.pow(2, attempt),
      );
      attempt += 1;
      if (attempt >= maxAttempts) {
        // Reached max attempts, so don't retry.
        break;
      }
      await scheduler.wait(backoffMs);
    }
    return new Response("server error", { status: 500 });
  },
} satisfies ExportedHandler<Env>;


export class ErrorThrowingObject extends DurableObject {
  constructor(state: DurableObjectState, env: Env) {
    super(state, env);


    // Any exceptions that are raised in your constructor will also set the
    // .remote property to True
    throw new Error("no good");
  }


  async fetch(req: Request) {
    // Generate an uncaught exception
    // A .remote property will be added to the exception propagated to the caller
    // and will be set to True
    throw new Error("example error");


    // We never reach this
    return Response.json({});
  }
}
```

</page>

<page>
---
title: Use WebSockets · Cloudflare Durable Objects docs
description: This guide covers how to use Durable Objects as WebSocket servers
  that can connect thousands of clients (per instance), as well as a WebSocket
  client to connect to other servers or even Durable Objects.
lastUpdated: 2025-07-07T12:46:13.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/best-practices/websockets/
  md: https://developers.cloudflare.com/durable-objects/best-practices/websockets/index.md
---

This guide covers how to use Durable Objects as WebSocket servers that can connect thousands of clients (per instance), as well as a WebSocket client to connect to other servers or even Durable Objects.

There are two sets of WebSockets API:

1. **Native Durable Object WebSocket API**, which allows your Durable Object to hibernate without disconnecting clients when not actively doing work **(recommended)**.
2. **Web Standard WebSocket APIs**, using the familiar `addEventListener` event pattern.

## What are WebSockets?

WebSockets are long-lived TCP connections that enable bi-directional, real-time communication between client and server. Both Cloudflare Durable Objects and Workers can act as WebSocket endpoints – either as a client or as a server. Because WebSocket sessions are long-lived, applications commonly use Durable Objects to accept either the client or server connection. While there are other use cases for using Workers exclusively with WebSockets, for example proxying WebSocket messages, WebSockets are most useful when combined with Durable Objects.

Because Durable Objects provide a single-point-of-coordination between [Cloudflare Workers](https://developers.cloudflare.com/workers/), a single Durable Object instance can be used in parallel with WebSockets to coordinate between multiple clients, such as participants in a chat room or a multiplayer game. Refer to [Cloudflare Edge Chat Demo](https://github.com/cloudflare/workers-chat-demo) for an example of using Durable Objects with WebSockets.

Both Cloudflare Durable Objects and Workers can use the [Web Standard WebSocket API](https://developers.cloudflare.com/workers/runtime-apis/websockets/) to build applications, but a major differentiator of Cloudflare Durable Objects relative to other platforms is the ability to Hibernate WebSocket connections to save costs. Clients can remain connected when the Durable Object is idle (and not sending messages or running compute tasks), which allows you to push events to clients and minimize the active duration (GB-seconds) associated with long-running Durable Object processes.

## Durable Objects' Hibernation WebSocket API

In addition to [the Web Standard WebSocket API](https://developers.cloudflare.com/workers/runtime-apis/websockets/), Cloudflare Durable Objects can use the WebSocket Hibernation API which extends the Web Standard WebSocket API to reduce costs. Specifically, [billable Duration (GB-s) charges](https://developers.cloudflare.com/durable-objects/platform/pricing/) are not incurred during periods of inactivity.

### How does Durable Object Hibernation work with WebSockets?

When a Durable Object receives no events (like alarms) or messages for 10 seconds, the Durable Object is evicted from memory to avoid unnecessary charges. The WebSocket clients remain connected to the Cloudflare network. When your Durable Object receives an event during hibernation, it is re-initialized, its `constructor` function is called, and it can access the WebSocket clients with the `this.ctx.getWebSockets()` function.

When the Durable Object is evicted from memory, its in-memory state is reset. It is common to rely on in-memory state to organize your WebSockets (for example, keeping your WebSockets in rooms with a `Map<WebSocket, Object>` data type). With Hibernation, you must restore the in-memory state of your Durable Object within the `constructor` function.

To do this, you can use the [`serializeAttachment`](#websocketserializeattachment) to persist additional data with the Durable Object WebSocket class, which will persist the data to the Durable Object's storage. Upon re-initialization of the Durable Object, you can access this data with [`deserializeAttachment`](#websocketdeserializeattachment).

The Durable Object WebSocket class consists of Cloudflare-specific extensions to the Web Standard WebSocket API. These extensions are either present on the [DurableObjectState](https://developers.cloudflare.com/durable-objects/api/state) interface, or as handler methods on the Durable Object class.

Note

Hibernation is only supported when a Durable Object acts as a WebSocket server. Currently, outgoing WebSockets cannot hibernate.

Events, for example [alarms](https://developers.cloudflare.com/durable-objects/api/alarms/), incoming requests, and scheduled callbacks using `setTimeout/setInterval`) can prevent a Durable Object from being inactive and therefore prevent this cost saving. Read more in the section [When does a Durable Object incur duration charges?](https://developers.cloudflare.com/durable-objects/platform/pricing/#when-does-a-durable-object-incur-duration-charges).

### Example

To use WebSockets with Durable Objects, you first need to proxy the `request` object from the Worker to the Durable Object, as is done in the [WebSocket Standard API example](https://developers.cloudflare.com/durable-objects/examples/websocket-server/). Using the Hibernation WebSockets API in Durable Objects differs slightly from using WebSocket Standard APIs. In summary, [`DurableObjectState::acceptWebSocket`](https://developers.cloudflare.com/durable-objects/api/state/#acceptwebsocket) is called to accept the server side of the WebSocket connection, and handler methods are defined on the Durable Object class for relevant event types rather than adding event listeners.

If an event occurs for a hibernated Durable Object's corresponding handler method, it will return to memory. This will call the Durable Object's constructor, so it is best to minimize work in the constructor when using WebSocket hibernation.

* JavaScript

  ```js
  import { DurableObject } from "cloudflare:workers";


  // Durable Object
  export class WebSocketHibernationServer extends DurableObject {
    async fetch(request) {
      // Creates two ends of a WebSocket connection.
      const webSocketPair = new WebSocketPair();
      const [client, server] = Object.values(webSocketPair);


      // Calling `acceptWebSocket()` connects the WebSocket to the Durable Object, allowing the WebSocket to send and receive messages.
      // Unlike `ws.accept()`, `state.acceptWebSocket(ws)` allows the Durable Object to be hibernated
      // When the Durable Object receives a message during Hibernation, it will run the `constructor` to be re-initialized
      this.ctx.acceptWebSocket(server);


      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    }


    async webSocketMessage(ws, message) {
      // Upon receiving a message from the client, reply with the same message,
      // but will prefix the message with "[Durable Object]: " and return the number of connections.
      ws.send(
        `[Durable Object] message: ${message}, connections: ${this.ctx.getWebSockets().length}`,
      );
    }


    async webSocketClose(ws, code, reason, wasClean) {
      // If the client closes the connection, the runtime will invoke the webSocketClose() handler.
      ws.close(code, "Durable Object is closing WebSocket");
    }
  }
  ```

* TypeScript

  ```ts
  import { DurableObject } from "cloudflare:workers";


  export interface Env {
    WEBSOCKET_HIBERNATION_SERVER: DurableObjectNamespace<WebSocketHibernationServer>;
  }


  // Durable Object
  export class WebSocketHibernationServer extends DurableObject {
    async fetch(request: Request): Promise<Response> {
      // Creates two ends of a WebSocket connection.
      const webSocketPair = new WebSocketPair();
      const [client, server] = Object.values(webSocketPair);


      // Calling `acceptWebSocket()` connects the WebSocket to the Durable Object, allowing the WebSocket to send and receive messages.
      // Unlike `ws.accept()`, `state.acceptWebSocket(ws)` allows the Durable Object to be hibernated
      // When the Durable Object receives a message during Hibernation, it will run the `constructor` to be re-initialized
      this.ctx.acceptWebSocket(server);


      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    }


    async webSocketMessage(ws: WebSocket, message: ArrayBuffer | string) {
      // Upon receiving a message from the client, reply with the same message,
      // but will prefix the message with "[Durable Object]: " and return the number of connections.
      ws.send(
        `[Durable Object] message: ${message}, connections: ${this.ctx.getWebSockets().length}`,
      );
    }


    async webSocketClose(
      ws: WebSocket,
      code: number,
      reason: string,
      wasClean: boolean,
    ) {
      // If the client closes the connection, the runtime will invoke the webSocketClose() handler.
      ws.close(code, "Durable Object is closing WebSocket");
    }
  }
  ```

Similar to the [WebSocket Standard API example](https://developers.cloudflare.com/durable-objects/examples/websocket-server/), to execute this code, configure your Wrangler file to include a Durable Object [binding](https://developers.cloudflare.com/durable-objects/get-started/#4-configure-durable-object-bindings) and [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

```toml
name = "websocket-hibernation-server"


[[durable_objects.bindings]]
name = "WEBSOCKET_HIBERNATION_SERVER"
class_name = "WebSocketHibernationServer"


[[migrations]]
tag = "v1"
new_sqlite_classes = ["WebSocketHibernationServer"]
```

A full example can be found in [Build a WebSocket server with WebSocket Hibernation](https://developers.cloudflare.com/durable-objects/examples/websocket-hibernation-server/).

Support for local development

Prior to `wrangler@3.13.2` and Miniflare `v3.20231016.0`, WebSockets did not hibernate when using local development environments such as `wrangler dev` or Miniflare.

If you are using older versions, note that while hibernatable WebSocket events such as [`webSocketMessage()`](https://developers.cloudflare.com/durable-objects/api/base/#websocketmessage) will still be delivered, the Durable Object will never be evicted from memory.

### Extended methods

The following are methods available on the **Native Durable Object WebSocket API**, the WebSocket class available in Durable Objects. These methods facilitate persisting state to storage to set and restore state before and after a Durable Object's hibernation.

#### `WebSocket.serializeAttachment()`

* `serializeAttachment(value any)`: void

  * Keeps a copy of `value` associated with the WebSocket to survive hibernation. The value can be any type supported by the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which is true of most types. If the value needs to be durable please use [Durable Object Storage](https://developers.cloudflare.com/durable-objects/api/storage-api/).

  * If you modify `value` after calling this method, those changes will not be retained unless you call this method again. The serialized size of `value` is limited to 2,048 bytes, otherwise this method will throw an error. If you need larger values to survive hibernation, use the [Storage API](https://developers.cloudflare.com/durable-objects/api/storage-api/) and pass the corresponding key to this method so it can be retrieved later.

#### `WebSocket.deserializeAttachment()`

* `deserializeAttachment()`: any

  * Retrieves the most recent value passed to `serializeAttachment()`, or `null` if none exists.

## WebSocket Standard API

WebSocket connections are established by making an HTTP GET request with the `Upgrade: websocket` header. A Cloudflare Worker is commonly used to validate the request, proxy the request to the Durable Object to accept the server side connection, and return the client side connection in the response.

Validate requests in a Worker

Both Workers and Durable Objects are billed, in part, based on the number of requests they receive. To avoid being billed for requests against a Durable Object for invalid requests, be sure to validate requests in your Worker.

* JavaScript

  ```js
  // Worker
  export default {
    async fetch(request, env, ctx) {
      if (request.method === "GET" && request.url.endsWith("/websocket")) {
        // Expect to receive a WebSocket Upgrade request.
        // If there is one, accept the request and return a WebSocket Response.
        const upgradeHeader = request.headers.get("Upgrade");
        if (!upgradeHeader || upgradeHeader !== "websocket") {
          return new Response(null, {
            status: 426,
            statusText: "Durable Object expected Upgrade: websocket",
            headers: {
              "Content-Type": "text/plain",
            },
          });
        }


        // This example will refer to a single Durable Object instance, since the name "foo" is
        // hardcoded
        let id = env.WEBSOCKET_SERVER.idFromName("foo");
        let stub = env.WEBSOCKET_SERVER.get(id);


        // The Durable Object's fetch handler will accept the server side connection and return
        // the client
        return stub.fetch(request);
      }


      return new Response(null, {
        status: 400,
        statusText: "Bad Request",
        headers: {
          "Content-Type": "text/plain",
        },
      });
    },
  };
  ```

* TypeScript

  ```ts
  // Worker
  export default {
    async fetch(request, env, ctx): Promise<Response> {
      if (request.method === "GET" && request.url.endsWith("/websocket")) {
        // Expect to receive a WebSocket Upgrade request.
        // If there is one, accept the request and return a WebSocket Response.
        const upgradeHeader = request.headers.get("Upgrade");
        if (!upgradeHeader || upgradeHeader !== "websocket") {
          return new Response(null, {
            status: 426,
            statusText: "Durable Object expected Upgrade: websocket",
            headers: {
              "Content-Type": "text/plain",
            },
          });
        }


        // This example will refer to a single Durable Object instance, since the name "foo" is
        // hardcoded
        let id = env.WEBSOCKET_SERVER.idFromName("foo");
        let stub = env.WEBSOCKET_SERVER.get(id);


        // The Durable Object's fetch handler will accept the server side connection and return
        // the client
        return stub.fetch(request);
      }


      return new Response(null, {
        status: 400,
        statusText: "Bad Request",
        headers: {
          "Content-Type": "text/plain",
        },
      });
    },
  } satisfies ExportedHandler<Env>;
  ```

Each WebSocket server in this example is represented by a Durable Object. This WebSocket server creates a single WebSocket connection and responds to all messages over that connection with the total number of accepted WebSocket connections. In the Durable Object's fetch handler we create client and server connections and add event listeners for relevant event types.

* JavaScript

  ```js
  import { DurableObject } from "cloudflare:workers";


  // Durable Object
  export class WebSocketServer extends DurableObject {
    currentlyConnectedWebSockets;


    constructor(ctx, env) {
      super(ctx, env);
      this.currentlyConnectedWebSockets = 0;
    }


    async fetch(request) {
      // Creates two ends of a WebSocket connection.
      const webSocketPair = new WebSocketPair();
      const [client, server] = Object.values(webSocketPair);


      // Calling `accept()` connects the WebSocket to this Durable Object
      server.accept();
      this.currentlyConnectedWebSockets += 1;


      // Upon receiving a message from the client, the server replies with the same message,
      // and the total number of connections with the "[Durable Object]: " prefix
      server.addEventListener("message", (event) => {
        server.send(
          `[Durable Object] currentlyConnectedWebSockets: ${this.currentlyConnectedWebSockets}`,
        );
      });


      // If the client closes the connection, the runtime will close the connection too.
      server.addEventListener("close", (cls) => {
        this.currentlyConnectedWebSockets -= 1;
        server.close(cls.code, "Durable Object is closing WebSocket");
      });


      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    }
  }
  ```

* TypeScript

  ```ts
  // Durable Object
  export class WebSocketServer extends DurableObject {
    currentlyConnectedWebSockets: number;


    constructor(ctx: DurableObjectState, env: Env) {
      super(ctx, env);
      this.currentlyConnectedWebSockets = 0;
    }


    async fetch(request: Request): Promise<Response> {
      // Creates two ends of a WebSocket connection.
      const webSocketPair = new WebSocketPair();
      const [client, server] = Object.values(webSocketPair);


      // Calling `accept()` connects the WebSocket to this Durable Object
      server.accept();
      this.currentlyConnectedWebSockets += 1;


      // Upon receiving a message from the client, the server replies with the same message,
      // and the total number of connections with the "[Durable Object]: " prefix
      server.addEventListener("message", (event: MessageEvent) => {
        server.send(
          `[Durable Object] currentlyConnectedWebSockets: ${this.currentlyConnectedWebSockets}`,
        );
      });


      // If the client closes the connection, the runtime will close the connection too.
      server.addEventListener("close", (cls: CloseEvent) => {
        this.currentlyConnectedWebSockets -= 1;
        server.close(cls.code, "Durable Object is closing WebSocket");
      });


      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    }
  }
  ```

To execute this code, configure your Wrangler file to include a Durable Object [binding](https://developers.cloudflare.com/durable-objects/get-started/#4-configure-durable-object-bindings) and [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

```toml
name = "websocket-server"


[[durable_objects.bindings]]
name = "WEBSOCKET_SERVER"
class_name = "WebSocketServer"


[[migrations]]
tag = "v1"
new_sqlite_classes = ["WebSocketServer"]
```

A full example can be found in [Build a WebSocket server](https://developers.cloudflare.com/durable-objects/examples/websocket-server/).

WebSockets disconnection

Code updates will disconnect all WebSockets. If you deploy a new version of a Worker, every Durable Object is restarted. Any connections to old Durable Objects will be disconnected.

## Related resources

* [Mozilla Developer Network's (MDN) documentation on the WebSocket class](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
* [Cloudflare's WebSocket template for building applications on Workers using WebSockets](https://github.com/cloudflare/websocket-template)
* [Durable Object base class](https://developers.cloudflare.com/durable-objects/api/base/)
* [Durable Object State interface](https://developers.cloudflare.com/durable-objects/api/state/)

</page>

<page>
---
title: Agents · Cloudflare Durable Objects docs
description: Build AI-powered Agents on Cloudflare
lastUpdated: 2025-04-06T14:39:24.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/examples/agents/
  md: https://developers.cloudflare.com/durable-objects/examples/agents/index.md
---


</page>

<page>
---
title: Use the Alarms API · Cloudflare Durable Objects docs
description: Use the Durable Objects Alarms API to batch requests to a Durable Object.
lastUpdated: 2025-04-15T13:47:35.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/examples/alarms-api/
  md: https://developers.cloudflare.com/durable-objects/examples/alarms-api/index.md
---

This example implements an `alarm()` handler that allows batching of requests to a single Durable Object.

When a request is received and no alarm is set, it sets an alarm for 10 seconds in the future. The `alarm()` handler processes all requests received within that 10-second window.

If no new requests are received, no further alarms will be set until the next request arrives.

```js
import { DurableObject } from "cloudflare:workers";


// Worker
export default {
  async fetch(request, env) {
    let id = env.BATCHER.idFromName("foo");
    return await env.BATCHER.get(id).fetch(request);
  },
};


const SECONDS = 10;


// Durable Object
export class Batcher extends DurableObject {
  constructor(state, env) {
    this.state = state;
    this.storage = state.storage;
    this.state.blockConcurrencyWhile(async () => {
      let vals = await this.storage.list({ reverse: true, limit: 1 });
      this.count = vals.size == 0 ? 0 : parseInt(vals.keys().next().value);
    });
  }


  async fetch(request) {
    this.count++;


    // If there is no alarm currently set, set one for 10 seconds from now
    // Any further POSTs in the next 10 seconds will be part of this batch.
    let currentAlarm = await this.storage.getAlarm();
    if (currentAlarm == null) {
      this.storage.setAlarm(Date.now() + 1000 * SECONDS);
    }


    // Add the request to the batch.
    await this.storage.put(this.count, await request.text());
    return new Response(JSON.stringify({ queued: this.count }), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  }


  async alarm() {
    let vals = await this.storage.list();
    await fetch("http://example.com/some-upstream-service", {
      method: "POST",
      body: Array.from(vals.values()),
    });
    await this.storage.deleteAll();
    this.count = 0;
  }
}
```

The `alarm()` handler will be called once every 10 seconds. If an unexpected error terminates the Durable Object, the `alarm()` handler will be re-instantiated on another machine. Following a short delay, the `alarm()` handler will run from the beginning on the other machine.

Finally, configure your Wrangler file to include a Durable Object [binding](https://developers.cloudflare.com/durable-objects/get-started/#4-configure-durable-object-bindings) and [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

* wrangler.jsonc

  ```jsonc
  {
    "name": "durable-object-alarm",
    "main": "src/index.ts",
    "durable_objects": {
      "bindings": [
        {
          "name": "BATCHER",
          "class_name": "Batcher"
        }
      ]
    },
    "migrations": [
      {
        "tag": "v1",
        "new_sqlite_classes": [
          "Batcher"
        ]
      }
    ]
  }
  ```

* wrangler.toml

  ```toml
  name = "durable-object-alarm"
  main = "src/index.ts"


  [[durable_objects.bindings]]
  name = "BATCHER"
  class_name = "Batcher"


  [[migrations]]
  tag = "v1"
  new_sqlite_classes = ["Batcher"]
  ```

</page>

<page>
---
title: Build a counter · Cloudflare Durable Objects docs
description: Build a counter using Durable Objects and Workers with RPC methods.
lastUpdated: 2025-04-15T13:47:35.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/examples/build-a-counter/
  md: https://developers.cloudflare.com/durable-objects/examples/build-a-counter/index.md
---

This example shows how to build a counter using Durable Objects and Workers with [RPC methods](https://developers.cloudflare.com/workers/runtime-apis/rpc) that can print, increment, and decrement a `name` provided by the URL query string parameter, for example, `?name=A`.

* JavaScript

  ```js
  import { DurableObject } from "cloudflare:workers";


  // Worker
  export default {
    async fetch(request, env) {
      let url = new URL(request.url);
      let name = url.searchParams.get("name");
      if (!name) {
        return new Response(
          "Select a Durable Object to contact by using" +
            " the `name` URL query string parameter, for example, ?name=A",
        );
      }


      // Every unique ID refers to an individual instance of the Counter class that
      // has its own state. `idFromName()` always returns the same ID when given the
      // same string as input (and called on the same class), but never the same
      // ID for two different strings (or for different classes).
      let id = env.COUNTERS.idFromName(name);


      // Construct the stub for the Durable Object using the ID.
      // A stub is a client Object used to send messages to the Durable Object.
      let stub = env.COUNTERS.get(id);


      // Send a request to the Durable Object using RPC methods, then await its response.
      let count = null;
      switch (url.pathname) {
        case "/increment":
          count = await stub.increment();
          break;
        case "/decrement":
          count = await stub.decrement();
          break;
        case "/":
          // Serves the current value.
          count = await stub.getCounterValue();
          break;
        default:
          return new Response("Not found", { status: 404 });
      }


      return new Response(`Durable Object '${name}' count: ${count}`);
    },
  };


  // Durable Object
  export class Counter extends DurableObject {
    async getCounterValue() {
      let value = (await this.ctx.storage.get("value")) || 0;
      return value;
    }


    async increment(amount = 1) {
      let value = (await this.ctx.storage.get("value")) || 0;
      value += amount;
      // You do not have to worry about a concurrent request having modified the value in storage.
      // "input gates" will automatically protect against unwanted concurrency.
      // Read-modify-write is safe.
      await this.ctx.storage.put("value", value);
      return value;
    }


    async decrement(amount = 1) {
      let value = (await this.ctx.storage.get("value")) || 0;
      value -= amount;
      await this.ctx.storage.put("value", value);
      return value;
    }
  }
  ```

* TypeScript

  ```ts
  import { DurableObject } from "cloudflare:workers";


  export interface Env {
    COUNTERS: DurableObjectNamespace<Counter>;
  }


  // Worker
  export default {
    async fetch(request, env) {
      let url = new URL(request.url);
      let name = url.searchParams.get("name");
      if (!name) {
        return new Response(
          "Select a Durable Object to contact by using" +
            " the `name` URL query string parameter, for example, ?name=A",
        );
      }


      // Every unique ID refers to an individual instance of the Counter class that
      // has its own state. `idFromName()` always returns the same ID when given the
      // same string as input (and called on the same class), but never the same
      // ID for two different strings (or for different classes).
      let id = env.COUNTERS.idFromName(name);


      // Construct the stub for the Durable Object using the ID.
      // A stub is a client Object used to send messages to the Durable Object.
      let stub = env.COUNTERS.get(id);


      let count = null;
      switch (url.pathname) {
        case "/increment":
          count = await stub.increment();
          break;
        case "/decrement":
          count = await stub.decrement();
          break;
        case "/":
          // Serves the current value.
          count = await stub.getCounterValue();
          break;
        default:
          return new Response("Not found", { status: 404 });
      }


      return new Response(`Durable Object '${name}' count: ${count}`);
    },
  } satisfies ExportedHandler<Env>;


  // Durable Object
  export class Counter extends DurableObject {
    async getCounterValue() {
      let value = (await this.ctx.storage.get("value")) || 0;
      return value;
    }


    async increment(amount = 1) {
      let value: number = (await this.ctx.storage.get("value")) || 0;
      value += amount;
      // You do not have to worry about a concurrent request having modified the value in storage.
      // "input gates" will automatically protect against unwanted concurrency.
      // Read-modify-write is safe.
      await this.ctx.storage.put("value", value);
      return value;
    }


    async decrement(amount = 1) {
      let value: number = (await this.ctx.storage.get("value")) || 0;
      value -= amount;
      await this.ctx.storage.put("value", value);
      return value;
    }
  }
  ```

Finally, configure your Wrangler file to include a Durable Object [binding](https://developers.cloudflare.com/durable-objects/get-started/#4-configure-durable-object-bindings) and [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

* wrangler.jsonc

  ```jsonc
  {
    "name": "my-counter",
    "main": "src/index.ts",
    "durable_objects": {
      "bindings": [
        {
          "name": "COUNTERS",
          "class_name": "Counter"
        }
      ]
    },
    "migrations": [
      {
        "tag": "v1",
        "new_sqlite_classes": [
          "Counter"
        ]
      }
    ]
  }
  ```

* wrangler.toml

  ```toml
  name = "my-counter"
  main = "src/index.ts"


  [[durable_objects.bindings]]
  name = "COUNTERS"
  class_name = "Counter"


  [[migrations]]
  tag = "v1"
  new_sqlite_classes = ["Counter"]
  ```

### Related resources

* [Workers RPC](https://developers.cloudflare.com/workers/runtime-apis/rpc/)
* [Durable Objects: Easy, Fast, Correct — Choose three](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

</page>

<page>
---
title: Build a rate limiter · Cloudflare Durable Objects docs
description: Build a rate limiter using Durable Objects and Workers.
lastUpdated: 2025-04-15T13:47:35.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/examples/build-a-rate-limiter/
  md: https://developers.cloudflare.com/durable-objects/examples/build-a-rate-limiter/index.md
---

This example shows how to build a rate limiter using Durable Objects and Workers that can be used to protect upstream resources, including third-party APIs that your application relies on and/or services that may be costly for you to invoke.

This example also discusses some decisions that need to be made when designing a system, such as a rate limiter, with Durable Objects.

The Worker creates a `RateLimiter` Durable Object on a per IP basis to protect upstream resources. IP based rate limiting can be effective without negatively impacting latency because any given IP will remain within a small geographic area colocated with the `RateLimiter` Durable Object. Furthermore, throughput is also improved because each IP gets its own Durable Object.

It might seem simpler to implement a global rate limiter, `const id = env.RATE_LIMITER.idFromName("global");`, which can provide better guarantees on the request rate to the upstream resource. However:

* This would require all requests globally to make a sub-request to a single Durable Object.
* Implementing a global rate limiter would add additional latency for requests not colocated with the Durable Object, and global throughput would be capped to the throughput of a single Durable Object.
* A single Durable Object that all requests rely on is typically considered an anti-pattern. Durable Objects work best when they are scoped to a user, room, service and/or the specific subset of your application that requires global co-ordination.

Note

If you do not need unique or custom rate-limiting capabilities, refer to [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) that are part of Cloudflare's Web Application Firewall (WAF) product.

The Durable Object uses a token bucket algorithm to implement rate limiting. The naive idea is that each request requires a token to complete, and the tokens are replenished according to the reciprocal of the desired number of requests per second. As an example, a 1000 requests per second rate limit will have a token replenished every millisecond (as specified by milliseconds\_per\_request) up to a given capacity limit.

This example uses Durable Object's [Alarms API](https://developers.cloudflare.com/durable-objects/api/alarms) to schedule the Durable Object to be woken up at a time in the future.

* When the alarm's scheduled time comes, the `alarm()` handler method is called, and in this case, the alarm will add a token to the "Bucket".
* The implementation is made more efficient by adding tokens in bulk (as specified by milliseconds\_for\_updates) and preventing the alarm handler from being invoked every millisecond. More frequent invocations of Durable Objects will lead to higher invocation and duration charges.

The first implementation of a rate limiter is below:

* JavaScript

  ```js
  import { DurableObject } from "cloudflare:workers";


  // Worker
  export default {
    async fetch(request, env, _ctx) {
      // Determine the IP address of the client
      const ip = request.headers.get("CF-Connecting-IP");
      if (ip === null) {
        return new Response("Could not determine client IP", { status: 400 });
      }


      // Obtain an identifier for a Durable Object based on the client's IP address
      const id = env.RATE_LIMITER.idFromName(ip);


      try {
        const stub = env.RATE_LIMITER.get(id);
        const milliseconds_to_next_request =
          await stub.getMillisecondsToNextRequest();
        if (milliseconds_to_next_request > 0) {
          // Alternatively one could sleep for the necessary length of time
          return new Response("Rate limit exceeded", { status: 429 });
        }
      } catch (error) {
        return new Response("Could not connect to rate limiter", { status: 502 });
      }


      // TODO: Implement me
      return new Response("Call some upstream resource...");
    },
  };


  // Durable Object
  export class RateLimiter extends DurableObject {
    static milliseconds_per_request = 1;
    static milliseconds_for_updates = 5000;
    static capacity = 10000;


    constructor(ctx, env) {
      super(ctx, env);
      this.tokens = RateLimiter.capacity;
    }


    async getMillisecondsToNextRequest() {
      this.checkAndSetAlarm();


      let milliseconds_to_next_request = RateLimiter.milliseconds_per_request;
      if (this.tokens > 0) {
        this.tokens -= 1;
        milliseconds_to_next_request = 0;
      }


      return milliseconds_to_next_request;
    }


    async checkAndSetAlarm() {
      let currentAlarm = await this.ctx.storage.getAlarm();
      if (currentAlarm == null) {
        this.ctx.storage.setAlarm(
          Date.now() +
            RateLimiter.milliseconds_for_updates *
              RateLimiter.milliseconds_per_request,
        );
      }
    }


    async alarm() {
      if (this.tokens < RateLimiter.capacity) {
        this.tokens = Math.min(
          RateLimiter.capacity,
          this.tokens + RateLimiter.milliseconds_for_updates,
        );
        this.checkAndSetAlarm();
      }
    }
  }
  ```

* TypeScript

  ```ts
  import { DurableObject } from "cloudflare:workers";


  export interface Env {
    RATE_LIMITER: DurableObjectNamespace<RateLimiter>;
  }


  // Worker
  export default {
    async fetch(request, env, _ctx): Promise<Response> {
      // Determine the IP address of the client
      const ip = request.headers.get("CF-Connecting-IP");
      if (ip === null) {
        return new Response("Could not determine client IP", { status: 400 });
      }


      // Obtain an identifier for a Durable Object based on the client's IP address
      const id = env.RATE_LIMITER.idFromName(ip);


      try {
        const stub = env.RATE_LIMITER.get(id);
        const milliseconds_to_next_request =
          await stub.getMillisecondsToNextRequest();
        if (milliseconds_to_next_request > 0) {
          // Alternatively one could sleep for the necessary length of time
          return new Response("Rate limit exceeded", { status: 429 });
        }
      } catch (error) {
        return new Response("Could not connect to rate limiter", { status: 502 });
      }


      // TODO: Implement me
      return new Response("Call some upstream resource...");
    },
  } satisfies ExportedHandler<Env>;


  // Durable Object
  export class RateLimiter extends DurableObject {
    static readonly milliseconds_per_request = 1;
    static readonly milliseconds_for_updates = 5000;
    static readonly capacity = 10000;


    tokens: number;


    constructor(ctx: DurableObjectState, env: Env) {
      super(ctx, env);
      this.tokens = RateLimiter.capacity;
    }


    async getMillisecondsToNextRequest(): Promise<number> {
      this.checkAndSetAlarm();


      let milliseconds_to_next_request = RateLimiter.milliseconds_per_request;
      if (this.tokens > 0) {
        this.tokens -= 1;
        milliseconds_to_next_request = 0;
      }


      return milliseconds_to_next_request;
    }


    private async checkAndSetAlarm() {
      let currentAlarm = await this.ctx.storage.getAlarm();
      if (currentAlarm == null) {
        this.ctx.storage.setAlarm(
          Date.now() +
            RateLimiter.milliseconds_for_updates *
              RateLimiter.milliseconds_per_request,
        );
      }
    }


    async alarm() {
      if (this.tokens < RateLimiter.capacity) {
        this.tokens = Math.min(
          RateLimiter.capacity,
          this.tokens + RateLimiter.milliseconds_for_updates,
        );
        this.checkAndSetAlarm();
      }
    }
  }
  ```

While the token bucket algorithm is popular for implementing rate limiting and uses Durable Object features, there is a simpler approach:

* JavaScript

  ```js
  import { DurableObject } from "cloudflare:workers";


  // Durable Object
  export class RateLimiter extends DurableObject {
    static milliseconds_per_request = 1;
    static milliseconds_for_grace_period = 5000;


    constructor(ctx, env) {
      super(ctx, env);
      this.nextAllowedTime = 0;
    }


    async getMillisecondsToNextRequest() {
      const now = Date.now();


      this.nextAllowedTime = Math.max(now, this.nextAllowedTime);
      this.nextAllowedTime += RateLimiter.milliseconds_per_request;


      const value = Math.max(
        0,
        this.nextAllowedTime - now - RateLimiter.milliseconds_for_grace_period,
      );
      return value;
    }
  }
  ```

* TypeScript

  ```ts
  import { DurableObject } from "cloudflare:workers";


  // Durable Object
  export class RateLimiter extends DurableObject {
    static milliseconds_per_request = 1;
    static milliseconds_for_grace_period = 5000;


    nextAllowedTime: number;


    constructor(ctx: DurableObjectState, env: Env) {
      super(ctx, env);
      this.nextAllowedTime = 0;
    }


    async getMillisecondsToNextRequest(): Promise<number> {
      const now = Date.now();


      this.nextAllowedTime = Math.max(now, this.nextAllowedTime);
      this.nextAllowedTime += RateLimiter.milliseconds_per_request;


      const value = Math.max(
        0,
        this.nextAllowedTime - now - RateLimiter.milliseconds_for_grace_period,
      );
      return value;
    }
  }
  ```

Finally, configure your Wrangler file to include a Durable Object [binding](https://developers.cloudflare.com/durable-objects/get-started/#4-configure-durable-object-bindings) and [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

* wrangler.jsonc

  ```jsonc
  {
    "name": "my-counter",
    "main": "src/index.ts",
    "durable_objects": {
      "bindings": [
        {
          "name": "RATE_LIMITER",
          "class_name": "RateLimiter"
        }
      ]
    },
    "migrations": [
      {
        "tag": "v1",
        "new_sqlite_classes": [
          "RateLimiter"
        ]
      }
    ]
  }
  ```

* wrangler.toml

  ```toml
  name = "my-counter"
  main = "src/index.ts"


  [[durable_objects.bindings]]
  name = "RATE_LIMITER"
  class_name = "RateLimiter"


  [[migrations]]
  tag = "v1"
  new_sqlite_classes = ["RateLimiter"]
  ```

### Related resources

* Learn more about Durable Object's [Alarms API](https://developers.cloudflare.com/durable-objects/api/alarms) and how to configure alarms.
* [Understand how to troubleshoot](https://developers.cloudflare.com/durable-objects/observability/troubleshooting/) common errors related with Durable Objects.
* Review how [Durable Objects are priced](https://developers.cloudflare.com/durable-objects/platform/pricing/), including pricing examples.

</page>

<page>
---
title: Durable Object in-memory state · Cloudflare Durable Objects docs
description: Create a Durable Object that stores the last location it was
  accessed from in-memory.
lastUpdated: 2025-04-15T13:47:35.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/examples/durable-object-in-memory-state/
  md: https://developers.cloudflare.com/durable-objects/examples/durable-object-in-memory-state/index.md
---

This example shows you how Durable Objects are stateful, meaning in-memory state can be retained between requests. After a brief period of inactivity, the Durable Object will be evicted, and all in-memory state will be lost. The next request will reconstruct the object, but instead of showing the city of the previous request, it will display a message indicating that the object has been reinitialized. If you need your applications state to survive eviction, write the state to storage by using the [Storage API](https://developers.cloudflare.com/durable-objects/api/storage-api/), or by storing your data elsewhere.

```js
import { DurableObject } from "cloudflare:workers";


// Worker
export default {
  async fetch(request, env) {
    return await handleRequest(request, env);
  },
};


async function handleRequest(request, env) {
  let id = env.LOCATION.idFromName("A");
  let obj = env.LOCATION.get(id);
  // Forward the request to the remote Durable Object.
  let resp = await obj.fetch(request);
  // Return the response to the client.
  return new Response(await resp.text());
}


// Durable Object
export class Location extends DurableObject {
  constructor(state, env) {
    this.state = state;
    // Upon construction, you do not have a location to provide.
    // This value will be updated as people access the Durable Object.
    // When the Durable Object is evicted from memory, this will be reset.
    this.location = null;
  }


  // Handle HTTP requests from clients.
  async fetch(request) {
    let response = null;


    if (this.location == null) {
      response = new String(`
This is the first request, you called the constructor, so this.location was null.
You will set this.location to be your city: (${request.cf.city}). Try reloading the page.`);
    } else {
      response = new String(`
The Durable Object was already loaded and running because it recently handled a request.


Previous Location: ${this.location}
New Location: ${request.cf.city}`);
    }


    // You set the new location to be the new city.
    this.location = request.cf.city;
    console.log(response);
    return new Response(response);
  }
}
```

Finally, configure your Wrangler file to include a Durable Object [binding](https://developers.cloudflare.com/durable-objects/get-started/#4-configure-durable-object-bindings) and [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

* wrangler.jsonc

  ```jsonc
  {
    "name": "durable-object-in-memory-state",
    "main": "src/index.ts",
    "durable_objects": {
      "bindings": [
        {
          "name": "LOCATION",
          "class_name": "Location"
        }
      ]
    },
    "migrations": [
      {
        "tag": "v1",
        "new_sqlite_classes": [
          "Location"
        ]
      }
    ]
  }
  ```

* wrangler.toml

  ```toml
  name = "durable-object-in-memory-state"
  main = "src/index.ts"


  [[durable_objects.bindings]]
  name = "LOCATION"
  class_name = "Location"


  [[migrations]]
  tag = "v1"
  new_sqlite_classes = ["Location"]
  ```

</page>

<page>
---
title: Durable Object Time To Live · Cloudflare Durable Objects docs
description: Use the Durable Objects Alarms API to implement a Time To Live
  (TTL) for Durable Object instances.
lastUpdated: 2025-05-29T21:14:22.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/examples/durable-object-ttl/
  md: https://developers.cloudflare.com/durable-objects/examples/durable-object-ttl/index.md
---

A common feature request for Durable Objects is a Time To Live (TTL) for Durable Object instances. Durable Objects give developers the tools to implement a custom TTL in only a few lines of code. This example demonstrates how to implement a TTL making use of `alarms`. While this TTL will be extended upon every new request to the Durable Object, this can be customized based on a particular use case.

Be careful when calling `setAlarm` in the Durable Object class constructor

In this example the TTL is extended upon every new fetch request to the Durable Object. It might be tempting to instead extend the TTL in the constructor of the Durable Object. This is not advised because the Durable Object's constructor will be called before invoking the alarm handler if the alarm wakes the Durable Object up from hibernation. This approach will naively result in the constructor continually extending the TTL without running the alarm handler. If you must call `setAlarm` in the Durable Object class constructor be sure to check that there is no alarm previously set.

* JavaScript

  ```js
  import { DurableObject } from "cloudflare:workers";


  // Durable Object
  export class MyDurableObject extends DurableObject {
    // Time To Live (TTL) in milliseconds
    timeToLiveMs = 1000;


    constructor(ctx, env) {
      super(ctx, env);
    }


    async fetch(_request) {
      // Extend the TTL immediately following every fetch request to a Durable Object.
      await this.ctx.storage.setAlarm(Date.now() + this.timeToLiveMs);
      ...
     }


    async alarm() {
      await this.ctx.storage.deleteAll();
    }
  }


  // Worker
  export default {
    async fetch(request, env) {
      const id = env.MY_DURABLE_OBJECT.idFromName("foo");
          const stub = env.MY_DURABLE_OBJECT.get(id)
      return await stub.fetch(request);
    },
  };
  ```

* TypeScript

  ```ts
  import { DurableObject } from "cloudflare:workers";


  export interface Env {
    MY_DURABLE_OBJECT: DurableObjectNamespace<MyDurableObject>;
  }


  // Durable Object
  export class MyDurableObject extends DurableObject {
    // Time To Live (TTL) in milliseconds
    timeToLiveMs = 1000;


    constructor(ctx: DurableObjectState, env: Env) {
      super(ctx, env);
    }


    async fetch(_request: Request) {
      // Extend the TTL immediately following every fetch request to a Durable Object.
      await this.ctx.storage.setAlarm(Date.now() + this.timeToLiveMs);
      ...
     }


    async alarm() {
      await this.ctx.storage.deleteAll();
    }
  }


  // Worker
  export default {
    async fetch(request, env) {
      const id = env.MY_DURABLE_OBJECT.idFromName("foo");
          const stub = env.MY_DURABLE_OBJECT.get(id)
      return await stub.fetch(request);
    },
  } satisfies ExportedHandler<Env>;
  ```

To test and deploy this example, configure your Wrangler file to include a Durable Object [binding](https://developers.cloudflare.com/durable-objects/get-started/#4-configure-durable-object-bindings) and [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

* wrangler.jsonc

  ```jsonc
  {
    "name": "durable-object-ttl",
    "main": "src/index.ts",
    "durable_objects": {
      "bindings": [
        {
          "name": "MY_DURABLE_OBJECT",
          "class_name": "MyDurableObject"
        }
      ]
    },
    "migrations": [
      {
        "tag": "v1",
        "new_sqlite_classes": [
          "MyDurableObject"
        ]
      }
    ]
  }
  ```

* wrangler.toml

  ```toml
  name = "durable-object-ttl"
  main = "src/index.ts"


  [[durable_objects.bindings]]
  name = "MY_DURABLE_OBJECT"
  class_name = "MyDurableObject"


  [[migrations]]
  tag = "v1"
  new_sqlite_classes = ["MyDurableObject"]
  ```

</page>

<page>
---
title: Use RpcTarget class to handle Durable Object metadata · Cloudflare
  Durable Objects docs
description: Access the name from within a Durable Object using RpcTarget.
lastUpdated: 2025-06-02T18:53:41.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/examples/reference-do-name-using-init/
  md: https://developers.cloudflare.com/durable-objects/examples/reference-do-name-using-init/index.md
---

When working with Durable Objects, you will need to access the name that was used to create the Durable Object via `idFromName()`. This name is typically a meaningful identifier that represents what the Durable Object is responsible for (like a user ID, room name, or resource identifier).

However, there is a limitation in the current implementation: even though you can create a Durable Object with `.idFromName(name)`, you cannot directly access this name inside the Durable Object via `this.ctx.id.name`.

The `RpcTarget` pattern shown below offers a solution by creating a communication layer that automatically carries the name with each method call. This keeps your API clean while ensuring the Durable Object has access to its own name.

Based on your needs, you can either store the metadata temporarily in the `RpcTarget` class, or use Durable Object storage to persist the metadata for the lifetime of the object.

This example does not persist the Durable Object metadata. It demonstrates how to:

1. Create an `RpcTarget` class
2. Set the Durable Object metadata (identifier in this example) in the `RpcTarget` class
3. Pass the metadata to a Durable Object method
4. Clean up the `RpcTarget` class after use

```ts
import { DurableObject, RpcTarget } from "cloudflare:workers";


//  * Create an RpcDO class that extends RpcTarget
//  * Use this class to set the Durable Object metadata
//  * Pass the metadata in the Durable Object methods
//  * @param mainDo - The main Durable Object class
//  * @param doIdentifier - The identifier of the Durable Object


export class RpcDO extends RpcTarget {
  constructor(
    private mainDo: MyDurableObject,
    private doIdentifier: string,
  ) {
    super();
  }


  //  * Pass the user's name to the Durable Object method
  //  * @param userName - The user's name to pass to the Durable Object method


  async computeMessage(userName: string): Promise<string> {
    // Call the Durable Object method and pass the user's name and the Durable Object identifier
    return this.mainDo.computeMessage(userName, this.doIdentifier);
  }


  //  * Call the Durable Object method without using the Durable Object identifier
  //  * @param userName - The user's name to pass to the Durable Object method


  async simpleGreeting(userName: string) {
    return this.mainDo.simpleGreeting(userName);
  }
}


//  * Create a Durable Object class
//  * You can use the RpcDO class to set the Durable Object metadata


export class MyDurableObject extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }


  //  * Initialize the RpcDO class
  //  * You can set the Durable Object metadata here
  //  * It returns an instance of the RpcDO class
  //  * @param doIdentifier - The identifier of the Durable Object


  async setMetaData(doIdentifier: string) {
    return new RpcDO(this, doIdentifier);
  }


  //  * Function that computes a greeting message using the user's name and DO identifier
  //  * @param userName - The user's name to include in the greeting
  //  * @param doIdentifier - The identifier of the Durable Object


  async computeMessage(
    userName: string,
    doIdentifier: string,
  ): Promise<string> {
    console.log({
      userName: userName,
      durableObjectIdentifier: doIdentifier,
    });
    return `Hello, ${userName}! The identifier of this DO is ${doIdentifier}`;
  }


  //  * Function that is not in the RpcTarget
  //  * Not every function has to be in the RpcTarget


  private async notInRpcTarget() {
    return "This is not in the RpcTarget";
  }


  //  * Function that takes the user's name and does not use the Durable Object identifier
  //  * @param userName - The user's name to include in the greeting


  async simpleGreeting(userName: string) {
    // Call the private function that is not in the RpcTarget
    console.log(this.notInRpcTarget());


    return `Hello, ${userName}! This doesn't use the DO identifier.`;
  }
}


export default {
  async fetch(request, env, ctx): Promise<Response> {
    let id: DurableObjectId = env.MY_DURABLE_OBJECT.idFromName(
      new URL(request.url).pathname,
    );
    let stub = env.MY_DURABLE_OBJECT.get(id);


    //  * Set the Durable Object metadata using the RpcTarget
    //  * Notice that no await is needed here


    const rpcTarget = stub.setMetaData(id.name ?? "default");


    // Call the Durable Object method using the RpcTarget.
    // The DO identifier is passed in the RpcTarget
    const greeting = await rpcTarget.computeMessage("world");


    // Call the Durable Object method that does not use the Durable Object identifier
    const simpleGreeting = await rpcTarget.simpleGreeting("world");


    // Clean up the RpcTarget.
    try {
      (await rpcTarget)[Symbol.dispose]?.();
      console.log("RpcTarget cleaned up.");
    } catch (e) {
      console.error({
        message: "RpcTarget could not be cleaned up.",
        error: String(e),
        errorProperties: e,
      });
    }


    return new Response(greeting, { status: 200 });
  },
} satisfies ExportedHandler<Env>;
```

This example persists the Durable Object metadata. It demonstrates similar steps as the previous example, but uses Durable Object storage to store the identifier, eliminating the need to pass it through the RpcTarget.

```ts
import { DurableObject, RpcTarget } from "cloudflare:workers";


//  * Create an RpcDO class that extends RpcTarget
//  * Use this class to set the Durable Object metadata
//  * Pass the metadata in the Durable Object methods
//  * @param mainDo - The main Durable Object class
//  * @param doIdentifier - The identifier of the Durable Object


export class RpcDO extends RpcTarget {
  constructor(
    private mainDo: MyDurableObject,
    private doIdentifier: string,
  ) {
    super();
  }


  //  * Pass the user's name to the Durable Object method
  //  * @param userName - The user's name to pass to the Durable Object method


  async computeMessage(userName: string): Promise<string> {
    // Call the Durable Object method and pass the user's name and the Durable Object identifier
    return this.mainDo.computeMessage(userName, this.doIdentifier);
  }


  //  * Call the Durable Object method without using the Durable Object identifier
  //  * @param userName - The user's name to pass to the Durable Object method


  async simpleGreeting(userName: string) {
    return this.mainDo.simpleGreeting(userName);
  }
}


//  * Create a Durable Object class
//  * You can use the RpcDO class to set the Durable Object metadata


export class MyDurableObject extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }


  //  * Initialize the RpcDO class
  //  * You can set the Durable Object metadata here
  //  * It returns an instance of the RpcDO class
  //  * @param doIdentifier - The identifier of the Durable Object


  async setMetaData(doIdentifier: string) {
    // Use DO storage to store the Durable Object identifier
    await this.ctx.storage.put("doIdentifier", doIdentifier);
    return new RpcDO(this, doIdentifier);
  }


  //  * Function that computes a greeting message using the user's name and DO identifier
  //  * @param userName - The user's name to include in the greeting


  async computeMessage(userName: string): Promise<string> {
    // Get the DO identifier from storage
    const doIdentifier = await this.ctx.storage.get("doIdentifier");
    console.log({
      userName: userName,
      durableObjectIdentifier: doIdentifier,
    });
    return `Hello, ${userName}! The identifier of this DO is ${doIdentifier}`;
  }


  //  * Function that is not in the RpcTarget
  //  * Not every function has to be in the RpcTarget


  private async notInRpcTarget() {
    return "This is not in the RpcTarget";
  }


  //  * Function that takes the user's name and does not use the Durable Object identifier
  //  * @param userName - The user's name to include in the greeting


  async simpleGreeting(userName: string) {
    // Call the private function that is not in the RpcTarget
    console.log(this.notInRpcTarget());


    return `Hello, ${userName}! This doesn't use the DO identifier.`;
  }
}


export default {
  async fetch(request, env, ctx): Promise<Response> {
    let id: DurableObjectId = env.MY_DURABLE_OBJECT.idFromName(
      new URL(request.url).pathname,
    );
    let stub = env.MY_DURABLE_OBJECT.get(id);


    //  * Set the Durable Object metadata using the RpcTarget
    //  * Notice that no await is needed here


    const rpcTarget = stub.setMetaData(id.name ?? "default");


    // Call the Durable Object method using the RpcTarget.
    // The DO identifier is stored in the Durable Object's storage
    const greeting = await rpcTarget.computeMessage("world");


    // Call the Durable Object method that does not use the Durable Object identifier
    const simpleGreeting = await rpcTarget.simpleGreeting("world");


    // Clean up the RpcTarget.
    try {
      (await rpcTarget)[Symbol.dispose]?.();
      console.log("RpcTarget cleaned up.");
    } catch (e) {
      console.error({
        message: "RpcTarget could not be cleaned up.",
        error: String(e),
        errorProperties: e,
      });
    }


    return new Response(greeting, { status: 200 });
  },
} satisfies ExportedHandler<Env>;
```

</page>

<page>
---
title: Testing with Durable Objects · Cloudflare Durable Objects docs
description: Write tests for Durable Objects.
lastUpdated: 2025-03-13T13:31:43.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/examples/testing-with-durable-objects/
  md: https://developers.cloudflare.com/durable-objects/examples/testing-with-durable-objects/index.md
---

```ts
import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";


describe("Worker", () => {
  let worker: UnstableDevWorker;


  beforeAll(async () => {
    worker = await unstable_dev("src/index.ts", {
      experimental: { disableExperimentalWarning: true },
    });
  });


  afterAll(async () => {
    await worker.stop();
  });


  it("should deny request for short paths", async () => {
    const cases = {
      failures: ["/", "/foo", "/foo/", "/%2F"],
    };
    for (const path of cases.failures) {
      const resp = await worker.fetch(`http://example.com${path}`);
      if (resp) {
        const text = await resp.text();
        expect(text).toMatchInlineSnapshot(
          '"path must be at least 5 characters"',
        );
      }
    }
  });


  describe("durable object", () => {
    it("Should send text from a POST to a matching GET", async () => {
      const path = "/stuff1";
      const url = `http://example.com${path}`;


      // The get request should wait for the post request to complete
      const getResponsePromise = worker.fetch(url);


      // The post request to the same path should receive a response that the text was consumed
      const postResponse = await worker.fetch(url, {
        method: "POST",
        body: "Hello World 12345",
      });
      expect(postResponse.status).toBe(200);
      const postText = await postResponse.text();
      expect(postText).toBe("The text was consumed!");


      // The get request should now receive the text
      const getResponse = await getResponsePromise;
      expect(getResponse.status).toBe(200);
      const text = await getResponse.text();
      expect(text).toBe("Hello World 12345");
    });


    it("Shouldn't send text from a POST to a different GET", async () => {
      const path1 = "/stuff1";
      const path2 = "/stuff2";
      const url = (p: string) => `http://example.com${p}`;


      // The get request should wait for the post request to complete
      const getResponsePromise1 = worker.fetch(url(path1));
      const getResponsePromise2 = worker.fetch(url(path2));


      // The post request to the same path should receive a response that the text was consumed
      const postResponse1 = await worker.fetch(url(path1), {
        method: "POST",
        body: "Hello World 12345",
      });
      expect(postResponse1.status).toBe(200);
      const postText1 = await postResponse1.text();
      expect(postText1).toBe("The text was consumed!");


      const postResponse2 = await worker.fetch(url(path2), {
        method: "POST",
        body: "Hello World 789",
      });
      expect(postResponse2.status).toBe(200);
      const postText2 = await postResponse2.text();
      expect(postText2).toBe("The text was consumed!");


      // The get request should now receive the text
      const getResponse1 = await getResponsePromise1;
      expect(getResponse1.status).toBe(200);
      const text1 = await getResponse1.text();
      expect(text1).toBe("Hello World 12345");


      const getResponse2 = await getResponsePromise2;
      expect(getResponse2.status).toBe(200);
      const text2 = await getResponse2.text();
      expect(text2).toBe("Hello World 789");
    });


    it("Should not send the same POST twice", async () => {
      const path = "/stuff1";
      const url = (p: string) => `http://example.com${p}`;


      // The get request should wait for the post request to complete
      const getResponsePromise1 = worker.fetch(url(path));


      // The post request to the same path should receive a response that the text was consumed
      const postResponse1 = await worker.fetch(url(path), {
        method: "POST",
        body: "Hello World 12345",
      });
      expect(postResponse1.status).toBe(200);
      const postText1 = await postResponse1.text();
      expect(postText1).toBe("The text was consumed!");


      // The get request should now receive the text
      const getResponse1 = await getResponsePromise1;
      expect(getResponse1.status).toBe(200);
      const text1 = await getResponse1.text();
      expect(text1).toBe("Hello World 12345");


      // The next get request should wait for the next post request to complete
      const getResponsePromise2 = worker.fetch(url(path));


      // Send a new POST with different text
      const postResponse2 = await worker.fetch(url(path), {
        method: "POST",
        body: "Hello World 789",
      });
      expect(postResponse2.status).toBe(200);
      const postText2 = await postResponse2.text();
      expect(postText2).toBe("The text was consumed!");


      // The get request should receive the new text, not the old text
      const getResponse2 = await getResponsePromise2;
      expect(getResponse2.status).toBe(200);
      const text2 = await getResponse2.text();
      expect(text2).toBe("Hello World 789");
    });
  });
});
```

Find the [full code for this example on GitHub](https://github.com/jahands/do-demo).

</page>

<page>
---
title: Durable Objects - Use KV within Durable Objects · Cloudflare Durable
  Objects docs
description: Read and write to/from KV within a Durable Object
lastUpdated: 2025-04-15T13:47:35.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/examples/use-kv-from-durable-objects/
  md: https://developers.cloudflare.com/durable-objects/examples/use-kv-from-durable-objects/index.md
---

The following Worker script shows you how to configure a Durable Object to read from and/or write to a [Workers KV namespace](https://developers.cloudflare.com/kv/concepts/how-kv-works/). This is useful when using a Durable Object to coordinate between multiple clients, and allows you to serialize writes to KV and/or broadcast a single read from KV to hundreds or thousands of clients connected to a single Durable Object [using WebSockets](https://developers.cloudflare.com/durable-objects/best-practices/websockets/).

Prerequisites:

* A [KV namespace](https://developers.cloudflare.com/kv/api/) created via the Cloudflare dashboard or the [wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).
* A [configured binding](https://developers.cloudflare.com/kv/concepts/kv-bindings/) for the `kv_namespace` in the Cloudflare dashboard or Wrangler file.
* A [Durable Object namespace binding](https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects).

Configure your Wrangler file as follows:

* wrangler.jsonc

  ```jsonc
  {
    "name": "my-worker",
    "main": "src/index.ts",
    "kv_namespaces": [
      {
        "binding": "YOUR_KV_NAMESPACE",
        "id": "<id_of_your_namespace>"
      }
    ],
    "durable_objects": {
      "bindings": [
        {
          "name": "YOUR_DO_CLASS",
          "class_name": "YourDurableObject"
        }
      ]
    }
  }
  ```

* wrangler.toml

  ```toml
  name = "my-worker"
  main = "src/index.ts"


  kv_namespaces = [
    { binding = "YOUR_KV_NAMESPACE", id = "<id_of_your_namespace>" }
  ]


  [durable_objects]
  bindings = [
    { name = "YOUR_DO_CLASS", class_name = "YourDurableObject" }
  ]
  ```

```ts
import { DurableObject } from 'cloudflare:workers';


interface Env {
  YOUR_KV_NAMESPACE: KVNamespace;
  YOUR_DO_CLASS: DurableObjectNamespace;
}


export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    // Assume each Durable Object is mapped to a roomId in a query parameter
    // In a production application, this will likely be a roomId defined by your application
    // that you validate (and/or authenticate) first.
    let url = new URL(req.url);
    let roomIdParam = url.searchParams.get("roomId");


    if (roomIdParam) {
      // Create (or get) a Durable Object based on that roomId.
      let durableObjectId = env.YOUR_DO_CLASS.idFromName(roomIdParam);
      // Get a "stub" that allows you to call that Durable Object
      let durableObjectStub = env.YOUR_DO_CLASS.get(durableObjectId);


      // Pass the request to that Durable Object and await the response
      // This invokes the constructor once on your Durable Object class (defined further down)
      // on the first initialization, and the fetch method on each request.
      //
      // You could pass the original Request to the Durable Object's fetch method
      // or a simpler URL with just the roomId.
      let response = await durableObjectStub.fetch(`http://do/${roomId}`);


      // This would return the value you read from KV *within* the Durable Object.
      return response;
    }
  }
}


export class YourDurableObject extends DurableObject {
  constructor(public state: DurableObjectState, env: Env) {
    this.state = state;
    // Ensure you pass your bindings and environmental variables into
    // each Durable Object when it is initialized
    this.env = env;
  }


  async fetch(request: Request) {
    // Error handling elided for brevity.
    // Write to KV
    await this.env.YOUR_KV_NAMESPACE.put("some-key");


    // Fetch from KV
    let val = await this.env.YOUR_KV_NAMESPACE.get("some-other-key");


    return Response.json(val);
  }
}
```

</page>

<page>
---
title: Build a WebSocket server with WebSocket Hibernation · Cloudflare Durable
  Objects docs
description: Build a WebSocket server using WebSocket Hibernation on Durable
  Objects and Workers.
lastUpdated: 2025-04-15T13:47:35.000Z
chatbotDeprioritize: false
tags: WebSockets
source_url:
  html: https://developers.cloudflare.com/durable-objects/examples/websocket-hibernation-server/
  md: https://developers.cloudflare.com/durable-objects/examples/websocket-hibernation-server/index.md
---

This example is similar to the [Build a WebSocket server](https://developers.cloudflare.com/durable-objects/examples/websocket-server/) example, but uses the WebSocket Hibernation API. The WebSocket Hibernation API should be preferred for WebSocket server applications built on Durable Objects, since it significantly decreases duration charge, and provides additional features that pair well with WebSocket applications. For more information, refer to [Use Durable Objects with WebSockets](https://developers.cloudflare.com/durable-objects/best-practices/websockets/).

Note

WebSocket Hibernation is unavailable for outgoing WebSocket use cases. Hibernation is only supported when the Durable Object acts as a server. For use cases where outgoing WebSockets are required, refer to [Write a WebSocket client](https://developers.cloudflare.com/workers/examples/websockets/#write-a-websocket-client).

* JavaScript

  ```js
  import { DurableObject } from "cloudflare:workers";


  // Worker
  export default {
    async fetch(request, env, ctx) {
      if (request.url.endsWith("/websocket")) {
        // Expect to receive a WebSocket Upgrade request.
        // If there is one, accept the request and return a WebSocket Response.
        const upgradeHeader = request.headers.get("Upgrade");
        if (!upgradeHeader || upgradeHeader !== "websocket") {
          return new Response("Durable Object expected Upgrade: websocket", {
            status: 426,
          });
        }


        // This example will refer to the same Durable Object,
        // since the name "foo" is hardcoded.
        let id = env.WEBSOCKET_HIBERNATION_SERVER.idFromName("foo");
        let stub = env.WEBSOCKET_HIBERNATION_SERVER.get(id);


        return stub.fetch(request);
      }


      return new Response(null, {
        status: 400,
        statusText: "Bad Request",
        headers: {
          "Content-Type": "text/plain",
        },
      });
    },
  };


  // Durable Object
  export class WebSocketHibernationServer extends DurableObject {
    async fetch(request) {
      // Creates two ends of a WebSocket connection.
      const webSocketPair = new WebSocketPair();
      const [client, server] = Object.values(webSocketPair);


      // Calling `acceptWebSocket()` informs the runtime that this WebSocket is to begin terminating
      // request within the Durable Object. It has the effect of "accepting" the connection,
      // and allowing the WebSocket to send and receive messages.
      // Unlike `ws.accept()`, `state.acceptWebSocket(ws)` informs the Workers Runtime that the WebSocket
      // is "hibernatable", so the runtime does not need to pin this Durable Object to memory while
      // the connection is open. During periods of inactivity, the Durable Object can be evicted
      // from memory, but the WebSocket connection will remain open. If at some later point the
      // WebSocket receives a message, the runtime will recreate the Durable Object
      // (run the `constructor`) and deliver the message to the appropriate handler.
      this.ctx.acceptWebSocket(server);


      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    }


    async webSocketMessage(ws, message) {
      // Upon receiving a message from the client, reply with the same message,
      // but will prefix the message with "[Durable Object]: " and return the
      // total number of connections.
      ws.send(
        `[Durable Object] message: ${message}, connections: ${this.ctx.getWebSockets().length}`,
      );
    }


    async webSocketClose(ws, code, reason, wasClean) {
      // If the client closes the connection, the runtime will invoke the webSocketClose() handler.
      ws.close(code, "Durable Object is closing WebSocket");
    }
  }
  ```

* TypeScript

  ```ts
  import { DurableObject } from "cloudflare:workers";


  export interface Env {
    WEBSOCKET_HIBERNATION_SERVER: DurableObjectNamespace<WebSocketHibernationServer>;
  }


  // Worker
  export default {
    async fetch(
      request: Request,
      env: Env,
      ctx: ExecutionContext,
    ): Promise<Response> {
      if (request.url.endsWith("/websocket")) {
        // Expect to receive a WebSocket Upgrade request.
        // If there is one, accept the request and return a WebSocket Response.
        const upgradeHeader = request.headers.get("Upgrade");
        if (!upgradeHeader || upgradeHeader !== "websocket") {
          return new Response("Durable Object expected Upgrade: websocket", {
            status: 426,
          });
        }


        // This example will refer to the same Durable Object,
        // since the name "foo" is hardcoded.
        let id = env.WEBSOCKET_HIBERNATION_SERVER.idFromName("foo");
        let stub = env.WEBSOCKET_HIBERNATION_SERVER.get(id);


        return stub.fetch(request);
      }


      return new Response(null, {
        status: 400,
        statusText: "Bad Request",
        headers: {
          "Content-Type": "text/plain",
        },
      });
    },
  };


  // Durable Object
  export class WebSocketHibernationServer extends DurableObject {
    async fetch(request: Request): Promise<Response> {
      // Creates two ends of a WebSocket connection.
      const webSocketPair = new WebSocketPair();
      const [client, server] = Object.values(webSocketPair);


      // Calling `acceptWebSocket()` informs the runtime that this WebSocket is to begin terminating
      // request within the Durable Object. It has the effect of "accepting" the connection,
      // and allowing the WebSocket to send and receive messages.
      // Unlike `ws.accept()`, `state.acceptWebSocket(ws)` informs the Workers Runtime that the WebSocket
      // is "hibernatable", so the runtime does not need to pin this Durable Object to memory while
      // the connection is open. During periods of inactivity, the Durable Object can be evicted
      // from memory, but the WebSocket connection will remain open. If at some later point the
      // WebSocket receives a message, the runtime will recreate the Durable Object
      // (run the `constructor`) and deliver the message to the appropriate handler.
      this.ctx.acceptWebSocket(server);


      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    }


    async webSocketMessage(ws: WebSocket, message: ArrayBuffer | string) {
      // Upon receiving a message from the client, the server replies with the same message,
      // and the total number of connections with the "[Durable Object]: " prefix
      ws.send(
        `[Durable Object] message: ${message}, connections: ${this.ctx.getWebSockets().length}`,
      );
    }


    async webSocketClose(
      ws: WebSocket,
      code: number,
      reason: string,
      wasClean: boolean,
    ) {
      // If the client closes the connection, the runtime will invoke the webSocketClose() handler.
      ws.close(code, "Durable Object is closing WebSocket");
    }
  }
  ```

Finally, configure your Wrangler file to include a Durable Object [binding](https://developers.cloudflare.com/durable-objects/get-started/#4-configure-durable-object-bindings) and [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

* wrangler.jsonc

  ```jsonc
  {
    "name": "websocket-hibernation-server",
    "main": "src/index.ts",
    "durable_objects": {
      "bindings": [
        {
          "name": "WEBSOCKET_HIBERNATION_SERVER",
          "class_name": "WebSocketHibernationServer"
        }
      ]
    },
    "migrations": [
      {
        "tag": "v1",
        "new_sqlite_classes": [
          "WebSocketHibernationServer"
        ]
      }
    ]
  }
  ```

* wrangler.toml

  ```toml
  name = "websocket-hibernation-server"
  main = "src/index.ts"


  [[durable_objects.bindings]]
  name = "WEBSOCKET_HIBERNATION_SERVER"
  class_name = "WebSocketHibernationServer"


  [[migrations]]
  tag = "v1"
  new_sqlite_classes = ["WebSocketHibernationServer"]
  ```

### Related resources

* [Durable Objects: Edge Chat Demo with Hibernation](https://github.com/cloudflare/workers-chat-demo/).

</page>

<page>
---
title: Build a WebSocket server · Cloudflare Durable Objects docs
description: Build a WebSocket server using Durable Objects and Workers.
lastUpdated: 2025-04-15T13:47:35.000Z
chatbotDeprioritize: false
tags: WebSockets
source_url:
  html: https://developers.cloudflare.com/durable-objects/examples/websocket-server/
  md: https://developers.cloudflare.com/durable-objects/examples/websocket-server/index.md
---

This example shows how to build a WebSocket server using Durable Objects and Workers. The example exposes an endpoint to create a new WebSocket connection. This WebSocket connection echos any message while including the total number of WebSocket connections currently established. For more information, refer to [Use Durable Objects with WebSockets](https://developers.cloudflare.com/durable-objects/best-practices/websockets/).

Warning

WebSocket connections pin your Durable Object to memory, and so duration charges will be incurred so long as the WebSocket is connected (regardless of activity). To avoid duration charges during periods of inactivity, use the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/examples/websocket-hibernation-server/), which only charges for duration when JavaScript is actively executing.

* JavaScript

  ```js
  import { DurableObject } from "cloudflare:workers";


  // Worker
  export default {
    async fetch(request, env, ctx) {
      if (request.url.endsWith("/websocket")) {
        // Expect to receive a WebSocket Upgrade request.
        // If there is one, accept the request and return a WebSocket Response.
        const upgradeHeader = request.headers.get("Upgrade");
        if (!upgradeHeader || upgradeHeader !== "websocket") {
          return new Response("Durable Object expected Upgrade: websocket", {
            status: 426,
          });
        }


        // This example will refer to the same Durable Object,
        // since the name "foo" is hardcoded.
        let id = env.WEBSOCKET_SERVER.idFromName("foo");
        let stub = env.WEBSOCKET_SERVER.get(id);


        return stub.fetch(request);
      }


      return new Response(null, {
        status: 400,
        statusText: "Bad Request",
        headers: {
          "Content-Type": "text/plain",
        },
      });
    },
  };


  // Durable Object
  export class WebSocketServer extends DurableObject {
    currentlyConnectedWebSockets;


    constructor(ctx, env) {
      // This is reset whenever the constructor runs because
      // regular WebSockets do not survive Durable Object resets.
      //
      // WebSockets accepted via the Hibernation API can survive
      // a certain type of eviction, but we will not cover that here.
      super(ctx, env);
      this.currentlyConnectedWebSockets = 0;
    }


    async fetch(request) {
      // Creates two ends of a WebSocket connection.
      const webSocketPair = new WebSocketPair();
      const [client, server] = Object.values(webSocketPair);


      // Calling `accept()` tells the runtime that this WebSocket is to begin terminating
      // request within the Durable Object. It has the effect of "accepting" the connection,
      // and allowing the WebSocket to send and receive messages.
      server.accept();
      this.currentlyConnectedWebSockets += 1;


      // Upon receiving a message from the client, the server replies with the same message,
      // and the total number of connections with the "[Durable Object]: " prefix
      server.addEventListener("message", (event) => {
        server.send(
          `[Durable Object] currentlyConnectedWebSockets: ${this.currentlyConnectedWebSockets}`,
        );
      });


      // If the client closes the connection, the runtime will close the connection too.
      server.addEventListener("close", (cls) => {
        this.currentlyConnectedWebSockets -= 1;
        server.close(cls.code, "Durable Object is closing WebSocket");
      });


      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    }
  }
  ```

* TypeScript

  ```ts
  import { DurableObject } from "cloudflare:workers";


  export interface Env {
    WEBSOCKET_SERVER: DurableObjectNamespace<WebSocketServer>;
  }


  // Worker
  export default {
    async fetch(request, env, ctx): Promise<Response> {
      if (request.url.endsWith("/websocket")) {
        // Expect to receive a WebSocket Upgrade request.
        // If there is one, accept the request and return a WebSocket Response.
        const upgradeHeader = request.headers.get("Upgrade");
        if (!upgradeHeader || upgradeHeader !== "websocket") {
          return new Response("Durable Object expected Upgrade: websocket", {
            status: 426,
          });
        }


        // This example will refer to the same Durable Object,
        // since the name "foo" is hardcoded.
        let id = env.WEBSOCKET_SERVER.idFromName("foo");
        let stub = env.WEBSOCKET_SERVER.get(id);


        return stub.fetch(request);
      }


      return new Response(null, {
        status: 400,
        statusText: "Bad Request",
        headers: {
          "Content-Type": "text/plain",
        },
      });
    },
  } satisfies ExportedHandler<Env>;


  // Durable Object
  export class WebSocketServer extends DurableObject {
    currentlyConnectedWebSockets: number;


    constructor(ctx: DurableObjectState, env: Env) {
      // This is reset whenever the constructor runs because
      // regular WebSockets do not survive Durable Object resets.
      //
      // WebSockets accepted via the Hibernation API can survive
      // a certain type of eviction, but we will not cover that here.
      super(ctx, env);
      this.currentlyConnectedWebSockets = 0;
    }


    async fetch(request: Request): Promise<Response> {
      // Creates two ends of a WebSocket connection.
      const webSocketPair = new WebSocketPair();
      const [client, server] = Object.values(webSocketPair);


      // Calling `accept()` tells the runtime that this WebSocket is to begin terminating
      // request within the Durable Object. It has the effect of "accepting" the connection,
      // and allowing the WebSocket to send and receive messages.
      server.accept();
      this.currentlyConnectedWebSockets += 1;


      // Upon receiving a message from the client, the server replies with the same message,
      // and the total number of connections with the "[Durable Object]: " prefix
      server.addEventListener("message", (event: MessageEvent) => {
        server.send(
          `[Durable Object] currentlyConnectedWebSockets: ${this.currentlyConnectedWebSockets}`,
        );
      });


      // If the client closes the connection, the runtime will close the connection too.
      server.addEventListener("close", (cls: CloseEvent) => {
        this.currentlyConnectedWebSockets -= 1;
        server.close(cls.code, "Durable Object is closing WebSocket");
      });


      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    }
  }
  ```

Finally, configure your Wrangler file to include a Durable Object [binding](https://developers.cloudflare.com/durable-objects/get-started/#4-configure-durable-object-bindings) and [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

* wrangler.jsonc

  ```jsonc
  {
    "name": "websocket-server",
    "main": "src/index.ts",
    "durable_objects": {
      "bindings": [
        {
          "name": "WEBSOCKET_SERVER",
          "class_name": "WebSocketServer"
        }
      ]
    },
    "migrations": [
      {
        "tag": "v1",
        "new_sqlite_classes": [
          "WebSocketServer"
        ]
      }
    ]
  }
  ```

* wrangler.toml

  ```toml
  name = "websocket-server"
  main = "src/index.ts"


  [[durable_objects.bindings]]
  name = "WEBSOCKET_SERVER"
  class_name = "WebSocketServer"


  [[migrations]]
  tag = "v1"
  new_sqlite_classes = ["WebSocketServer"]
  ```

### Related resources

* [Durable Objects: Edge Chat Demo](https://github.com/cloudflare/workers-chat-demo).

</page>

<page>
---
title: Metrics and GraphQL analytics · Cloudflare Durable Objects docs
description: Durable Objects expose analytics for Durable Object namespace-level
  and request-level metrics.
lastUpdated: 2025-06-04T14:02:45.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/observability/graphql-analytics/
  md: https://developers.cloudflare.com/durable-objects/observability/graphql-analytics/index.md
---

Durable Objects expose analytics for Durable Object namespace-level and request-level metrics.

The metrics displayed in the [Cloudflare dashboard](https://dash.cloudflare.com/) charts are queried from Cloudflare's [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). You can access the metrics [programmatically via GraphQL](#query-via-the-graphql-api) or HTTP client.

Durable Object namespace

A Durable Object namespace is a set of Durable Objects that can be addressed by name, backed by the same class. There is only one Durable Object namespace per class. A Durable Object namespace can contain any number of Durable Objects.

## View metrics and analytics via the dashboard

Per-namespace analytics for Durable Objects are available in the Cloudflare dashboard. To view current and historical metrics for a namespace:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to [**Workers & Pages** > **Durable Objects**](https://dash.cloudflare.com/?to=/:account/workers/durable-objects).
3. View account-level Durable Objects usage.
4. Select an existing namespace.
5. Select the **Metrics** tab.

You can optionally select a time window to query. This defaults to the last 24 hours.

## Query via the GraphQL API

Durable Object metrics are powered by GraphQL.

The datasets that include Durable Object metrics include:

* `durableObjectsInvocationsAdaptiveGroups`
* `durableObjectsPeriodicGroups`
* `durableObjectsStorageGroups`
* `durableObjectsSubrequestsAdaptiveGroups`

Use [GraphQL Introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/) to get information on the fields exposed by each datasets.

### WebSocket metrics

Durable Objects using [WebSockets](https://developers.cloudflare.com/durable-objects/best-practices/websockets/) will see request metrics across several GraphQL datasets because WebSockets have different types of requests.

* Metrics for a WebSocket connection itself is represented in `durableObjectsInvocationsAdaptiveGroups` once the connection closes. Since WebSocket connections are long-lived, connections often do not terminate until the Durable Object terminates.
* Metrics for incoming and outgoing WebSocket messages on a WebSocket connection are available in `durableObjectsPeriodicGroups`. If a WebSocket connection uses [WebSocket Hibernation](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#websocket-hibernation-api), incoming WebSocket messages are instead represented in `durableObjectsInvocationsAdaptiveGroups`.

## Example GraphQL query for Durable Objects

```js
  viewer {
    /*
    Replace with your account tag, the 32 hex character id visible at the beginning of any url
    when logged in to dash.cloudflare.com or under "Account ID" on the sidebar of the Workers & Pages Overview
    */
    accounts(filter: {accountTag: "your account tag here"}) {
      // Replace dates with a recent date
      durableObjectsInvocationsAdaptiveGroups(filter: {date_gt: "2023-05-23"}, limit: 1000) {
        sum {
          // Any other fields found through introspection can be added here
          requests
          responseBodySize
        }
      }
      durableObjectsPeriodicGroups(filter: {date_gt: "2023-05-23"}, limit: 1000) {
        sum {
          cpuTime
        }
      }
      durableObjectsStorageGroups(filter: {date_gt: "2023-05-23"}, limit: 1000) {
        max {
          storedBytes
        }
      }
    }
  }
```

Refer to the [Querying Workers Metrics with GraphQL](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-workers-metrics/) tutorial for authentication and to learn more about querying Workers datasets.

## Additional resources

* For instructions on setting up a Grafana dashboard to query Cloudflare's GraphQL Analytics API, refer to [Grafana Dashboard starter for Durable Object metrics](https://github.com/TimoWilhelm/grafana-do-dashboard).

</page>

<page>
---
title: Troubleshooting · Cloudflare Durable Objects docs
description: wrangler dev and wrangler tail are both available to help you debug
  your Durable Objects.
lastUpdated: 2025-02-12T13:41:31.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/observability/troubleshooting/
  md: https://developers.cloudflare.com/durable-objects/observability/troubleshooting/index.md
---

## Debugging

[`wrangler dev`](https://developers.cloudflare.com/workers/wrangler/commands/#dev) and [`wrangler tail`](https://developers.cloudflare.com/workers/wrangler/commands/#tail) are both available to help you debug your Durable Objects.

The `wrangler dev --remote` command opens a tunnel from your local development environment to Cloudflare's global network, letting you test your Durable Objects code in the Workers environment as you write it.

`wrangler tail` displays a live feed of console and exception logs for each request served by your Worker code, including both normal Worker requests and Durable Object requests. After running `npx wrangler deploy`, you can use `wrangler tail` in the root directory of your Worker project and visit your Worker URL to see console and error logs in your terminal.

## Common errors

### No event handlers were registered. This script does nothing.

In your Wrangler file, make sure the `dir` and `main` entries point to the correct file containing your Worker code, and that the file extension is `.mjs` instead of `.js` if using ES modules syntax.

### Cannot apply `--delete-class` migration to class.

When deleting a migration using `npx wrangler deploy --delete-class <ClassName>`, you may encounter this error: `"Cannot apply --delete-class migration to class <ClassName> without also removing the binding that references it"`. You should remove the corresponding binding under `[durable_objects]` in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) before attempting to apply `--delete-class` again.

### Durable Object is overloaded.

A single instance of a Durable Object cannot do more work than is possible on a single thread. These errors mean the Durable Object has too much work to keep up with incoming requests:

* `Error: Durable Object is overloaded. Too many requests queued.` The total count of queued requests is too high.
* `Error: Durable Object is overloaded. Too much data queued.` The total size of data in queued requests is too high.
* `Error: Durable Object is overloaded. Requests queued for too long.` The oldest request has been in the queue too long.
* `Error: Durable Object is overloaded. Too many requests for the same object within a 10 second window.` The number of requests for a Durable Object is too high within a short span of time (10 seconds). This error indicates a more extreme level of overload.

To solve this error, you can either do less work per request, or send fewer requests. For example, you can split the requests among more instances of the Durable Object.

These errors and others that are due to overload will have an [`.overloaded` property](https://developers.cloudflare.com/durable-objects/best-practices/error-handling) set on their exceptions, which can be used to avoid retrying overloaded operations.

### Your account is generating too much load on Durable Objects. Please back off and try again later.

There is a limit on how quickly you can create new [stubs](https://developers.cloudflare.com/durable-objects/api/stub) for new or existing Durable Objects. Those lookups are usually cached, meaning attempts for the same set of recently accessed Durable Objects should be successful, so catching this error and retrying after a short wait is safe. If possible, also consider spreading those lookups across multiple requests.

### Durable Object reset because its code was updated.

Reset in error messages refers to in-memory state. Any durable state that has already been successfully persisted via `state.storage` is not affected.

Refer to [Global Uniqueness](https://developers.cloudflare.com/durable-objects/platform/known-issues/#global-uniqueness).

### Durable Object storage operation exceeded timeout which caused object to be reset.

To prevent indefinite blocking, there is a limit on how much time storage operations can take. In Durable Objects containing a sufficiently large number of key-value pairs, `deleteAll()` may hit that time limit and fail. When this happens, note that each `deleteAll()` call does make progress and that it is safe to retry until it succeeds. Otherwise contact [Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

### Your account is doing too many concurrent storage operations. Please back off and try again later.

Besides the suggested approach of backing off, also consider changing your code to use `state.storage.get(keys Array<string>)` rather than multiple individual `state.storage.get(key)` calls where possible.

</page>

<page>
---
title: Known issues · Cloudflare Durable Objects docs
description: Durable Objects is generally available. However, there are some known issues.
lastUpdated: 2025-02-19T09:34:35.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/platform/known-issues/
  md: https://developers.cloudflare.com/durable-objects/platform/known-issues/index.md
---

Durable Objects is generally available. However, there are some known issues.

## Global uniqueness

Global uniqueness guarantees there is only a single instance of a Durable Object class with a given ID running at once, across the world.

Uniqueness is enforced upon starting a new event (such as receiving an HTTP request), and upon accessing storage.

After an event is received, if the event takes some time to execute and does not ever access its durable storage, then it is possible that the Durable Object may no longer be current, and some other instance of the same Durable Object ID will have been created elsewhere. If the event accesses storage at this point, it will receive an [exception](https://developers.cloudflare.com/durable-objects/observability/troubleshooting/). If the event completes without ever accessing storage, it may not ever realize that the Durable Object was no longer current.

A Durable Object may be replaced in the event of a network partition or a software update (including either an update of the Durable Object's class code, or of the Workers system itself). Enabling `wrangler tail` or [Cloudflare dashboard](https://dash.cloudflare.com/) logs requires a software update.

## Code updates

Code changes for Workers and Durable Objects are released globally in an eventually consistent manner. Because each Durable Object is globally unique, the situation can arise that a request arrives to the latest version of your Worker (running in one part of the world), which then calls to a unique Durable Object running the previous version of your code for a short period of time (typically seconds to minutes). If you create a [gradual deployment](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/), this period of time is determined by how long your live deployment is configured to use more than one version.

For this reason, it is best practice to ensure that API changes between your Workers and Durable Objects are forward and backward compatible across code updates.

## Development tools

[`wrangler tail`](https://developers.cloudflare.com/workers/wrangler/commands/#tail) logs from requests that are upgraded to WebSockets are delayed until the WebSocket is closed. `wrangler tail` should not be connected to a Worker that you expect will receive heavy volumes of traffic.

The Workers editor in the [Cloudflare dashboard](https://dash.cloudflare.com/) allows you to interactively edit and preview your Worker and Durable Objects. In the editor, Durable Objects can only be talked to by a preview request if the Worker being previewed both exports the Durable Object class and binds to it. Durable Objects exported by other Workers cannot be talked to in the editor preview.

[`wrangler dev`](https://developers.cloudflare.com/workers/wrangler/commands/#dev) has read access to Durable Object storage, but writes will be kept in memory and will not affect persistent data. However, if you specify the `script_name` explicitly in the [Durable Object binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/), then writes will affect persistent data. Wrangler will emit a warning in that case.

## Alarms in local development

Currently, when developing locally (using `npx wrangler dev`), Durable Object [alarm methods](https://developers.cloudflare.com/durable-objects/api/alarms) may fail after a hot reload (if you edit the code while the code is running locally).

To avoid this issue, when using Durable Object alarms, close and restart your `wrangler dev` command after editing your code.

</page>

<page>
---
title: Limits · Cloudflare Durable Objects docs
description: Durable Objects are a special kind of Worker, so Workers Limits
  apply according to your Workers plan. In addition, Durable Objects have
  specific limits as listed in this page.
lastUpdated: 2025-04-17T10:04:37.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/platform/limits/
  md: https://developers.cloudflare.com/durable-objects/platform/limits/index.md
---

Durable Objects are a special kind of Worker, so [Workers Limits](https://developers.cloudflare.com/workers/platform/limits/) apply according to your Workers plan. In addition, Durable Objects have specific limits as listed in this page.

## SQLite-backed Durable Objects general limits

| Feature | Limit |
| - | - |
| Number of Objects | Unlimited (within an account or of a given class) |
| Maximum Durable Object classes | 500 (Workers Paid) / 100 (Free) [1](#user-content-fn-1) |
| Storage per account | Unlimited (Workers Paid) / 5GB (Free) [2](#user-content-fn-2) |
| Storage per class | Unlimited [3](#user-content-fn-3) |
| Storage per Durable Object | 10 GB [3](#user-content-fn-3) |
| Key size | Key and value combined cannot exceed 2 MB |
| Value size | Key and value combined cannot exceed 2 MB |
| WebSocket message size | 1 MiB (only for received messages) |
| CPU per request | 30 seconds (default) / configurable to 5 minutes of [active CPU time](https://developers.cloudflare.com/workers/platform/limits/#cpu-time) [4](#user-content-fn-4) |

Footnotes

1. Identical to the Workers [script limit](https://developers.cloudflare.com/workers/platform/limits/).

2. Durable Objects both bills and measures storage based on a gigabyte\
   (1 GB = 1,000,000,000 bytes) and not a gibibyte (GiB).

3. Accounts on the Workers Free plan are limited to 5GB total Durable Objects storage.

4. Each incoming HTTP request or WebSocket *message* resets the remaining available CPU time to 30 seconds. This allows the Durable Object to consume up to 30 seconds of compute after each incoming network request, with each new network request resetting the timer. If you consume more than 30 seconds of compute between incoming network requests, there is a heightened chance that the individual Durable Object is evicted and reset. CPU time per request invocation [can be increased](https://developers.cloudflare.com/durable-objects/platform/limits/#increasing-durable-object-cpu-limits).

### SQL storage limits

For Durable Object classes with [SQLite storage](https://developers.cloudflare.com/durable-objects/api/storage-api/#sql-storage) these SQL limits apply:

| SQL | Limit |
| - | - |
| Maximum number of columns per table | 100 |
| Maximum number of rows per table | Unlimited (excluding per-object storage limits) |
| Maximum string, `BLOB` or table row size | 2 MB |
| Maximum SQL statement length | 100 KB |
| Maximum bound parameters per query | 100 |
| Maximum arguments per SQL function | 32 |
| Maximum characters (bytes) in a `LIKE` or `GLOB` pattern | 50 bytes |

## Key-value backed Durable Objects general limits

Note

Durable Objects are available both on Workers Free and Workers Paid plans.

* **Workers Free plan**: Only Durable Objects with [SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#wrangler-configuration-for-sqlite-backed-durable-objects) are available.
* **Workers Paid plan**: Durable Objects with either SQLite storage backend or [key-value storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-durable-object-class-with-key-value-storage) are available.

If you wish to downgrade from a Workers Paid plan to a Workers Free plan, you must first ensure that you have deleted all Durable Object namespaces with the key-value storage backend.

| Feature | Limit for class with key-value storage backend |
| - | - |
| Number of Objects | Unlimited (within an account or of a given class) |
| Maximum Durable Object classes | 500 (Workers Paid) / 100 (Free) [5](#user-content-fn-5) |
| Storage per account | 50 GB (can be raised by contacting Cloudflare) [6](#user-content-fn-6) |
| Storage per class | Unlimited |
| Storage per Durable Object | Unlimited |
| Key size | 2 KiB (2048 bytes) |
| Value size | 128 KiB (131072 bytes) |
| WebSocket message size | 1 MiB (only for received messages) |
| CPU per request | 30s (including WebSocket messages) [7](#user-content-fn-7) |

Footnotes

1. Identical to the Workers [script limit](https://developers.cloudflare.com/workers/platform/limits/).

2. Durable Objects both bills and measures storage based on a gigabyte\
   (1 GB = 1,000,000,000 bytes) and not a gibibyte (GiB).

3. Each incoming HTTP request or WebSocket *message* resets the remaining available CPU time to 30 seconds. This allows the Durable Object to consume up to 30 seconds of compute after each incoming network request, with each new network request resetting the timer. If you consume more than 30 seconds of compute between incoming network requests, there is a heightened chance that the individual Durable Object is evicted and reset. CPU time per request invocation [can be increased](https://developers.cloudflare.com/durable-objects/platform/limits/#increasing-durable-object-cpu-limits).

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form](https://forms.gle/ukpeZVLWLnKeixDu7). If the limit can be increased, Cloudflare will contact you with next steps.

## Frequently Asked Questions

### How much work can a single Durable Object do?

Durable Objects can scale horizontally across many Durable Objects. Each individual Object is inherently single-threaded.

* An individual Object has a soft limit of 1,000 requests per second. You can have an unlimited number of individual objects per namespace.
* A simple [storage](https://developers.cloudflare.com/durable-objects/api/storage-api/) `get()` on a small value that directly returns the response may realize a higher request throughput compared to a Durable Object that (for example) serializes and/or deserializes large JSON values.
* Similarly, a Durable Object that performs multiple `list()` operations may be more limited in terms of request throughput.

A Durable Object that receives too many requests will, after attempting to queue them, return an [overloaded](https://developers.cloudflare.com/durable-objects/observability/troubleshooting/#durable-object-is-overloaded) error to the caller.

### How many Durable Objects can I create?

Durable Objects are designed such that the number of individual objects in the system do not need to be limited, and can scale horizontally.

* You can create and run as many separate Durable Objects as you want within a given Durable Object namespace.
* The main limit to your usage of Durable Objects is the total storage limit per account.
* If you need more storage, contact your account team or complete the [Limit Increase Request Form](https://forms.gle/ukpeZVLWLnKeixDu7) and we will contact you with next steps.

### Increasing Durable Object CPU limits

Durable Objects are Worker scripts, and have the same [per invocation CPU limits](https://developers.cloudflare.com/workers/platform/limits/#worker-limits) as any Workers do. Note that CPU time is active processing time: not time spent waiting on network requests, storage calls, or other general I/O, which don't count towards your CPU time or Durable Objects compute consumption.

By default, the maximum CPU time per Durable Objects invocation (HTTP request, WebSocket message, or Alarm) is set to 30 seconds, but can be increased for all Durable Objects associated with a Durable Object definition by setting `limits.cpu_ms` in your Wrangler configuration:

* wrangler.jsonc

  ```jsonc
  {
    // ...rest of your configuration...
    "limits": {
      "cpu_ms": 300000, // 300,000 milliseconds = 5 minutes
    },
    // ...rest of your configuration...
  }
  ```

* wrangler.toml

  ```toml
  [limits]
  cpu_ms = 300_000
  ```

## Footnotes

1. Identical to the Workers [script limit](https://developers.cloudflare.com/workers/platform/limits/). [↩](#user-content-fnref-1)

2. Durable Objects both bills and measures storage based on a gigabyte\
   (1 GB = 1,000,000,000 bytes) and not a gibibyte (GiB).\
   [↩](#user-content-fnref-2)

3. Accounts on the Workers Free plan are limited to 5 GB total Durable Objects storage. [↩](#user-content-fnref-3) [↩2](#user-content-fnref-3-2)

4. Each incoming HTTP request or WebSocket *message* resets the remaining available CPU time to 30 seconds. This allows the Durable Object to consume up to 30 seconds of compute after each incoming network request, with each new network request resetting the timer. If you consume more than 30 seconds of compute between incoming network requests, there is a heightened chance that the individual Durable Object is evicted and reset. CPU time per request invocation [can be increased](https://developers.cloudflare.com/durable-objects/platform/limits/#increasing-durable-object-cpu-limits). [↩](#user-content-fnref-4)

5. Identical to the Workers [script limit](https://developers.cloudflare.com/workers/platform/limits/). [↩](#user-content-fnref-5)

6. Durable Objects both bills and measures storage based on a gigabyte\
   (1 GB = 1,000,000,000 bytes) and not a gibibyte (GiB).\
   [↩](#user-content-fnref-6)

7. Each incoming HTTP request or WebSocket *message* resets the remaining available CPU time to 30 seconds. This allows the Durable Object to consume up to 30 seconds of compute after each incoming network request, with each new network request resetting the timer. If you consume more than 30 seconds of compute between incoming network requests, there is a heightened chance that the individual Durable Object is evicted and reset. CPU time per request invocation [can be increased](https://developers.cloudflare.com/durable-objects/platform/limits/#increasing-durable-object-cpu-limits). [↩](#user-content-fnref-7)

</page>

<page>
---
title: Pricing · Cloudflare Durable Objects docs
description: "Durable Objects can incur two types of billing: compute and storage."
lastUpdated: 2025-07-07T08:29:07.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/platform/pricing/
  md: https://developers.cloudflare.com/durable-objects/platform/pricing/index.md
---

Durable Objects can incur two types of billing: compute and storage.

Note

Durable Objects are available both on Workers Free and Workers Paid plans.

* **Workers Free plan**: Only Durable Objects with [SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#wrangler-configuration-for-sqlite-backed-durable-objects) are available.
* **Workers Paid plan**: Durable Objects with either SQLite storage backend or [key-value storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-durable-object-class-with-key-value-storage) are available.

If you wish to downgrade from a Workers Paid plan to a Workers Free plan, you must first ensure that you have deleted all Durable Object namespaces with the key-value storage backend.

On Workers Free plan:

* If you exceed any one of the free tier limits, further operations of that type will fail with an error.
* Daily free limits reset at 00:00 UTC.

## Compute billing

Durable Objects are billed for duration while the Durable Object is active and running in memory. Requests to a Durable Object keep it active or creates the object if it was inactive, not in memory.

| | Free plan | Paid plan |
| - | - | - |
| Requests | 100,000 / day | 1 million, + $0.15/million Includes HTTP requests, RPC sessions1, WebSocket messages2, and alarm invocations |
| Duration3 | 13,000 GB-s / day | 400,000 GB-s, + $12.50/million GB-s4,5 |

Footnotes

1 Each [RPC session](https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle/) is billed as one request to your Durable Object. Every [RPC method call](https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/) on a [Durable Objects stub](https://developers.cloudflare.com/durable-objects/) is its own RPC session and therefore a single billed request.

RPC method calls can return objects (stubs) extending [`RpcTarget`](https://developers.cloudflare.com/workers/runtime-apis/rpc/lifecycle/#lifetimes-memory-and-resource-management) and invoke calls on those stubs. Subsequent calls on the returned stub are part of the same RPC session and are not billed as separate requests. For example:

```js
let durableObjectStub = OBJECT_NAMESPACE.get(id); // retrieve Durable Object stub
using foo = await durableObjectStub.bar(); // billed as a request
await foo.baz(); // treated as part of the same RPC session created by calling bar(), not billed as a request
await durableObjectStub.cat(); // billed as a request
```

2 A request is needed to create a WebSocket connection. There is no charge for outgoing WebSocket messages, nor for incoming [WebSocket protocol pings](https://www.rfc-editor.org/rfc/rfc6455#section-5.5.2). For compute requests billing-only, a 20:1 ratio is applied to incoming WebSocket messages to factor in smaller messages for real-time communication. For example, 100 WebSocket incoming messages would be charged as 5 requests for billing purposes. The 20:1 ratio does not affect Durable Object metrics and analytics, which reflect actual usage.

3 Application level auto-response messages handled by [`state.setWebSocketAutoResponse()`](https://developers.cloudflare.com/durable-objects/best-practices/websockets/) will not incur additional wall-clock time, and so they will not be charged.

4 Duration is billed in wall-clock time as long as the Object is active, but is shared across all requests active on an Object at once. Calling `accept()` on a WebSocket in an Object will incur duration charges for the entire time the WebSocket is connected. It is recommended to use the WebSocket Hibernation API to avoid incurring duration charges once all event handlers finish running. Note that the Durable Object will remain active for 10 seconds after the last client disconnects. For a complete explanation, refer to [When does a Durable Object incur duration charges?](https://developers.cloudflare.com/durable-objects/platform/pricing/#when-does-a-durable-object-incur-duration-charges).

5 Duration billing charges for the 128 MB of memory your Durable Object is allocated, regardless of actual usage. If your account creates many instances of a single Durable Object class, Durable Objects may run in the same isolate on the same physical machine and share the 128 MB of memory. These Durable Objects are still billed as if they are allocated a full 128 MB of memory.

## Storage billing

The [Durable Objects Storage API](https://developers.cloudflare.com/durable-objects/api/storage-api/) is only accessible from within Durable Objects. Pricing depends on the storage backend of your Durable Objects.

* **SQLite-backed Durable Objects (recommended)**: [SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class) is recommended for all new Durable Object classes. Workers Free plan can only create and access SQLite-backed Durable Objects.
* **Key-value backed Durable Objects**: [Key-value storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-durable-object-class-with-key-value-storage) is only available on the Workers Paid plan.

### SQLite storage backend

Storage billing on SQLite-backed Durable Objects

Storage billing is not yet enabled for Durable Object classes using the SQLite storage backend. SQLite-backed Durable Objects will incur [charges for requests and duration](https://developers.cloudflare.com/durable-objects/platform/pricing/#compute-billing). Storage billing for SQLite-backed Durable Objects will be enabled at a later date with advance notice with the [shared pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/#sqlite-storage-backend).

| | Workers Free plan | Workers Paid plan |
| - | - | - |
| Rows reads 1,2 | 5 million / day | First 25 billion / month included + $0.001 / million rows |
| Rows written 1,2,3,4 | 100,000 / day | First 50 million / month included + $1.00 / million rows |
| SQL Stored data 5 | 5 GB (total) | 5 GB-month, + $0.20/ GB-month |

Footnotes

1 Rows read and rows written included limits and rates match [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/), Cloudflare's serverless SQL database.

2 Key-value methods like `get()`, `put()`, `delete()`, or `list()` store and query data in a hidden SQLite table and are billed as rows read and rows written.

3 Each `setAlarm()` is billed as a single row written.

4 Deletes are counted as rows written.

5 Durable Objects will be billed for stored data until the [data is removed](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#remove-a-durable-objects-storage). Once the data is removed, the object will be cleaned up automatically by the system.

### Key-value storage backend

| | Workers Paid plan |
| - | - |
| Read request units1,2 | 1 million, + $0.20/million |
| Write request units3 | 1 million, + $1.00/million |
| Delete requests4 | 1 million, + $1.00/million |
| Stored data5 | 1 GB, + $0.20/ GB-month |

Footnotes

1 A request unit is defined as 4 KB of data read or written. A request that writes or reads more than 4 KB will consume multiple units, for example, a 9 KB write will consume 3 write request units.

2 List operations are billed by read request units, based on the amount of data examined. For example, a list request that returns a combined 80 KB of keys and values will be billed 20 read request units. A list request that does not return anything is billed for 1 read request unit.

3 Each `setAlarm` is billed as a single write request unit.

4 Delete requests are unmetered. For example, deleting a 100 KB value will be charged one delete request.

5 Durable Objects will be billed for stored data until the data is removed. Once the data is removed, the object will be cleaned up automatically by the system.

Requests that hit the [Durable Objects in-memory cache](https://developers.cloudflare.com/durable-objects/reference/in-memory-state/) or that use the [multi-key versions of `get()`/`put()`/`delete()` methods](https://developers.cloudflare.com/durable-objects/api/storage-api/) are billed the same as if they were a normal, individual request for each key.

## Compute billing examples

These examples exclude the costs for the Workers calling the Durable Objects. When modelling the costs of a Durable Object, note that:

* Inactive objects receiving no requests do not incur any duration charges.
* The [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#websocket-hibernation-api) can dramatically reduce duration-related charges for Durable Objects communicating with clients over the WebSocket protocol, especially if messages are only transmitted occasionally at sparse intervals.

### Example 1

This example represents a simple Durable Object used as a co-ordination service invoked via HTTP.

* A single Durable Object was called by a Worker 1.5 million times
* It is active for 1,000,000 seconds in the month

In this scenario, the estimated monthly cost would be calculated as:

**Requests**:

* (1.5 million requests - included 1 million requests) x $0.15 / 1,000,000 = $0.075

**Compute Duration**:

* 1,000,000 seconds \* 128 MB / 1 GB = 128,000 GB-s
* (128,000 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $0.00

**Estimated total**: \~$0.075 (requests) + $0.00 (compute duration) + minimum $5/mo usage = $5.08 per month

### Example 2

This example represents a moderately trafficked Durable Objects based application using WebSockets to broadcast game, chat or real-time user state across connected clients:

* 100 Durable Objects have 50 WebSocket connections established to each of them.
* Clients send approximately one message a minute for eight active hours a day, every day of the month.

In this scenario, the estimated monthly cost would be calculated as:

**Requests**:

* 50 WebSocket connections \* 100 Durable Objects to establish the WebSockets = 5,000 connections created each day \* 30 days = 150,000 WebSocket connection requests.
* 50 messages per minute \* 100 Durable Objects \* 60 minutes \* 8 hours \* 30 days = 72,000,000 WebSocket message requests.
* 150,000 + (72 million requests / 20 for WebSocket message billing ratio) = 3.75 million billing request.
* (3.75 million requests - included 1 million requests) x $0.15 / 1,000,000 = $0.41.

**Compute Duration**:

* 100 Durable Objects \* 60 seconds \* 60 minutes \* 8 hours \* 30 days = 86,400,000 seconds.
* 86,400,000 seconds \* 128 MB / 1 GB = 11,059,200 GB-s.
* (11,059,200 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $133.24.

**Estimated total**: $0.41 (requests) + $133.24 (compute duration) + minimum $5/mo usage = $138.65 per month.

### Example 3

This example represents a horizontally scaled Durable Objects based application using WebSockets to communicate user-specific state to a single client connected to each Durable Object.

* 100 Durable Objects each have a single WebSocket connection established to each of them.
* Clients sent one message every second of the month so that the Durable Objects were active for the entire month.

In this scenario, the estimated monthly cost would be calculated as:

**Requests**:

* 100 WebSocket connection requests.
* 1 message per second \* 100 connections \* 60 seconds \* 60 minutes \* 24 hours \* 30 days = 259,200,000 WebSocket message requests.
* 100 + (259.2 million requests / 20 for WebSocket billing ratio) = 12,960,100 requests.
* (12.9 million requests - included 1 million requests) x $0.15 / 1,000,000 = $1.79.

**Compute Duration**:

* 100 Durable Objects \* 60 seconds \* 60 minutes \* 24 hours \* 30 days = 259,200,000 seconds
* 259,200,000 seconds \* 128 MB / 1 GB = 33,177,600 GB-s
* (33,177,600 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $409.72

**Estimated total**: $1.79 (requests) + $409.72 (compute duration) + minimum $5/mo usage = $416.51 per month

### Example 4

This example represents a moderately trafficked Durable Objects based application using WebSocket Hibernation to broadcast game, chat or real-time user state across connected clients:

* 100 Durable Objects each have 100 Hibernatable WebSocket connections established to each of them.
* Clients send one message per minute, and it takes 10ms to process a single message in the `webSocketMessage()` handler. Since each Durable Object handles 100 WebSockets, cumulatively each Durable Object will be actively executing JS for 1 second each minute (100 WebSockets \* 10ms).

In this scenario, the estimated monthly cost would be calculated as:

**Requests**:

* 100 WebSocket connections \* 100 Durable Objects to establish the WebSockets = 10,000 initial WebSocket connection requests.
* 100 messages per minute1 \* 100 Durable Objects \* 60 minutes \* 24 hours \* 30 days = 432,000,000 requests.
* 10,000 + (432 million requests / 20 for WebSocket billing ratio) = 21,610,000 million requests.
* (21.6 million requests - included 1 million requests) x $0.15 / 1,000,000 = $3.09.

**Compute Duration**:

* 100 Durable Objects \* 1 second2 \* 60 minutes \* 24 hours \* 30 days = 4,320,000 seconds
* 4,320,000 seconds \* 128 MB / 1 GB = 552,960 GB-s
* (552,960 GB-s - included 400,000 GB-s) x $12.50 / 1,000,000 = $1.91

**Estimated total**: $3.09 (requests) + $1.91 (compute duration) + minimum $5/mo usage = $10.00 per month

1 100 messages per minute comes from the fact that 100 clients connect to each DO, and each sends 1 message per minute.

2 The example uses 1 second because each Durable Object is active for 1 second per minute. This can also be thought of as 432 million requests that each take 10 ms to execute (4,320,000 seconds).

## Frequently Asked Questions

### Does an empty table / SQLite database contribute to my storage?

Yes, although minimal. Empty tables can consume at least a few kilobytes, based on the number of columns (table width) in the table. An empty SQLite database consumes approximately 12 KB of storage.

### Does metadata stored in Durable Objects count towards my storage?

All writes to a SQLite-backed Durable Object stores nominal amounts of metadata in internal tables in the Durable Object, which counts towards your billable storage.

The metadata remains in the Durable Object until you call [`deleteAll()`](https://developers.cloudflare.com/durable-objects/api/storage-api/#deleteall).

### When does a Durable Object incur duration charges?

A Durable Object incurs duration charges as long as the JavaScript object is held in memory. Once an object has been evicted from memory, the next time it is needed, it will be recreated (calling the constructor again). There are two factors which decide when an object may be evicted from memory: hibernatability and existence of clients.

A Durable Object is considered hibernatable any time that it is not waiting for any I/O or callbacks that depend on the in-memory state.

* For example, if an object calls `fetch()` and awaits the response, it is considered to be waiting for I/O, and so cannot hibernate.

* Less obvious to a user, if an object calls `setTimeout()` to schedule a callback in the future - no matter how far in the future - then it is considered non-hibernatable, since there would be no way to recreate the callback after hibernating.

* Additionally, if the Durable Object has received an incoming request and has not fully responded yet, then it cannot be hibernated, because hibernating would mean losing track of the async function which is eventually supposed to return a response to that request.

* As an exception, a WebSocket request which has explicitly been accepted using the [WebSocket hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/#websocket-hibernation-api) allows a Durable Object to hibernate even while the WebSocket is still connected.

Once a Durable Object has been in a hibernatable state for 10 consecutive seconds, it hibernates, and duration billing stops.

Even if a Durable Object never becomes hibernatable, it will still be evicted once all clients have gone away. A Durable Object is considered to have clients if any other Worker currently holds a stub pointing to the Durable Object, or is waiting for a response from the Durable Object. An incoming WebSocket connection counts as a client. If the object is currently responding to an alarm event, this also counts as having a client. When not hibernatable, a Durable Object will be evicted from memory after it has had no client for 70-140 seconds (the exact interval varies). But again, if the object is hibernatable, then the 10-second hibernation timeout takes precedence and the 70-140 second no-client timeout is moot.

</page>

<page>
---
title: Choose a data or storage product · Cloudflare Durable Objects docs
lastUpdated: 2024-08-13T19:56:56.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/platform/storage-options/
  md: https://developers.cloudflare.com/durable-objects/platform/storage-options/index.md
---


</page>

<page>
---
title: Data location · Cloudflare Durable Objects docs
description: Jurisdictions are used to create Durable Objects that only run and
  store data within a region to comply with local regulations such as the GDPR
  or FedRAMP.
lastUpdated: 2025-05-30T16:32:37.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/reference/data-location/
  md: https://developers.cloudflare.com/durable-objects/reference/data-location/index.md
---

## Restrict Durable Objects to a jurisdiction

Jurisdictions are used to create Durable Objects that only run and store data within a region to comply with local regulations such as the [GDPR](https://gdpr-info.eu/) or [FedRAMP](https://blog.cloudflare.com/cloudflare-achieves-fedramp-authorization/).

Workers may still access Durable Objects constrained to a jurisdiction from anywhere in the world. The jurisdiction constraint only controls where the Durable Object itself runs and persists data. Consider using [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/) to control the regions from which Cloudflare responds to requests.

Logging

A [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) will be logged outside of the specified jurisdiction for billing and debugging purposes.

Durable Objects can be restricted to a specific jurisdiction by creating a [`DurableObjectNamespace`](https://developers.cloudflare.com/durable-objects/api/namespace/) restricted to a jurisdiction. All [Durable Object ID methods](https://developers.cloudflare.com/durable-objects/api/id/) are valid on IDs within a namespace restricted to a jurisdiction.

```js
const euSubnamespace = env.MY_DURABLE_OBJECT.jurisdiction("eu");
const euId = euSubnamespace.newUniqueId();
```

* It is possible to have the same name represent different IDs in different jurisdictions.

  ```js
  const euId1 = env.MY_DURABLE_OBJECT.idFromName("my-name");
  const euId2 = env.MY_DURABLE_OBJECT.jurisdiction("eu").idFromName("my-name");
  console.assert(!euId1.equal(euId2), "This should always be true");
  ```

* You will run into an error if the jurisdiction on your [`DurableObjectNamespace`](https://developers.cloudflare.com/durable-objects/api/namespace/) and the jurisdiction on [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) are different.

* You will not run into an error if the [`DurableObjectNamespace`](https://developers.cloudflare.com/durable-objects/api/namespace/) is not associated with a jurisdiction.

* All [Durable Object ID methods](https://developers.cloudflare.com/durable-objects/api/id/) are valid on IDs within a namespace restricted to a jurisdiction.

  ```js
  const euSubnamespace = env.MY_DURABLE_OBJECT.jurisdiction("eu");
  const euId = euSubnamespace.idFromName(name);
  const stub = env.MY_DURABLE_OBJECT.get(euId);
  ```

Use `DurableObjectNamespace.jurisdiction`

When specifying a jurisdiction, Cloudflare recommends you first create a namespace restricted to a jurisdiction, using `const euSubnamespace = env.MY_DURABLE_OBJECT.jurisdiction("eu")`.

Note that it is also possible to specify a jurisdiction by creating an individual [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) restricted to a jurisdiction, using `const euId = env.MY_DURABLE_OBJECT.newUniqueId({ jurisdiction: "eu" })`.

**However, Cloudflare does not recommend this approach.**

### Supported locations

| Parameter | Location |
| - | - |
| eu | The European Union |
| fedramp | FedRAMP-compliant data centers |

## Provide a location hint

Durable Objects, as with any stateful API, will often add response latency as requests must be forwarded to the data center where the Durable Object, or state, is located.

Durable Objects do not currently change locations after they are created1. By default, a Durable Object is instantiated in a data center close to where the initial `get()` request is made. This may not be in the same data center that the `get()` request is made from, but in most cases, it will be in close proximity.

Initial requests to Durable Objects

It can negatively impact latency to pre-create Durable Objects prior to the first client request or when the first client request is not representative of where the majority of requests will come from. It is better for latency to create Durable Objects in response to actual production traffic or provide explicit location hints.

Location hints are the mechanism provided to specify the location that a Durable Object should be located regardless of where the initial `get()` request comes from.

To manually create Durable Objects in another location, provide an optional `locationHint` parameter to `get()`. Only the first call to `get()` for a particular Object will respect the hint.

```js
let durableObjectStub = OBJECT_NAMESPACE.get(id, { locationHint: "enam" });
```

Warning

Hints are a best effort and not a guarantee. Unlike with jurisdictions, Durable Objects will not necessarily be instantiated in the hinted location, but instead instantiated in a data center selected to minimize latency from the hinted location.

### Supported locations

| Parameter | Location |
| - | - |
| wnam | Western North America |
| enam | Eastern North America |
| sam | South America 2 |
| weur | Western Europe |
| eeur | Eastern Europe |
| apac | Asia-Pacific |
| oc | Oceania |
| afr | Africa 2 |
| me | Middle East 2 |

1 Dynamic relocation of existing Durable Objects is planned for the future.

2 Durable Objects currently do not spawn in this location. Instead, the Durable Object will spawn in a nearby location which does support Durable Objects. For example, Durable Objects hinted to South America spawn in Eastern North America instead.

## Additional resources

* You can find our more about where Durable Objects are located using the website: [Where Durable Objects Live](https://where.durableobjects.live/).

</page>

<page>
---
title: Data security · Cloudflare Durable Objects docs
description: "This page details the data security properties of Durable Objects, including:"
lastUpdated: 2024-08-13T19:56:56.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/reference/data-security/
  md: https://developers.cloudflare.com/durable-objects/reference/data-security/index.md
---

This page details the data security properties of Durable Objects, including:

* Encryption-at-rest (EAR).
* Encryption-in-transit (EIT).
* Cloudflare's compliance certifications.

## Encryption at Rest

All Durable Object data, including metadata, is encrypted at rest. Encryption and decryption are automatic, do not require user configuration to enable, and do not impact the effective performance of Durable Objects.

Encryption keys are managed by Cloudflare and securely stored in the same key management systems we use for managing encrypted data across Cloudflare internally.

Encryption at rest is implemented using the Linux Unified Key Setup (LUKS) disk encryption specification and [AES-256](https://www.cloudflare.com/learning/ssl/what-is-encryption/), a widely tested, highly performant and industry-standard encryption algorithm.

## Encryption in Transit

Data transfer between a Cloudflare Worker, and/or between nodes within the Cloudflare network and Durable Objects is secured using the same [Transport Layer Security](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/) (TLS/SSL).

API access via the HTTP API or using the [wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) command-line interface is also over TLS/SSL (HTTPS).

## Compliance

To learn more about Cloudflare's adherence to industry-standard security compliance certifications, visit the Cloudflare [Trust Hub](https://www.cloudflare.com/trust-hub/compliance-resources/).

</page>

<page>
---
title: Gradual Deployments · Cloudflare Durable Objects docs
description: Gradually deploy changes to Durable Objects.
lastUpdated: 2024-08-13T19:56:56.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/reference/durable-object-gradual-deployments/
  md: https://developers.cloudflare.com/durable-objects/reference/durable-object-gradual-deployments/index.md
---


</page>

<page>
---
title: Durable Objects migrations · Cloudflare Durable Objects docs
description: A migration is a mapping process from a class name to a runtime
  state. This process communicates the changes to the Workers runtime and
  provides the runtime with instructions on how to deal with those changes.
lastUpdated: 2025-05-21T09:44:01.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/
  md: https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/index.md
---

A migration is a mapping process from a class name to a runtime state. This process communicates the changes to the Workers runtime and provides the runtime with instructions on how to deal with those changes.

To apply a migration, you need to:

1. Edit your `wrangler.toml / wrangler.json` file, as explained below.
2. Re-deploy your Worker using `npx wrangler deploy`.

You must initiate a migration process when you:

* Create a new Durable Object class.
* Rename a Durable Object class.
* Delete a Durable Object class.
* Transfer an existing Durable Objects class.

Note

Updating the code for an existing Durable Object class does not require a migration. To update the code for an existing Durable Object class, run [`npx wrangler deploy`](https://developers.cloudflare.com/workers/wrangler/commands/#deploy). This is true even for changes to how the code interacts with persistent storage. Because of [global uniqueness](https://developers.cloudflare.com/durable-objects/platform/known-issues/#global-uniqueness), you do not have to be concerned about old and new code interacting with the same storage simultaneously. However, it is your responsibility to ensure that the new code is backwards compatible with existing stored data.

## Create migration

The most common migration performed is a new class migration, which informs the runtime that a new Durable Object class is being uploaded. This is also the migration you need when creating your first Durable Object class.

To apply a Create migration:

1. Add the following lines to your `wrangler.toml / wrangler.json` file:

   * wrangler.jsonc

     ```jsonc
     {
       "migrations": [
         {
           "tag": "<v1>",
           "new_sqlite_classes": [
             "<NewDurableObjectClass>"
           ]
         }
       ]
     }
     ```

   * wrangler.toml

     ```toml
     [[migrations]]
     tag = "<v1>" # Migration identifier. This should be unique for each migration entry
     new_sqlite_classes = ["<NewDurableObjectClass>"] # Array of new classes
     # For SQLite storage backend use new_sqlite_classes=["<NewDurableObjectClass>"] instead
     ```

   The Create migration contains:

   * A `tag` to identify the migration.
   * The array `new_sqlite_classes`, which contains the new Durable Object class.

2. Ensure you reference the correct name of the Durable Object class in your Worker code.

3. Deploy the Worker.

Create migration example

To create a new Durable Object binding `DURABLE_OBJECT_A`, your `wrangler.toml / wrangler.json` file should look like the following:

* wrangler.jsonc

  ```jsonc
  {
    "durable_objects": {
      "bindings": [
        {
          "name": "DURABLE_OBJECT_A",
          "class_name": "DurableObjectAClass"
        }
      ]
    },
    "migrations": [
      {
        "tag": "v1",
        "new_sqlite_classes": [
          "DurableObjectAClass"
        ]
      }
    ]
  }
  ```

* wrangler.toml

  ```toml
  # Creating a new Durable Object class
  [[durable_objects.bindings]]
  name = "DURABLE_OBJECT_A"
  class_name = "DurableObjectAClass"


  # Add the lines below for a Create migration.


  [[migrations]]
  tag = "v1"
  new_sqlite_classes = ["DurableObjectAClass"]
  ```

### Create Durable Object class with key-value storage

Recommended SQLite-backed Durable Objects

Cloudflare recommends all new Durable Object namespaces use the [SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#create-sqlite-backed-durable-object-class). These Durable Objects can continue to use storage [key-value API](https://developers.cloudflare.com/durable-objects/api/storage-api/#kv-api).

Additionally, SQLite-backed Durable Objects allow you to store more types of data (such as tables), and offers Point In Time Recovery API which can restore a Durable Object's embedded SQLite database contents (both SQL data and key-value data) to any point in the past 30 days.

The [key-value storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-durable-object-class-with-key-value-storage) remains for backwards compatibility, and a migration path from KV storage backend to SQLite storage backend for existing Durable Object namespaces will be available in the future.

Use `new_classes` on the migration in your Worker's Wrangler file to create a Durable Object class with the key-value storage backend:

* wrangler.jsonc

  ```jsonc
  {
    "migrations": [
      {
        "tag": "v1",
        "new_classes": [
          "MyDurableObject"
        ]
      }
    ]
  }
  ```

* wrangler.toml

  ```toml
  [[migrations]]
  tag = "v1" # Should be unique for each entry
  new_classes = ["MyDurableObject"] # Array of new classes
  ```

Note

Durable Objects are available both on Workers Free and Workers Paid plans.

* **Workers Free plan**: Only Durable Objects with [SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#wrangler-configuration-for-sqlite-backed-durable-objects) are available.
* **Workers Paid plan**: Durable Objects with either SQLite storage backend or [key-value storage backend](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#create-durable-object-class-with-key-value-storage) are available.

If you wish to downgrade from a Workers Paid plan to a Workers Free plan, you must first ensure that you have deleted all Durable Object namespaces with the key-value storage backend.

## Delete migration

Running a Delete migration will delete all Durable Objects associated with the deleted class, including all of their stored data.

* Do not run a Delete migration on a class without first ensuring that you are not relying on the Durable Objects within that Worker anymore, that is, first remove the binding from the Worker.
* Copy any important data to some other location before deleting.
* You do not have to run a Delete migration on a class that was renamed or transferred.

To apply a Delete migration:

1. Remove the binding for the class you wish to delete from the `wrangler.toml / wrangler.json` file.

2. Remove references for the class you wish to delete from your Worker code.

3. Add the following lines to your `wrangler.toml / wrangler.json` file.

   * wrangler.jsonc

     ```jsonc
     {
       "migrations": [
         {
           "tag": "<v2>",
           "deleted_classes": [
             "<ClassToDelete>"
           ]
         }
       ]
     }
     ```

   * wrangler.toml

     ```toml
     [[migrations]]
     tag = "<v2>" # Migration identifier. This should be unique for each migration entry
     deleted_classes = ["<ClassToDelete>"] # Array of deleted class names
     ```

   The Delete migration contains:

   * A `tag` to identify the migration.
   * The array `deleted_classes`, which contains the deleted Durable Object classes.

4. Deploy the Worker.

Delete migration example

To delete a Durable Object binding `DEPRECATED_OBJECT`, your `wrangler.toml / wrangler.json` file should look like the following:

* wrangler.jsonc

  ```jsonc
  {
    "migrations": [
      {
        "tag": "v3",
        "deleted_classes": [
          "DeprecatedObjectClass"
        ]
      }
    ]
  }
  ```

* wrangler.toml

  ```toml
  # Remove the binding for the DeprecatedObjectClass DO
  #[[durable_objects.bindings]]
  #name = "DEPRECATED_OBJECT"
  #class_name = "DeprecatedObjectClass"


  [[migrations]]
  tag = "v3" # Should be unique for each entry
  deleted_classes = ["DeprecatedObjectClass"] # Array of deleted classes
  ```

## Rename migration

Rename migrations are used to transfer stored Durable Objects between two Durable Object classes in the same Worker code file.

To apply a Rename migration:

1. Update the previous class name to the new class name by editing your `wrangler.toml / wrangler.json` file in the following way:

   * wrangler.jsonc

     ```jsonc
     {
       "durable_objects": {
         "bindings": [
           {
             "name": "<MY_DURABLE_OBJECT>",
             "class_name": "<UpdatedDurableObject>"
           }
         ]
       },
       "migrations": [
         {
           "tag": "<v3>",
           "renamed_classes": [
             {
               "from": "<OldDurableObject>",
               "to": "<UpdatedDurableObject>"
             }
           ]
         }
       ]
     }
     ```

   * wrangler.toml

     ```toml
     [[durable_objects.bindings]]
     name = "<MY_DURABLE_OBJECT>"
     class_name = "<UpdatedDurableObject>" # Update the class name to the new class name


     [[migrations]]
     tag = "<v3>" # Migration identifier. This should be unique for each migration entry
     renamed_classes = [{from = "<OldDurableObject>", to = "<UpdatedDurableObject>" }] # Array of rename directives
     ```

   The Rename migration contains:

   * A `tag` to identify the migration.

   * The `renamed_classes` array, which contains objects with `from` and `to` properties.

     * `from` property is the old Durable Object class name.
     * `to` property is the renamed Durable Object class name.

2. Reference the new Durable Object class name in your Worker code.

3. Deploy the Worker.

Rename migration example

To rename a Durable Object class, from `OldName` to `UpdatedName`, your `wrangler.toml / wrangler.json` file should look like the following:

* wrangler.jsonc

  ```jsonc
  {
    "durable_objects": {
      "bindings": [
        {
          "name": "MY_DURABLE_OBJECT",
          "class_name": "UpdatedName"
        }
      ]
    },
    "migrations": [
      {
        "tag": "v3",
        "renamed_classes": [
          {
            "from": "OldName",
            "to": "UpdatedName"
          }
        ]
      }
    ]
  }
  ```

* wrangler.toml

  ```toml
  # Before deleting the `DeprecatedClass` remove the binding for the `DeprecatedClass`.
  # Update the binding for the `DurableObjectExample` to the new class name `UpdatedName`.
  [[durable_objects.bindings]]
  name = "MY_DURABLE_OBJECT"
  class_name = "UpdatedName"


  # Renaming classes
  [[migrations]]
  tag = "v3"
  renamed_classes = [{from = "OldName", to = "UpdatedName" }] # Array of rename directives
  ```

## Transfer migration

Transfer migrations are used to transfer stored Durable Objects between two Durable Object classes in different Worker code files.

If you want to transfer stored Durable Objects between two Durable Object classes in the same Worker code file, use [Rename migrations](#rename-migration) instead.

Note

Do not run a [Create migration](#create-migration) for the destination class before running a Transfer migration. The Transfer migration will create the destination class for you.

To apply a Transfer migration:

1. Edit your `wrangler.toml / wrangler.json` file in the following way:

   * wrangler.jsonc

     ```jsonc
     {
       "durable_objects": {
         "bindings": [
           {
             "name": "<MY_DURABLE_OBJECT>",
             "class_name": "<DestinationDurableObjectClass>"
           }
         ]
       },
       "migrations": [
         {
           "tag": "<v4>",
           "transferred_classes": [
             {
               "from": "<SourceDurableObjectClass>",
               "from_script": "<SourceWorkerScript>",
               "to": "<DestinationDurableObjectClass>"
             }
           ]
         }
       ]
     }
     ```

   * wrangler.toml

     ```toml
     [[durable_objects.bindings]]
     name = "<MY_DURABLE_OBJECT>"
     class_name = "<DestinationDurableObjectClass>"


     [[migrations]]
     tag = "<v4>" # Migration identifier. This should be unique for each migration entry
     transferred_classes = [{from = "<SourceDurableObjectClass>", from_script = "<SourceWorkerScript>", to = "<DestinationDurableObjectClass>" }]
     ```

   The Transfer migration contains:

   * A `tag` to identify the migration.

   * The `transferred_class` array, which contains objects with `from`, `from_script`, and `to` properties.

     * `from` property is the name of the source Durable Object class.
     * `from_script` property is the name of the source Worker script.
     * `to` property is the name of the destination Durable Object class.

2. Ensure you reference the name of the new, destination Durable Object class in your Worker code.

3. Deploy the Worker.

Transfer migration example

You can transfer stored Durable Objects from `DurableObjectExample` to `TransferredClass` from a Worker script named `OldWorkerScript`. The configuration of the `wrangler.toml / wrangler.json` file for your new Worker code (destination Worker code) would look like this:

* wrangler.jsonc

  ```jsonc
  {
    "durable_objects": {
      "bindings": [
        {
          "name": "MY_DURABLE_OBJECT",
          "class_name": "TransferredClass"
        }
      ]
    },
    "migrations": [
      {
        "tag": "v4",
        "transferred_classes": [
          {
            "from": "DurableObjectExample",
            "from_script": "OldWorkerScript",
            "to": "TransferredClass"
          }
        ]
      }
    ]
  }
  ```

* wrangler.toml

  ```toml
  # destination worker
  [[durable_objects.bindings]]
  name = "MY_DURABLE_OBJECT"
  class_name = "TransferredClass"


  # Transferring class


  [[migrations]]
  tag = "v4"
  transferred_classes = [{from = "DurableObjectExample", from_script = "OldWorkerScript", to = "TransferredClass" }]
  ```

## Migration Wrangler configuration

* Migrations are performed through the `[[migrations]]` configurations key in your `wrangler.toml` file or `migration` key in your `wrangler.json` file.

* Migrations require a migration tag, which is defined by the `tag` property in each migration entry.

* Migration tags are treated like unique names and are used to determine which migrations have already been applied. Once a given Worker code has a migration tag set on it, all future Worker code deployments must include a migration tag.

* The migration list is an ordered array of tables, specified as a key in your Wrangler configuration file.

* You can define the migration for each environment, as well as at the top level.

  * Top-level migration is specified at the top-level `migrations` key in the Wrangler configuration file.

  * Environment-level migration is specified by a `migrations` key inside the `env` key of the Wrangler configuration file (`[env.<environment_name>.migrations]`).

    * Example Wrangler file:

    ```jsonc
    {
    // top-level default migrations
    "migrations": [{ ... }],
    "env": {
    "staging": {
      // migration override for staging
      "migrations": [{...}]
      }
     }
    }
    ```

  * If a migration is only specified at the top-level, but not at the environment-level, the environment will inherit the top-level migration.

  * Migrations at at the environment-level override migrations at the top level.

* All migrations are applied at deployment. Each migration can only be applied once per [environment](https://developers.cloudflare.com/durable-objects/reference/environments/).

* Each migration in the list can have multiple directives, and multiple migrations can be specified as your project grows in complexity.

Important

* The destination class (the class that stored Durable Objects are being transferred to) for a Rename or Transfer migration must be exported by the deployed Worker.

* You should not create the destination Durable Object class before running a Rename or Transfer migration. The migration will create the destination class for you.

* After a Rename or Transfer migration, requests to the destination Durable Object class will have access to the source Durable Object's stored data.

* After a migration, any existing bindings to the original Durable Object class (for example, from other Workers) will automatically forward to the updated destination class. However, any Workers bound to the updated Durable Object class must update their Durable Object binding configuration in the `wrangler` configuration file for their next deployment.

Note

Note that `.toml` files do not allow line breaks in inline tables (the `{key = "value"}` syntax), but line breaks in the surrounding inline array are acceptable.

You cannot enable a SQLite storage backend on an existing, deployed Durable Object class, so setting `new_sqlite_classes` on later migrations will fail with an error. Automatic migration of deployed classes from their key-value storage backend to SQLite storage backend will be available in the future.

Important

Durable Object migrations are atomic operations and cannot be gradually deployed. To provide early feedback to developers, new Worker versions with new migrations cannot be uploaded. Refer to [Gradual deployments for Durable Objects](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/#gradual-deployments-for-durable-objects) for more information.

</page>

<page>
---
title: Environments · Cloudflare Durable Objects docs
description: Environments provide isolated spaces where your code runs with
  specific dependencies and configurations. This can be useful for a number of
  reasons, such as compatibility testing or version management. Using different
  environments can help with code consistency, testing, and production
  segregation, which reduces the risk of errors when deploying code.
lastUpdated: 2025-06-18T17:02:32.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/reference/environments/
  md: https://developers.cloudflare.com/durable-objects/reference/environments/index.md
---

Environments provide isolated spaces where your code runs with specific dependencies and configurations. This can be useful for a number of reasons, such as compatibility testing or version management. Using different environments can help with code consistency, testing, and production segregation, which reduces the risk of errors when deploying code.

## Wrangler environments

[Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) allows you to deploy the same Worker application with different configuration for each [environment](https://developers.cloudflare.com/workers/wrangler/environments/).

If you are using Wrangler environments, you must specify any [Durable Object bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) you wish to use on a per-environment basis.

Durable Object bindings are not inherited. For example, you can define an environment named `staging` as below:

* wrangler.jsonc

  ```jsonc
  {
    "env": {
      "staging": {
        "durable_objects": {
          "bindings": [
            {
              "name": "EXAMPLE_CLASS",
              "class_name": "DurableObjectExample"
            }
          ]
        }
      }
    }
  }
  ```

* wrangler.toml

  ```toml
  [env.staging]
  durable_objects.bindings = [
    {name = "EXAMPLE_CLASS", class_name = "DurableObjectExample"}
  ]
  ```

Because Wrangler appends the [environment name](https://developers.cloudflare.com/workers/wrangler/environments/) to the top-level name when publishing, for a Worker named `worker-name` the above example is equivalent to:

* wrangler.jsonc

  ```jsonc
  {
    "env": {
      "staging": {
        "durable_objects": {
          "bindings": [
            {
              "name": "EXAMPLE_CLASS",
              "class_name": "DurableObjectExample",
              "script_name": "worker-name-staging"
            }
          ]
        }
      }
    }
  }
  ```

* wrangler.toml

  ```toml
  [env.staging]
  durable_objects.bindings = [
    {name = "EXAMPLE_CLASS", class_name = "DurableObjectExample", script_name = "worker-name-staging"}
  ]
  ```

`"EXAMPLE_CLASS"` in the staging environment is bound to a different Worker code name compared to the top-level `"EXAMPLE_CLASS"` binding, and will therefore access different Durable Objects with different persistent storage.

If you want an environment-specific binding that accesses the same Objects as the top-level binding, specify the top-level Worker code name explicitly using `script_name`:

* wrangler.jsonc

  ```jsonc
  {
    "env": {
      "another": {
        "durable_objects": {
          "bindings": [
            {
              "name": "EXAMPLE_CLASS",
              "class_name": "DurableObjectExample",
              "script_name": "worker-name"
            }
          ]
        }
      }
    }
  }
  ```

* wrangler.toml

  ```toml
  [env.another]
  durable_objects.bindings = [
    {name = "EXAMPLE_CLASS", class_name = "DurableObjectExample", script_name = "worker-name"}
  ]
  ```

### Migration environments

You can define a Durable Object migration for each environment, as well as at the top level. Migrations at at the environment-level override migrations at the top level.

For more information, refer to [Migration Wrangler Configuration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/#migration-wrangler-configuration).

## Local development

Local development sessions create a standalone, local-only environment that mirrors the production environment, so that you can test your Worker and Durable Objects before you deploy to production.

An existing Durable Object binding of `DB` would be available to your Worker when running locally.

Refer to Workers [Local development](https://developers.cloudflare.com/workers/development-testing/bindings-per-env/).

## Remote development

KV-backed Durable Objects support remote development using the dashboard playground. The dashboard playground uses a browser version of Visual Studio Code, allowing you to rapidly iterate on your Worker entirely in your browser.

To start remote development:

1. Log in to your Cloudflare dashboard, and go to [**Workers & Pages** > **Overview**](https://dash.cloudflare.com/?to=/:account/workers-and-pages).
2. Select an existing Worker.
3. Select the **Edit code** icon located on the upper-right of the screen.

Warning

Remote development is only available for KV-backed Durable Objects. SQLite-backed Durable Objects do not support remote development.

</page>

<page>
---
title: Glossary · Cloudflare Durable Objects docs
description: Review the definitions for terms used across Cloudflare's Durable
  Objects documentation.
lastUpdated: 2024-10-31T15:59:06.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/reference/glossary/
  md: https://developers.cloudflare.com/durable-objects/reference/glossary/index.md
---

Review the definitions for terms used across Cloudflare's Durable Objects documentation.

| Term | Definition |
| - | - |
| alarm | A Durable Object alarm is a mechanism that allows you to schedule the Durable Object to be woken up at a time in the future. |
| bookmark | A bookmark is a mostly alphanumeric string like `0000007b-0000b26e-00001538-0c3e87bb37b3db5cc52eedb93cd3b96b` which represents a specific state of a SQLite database at a certain point in time. Bookmarks are designed to be lexically comparable: a bookmark representing an earlier point in time compares less than one representing a later point, using regular string comparison. |
| Durable Object | A Durable Object is an individual instance of a Durable Object class. A Durable Object is globally unique (referenced by ID), provides a global point of coordination for all methods/requests sent to it, and has private, persistent storage that is not shared with other Durable Objects within a namespace. |
| Durable Object class | The JavaScript class that defines the methods (RPC) and handlers (`fetch`, `alarm`) as part of your Durable Object, and/or an optional `constructor`. All Durable Objects within a single namespace share the same class definition. |
| Durable Objects | The product name, or the collective noun referring to more than one Durable Object. |
| input gate | While a storage operation is executing, no events shall be delivered to a Durable Object except for storage completion events. Any other events will be deferred until such a time as the object is no longer executing JavaScript code and is no longer waiting for any storage operations. We say that these events are waiting for the "input gate" to open. |
| instance | See "Durable Object". |
| KV API | API methods part of Storage API that support persisting key-value data. |
| migration | A Durable Object migration is a mapping process from a class name to a runtime state. Initiate a Durable Object migration when you need to:- Create a new Durable Object class.
- Rename a Durable Object class.
- Delete a Durable Object class.
- Transfer an existing Durable Objects class. |
| namespace | A container for a collection of Durable Objects that all share the same Durable Object (class) definition. A single namespace can have (tens of) millions of Durable Objects. Metrics are scoped per namespace. |
| output gate | When a storage write operation is in progress, any new outgoing network messages will be held back until the write has completed. We say that these messages are waiting for the "output gate" to open. If the write ultimately fails, the outgoing network messages will be discarded and replaced with errors, while the Durable Object will be shut down and restarted from scratch. |
| SQL API | API methods part of Storage API that support SQL querying. |
| Storage API | The transactional and strongly consistent (serializable) [Storage API](https://developers.cloudflare.com/durable-objects/api/storage-api/) for persisting data within each Durable Object. State stored within a unique Durable Object is "private" to that Durable Object, and not accessible from other Durable Objects.Storage API includes key-value (KV) API, SQL API, and point-in-time-recovery (PITR) API.- Durable Object classes with the key-value storage backend can use KV API.
- Durable Object classes with the SQLite storage backend can use KV API, SQL API, and PITR API. |
| Storage Backend | By default, a Durable Object class can use Storage API that leverages a key-value storage backend. New Durable Object classes can opt-in to using a [SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#sqlite-storage-backend). |
| stub | An object that refers to a unique Durable Object within a namespace and allows you to call into that Durable Object via RPC methods or the `fetch` API. For example, `let stub = env.MY_DURABLE_OBJECT.get(id)` |

</page>

<page>
---
title: In-memory state in a Durable Object · Cloudflare Durable Objects docs
description: In-memory state means that each Durable Object has one active
  instance at any particular time. All requests sent to that Durable Object are
  handled by that same instance. You can store some state in memory.
lastUpdated: 2024-10-31T15:59:06.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/reference/in-memory-state/
  md: https://developers.cloudflare.com/durable-objects/reference/in-memory-state/index.md
---

In-memory state means that each Durable Object has one active instance at any particular time. All requests sent to that Durable Object are handled by that same instance. You can store some state in memory.

Variables in a Durable Object will maintain state as long as your Durable Object is not evicted from memory.

A common pattern is to initialize a Durable Object from [persistent storage](https://developers.cloudflare.com/durable-objects/api/storage-api/) and set instance variables the first time it is accessed. Since future accesses are routed to the same Durable Object, it is then possible to return any initialized values without making further calls to persistent storage.

```js
export class Counter {
  constructor(state, env) {
    this.state = state;
    // `blockConcurrencyWhile()` ensures no requests are delivered until
    // initialization completes.
    this.state.blockConcurrencyWhile(async () => {
      let stored = await this.state.storage.get("value");
      // After initialization, future reads do not need to access storage.
      this.value = stored || 0;
    });
  }


  // Handle HTTP requests from clients.
  async fetch(request) {
    // use this.value rather than storage
  }
}
```

A given instance of a Durable Object may share global memory with other instances defined in the same Worker code.

In the example above, using a global variable `value` instead of the instance variable `this.value` would be incorrect. Two different instances of `Counter` will each have their own separate memory for `this.value`, but might share memory for the global variable `value`, leading to unexpected results. Because of this, it is best to avoid global variables.

Built-in caching

The Durable Object's storage has a built-in in-memory cache of its own. If you use `get()` to retrieve a value that was read or written recently, the result will be instantly returned from cache. Instead of writing initialization code like above, you could use `get("value")` whenever you need it, and rely on the built-in cache to make this fast. Refer to the [Build a counter example](https://developers.cloudflare.com/durable-objects/examples/build-a-counter/) to learn more about this approach.

However, in applications with more complex state, explicitly storing state in your Object may be easier than making Storage API calls on every access. Depending on the configuration of your project, write your code in the way that is easiest for you.

</page>

<page>
---
title: Build a seat booking app with SQLite in Durable Objects · Cloudflare
  Durable Objects docs
description: In this tutorial, you will learn how to build a seat reservation
  app using Durable Objects. This app will allow users to book a seat for a
  flight. The app will be written in TypeScript and will use the new SQLite
  storage backend in Durable Object to store the data.
lastUpdated: 2025-04-15T13:47:35.000Z
chatbotDeprioritize: false
source_url:
  html: https://developers.cloudflare.com/durable-objects/tutorials/build-a-seat-booking-app/
  md: https://developers.cloudflare.com/durable-objects/tutorials/build-a-seat-booking-app/index.md
---

In this tutorial, you will learn how to build a seat reservation app using Durable Objects. This app will allow users to book a seat for a flight. The app will be written in TypeScript and will use the new [SQLite storage backend in Durable Object](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#sqlite-storage-backend) to store the data.

Using Durable Objects, you can write reusable code that can handle coordination and state management for multiple clients. Moreover, writing data to SQLite in Durable Objects is synchronous and uses local disks, therefore all queries are executed with great performance. You can learn more about SQLite storage in Durable Objects in the [SQLite in Durable Objects blog post](https://blog.cloudflare.com/sqlite-in-durable-objects).

SQLite in Durable Objects

SQLite in Durable Objects is currently in beta. You can learn more about the limitations of SQLite in Durable Objects in the [SQLite in Durable Objects documentation](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#sqlite-storage-backend).

The application will function as follows:

* A user navigates to the application with a flight number passed as a query parameter.
* The application will create a new Durable Object for the flight number, if it does not already exist.
* If the Durable Object already exists, the application will retrieve the seats information from the SQLite database.
* If the Durable Object does not exist, the application will create a new Durable Object and initialize the SQLite database with the seats information. For the purpose of this tutorial, the seats information is hard-coded in the application.
* When a user selects a seat, the application asks for their name. The application will then reserve the seat and store the name in the SQLite database.
* The application also broadcasts any changes to the seats to all clients.

Let's get started!

## Prerequisites

1. Sign up for a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [`Node.js`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1. Create a new project

Create a new Worker project to create and deploy your app.

1. Create a Worker named `seat-booking` by running:

   * npm

     ```sh
     npm create cloudflare@latest -- seat-booking
     ```

   * yarn

     ```sh
     yarn create cloudflare seat-booking
     ```

   * pnpm

     ```sh
     pnpm create cloudflare@latest seat-booking
     ```

   For setup, select the following options:

   * For *What would you like to start with?*, choose `Hello World example`.
   * For *Which template would you like to use?*, choose `Worker + Durable Objects`.
   * For *Which language do you want to use?*, choose `TypeScript`.
   * For *Do you want to use git for version control?*, choose `Yes`.
   * For *Do you want to deploy your application?*, choose `No` (we will be making some changes before deploying).

2. Change into your new project directory to start developing:

```sh
cd seat-booking
```

## 2. Create the frontend

The frontend of the application is a simple HTML page that allows users to select a seat and enter their name. The application uses [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/binding/) to serve the frontend.

1. Create a new directory named `public` in the project root.

2. Create a new file named `index.html` in the `public` directory.

3. Add the following HTML code to the `index.html` file:

public/index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flight Seat Booking</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: #f0f0f0;
      }
      .booking-container {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .seat-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 10px;
        margin-top: 20px;
      }
      .aisle {
        grid-column: 4;
      }
      .seat {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ccc;
        cursor: pointer;
      }
      .seat.available {
        background-color: #5dbf61ba;
        color: white;
      }
      .seat.unavailable {
        background-color: #f4433673;
        color: white;
        cursor: not-allowed;
      }
      .airplane {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f0f0f0;
        padding: 20px;
        border-radius: 20px;
      }
    </style>
  </head>
  <body>
    <div class="booking-container">
      <h2 id="title"></h2>
      <div class="airplane">
        <div id="seatGrid" class="seat-grid"></div>
      </div>
    </div>


      <script>
        const seatGrid = document.getElementById("seatGrid");
        const title = document.getElementById("title");


        const flightId = window.location.search.split("=")[1];


        const hostname = window.location.hostname;


        if (flightId === undefined) {
          title.textContent = "No Flight ID provided";
          seatGrid.innerHTML = "<p>Add `flightId` to the query string</p>";
        } else {
          handleBooking();
        }


        function handleBooking() {
          let ws;
          if (hostname === 'localhost') {
            const port = window.location.port;
            ws = new WebSocket(`ws://${hostname}:${port}/ws?flightId=${flightId}`);
          } else {
            ws = new WebSocket(`wss://${hostname}/ws?flightId=${flightId}`);
          }


          title.textContent = `Book seat for flight ${flightId}`;


          ws.onopen = () => {
            console.log("Connected to WebSocket server");
          };


          function createSeatGrid(seats) {
            seatGrid.innerHTML = "";
            for (let row = 1; row <= 10; row++) {
              for (let col = 0; col < 6; col++) {
                if (col === 3) {
                  const aisle = document.createElement("div");
                  aisle.className = "aisle";
                  seatGrid.appendChild(aisle);
                }


                const seatNumber = `${row}${String.fromCharCode(65 + col)}`;
                const seat = seats.find((s) => s.seatNumber === seatNumber);
                const seatElement = document.createElement("div");
                seatElement.className = `seat ${seat && seat.occupant ? "unavailable" : "available"}`;
                seatElement.textContent = seatNumber;
                seatElement.onclick = () => bookSeat(seatNumber);
                seatGrid.appendChild(seatElement);
              }
            }
          }


          async function fetchSeats() {
            const response = await fetch(`/seats?flightId=${flightId}`);
            const seats = await response.json();
            createSeatGrid(seats);
          }


          async function bookSeat(seatNumber) {
            const name = prompt("Please enter your name:");
            if (!name) {
              return; // User canceled the prompt
            }


            const response = await fetch(`book-seat?flightId=${flightId}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ seatNumber, name }),
            });
            const result = await response.text();
            fetchSeats();
          }


          ws.onmessage = (event) => {
            try {
              const seats = JSON.parse(event.data);
              createSeatGrid(seats);
            } catch (error) {
              console.error("Error parsing WebSocket message:", error);
            }
          };


          ws.onerror = (error) => {
            console.error("WebSocket error:", error);
          };


          ws.onclose = (event) => {
            console.log("WebSocket connection closed:", event);
          };


          fetchSeats();
        }
      </script>
    </body>


</html>
```

* The frontend makes an HTTP `GET` request to the `/seats` endpoint to retrieve the available seats for the flight.
* It also uses a WebSocket connection to receive updates about the available seats.
* When a user clicks on a seat, the `bookSeat()` function is called that prompts the user to enter their name and then makes a `POST` request to the `/book-seat` endpoint.

1. Update the bindings in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to configure `assets` to serve the `public` directory.

* wrangler.jsonc

  ```jsonc
  {
    "assets": {
      "directory": "public"
    }
  }
  ```

* wrangler.toml

  ```toml
  [assets]
  directory = "public"
  ```

1. If you start the development server using the following command, the frontend will be served at `http://localhost:8787`. However, it will not work because the backend is not yet implemented.

```bash
npm run dev
```

Workers Static Assets

[Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/binding/) is currently in beta. You can also use Cloudflare Pages to serve the frontend. However, you will need a separate Worker for the backend.

## 3. Create table for each flight

The application already has the binding for the Durable Objects class configured in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). If you update the name of the Durable Objects class in `src/index.ts`, make sure to also update the binding in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).

1. Update the binding to use the SQLite storage in Durable Objects. In the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/), replace `new_classes=["Flight"]` with `new_sqlite_classes=["Flight"]`, `name = "FLIGHT"` with `name = "FLIGHT"`, and `class_name = "MyDurableObject"` with `class_name = "Flight"`. your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) should look similar to this:

* wrangler.jsonc

  ```jsonc
  {
    "durable_objects": {
      "bindings": [
        {
          "name": "FLIGHT",
          "class_name": "Flight"
        }
      ]
    },
    "migrations": [
      {
        "tag": "v1",
        "new_sqlite_classes": [
          "Flight"
        ]
      }
    ]
  }
  ```

* wrangler.toml

  ```toml
  [[durable_objects.bindings]]
  name = "FLIGHT"
  class_name = "Flight"


  # Durable Object migrations.
  # Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#migrations
  [[migrations]]
  tag = "v1"
  new_sqlite_classes = ["Flight"]
  ```

Your application can now use the SQLite storage in Durable Objects.

1. Add the `initializeSeats()` function to the `Flight` class. This function will be called when the Durable Object is initialized. It will check if the table exists, and if not, it will create it. It will also insert seats information in the table.

For this tutorial, the function creates an identical seating plan for all the flights. However, in production, you would want to update this function to insert seats based on the flight type.

Replace the `Flight` class with the following code:

```ts
import { DurableObject } from "cloudflare:workers";


export class Flight extends DurableObject {
  sql = this.ctx.storage.sql;


  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.initializeSeats();
  }


  private initializeSeats() {
    const cursor = this.sql.exec(`PRAGMA table_list`);


    // Check if a table exists.
    if ([...cursor].find((t) => t.name === "seats")) {
      console.log("Table already exists");
      return;
    }


    this.sql.exec(`
          CREATE TABLE IF NOT EXISTS seats (
          seatId TEXT PRIMARY KEY,
          occupant TEXT
          )
        `);


    // For this demo, we populate the table with 60 seats.
    // Since SQLite in DOs is fast, we can do a query per INSERT instead of batching them in a transaction.
    for (let row = 1; row <= 10; row++) {
      for (let col = 0; col < 6; col++) {
        const seatNumber = `${row}${String.fromCharCode(65 + col)}`;
        this.sql.exec(`INSERT INTO seats VALUES (?, null)`, seatNumber);
      }
    }
  }
}
```

1. Add a `fetch` handler to the `Flight` class. This handler will return a text response. In [Step 5](#5-handle-websocket-connections) You will update the `fetch` handler to handle the WebSocket connection.

```ts
import { DurableObject } from "cloudflare:workers";


export class Flight extends DurableObject {
  ...
  async fetch(request: Request): Promise<Response> {
    return new Response("Hello from Durable Object!", { status: 200 });
  }
}
```

1. Next, update the Worker's fetch handler to create a unique Durable Object for each flight.

```ts
export default {
  async fetch(request, env, ctx): Promise<Response> {
    // Get flight id from the query parameter
    const url = new URL(request.url);
    const flightId = url.searchParams.get("flightId");


    if (!flightId) {
      return new Response(
        "Flight ID not found. Provide flightId in the query parameter",
        { status: 404 },
      );
    }


    const id = env.FLIGHT.idFromName(flightId);
    const stub = env.FLIGHT.get(id);
    return stub.fetch(request);
  },
} satisfies ExportedHandler<Env>;
```

Using the flight ID, from the query parameter, a unique Durable Object is created. This Durable Object is initialized with a table if it does not exist.

## 4. Add methods to the Durable Object

1. Add the `getSeats()` function to the `Flight` class. This function returns all the seats in the table.

```ts
import { DurableObject } from "cloudflare:workers";


export class Flight extends DurableObject {
    ...


  private initializeSeats() {
    ...
  }


  // Get all seats.
  getSeats() {
    let results = [];


    // Query returns a cursor.
    let cursor = this.sql.exec(`SELECT seatId, occupant FROM seats`);


    // Cursors are iterable.
    for (let row of cursor) {
      // Each row is an object with a property for each column.
      results.push({ seatNumber: row.seatId, occupant: row.occupant });
    }


    return results;
  }
}
```

1. Add the `assignSeat()` function to the `Flight` class. This function will assign a seat to a passenger. It takes the seat number and the passenger name as parameters.

```ts
import { DurableObject } from "cloudflare:workers";


export class Flight extends DurableObject {
  ...


  private initializeSeats() {
    ...
  }


  // Get all seats.
  getSeats() {
    ...
  }


  // Assign a seat to a passenger.
  assignSeat(seatId: string, occupant: string) {
    // Check that seat isn't occupied.
    let cursor = this.sql.exec(
      `SELECT occupant FROM seats WHERE seatId = ?`,
      seatId,
    );
    let result = cursor.toArray()[0]; // Get the first result from the cursor.


    if (!result) {
      return {message: 'Seat not available',  status: 400 };
    }
    if (result.occupant !== null) {
      return {message: 'Seat not available',  status: 400 };
    }


    // If the occupant is already in a different seat, remove them.
    this.sql.exec(
      `UPDATE seats SET occupant = null WHERE occupant = ?`,
      occupant,
    );


    // Assign the seat. Note: We don't have to worry that a concurrent request may
    // have grabbed the seat between the two queries, because the code is synchronous
    // (no `await`s) and the database is private to this Durable Object. Nothing else
    // could have changed since we checked that the seat was available earlier!
    this.sql.exec(
      `UPDATE seats SET occupant = ? WHERE seatId = ?`,
      occupant,
      seatId,
    );


    // Broadcast the updated seats.
    this.broadcastSeats();
    return {message: `Seat ${seatId} booked successfully`, status: 200 };
  }
}
```

The above function uses the `broadcastSeats()` function to broadcast the updated seats to all the connected clients. In the next section, we will add the `broadcastSeats()` function.

## 5. Handle WebSocket connections

All the clients will connect to the Durable Object using WebSockets. The Durable Object will broadcast the updated seats to all the connected clients. This allows the clients to update the UI in real time.

1. Add the `handleWebSocket()` function to the `Flight` class. This function handles the WebSocket connections.

```ts
import { DurableObject } from "cloudflare:workers";


export class Flight extends DurableObject {
  ...


  private initializeSeats() {
    ...
  }


  // Get all seats.
  getSeats() {
    ...
  }


  // Assign a seat to a passenger.
  assignSeat(seatId: string, occupant: string) {
    ...
  }


  private handleWebSocket(request: Request) {
    console.log('WebSocket connection requested');
    const [client, server] = Object.values(new WebSocketPair());


    this.ctx.acceptWebSocket(server);
    console.log('WebSocket connection established');


    return new Response(null, { status: 101, webSocket: client });
  }
}
```

1. Add the `broadcastSeats()` function to the `Flight` class. This function will broadcast the updated seats to all the connected clients.

```ts
import { DurableObject } from "cloudflare:workers";


export class Flight extends DurableObject {
  ...


  private initializeSeats() {
    ...
  }


  // Get all seats.
  getSeats() {
    ...
  }


  // Assign a seat to a passenger.
  assignSeat(seatId: string, occupant: string) {
    ...
  }


  private handleWebSocket(request: Request) {
    ...
  }


  private broadcastSeats() {
    this.ctx.getWebSockets().forEach((ws) => ws.send(this.getSeats()));
  }
}
```

1. Next, update the `fetch` handler in the `Flight` class. This handler will handle all the incoming requests from the Worker and handle the WebSocket connections using the `handleWebSocket()` method.

```ts
import { DurableObject } from "cloudflare:workers";


export class Flight extends DurableObject {
  ...


  private initializeSeats() {
    ...
  }


  // Get all seats.
  getSeats() {
    ...
  }


  // Assign a seat to a passenger.
  assignSeat(seatId: string, occupant: string) {
    ...
  }


  private handleWebSocket(request: Request) {
    ...
  }


  private broadcastSeats() {
    ...
  }


  async fetch(request: Request) {
    return this.handleWebSocket(request);
  }
}
```

1. Finally, update the `fetch` handler of the Worker.

```ts
export default {
  ...


  async fetch(request, env, ctx): Promise<Response> {
    // Get flight id from the query parameter
    ...


    if (request.method === "GET" && url.pathname === "/seats") {
      return new Response(JSON.stringify(await stub.getSeats()), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (request.method === "POST" && url.pathname === "/book-seat") {
      const { seatNumber, name } = (await request.json()) as {
        seatNumber: string;
        name: string;
      };
      const result = await stub.assignSeat(seatNumber, name);
      return new Response(JSON.stringify(result));
    } else if (request.headers.get("Upgrade") === "websocket") {
      return stub.fetch(request);
    }


    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;
```

The `fetch` handler in the Worker now calls appropriate Durable Object function to handle the incoming request. If the request is a `GET` request to `/seats`, the Worker returns the seats from the Durable Object. If the request is a `POST` request to `/book-seat`, the Worker calls the `bookSeat` method of the Durable Object to assign the seat to the passenger. If the request is a WebSocket connection, the Durable Object handles the WebSocket connection.

## 6. Test the application

You can test the application locally by running the following command:

```sh
npm run dev
```

This starts a local development server that runs the application. The application is served at `http://localhost:8787`.

Navigate to the application at `http://localhost:8787` in your browser. Since the flight ID is not specified, the application displays an error message.

Update the URL with the flight ID as `http://localhost:8787?flightId=1234`. The application displays the seats for the flight with the ID `1234`.

## 7. Deploy the application

To deploy the application, run the following command:

```sh
npm run deploy
```

```sh
 ⛅️ wrangler 3.78.8
-------------------


🌀 Building list of assets...
🌀 Starting asset upload...
🌀 Found 1 new or modified file to upload. Proceeding with upload...
+ /index.html
Uploaded 1 of 1 assets
✨ Success! Uploaded 1 file (1.93 sec)


Total Upload: 3.45 KiB / gzip: 1.39 KiB
Your worker has access to the following bindings:
- Durable Objects:
  - FLIGHT: Flight
Uploaded seat-book (12.12 sec)
Deployed seat-book triggers (5.54 sec)
  [DEPLOYED_APP_LINK]
Current Version ID: [BINDING_ID]
```

Navigate to the `[DEPLOYED_APP_LINK]` to see the application. Again, remember to pass the flight ID as a query string parameter.

## Summary

In this tutorial, you have:

* used the SQLite storage backend in Durable Objects to store the seats for a flight.
* created a Durable Object class to manage the seat booking.
* deployed the application to Cloudflare Workers!

The full code for this tutorial is available on [GitHub](https://github.com/harshil1712/seat-booking-app).

</page>

