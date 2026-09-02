---
slug: cloud-service
title: Managed Network Server
description: "LoRaWAN Network Server pro EMBER — ChirpStack nebo The Things Stack — může být buď provozován na vaší vlastní infrastruktuře (viz ChirpStack a The Things Stack), nebo provozován společností HARDWARIO jako spravovaná služba. Tato stránka popisuje…"
---
import Image from '@theme/IdealImage';

# Managed Network Server {#managed-network-server}

LoRaWAN Network Server pro **EMBER** — **ChirpStack** nebo **The Things Stack** — může být buď provozován na vaší vlastní infrastruktuře (viz [**ChirpStack**](lorawan-network-server/lorawan-chirpstack.md) a [**The Things Stack**](lorawan-network-server/lorawan-tts.md)), nebo provozován společností **HARDWARIO** jako spravovaná služba. Tato stránka popisuje spravovanou službu. Kromě spravovaného network serveru poskytuje **HARDWARIO** volitelně také SIM kartu s konektivitou pro **LTE** backhaul a bezpečný vzdálený přístup přes **OpenVPN**.

Pro získání spravované služby potřebujete mít alespoň jedno zařízení **EMBER Hotspot**.

S touto službou získáte vlastní instanci [**ChirpStack**](https://www.chirpstack.io/) a [**Node-RED**](https://nodered.org/) přístupnou přes webové rozhraní pro správu.

Přístup je zabezpečen protokolem **HTTPS/TLSv1.3** a uživatelská identita je ve spravované službě vytvořena týmem **HARDWARIO** při zřizování služby.

Ke správě služby nepotřebujete žádný specializovaný software na PC ani mobilu. Postačí aktuální webový prohlížeč.

## Webová správa {#web-management}

Webová správa poskytuje přístup k aplikacím **ChirpStack** a **Node-RED** prostřednictvím služby **Teleport**.

:::caution

Uživatelský účet vytvoří tým podpory **HARDWARIO**.

:::

Přihlašovací URL webové správy: `https://<customer identifier>-<service index>.ember.hardwario.cloud/`

:::tip

Část &lt;customer identifier&gt; musíte nahradit identifikací přidělenou společností **HARDWARIO** (obvykle jméno firmy).

:::

Pro multifaktorovou autentizaci potřebujete jednu z těchto metod:

* **Google Authenticator** nebo kompatibilní aplikaci na mobilu

* **FIDO2** – univerzální druhý faktor (**U2F**) USB klíč (např. **Security Key Series**)

* **FIDO2** – univerzální druhý faktor (**U2F**) bez hesla (např. **YubiKey Bio Series**)

Níže uvedené služby jsou přístupné přes položku menu **Applications**. Služby jsou označeny těmito zkratkami:

* `cs` – aplikace **ChirpStack**

* `nr` – aplikace **Node-RED**

Pro přístup ke konkrétní službě klikněte na tlačítko **LAUNCH**.

## ChirpStack LoRaWAN Server {#chirpstack-lorawan-server}

Služba **Teleport** přesměruje uživatele na následující URL:

```
https://ember-<customer identifier>-<service index>-cs.tp.hardwario.com/
```

Toto jsou výchozí přihlašovací údaje:

* Uživatelské jméno: `admin`

* Heslo: `admin`

:::tip

Není potřeba je měnit, protože jste identifikováni a autentizováni přihlášením do webového rozhraní **Teleport**.

:::

### LoRaWAN brány {#lorawan-gateways}

Seznam všech zařízení **EMBER Hotspot** s hodnotou **Last seen** a přehledem aktivity.

### LoRaWAN aplikace {#lorawan-applications}

V této sekci může uživatel definovat způsob předávání dat ze zařízení **LoRaWAN** do **LoRaWAN** aplikací (což mohou být koncové body uživatele).

Každá aplikace zahrnuje seznam zařízení **LoRaWAN** (např. **CHESTER**).

Aktivitu **LoRaWAN** můžete zkontrolovat pro jakékoli zařízení **CHESTER**.

Každé zařízení **CHESTER** musí být registrováno v sekci **Application**.

Doporučenou volbou je použití metody **ABP** (Activation By Personalization). Pro tuto metodu bude uživatel muset zadat (nebo vygenerovat) následující parametry:

* **Device EUI** – označované také jako `DevEUI`

* **Network session key** – označovaný také jako `NwkSKey`

* **Application session key** – označovaný také jako `AppSKey`

:::tip

V **ChirpStack** se metoda **ABP** použije, pokud uživatel nezapne zaškrtávací pole `Device supports OTAA` v konkrétním profilu zařízení.

:::

:::caution

Z bezpečnostních důvodů je metoda **ABP** vhodná pro zařízení LoRaWAN, u kterých se neočekávají restarty.

:::

## Aplikace Node-RED {#node-red-application}

Služba **Teleport** přesměruje uživatele na následující URL:

```
https://ember-<customer identifier>-<service index>-nr.tp.hardwario.com/
```

Data jsou z **LoRaWAN** serveru předávána do **Node-RED** pomocí **Mosquitto** (**MQTT** server). MQTT server poskytuje spravovaná služba na adrese `localhost:1883`.

Uplink data jsou publikována pod tímto tématem:

```
application/+/device/+/event/up
```

Tok zpracování dat v aplikaci **Node-RED** začíná zprávou **MQTT**.

:::tip

V **Node-RED** použijte node `mqtt client` pro přihlášení k výše uvedenému tématu.

:::

Po přijetí zprávy **MQTT** je potřeba dekódovat payload zařízení podle firmwaru použitého v zařízení **LoRaWAN** (např. **CHESTER**).

:::caution

Ačkoli je možné dekódovat payload přímo v **ChirpStack**, doporučujeme to udělat později v **Node-RED**, kde má uživatel k dispozici plnohodnotnou knihovnu **Node.js** pro parsování binárních bufferů a robustnější interpret **JavaScript** s pokročilými nástroji pro debugování.

:::

Níže je uveden příklad funkce **Node-RED** (v **JavaScript**) pro dekódování payloadu **Base64** poskytnutého službou **ChirpStack** ve zprávě **MQTT**:

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

Po dekódování můžete data dále zpracovávat – skalarizovat, přidávat atributy atd. Poslední akcí v toku by mělo být doručení dat přes nějaký běžný konektor, např. **HTTPS** požadavek.

Pro ladění a řešení problémů s tokem můžete použít node `debug` a konzolové zobrazení v **Node-RED**.

### Příklady integrace {#integration-examples}

Data mohou být předávána přes internet ke zpracování do jakékoli služby – např. pro vizualizaci, ukládání dat a integraci s podnikovými aplikacemi.

Několik běžných příkladů integrace:

* **REST API**

* Služby pro streamování dat:

  * **Azure Event Hub**

  * **Azure IoT Hub**

  * **AWS IoT Core**

  * ...

* **Microsoft Power BI**

* **Ubidots**
