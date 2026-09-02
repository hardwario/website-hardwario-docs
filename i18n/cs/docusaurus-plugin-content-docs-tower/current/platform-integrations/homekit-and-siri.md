---
slug: homekit-and-siri
title: HomeKit a Siri
description: "Díky integraci s HomeKit budete moci ovládat své IoT projekty ze zařízení iOS nebo macOS. Jakmile budete mít zařízení v aplikaci Domácnost,"
---
import Image from '@theme/IdealImage';

Díky integraci s HomeKit budete moci ovládat své IoT projekty ze zařízení **iOS** nebo **macOS**. Jakmile budete mít zařízení v aplikaci Domácnost,
můžete jej ovládat pomocí Siri.

:::info

Na konci tohoto článku se zeptáte Siri na teplotu ve vaší ložnici a ona vám odpoví teplotou z vašeho teplotního senzoru HARDWARIO!

:::

## Instalace {#installation}

Pokud chcete následující integraci použít na [**HARDWARIO Hub**](../server-raspberry-pi/installation-os.md) nebo na systému Debian a Ubuntu, musíte nainstalovat několik závislostí.
Připojte se k příkazové řádce zařízení **HARDWARIO Hub** podle článku [**Přihlášení k Raspberry Pi**](../server-raspberry-pi/login-guide.md).

Po přihlášení zkopírujte, vložte a spusťte následující příkazy.

```bash showLineNumbers
sudo apt-get update
sudo apt-get install libavahi-compat-libdnssd-dev
```

Otevřete **HARDWARIO Hub ve svém prohlížeči** (na Linuxu a macOS lze použít `hub.local`, na Windows musíte použít IP adresu zařízení HARDWARIO Hub).
V menu vyberte functions a v pravém horním rohu klikněte na **hamburger menu**. Klikněte na **manage palette** a vyberte kartu **Install**, kde vyhledejte:

```
node-red-contrib-homekit-bridged
```

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('../../../../../tower/platform-integrations/images/node-red-pallete.png')} alt="Správce palety Node-RED se zvýrazněným node-red-contrib-homekit-bridged připraveným k instalaci" /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>
<br />

:::info

Když se objeví zpráva s názvem Installing **'node-red-contrib-homekit-bridged'**, stačí kliknout na **Install**. Po instalaci byste měli vidět **modul** ve skupině **advanced**.

:::

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('../../../../../tower/platform-integrations/images/node-red-advanced-tab.png')} alt="Paleta Node-RED s uzlem homekit v sekci advanced" /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

## Připojení hardwaru {#connect-hardware}

#### Nahrání firmwaru {#flash-firmware}

- Otevřete [**HARDWARIO Playground**](../desktop-programming/about-playground.md) na svém počítači.
- Připojte [**Core Module**](../hardware-modules/about-core-module.md) k počítači pomocí micro USB kabelu.
- Klikněte na kartu [**Firmware**](../desktop-programming/firmware-flashing.md) v bočním menu.
- Použijte `hardwario/twr-radio-push-button` a klikněte na **Flash**.

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('../../../../../tower/platform-integrations/images/playgroud-flash-firmware.png')} alt="Karta Firmware v Playground s vybraným hardwario/bcf-radio-push-button a tlačítkem Flash firmware" /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Spárování zařízení {#pair-the-device}

Otevřete v prohlížeči stránku **HARDWARIO Hub** stejně jako v kapitole **Instalace**, vyberte v bočním menu kartu **Devices** a klikněte na tlačítko **Start pairing**.

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('../../../../../tower/platform-integrations/images/playgroud-pair-hardware.png')} alt="Karta Devices v Playground připojená k Radio Dongle s připraveným tlačítkem Start pairing" /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Sestavení zařízení {#assemble-the-device}

Nyní odpojte **Core Module** od počítače a připojte jej k [**Battery Module**](../hardware-modules/about-battery-module.md).

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('../../../../../tower/platform-integrations/images/homekit-and-siri-core-standart-battery.jpg')} alt="Core Module nasazený na Battery Module, připravený hlásit teplotu" /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Test {#test}

Nyní byste měli zařízení vidět (mělo by být spárované). Můžete se podívat na kartu **Messages** a uvidíte, že přicházejí zprávy s teplotou.

## Propojení všeho dohromady {#connect-it-all-together}

#### Otevřete kartu **Functions** v bočním menu. Otevřete **hamburger menu**, vyberte **Import > Clipboard** a vložte následující kód {#open-the-functions-tab-in-the-side-menu-open-the-hamburger-menu-select-import--clipboard-and-paste-the-following-code}

```json
    [{"id":"c10a49.8c0905b8","type":"mqtt in","z":"2c41a2bd.aa36ae","name":"Temperature from Core Module","topic":"node/push-button:0/thermometer/0:1/temperature","qos":"2","broker":"29fba84a.b2af58","x":230,"y":180,"wires":[["d7033322.3f2d5"]]},{"id":"d7033322.3f2d5","type":"template","z":"2c41a2bd.aa36ae","name":"Convert payload to HomeKit JSON format","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"{\n\"CurrentTemperature\": \"{{payload}}\"\n}","output":"str","x":600,"y":180,"wires":[[]]},{"id":"29fba84a.b2af58","type":"mqtt-broker","z":"","broker":"127.0.0.1","port":"1883","clientid":"","usetls":false,"compatmode":true,"keepalive":"60","cleansession":true,"birthTopic":"","birthQos":"0","birthPayload":"","willTopic":"","willQos":"0","willPayload":""}]
```

:::info

Importovaný flow by měl vypadat takto

:::

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('../../../../../tower/platform-integrations/images/playground-flow-basic.png')} alt="Importovaný flow: Temperature from Core Module propojený s Convert payload to HomeKit JSON format" /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Umístěte uzel **Homekit** ze skupiny **advanced** a připojte jej k uzlu template ve flow {#place-the-homekit-node-from-the-advanced-group-and-connect-it-to-the-template-node-in-the-flow}

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('../../../../../tower/platform-integrations/images/homekit-connected.png')} alt="Flow s uzlem Service homekit připojeným za uzel template" /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Dvakrát klikněte na uzel **HomeKit** ve flow, mělo by se objevit okno s nastavením {#double-click-on-the-homekit-node-in-flow-the-settings-window-should-popup}

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('../../../../../tower/platform-integrations/images/homekit-settings.png')} alt="Dialog Edit homekit node otevřený v Node-RED s poli Service, Bridge a revize" /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Nastavení mostu (Bridge) {#setup-the-bridge}

:::info

Toto bude most mezi našimi **hardwarovými senzory** a vašimi zařízeními **iPhone**, **iPad**, **mac** atd.

:::

Klikněte na **ikonku tužky** vedle části bridge v nastavení, vyplňte ji následovně a klikněte na **Add**

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div><Image img={require('../../../../../tower/platform-integrations/images/home-kit-bridge-settings.png')} alt="Konfigurace homekit-bridge: Pin Code 111-11-111, Manufacturer HARDWARIO, Model a Name HARDWARIO Bridge" /></div>
    </div>
    <div class="col col--5">
    </div>
  </div>
</div>

#### Vyplňte zbytek nastavení podle snímku níže. Klikněte na Done a poté na Deploy {#fill-in-the-rest-of-the-settings-according-to-the-screenshot-below-click-done-and-then-deploy}

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div><Image img={require('../../../../../tower/platform-integrations/images/home-kit-settings.png')} alt="Vlastnosti uzlu homekit: Service TemperatureSensor, Bridge HARDWARIO Bridge, Name Temperature Sensor" /></div>
    </div>
    <div class="col col--5">
    </div>
  </div>
</div>

#### Párování {#pairing}

Nyní, jak vidíte na své obrazovce i na snímku níže, zařízení čeká na spárování s kódem `111-11-111`.
Otevřete aplikaci **Domácnost** na svém iPhonu nebo iPadu a klikněte na **Přidat příslušenství > Nemám kód nebo jej nelze naskenovat > HARDWRIO bridge**.
Na další obrazovce vyberte **Přesto přidat**. Na obrazovce, kde musíte zadat kód, zadejte do všech políček číslo `1`

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('../../../../../tower/platform-integrations/images/homekit-and-siri-iphones-screens-1.png')} alt="Aplikace Domácnost na iPhonu: Přidat příslušenství, skener nastavovacího kódu HomeKit a nalezený most v okolí" /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Nastavení {#setup}

Nyní jen nastavte, kde se nachází váš most a teplotní senzor.

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('../../../../../tower/platform-integrations/images/homekit-and-siri-iphones-screens-2.png')} alt="Nastavení v aplikaci Domácnost přiřazující most a teplotní senzor do místností; senzor se poté zobrazí v Domácnosti" /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

## Siri {#siri}

:::info

Pokud máte nějaké zařízení v aplikaci **Domácnost**, můžete jej ovládat nebo z něj získávat informace pomocí Siri.

:::

Takže pokud chcete získat teplotu z modulu **Core Module**, který jsme právě nastavili, stačí se zeptat Siri například: "**jaká je teplota v ložnici?**".

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('../../../../../tower/platform-integrations/images/homekit-and-siri-iphones-screens-siri.png')} alt="Siri odpovídá na dotaz na teplotu v ložnici hodnotou 26 stupňů Celsia" /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

## Závěr {#conclusion}

S pluginem **HomeKit** můžete simulovat skutečná **zařízení HomeKit**.
Tento plugin umí také ovládat věci. Můžete jej tedy použít k ovládání modulu [**Relay Module**](../hardware-modules/about-relay-module.md) apod.

:::caution

Tento plugin má malý nedostatek. Pokaždé, když provedete **Deploy** flow, musíte **restartovat celý Node-RED**, jinak plugin HomeKit nebude fungovat.

:::

Můžete to udělat následujícím příkazem (musíte jej provést na **HARDWARIO hub**, pokud je tam plugin nainstalován):

```bash
pm2 restart node-red
```
