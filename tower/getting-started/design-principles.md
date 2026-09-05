---
slug: design-principles
title: Design Principles
---
import Image from '@theme/IdealImage';

We believe in doing things the right way, so we have taken the following design decisions.

## Radio Frequency

We use the 868/915 MHz frequency for radio communication. This is a license-free band designated for short signal messages.

Abusing your IoT devices with a 2.4 GHz band and fighting streaming WiFi, Bluetooth, ZigBee and other protocols will not help your system reliability.

It is also about basic rules from physics: with higher frequency, you get worse penetration through the walls and other obstacles. Also, the power consumption efficiency is better at a lower frequency. As stated earlier, low-power designs are our goal!

## Programming Language

Most developers have somewhat biased opinions about their favorite programming language and we fully hear those. However, in the embedded world if you want to get the most from your platform that has to run for several years without a restart and with the lowest possible power consumption, you have to stick with the tools that simply satisfy such requirements.

That’s why we have chosen the C language as the technology for firmware development. With a solid, battle-tested GCC toolchain and traditional Makefile-based build, your projects will be secured for the future.

Despite the fact how tempting it might be to use a high-level interpreted language like Python, Javascript, etc., you will always do worse in terms of consumed resources and execution time, than with a well-written code in C.

On the other hand, we have created a framework, a firmware SDK, that makes your firmware development easy and working with the API feels like working in a high-level language.

## Asynchronous Architecture

We have taken some innovative techniques to the embedded level. The most notable one is the asynchronous-like programming pattern. The built-in scheduler simplifies your life with tasks and the platform’s power management. It is done for you automatically and you focus on the application development rather than low-level internals.

Also on the hub side, the MQTT follows asynchronous concepts as well. That’s a great opportunity to design your own IoT system in one, uniform, asynchronous concept.

## CLI-First Approach

Command Line Interface (CLI) is the first-class citizen in the TOWER system. This is where we differ from most other embedded IoT platforms. We emphasize the CLI approach in the very first place. It has plenty of advantages. First of all, you can do all the operations on the so-called “headless” machines, like servers, embedded computers, etc. Secondly, you can easily hook up continuous integration services that can automate your workflow.

Moreover, tied with Git, MQTT client tools, logging mechanism, etc. you will quickly see that your workflow is rather smooth and efficient.

