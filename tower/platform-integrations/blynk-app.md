---
slug: blynk-app
title: Blynk Mobile and Web Application
---
import Image from '@theme/IdealImage';
import ReactPlayer from 'react-player'

[**The Blynk**](https://blynk.io) is a mobile front-end builder and signaling relay (MQTT). This lets you quickly create control and display for your IoT things. Here we will guide you through the process of putting together the hardware and connecting it to the cloud.

The cloud in turn gets interconnected with the project on your phone within the Blynk app. The local side of the project is hosted on the HARDWARIO Raspbian which has all the necessary components prepared for interconnection.

When everything in this example is finished, you should have the ability to turn on and off the relay, switch the LED strip on and off, change the light intensity using the slider and also you would be able to watch the temperature (and other values collected) accompanied by graphs.

:::tip

You can find some examples of how to use [**TOWER with Blynk on our hackster.io page**](https://www.hackster.io/hardwario/projects?category_id=299).

:::

<Image img={require('./images/blynk-app-showcase.png')} />

## Setup Blynk

You should start by downloading the **Blynk app** and creating the account
- [**App Store**](https://apps.apple.com/us/app/blynk-iot/id1559317868)
- [**Google Play**](https://play.google.com/store/apps/details?id=cloud.blynk)


## Node-RED Setup

In Node-RED, install the Blynk package `node-red-contrib-blynk-ws` if you cannot see Blynk nodes.

:::tip

   You can follow one of the [**project tutorials**](https://www.hackster.io/hardwario/projects?category_id=299) where installation, creating and connecting of nodes is explained in detail.

:::

### Video Tutorial

If you prefer a video guide, you can watch this video for the older Playground version, but it works the same.

<ReactPlayer controls src='https://youtu.be/cVC_tFuCYTM' />

## ZeRGBA to hex RGB values - Example

Blynk color values need to be transformed to **proper hexadecimal RGB string**. You can use the function block in the Node-RED and paste the code below. Remember to configure **ZeRGBa to MERGE mode** and the range of values has to be set for all three channels to **0 - 255**

:::info

You will need to **import the JSON** below to the **Node-RED**.

If you don't know what a **Node-RED** is, you can read the [**Desktop Programming section**](../desktop-programming/about-playground.md) or [**Server on Raspberry Pi section**](../server-raspberry-pi/index.md).

:::

<details>
<summary>
<b>
Blynk example project flow JSON
</b>
</summary>
<p>

```json showLineNumbers

[
   {
      "id":"702c9447.9b790c",
      "type":"blynk-ws-in-write",
      "z":"aaf5722e.dfdca",
      "name":"",
      "pin":"1",
      "client":"746d7fe1.2a0be",
      "x":330,
      "y":280,
      "wires":[
         [
            "4da0fdbd.a3c614"
         ]
      ]
   },
   {
      "id":"4da0fdbd.a3c614",
      "type":"function",
      "z":"aaf5722e.dfdca",
      "name":"Convert to BC format",
      "func":"var finalString = '\"#'\nvar colorToSave = \"\";\nmsg.arrayOfValues.forEach((color) => {\n    var carry = (parseInt(color)).toString(16)\n    if(carry.length == 1) carry = \"0\" + carry;\n    finalString += carry;\n    colorToSave += carry;\n});\n\nflow.set(\"color\", colorToSave);\n\nif((flow.get(\"ledstrip\")) == false){\n    msg.payload = '\"#000000(00)\"'\n}\nelse{\n    var white = flow.get(\"white\");\n    if(white == null) white = \"00\";\n    msg.payload = finalString + '(' + white + ')\"'; \n}\n\n\nmsg.topic = \"node/power-controller:0/led-strip/-/color/set\";\nreturn msg;\n",
      "outputs":1,
      "noerr":0,
      "x":600,
      "y":280,
      "wires":[
         [
            "a7ef9db0.cc602"
         ]
      ]
   },
   {
      "id":"a7ef9db0.cc602",
      "type":"mqtt out",
      "z":"aaf5722e.dfdca",
      "name":"",
      "topic":"",
      "qos":"",
      "retain":"",
      "broker":"71afb0a.14d505",
      "x":870,
      "y":420,
      "wires":[

      ]
   },
   {
      "id":"b596fcc7.b5206",
      "type":"blynk-ws-in-write",
      "z":"aaf5722e.dfdca",
      "name":"",
      "pin":"4",
      "client":"746d7fe1.2a0be",
      "x":330,
      "y":460,
      "wires":[
         [
            "80140f23.46bf6"
         ]
      ]
   },
   {
      "id":"80140f23.46bf6",
      "type":"function",
      "z":"aaf5722e.dfdca",
      "name":"String to bool parser",
      "func":"if(msg.payload == true)\n{\n    msg.payload = true;\n}\nelse{\n    msg.payload = false;\n}\nmsg.topic = \"node/power-controller:0/relay/-/state/set\";\nreturn msg;",
      "outputs":1,
      "noerr":0,
      "x":600,
      "y":460,
      "wires":[
         [
            "a7ef9db0.cc602"
         ]
      ]
   },
   {
      "id":"62416cd0.a6dbf4",
      "type":"blynk-ws-in-write",
      "z":"aaf5722e.dfdca",
      "name":"",
      "pin":"3",
      "client":"746d7fe1.2a0be",
      "x":330,
      "y":400,
      "wires":[
         [
            "3bce27cc.257308"
         ]
      ]
   },
   {
      "id":"3bce27cc.257308",
      "type":"function",
      "z":"aaf5722e.dfdca",
      "name":"Handler",
      "func":"var lastColor = flow.get(\"color\")|| \"000000(00)\";\n\nif(msg.payload == false) {\n    msg.payload = '\"#000000(00)\"';\n    flow.set(\"ledstrip\", false);\n}\nelse {\n    msg.payload = '\"#' + '' + lastColor + '\"';\n    flow.set(\"ledstrip\", true);\n}\nmsg.topic = \"node/power-controller:0/led-strip/-/color/set\";\n\nreturn msg;",
      "outputs":1,
      "noerr":0,
      "x":640,
      "y":400,
      "wires":[
         [
            "a7ef9db0.cc602"
         ]
      ]
   },
   {
      "id":"d619d828.3e1bf8",
      "type":"blynk-ws-in-write",
      "z":"aaf5722e.dfdca",
      "name":"",
      "pin":"5",
      "client":"746d7fe1.2a0be",
      "x":330,
      "y":520,
      "wires":[
         [
            "9b87dc69.53d55"
         ]
      ]
   },
   {
      "id":"e267bf2d.7e292",
      "type":"blynk-ws-in-write",
      "z":"aaf5722e.dfdca",
      "name":"",
      "pin":"6",
      "client":"746d7fe1.2a0be",
      "x":330,
      "y":580,
      "wires":[
         [
            "81fcc52c.023c08"
         ]
      ]
   },
   {
      "id":"3121623b.8b75de",
      "type":"blynk-ws-in-write",
      "z":"aaf5722e.dfdca",
      "name":"",
      "pin":"2",
      "client":"746d7fe1.2a0be",
      "x":330,
      "y":340,
      "wires":[
         [
            "99a36ea2.e29bf"
         ]
      ]
   },
   {
      "id":"9b87dc69.53d55",
      "type":"function",
      "z":"aaf5722e.dfdca",
      "name":"Rainbow",
      "func":"if(msg.payload == true && flow.get(\"ledstrip\")||true){\n    msg.payload = '{\"type\":\"rainbow\", \"wait\":50}';\n    msg.topic = \"node/power-controller:0/led-strip/-/effect/set\"   \n}\n\nreturn msg;",
      "outputs":1,
      "noerr":0,
      "x":640,
      "y":520,
      "wires":[
         [
            "a7ef9db0.cc602"
         ]
      ]
   },
   {
      "id":"81fcc52c.023c08",
      "type":"function",
      "z":"aaf5722e.dfdca",
      "name":"Theater chase",
      "func":"if(msg.payload == true && flow.get(\"ledstrip\")||true){\n    msg.payload = '{\"type\":\"theater-chase-rainbow\", \"wait\":50}';\n    msg.topic = \"node/power-controller:0/led-strip/-/effect/set\"   \n}\n\nreturn msg;",
      "outputs":1,
      "noerr":0,
      "x":620,
      "y":580,
      "wires":[
         [
            "a7ef9db0.cc602"
         ]
      ]
   },
   {
      "id":"99a36ea2.e29bf",
      "type":"function",
      "z":"aaf5722e.dfdca",
      "name":"White color handler",
      "func":"var carry = (parseInt(msg.payload)).toString(16)\nif(carry.length == 1) carry = \"0\" + carry;\n\nflow.set(\"white\", carry);\n\nvar color = flow.get(\"color\");\nif(color == null) color = \"000000\";\n\nmsg.payload = '\"#' + color +'(' + carry + ')\"';\nmsg.topic = \"node/power-controller:0/led-strip/-/color/set\";\nreturn msg;",
      "outputs":1,
      "noerr":0,
      "x":610,
      "y":340,
      "wires":[
         [
            "a7ef9db0.cc602"
         ]
      ]
   },
   {
      "id":"d40dc7b0.acf648",
      "type":"blynk-ws-in-write",
      "z":"aaf5722e.dfdca",
      "name":"",
      "pin":"7",
      "client":"746d7fe1.2a0be",
      "x":330,
      "y":640,
      "wires":[
         [
            "a03ff4eb.de9fd8"
         ]
      ]
   },
   {
      "id":"a03ff4eb.de9fd8",
      "type":"function",
      "z":"aaf5722e.dfdca",
      "name":"Brightness handler",
      "func":"if(msg.payload == true && flow.get(\"ledstrip\")||true){\n    msg.payload = msg.payload;\n    msg.topic = \"node/power-controller:0/led-strip/-/brightness/set\"   \n}\n\nreturn msg;",
      "outputs":1,
      "noerr":0,
      "x":610,
      "y":640,
      "wires":[
         [
            "a7ef9db0.cc602"
         ]
      ]
   },
   {
      "id":"746d7fe1.2a0be",
      "type":"blynk-ws-client",
      "z":"",
      "name":"",
      "path":"ws://blynk-cloud.com/websockets",
      "key":"",
      "dbg_all":false,
      "dbg_read":false,
      "dbg_write":false,
      "dbg_notify":false,
      "dbg_mail":false,
      "dbg_prop":false,
      "dbg_low":false,
      "dbg_pins":""
   },
   {
      "id":"71afb0a.14d505",
      "type":"mqtt-broker",
      "z":"",
      "broker":"127.0.0.1",
      "port":"1883",
      "clientid":"",
      "usetls":false,
      "compatmode":true,
      "keepalive":"60",
      "cleansession":true,
      "willTopic":"",
      "willQos":"0",
      "willPayload":"",
      "birthTopic":"",
      "birthQos":"0",
      "birthPayload":""
   }
]
```

</p>
</details>

After the import, you should see this flow.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div><Image img={require('./images/blynk-flow-example.png')} /></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>

Now you can scan the QR below to import all the needed widgets into the Blynk app

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/blynk-example-qr-code.png')} /></div>
    </div>
    <div class="col col--6">
    </div>
  </div>
</div>

After you scan the QR code in the app, you should see widgets positioned like this

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/blynk-example-widget-showcase.png')} /></div>
    </div>
    <div class="col col--6">
    </div>
  </div>
</div>
