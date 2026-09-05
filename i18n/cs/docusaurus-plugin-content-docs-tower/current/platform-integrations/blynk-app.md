---
slug: blynk-app
title: Mobilní a webová aplikace Blynk
description: "Blynk je nástroj pro tvorbu mobilního frontendu a signalizační relay (MQTT). Umožňuje vám rychle vytvořit ovládání a zobrazení pro vaše IoT zařízení. Zde vás provedeme procesem sestavení hardwaru a jeho připojení do cloudu."
---
import Image from '@theme/IdealImage';
import ReactPlayer from 'react-player'

[**Blynk**](https://blynk.io) je nástroj pro tvorbu mobilního frontendu a signalizační relay (MQTT). Umožňuje vám rychle vytvořit ovládání a zobrazení pro vaše IoT zařízení. Zde vás provedeme procesem sestavení hardwaru a jeho připojení do cloudu.

Cloud je pak propojen s projektem ve vašem telefonu v aplikaci Blynk. Lokální část projektu je hostována na HARDWARIO Raspbian, který má připravené všechny potřebné komponenty pro propojení.

Když bude v tomto příkladu vše hotové, měli byste být schopni zapínat a vypínat relé, rozsvítit a zhasnout LED pásek, měnit intenzitu světla pomocí slideru a také sledovat teplotu (a další sbírané hodnoty) doplněnou grafy.

:::tip

Několik příkladů, jak používat [**TOWER s Blynk, najdete na naší stránce hackster.io**](https://www.hackster.io/hardwario/projects?category_id=299).

:::

<Image img={require('../../../../../tower/platform-integrations/images/blynk-app-showcase.png')} alt="Obrazovky aplikace Blynk: box s widgety, rozpracovaný dashboard a živé ukazatele s teplotou, vlhkostí a grafem CO2" />

## Nastavení Blynk {#setup-blynk}

Začněte stažením **aplikace Blynk** a vytvořením účtu
- [**App Store**](https://apps.apple.com/us/app/blynk-iot/id1559317868)
- [**Google Play**](https://play.google.com/store/apps/details?id=cloud.blynk)


## Nastavení Node-RED {#node-red-setup}

Pokud v Node-RED nevidíte nody Blynk, nainstalujte balíček Blynk `node-red-contrib-blynk-ws`.

:::tip

   Můžete se řídit jedním z [**tutoriálů k projektům**](https://www.hackster.io/hardwario/projects?category_id=299), kde je instalace, vytváření a propojování nodů vysvětleno podrobně.

:::

### Videotutoriál {#video-tutorial}

Pokud dáváte přednost videoprůvodci, můžete se podívat na toto video pro starší verzi Playground, funguje to stejně.

<ReactPlayer controls src='https://youtu.be/cVC_tFuCYTM' />

## ZeRGBA na hexadecimální RGB hodnoty – příklad {#zergba-to-hex-rgb-values---example}

Hodnoty barev z Blynk je potřeba převést na **správný hexadecimální RGB řetězec**. Můžete použít funkční blok v Node-RED a vložit do něj níže uvedený kód. Nezapomeňte nastavit **ZeRGBa do režimu MERGE** a rozsah hodnot musí být pro všechny tři kanály nastaven na **0–255**

:::info

Níže uvedený **JSON budete muset importovat** do **Node-RED**.

Pokud nevíte, co je **Node-RED**, můžete si přečíst [**sekci Desktop Programming**](../desktop-programming/about-playground.md) nebo [**sekci Server na Raspberry Pi**](../server-raspberry-pi/index.md).

:::

<details>
<summary>
<b>
JSON flow ukázkového projektu Blynk
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

Po importu byste měli vidět tento flow.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div><Image img={require('../../../../../tower/platform-integrations/images/blynk-flow-example.png')} alt="Node-RED flow propojující události zápisu Pin V1-V7 přes funkční nody do nodu mqtt" /></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>

Nyní můžete naskenovat QR kód níže a importovat všechny potřebné widgety do aplikace Blynk

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/platform-integrations/images/blynk-example-qr-code.png')} alt="QR kód pro naklonování ukázkového projektu Blynk" /></div>
    </div>
    <div class="col col--6">
    </div>
  </div>
</div>

Po naskenování QR kódu v aplikaci byste měli vidět widgety rozmístěné takto

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/platform-integrations/images/blynk-example-widget-showcase.png')} alt="Dashboard wireless-led-strip v Blynk se slidery, tlačítky V3-V6 a výběrem barvy LED pásku" /></div>
    </div>
    <div class="col col--6">
    </div>
  </div>
</div>
