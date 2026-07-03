---
slug: /introduction
sidebar_position: 1
title: Introduction
---
import Image from '@theme/IdealImage';

# CLOUD Introduction

The **HARDWARIO Cloud** is an infrastructure that provides IoT connectivity and enables the management of HARDWARIO IoT devices and provides access to the transmitted device data via REST APIs or callbacks.

<Image img={require('./images/hardwario-cloud.png')}/><br/>

1. To discover the basic features of **HARDWARIO Cloud**, see the chapter:<br/>
   [**Basic Features**](#basic-features)

1. To understand security precautions, go to the chapter:<br/>
   [**Security Precautions**](#security-precautions)

1. To learn about cloud integration options, follow the chapter:<br/>
   [**Cloud Integrations**](#cloud-integrations)

## Basic Features

* The incoming connections are encapsulated in so-called sessions, which are established from the devices. The sessions are unique and fully traceable in the communication logs.

* The messages passed through the socket are translated from a binary format into a **JSON** and passed for pipeline processing in RabbitMQ.

* The message is stored in a database, and if asynchronous callback is configured (by the customer), the message is immediately delivered to the customer's backend (webhook).

* The data is also available through the **REST API**.

* Customers can interact with the devices and messages via a web portal, which is a client for its **REST API** (HARDWARIO Cloud is an API-first model).

* The whole stack is implemented in Node.js (Fastify framework) + Vue.js (frontend).

* **HARDWARIO Cloud** uses **MongoDB** as a database and Redis as an in-memory cache.

* All components run in isolated **Docker** containers (bootstrapped by **Docker Compose**).

## Security Precautions

- Communication between the device and server uses a proven **DTLS** socket implementation (v1.2) in the **PSK mode**.

- **Bluetooth Low Energy** has a security PIN enabled. The PIN is unique for each device.

- Servers are operated in Digital Ocean's Frankfurt data center.

- There are automated weekly backups of all the servers.

- All servers run the latest **Ubuntu Server** LTS distribution.

- HARDWARIO team updates server software at regular monthly intervals altogether with a security audit (running processes, users, system resources, etc.).

- All server logins are possible only from a regular user account (no root login).

- Login is possible only via SSH key (no password logins). The SSH key must be password protected.

- Every HARDWARIO team member is required to use password managers altogether with 2FA wherever possible. Authentication via trusted identity providers, such as Google, Microsoft, etc., is preferred.

## Cloud Integrations

### Callbacks

Callbacks are messages automatically forwarded by the cloud and sent to a defined **URL** endpoint. Callbacks are always entered for a given **Group** using the **Edit** icon. When setting up a callback, the following fields are filled in:

* `Name` - Your chosen callback name; We recommend specifying the name of the integrated application, e.g., **[Ubidots](https://ubidots.com)**

* `Enabled` - Callback can be switched on/off. It is functional in Enabled - Yes state

* `Note` - Space for your internal memo

* `Method` - A selection of the following HTTP options:

  * `POST` - Carries request parameters in the message body

  * `GET` - Carries request parameters appended in the URL string

  * `PUT` - Creates a new resource or replaces a representation of the target resource with the requested payload

  * `PATCH` - Updates the values of the resource properties

* `URL Address` - URL of the endpoint to which messages will be sent. We strongly recommend using HTTPS protocol (TLS technology).

* `Query Parameters` - Optional URL extension

* `Name` - Name of the specified parameter

* `Value` - Parameter value

* `HTTP Headers` - Additional HTTP request context

* `Name` - Name of the specified header (e.g., `Authentication`)

* `Value` - Value, e.g., authentican token

* `Content Type` - A selection of the following options:

  * `application/json`

  * `application/x-www-form-urlencoded`

  * `application/octet-stream`

* `Payload` - This field allows the user to transform the message content using the **JSONata** functional language. Leave this field empty if no further **JSONata** transformation is required (the payload will be passed as-is). See here for a description of **JSONata** below for an example of selecting and transforming part of the message content:

  ```json
  {
    "external_temperature": data.hygrometer.temperature,
    "external_humidity": data.hygrometer.humidity,
    "device_orientation": data.accelerometer.orientation
  }
  ```

* `Original message` - The message content before **JSONata** transformation

* `Transformed payload` - The message content after **JSONata** transformation

Save the callback using the **SAVE CALLBACK** button.

### REST API

**REST API** is an application programming interface that conforms to the constraints of **REST** architectural style and allows for interaction with **RESTful** web services.

A description of our **REST API** can be found at this link:
https://api.hardwario.cloud
