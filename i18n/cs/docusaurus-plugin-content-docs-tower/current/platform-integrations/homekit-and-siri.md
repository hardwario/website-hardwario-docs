---
slug: homekit-and-siri
title: HomeKit a Siri
---
import Image from '@theme/IdealImage';

Díky integraci s HomeKit ovládáte své projekty IoT ze zařízení se systémem **iOS** nebo **macOS**. Jakmile zařízení přidáte do aplikace Domácnost,
můžete ho ovládat i přes Siri.

:::info

Na konci návodu se Siri zeptáte na teplotu v ložnici a ona vám odpoví hodnotou z teplotního senzoru HARDWARIO.

:::

## Instalace {#installation}

Pokud chcete následující integraci použít na [**HARDWARIO Hub**](../server-raspberry-pi/installation-os.md) nebo v systému Debian či Ubuntu, musíte doinstalovat několik závislostí.
Připojte se k příkazové řádce zařízení **HARDWARIO Hub** podle návodu [**Přihlášení k Raspberry Pi**](../server-raspberry-pi/login-guide.md).

Po přihlášení zkopírujte a spusťte tyto příkazy:

```bash showLineNumbers
sudo apt-get update
sudo apt-get install libavahi-compat-libdnssd-dev
```

Otevřete **HARDWARIO Hub ve svém prohlížeči** (v Linuxu a macOS můžete použít `hub.local`, ve Windows musíte zadat IP adresu zařízení HARDWARIO Hub).
V menu vyberte **Functions** a v pravém horním rohu klikněte na **hamburger menu**. Klikněte na **Manage palette**, otevřete záložku **Install** a vyhledejte:

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

Když se objeví zpráva s názvem Installing **'node-red-contrib-homekit-bridged'**, klikněte na **Install**. Po instalaci by se ve skupině **advanced** měl objevit nový **uzel**.

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

- Na počítači spusťte [**HARDWARIO Playground**](../desktop-programming/about-playground.md).
- Připojte modul [**Core Module**](../hardware-modules/about-core-module.md) k počítači kabelem micro USB.
- V bočním menu klikněte na záložku [**Firmware**](../desktop-programming/firmware-flashing.md).
- Vyberte `hardwario/twr-radio-push-button` a klikněte na **Flash**.

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('../../../../../tower/platform-integrations/images/playgroud-flash-firmware.png')} alt="Záložka Firmware v aplikaci Playground s vybraným hardwario/bcf-radio-push-button a tlačítkem Flash firmware" /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Spárování zařízení {#pair-the-device}

Otevřete v prohlížeči stránku **HARDWARIO Hub** stejně jako v kapitole **Instalace**, vyberte v bočním menu záložku **Devices** a klikněte na tlačítko **Start pairing**.

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('../../../../../tower/platform-integrations/images/playgroud-pair-hardware.png')} alt="Záložka Devices v aplikaci Playground připojená k Radio Dongle s připraveným tlačítkem Start pairing" /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Sestavení zařízení {#assemble-the-device}

Teď odpojte modul **Core Module** od počítače a nasaďte ho na modul [**Battery Module**](../hardware-modules/about-battery-module.md).

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

Teď byste měli zařízení vidět (mělo by být spárované). Na záložce **Messages** uvidíte, že přicházejí zprávy s teplotou.

## Propojení všech částí {#connect-it-all-together}

#### V bočním menu otevřete záložku **Functions**. Otevřete **hamburger menu**, vyberte **Import > Clipboard** a vložte tento kód {#open-the-functions-tab-in-the-side-menu-open-the-hamburger-menu-select-import--clipboard-and-paste-the-following-code}

```json
    [{"id":"c10a49.8c0905b8","type":"mqtt in","z":"2c41a2bd.aa36ae","name":"Temperature from Core Module","topic":"node/push-button:0/thermometer/0:1/temperature","qos":"2","broker":"29fba84a.b2af58","x":230,"y":180,"wires":[["d7033322.3f2d5"]]},{"id":"d7033322.3f2d5","type":"template","z":"2c41a2bd.aa36ae","name":"Convert payload to HomeKit JSON format","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"{\n\"CurrentTemperature\": \"{{payload}}\"\n}","output":"str","x":600,"y":180,"wires":[[]]},{"id":"29fba84a.b2af58","type":"mqtt-broker","z":"","broker":"127.0.0.1","port":"1883","clientid":"","usetls":false,"compatmode":true,"keepalive":"60","cleansession":true,"birthTopic":"","birthQos":"0","birthPayload":"","willTopic":"","willQos":"0","willPayload":""}]
```

:::info

Importovaný flow by měl vypadat takto:

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

#### Přetáhněte do flow uzel **Homekit** ze skupiny **advanced** a připojte ho k uzlu template {#place-the-homekit-node-from-the-advanced-group-and-connect-it-to-the-template-node-in-the-flow}

<div class="container">
  <div class="row">
    <div class="col col--9">
      <div><Image img={require('../../../../../tower/platform-integrations/images/homekit-connected.png')} alt="Flow s uzlem Service homekit připojeným za uzel template" /></div>
    </div>
    <div class="col col--1">
    </div>
  </div>
</div>

#### Dvakrát klikněte na uzel **HomeKit** ve flow; otevře se okno s nastavením {#double-click-on-the-homekit-node-in-flow-the-settings-window-should-popup}

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

Most propojí naše **hardwarové senzory** s vašimi zařízeními **iPhone**, **iPad**, **Mac** atd.

:::

V nastavení klikněte na **ikonu tužky** vedle položky Bridge, vyplňte údaje podle obrázku a klikněte na **Add**.

<div class="container">
  <div class="row">
    <div class="col col--5">
      <div><Image img={require('../../../../../tower/platform-integrations/images/home-kit-bridge-settings.png')} alt="Konfigurace homekit-bridge: Pin Code 111-11-111, Manufacturer HARDWARIO, Model a Name HARDWARIO Bridge" /></div>
    </div>
    <div class="col col--5">
    </div>
  </div>
</div>

#### Vyplňte zbytek nastavení podle snímku níže. Klikněte na Done a pak na Deploy {#fill-in-the-rest-of-the-settings-according-to-the-screenshot-below-click-done-and-then-deploy}

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

Jak vidíte na obrazovce i na snímku níže, zařízení teď čeká na spárování s kódem `111-11-111`.
Na iPhonu nebo iPadu otevřete aplikaci **Domácnost** a klepněte na **Přidat příslušenství > Nemám kód nebo jej nelze naskenovat > HARDWARIO Bridge**.
Na další obrazovce vyberte **Přesto přidat**. Na obrazovce pro zadání kódu vyplňte do všech políček číslici `1`.

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

Teď už jen nastavte, kde se most a teplotní senzor nacházejí.

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

Zařízení přidaná do aplikace **Domácnost** můžete přes Siri ovládat nebo z nich číst údaje.

:::

Na teplotu z modulu **Core Module**, který jsme právě nastavili, se tedy stačí Siri zeptat například takto: „**Jaká je teplota v ložnici?**“

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
Plugin umí zařízení i ovládat, takže s ním můžete řídit třeba modul [**Relay Module**](../hardware-modules/about-relay-module.md).

:::caution

Plugin má jednu drobnou vadu: po každém **Deploy** flow musíte **restartovat celý Node-RED**, jinak plugin HomeKit nefunguje.

:::

Restartujete ho tímto příkazem (pokud je plugin nainstalovaný na **HARDWARIO hub**, spusťte ho tam):

```bash
pm2 restart node-red
```
