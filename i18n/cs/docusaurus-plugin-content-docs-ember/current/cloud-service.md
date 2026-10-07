---
slug: cloud-service
title: Spravovaný síťový server
description: "Spravovaný síťový server LoRaWAN pro EMBER: HARDWARIO pro vás může hostovat ChirpStack nebo The Things Stack jako alternativu k vlastnímu provozu."
---
import Image from '@theme/IdealImage';

# Spravovaný síťový server {#managed-network-server}

Síťový server LoRaWAN pro **EMBER** (**ChirpStack** nebo **The Things Stack**) můžete provozovat na vlastní infrastruktuře (viz [**ChirpStack**](lorawan-network-server/lorawan-chirpstack.md) a [**The Things Stack**](lorawan-network-server/lorawan-tts.md)), nebo ho jako spravovanou službu provozuje **HARDWARIO**. Tato stránka popisuje spravovanou službu. Kromě spravovaného síťového serveru může **HARDWARIO** volitelně dodat také SIM kartu s konektivitou pro páteřní připojení **LTE** a bezpečný vzdálený přístup přes **OpenVPN**.

Ke spravované službě potřebujete alespoň jedno zařízení **EMBER Hotspot**.

Ve službě dostanete vlastní instanci [**ChirpStack**](https://www.chirpstack.io/) a [**Node-RED**](https://nodered.org/), obě dostupné přes webové rozhraní pro správu.

Přístup zabezpečuje protokol **HTTPS/TLSv1.3**. Uživatelskou identitu ve spravované službě vytvoří tým **HARDWARIO** při zřízení služby.

Ke správě služby nepotřebujete v počítači ani v mobilu žádný zvláštní software. Stačí aktuální webový prohlížeč.

## Webová správa {#web-management}

Webová správa zpřístupňuje aplikace **ChirpStack** a **Node-RED** přes službu **Teleport**.

:::caution

Uživatelský účet vytvoří tým podpory **HARDWARIO**.

:::

Přihlašovací URL webové správy: `https://<customer identifier>-<service index>.ember.hardwario.cloud/`

:::tip

Místo &lt;customer identifier&gt; zadejte identifikátor, který vám přidělila společnost **HARDWARIO** (obvykle název firmy).

:::

K vícefaktorovému ověření potřebujete jednu z těchto metod:

* **Google Authenticator** nebo kompatibilní aplikaci na mobilu

* **FIDO2**: USB klíč pro univerzální druhý faktor (**U2F**) (např. **Security Key Series**)

* **FIDO2**: univerzální druhý faktor (**U2F**) bez hesla (např. **YubiKey Bio Series**)

Níže uvedené služby otevřete přes položku nabídky **Applications**. Označují je tyto zkratky:

* `cs`: aplikace **ChirpStack**

* `nr`: aplikace **Node-RED**

Službu otevřete tlačítkem **LAUNCH**.

## Server LoRaWAN ChirpStack {#chirpstack-lorawan-server}

Služba **Teleport** vás přesměruje na tuto adresu URL:

```
https://ember-<customer identifier>-<service index>-cs.tp.hardwario.com/
```

Výchozí přihlašovací údaje:

* Uživatelské jméno: `admin`

* Heslo: `admin`

:::tip

Měnit je nemusíte, protože vaši identitu už ověřilo přihlášení do webového rozhraní **Teleport**.

:::

### Brány LoRaWAN {#lorawan-gateways}

Seznam všech zařízení **EMBER Hotspot** s hodnotou **Last seen** a přehledem aktivity.

### Aplikace LoRaWAN {#lorawan-applications}

V této sekci určíte, jak se data ze zařízení **LoRaWAN** předávají do aplikací **LoRaWAN** (může jít o vaše vlastní koncové body).

Každá aplikace obsahuje seznam zařízení **LoRaWAN** (např. **CHESTER**).

U každého zařízení **CHESTER** můžete zkontrolovat jeho aktivitu v síti **LoRaWAN**.

Každé zařízení **CHESTER** musí být zaregistrované v sekci **Application**.

Doporučujeme metodu **ABP** (Activation By Personalization). U ní zadáte (nebo vygenerujete) tyto parametry:

* **Device EUI**: označované také jako `DevEUI`

* **Network session key**: označovaný také jako `NwkSKey`

* **Application session key**: označovaný také jako `AppSKey`

:::tip

V **ChirpStack** se metoda **ABP** použije, pokud v profilu zařízení nezaškrtnete `Device supports OTAA`.

:::

:::caution

Z bezpečnostních důvodů je metoda **ABP** vhodná pro zařízení LoRaWAN, u kterých se neočekávají restarty.

:::

## Aplikace Node-RED {#node-red-application}

Služba **Teleport** vás přesměruje na tuto adresu URL:

```
https://ember-<customer identifier>-<service index>-nr.tp.hardwario.com/
```

Data ze serveru **LoRaWAN** do **Node-RED** předává **Mosquitto** (server **MQTT**). Spravovaná služba ho provozuje na adrese `localhost:1883`.

Data uplinků se publikují do tohoto topicu:

```
application/+/device/+/event/up
```

Flow pro zpracování dat v **Node-RED** začíná zprávou **MQTT**.

:::tip

V **Node-RED** se k výše uvedenému topicu přihlaste uzlem `mqtt client`.

:::

Po přijetí zprávy **MQTT** je třeba payload dekódovat podle firmwaru, který zařízení **LoRaWAN** (např. **CHESTER**) používá.

:::caution

Payload lze dekódovat přímo v **ChirpStack**, doporučujeme to ale udělat až v **Node-RED**. Tam máte k dispozici plnohodnotnou knihovnu **Node.js** pro parsování binárních bufferů a robustnější interpret jazyka **JavaScript** s pokročilými nástroji pro ladění.

:::

Níže je příklad funkce pro **Node-RED** (v jazyce **JavaScript**), která dekóduje payload v kódování **Base64**, jak ho **ChirpStack** posílá ve zprávě **MQTT**:

<details>
<summary><b>Zobrazit dekódovací funkci pro Node-RED</b></summary>
<p>

```js
if (msg.payload.applicationName !== 'ember-application-chester-clime') {
    return null;
}

if (typeof msg.payload.data === 'string') {
    msg.payload.data = decode(Buffer.from(msg.payload.data, 'base64'));
}

return msg;

function decode(buffer) {
    let data = {};

    let offset = 0;

    let header = buffer.readUInt8(0);
    offset += 1;

    if ((header & 0x01) !== 0) {
        data.voltage_rest = buffer.readUInt16LE(offset);
        offset += 2;

        data.voltage_load = buffer.readUInt16LE(offset);
        offset += 2;

        data.current_load = buffer.readUInt8(offset);
        offset += 1;

        if (data.voltage_rest === 0xffff) {
            data.voltage_rest = null;
        } else {
            data.voltage_rest = data.voltage_rest / 1000;
        }

        if (data.voltage_load === 0xffff) {
            data.voltage_load = null;
        } else {
            data.voltage_load = data.voltage_load / 1000;
        }

        if (data.current_load === 0xff) {
            data.current_load = null;
        }
    }

    if ((header & 0x02) !== 0) {
        data.orientation = buffer.readUInt8(offset);
        offset += 1;

        if (data.orientation === 0xff) {
            data.orientation = null;
        }
    }

    if ((header & 0x04) !== 0) {
        data.therm_temperature = buffer.readInt16LE(offset);
        offset += 2;

        if (data.therm_temperature === 0x7fff) {
            data.therm_temperature = null;
        } else {
            data.therm_temperature = data.therm_temperature / 100;
        }
    }

    if ((header & 0x10) !== 0) {
        data.hygro_temperature = buffer.readInt16LE(offset);
        offset += 2;

        data.hygro_humidity = buffer.readUInt8(offset);
        offset += 1;

        if (data.hygro_temperature === 0x7fff) {
            data.hygro_temperature = null;
        } else {
            data.hygro_temperature = data.hygro_temperature / 100;
        }

        if (data.hygro_humidity === 0xff) {
            data.hygro_humidity = null;
        } else {
            data.hygro_humidity = data.hygro_humidity / 2;
        }
    }

    if ((header & 0x20) !== 0) {
        data.w1_thermometers = [];

        let count = buffer.readUInt8(offset);
        offset += 1;

        for (let i = 0; i < count; i++) {
            let t = buffer.readInt16LE(offset);
            offset += 2;

            if (t === 0x7fff) {
                t = null;
            } else {
                t = t / 100;
            }

            data.w1_thermometers.push(t);
        }
    }

    if ((header & 0x40) !== 0) {
        data.rtd_thermometers = [];

        let count = buffer.readUInt8(offset);
        offset += 1;

        for (let i = 0; i < count; i++) {
            let t = buffer.readInt16LE(offset);
            offset += 2;

            if (t === 0x7fff) {
                t = null;
            } else {
                t = t / 100;
            }

            data.rtd_thermometers.push(t);
        }
    }

    return data;
}
```

</p>
</details>

Dekódovaná data můžete dále zpracovávat, například je převést na skalární hodnoty nebo k nim přidat atributy. Posledním krokem flow by mělo být doručení dat přes některý běžný konektor, např. požadavkem **HTTPS**.

Flow můžete ladit a hledat v něm chyby pomocí uzlu `debug` a zobrazení konzole v **Node-RED**.

### Příklady integrace {#integration-examples}

Data můžete přes internet předat ke zpracování do libovolné služby, například k vizualizaci, k uložení nebo k integraci s podnikovými aplikacemi.

Běžné příklady integrace:

* **REST API**

* Služby pro streamování dat:

  * **Azure Event Hub**

  * **Azure IoT Hub**

  * **AWS IoT Core**

  * ...

* **Microsoft Power BI**

* **Ubidots**
