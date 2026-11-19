---
slug: cloud-service
title: Spravovaný síťový server
description: "Spravovaný síťový server LoRaWAN pro EMBER: HARDWARIO pro vás může hostovat The Things Stack jako alternativu k vlastnímu provozu."
---
import Image from '@theme/IdealImage';

# Spravovaný síťový server {#managed-network-server}

Síťový server LoRaWAN pro **EMBER** (**ChirpStack** nebo **The Things Stack**) můžete provozovat na vlastní infrastruktuře (viz [**ChirpStack**](lorawan-network-server/lorawan-chirpstack.md) a [**The Things Stack**](lorawan-network-server/lorawan-tts.md)), nebo ho jako spravovanou službu s **The Things Stack** provozuje **HARDWARIO**. Tato stránka popisuje spravovanou službu. Kromě spravovaného síťového serveru může **HARDWARIO** volitelně dodat také SIM kartu s konektivitou pro páteřní připojení **LTE** a bezpečný vzdálený přístup přes **OpenVPN**.

Ke spravované službě potřebujete alespoň jedno zařízení **EMBER Hotspot**.

Ve službě dostanete vlastní instanci **The Things Stack** a [**Node-RED**](https://nodered.org/). **Node-RED** je dostupný přes webové rozhraní pro správu.

Přístup zabezpečuje protokol **HTTPS/TLSv1.3**. Uživatelskou identitu ve spravované službě vytvoří tým **HARDWARIO** při zřízení služby.

Ke správě služby nepotřebujete v počítači ani v mobilu žádný zvláštní software. Stačí aktuální webový prohlížeč.

## Webová správa {#web-management}

Webová správa zpřístupňuje aplikaci **Node-RED** přes službu **Teleport**.

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

Níže uvedenou službu otevřete přes položku nabídky **Applications**. Označuje ji tato zkratka:

* `nr`: aplikace **Node-RED**

Službu otevřete tlačítkem **LAUNCH**.

## Aplikace Node-RED {#node-red-application}

Služba **Teleport** vás přesměruje na tuto adresu URL:

```
https://ember-<customer identifier>-<service index>-nr.tp.hardwario.com/
```

Data ze serveru **LoRaWAN** do **Node-RED** předává **Mosquitto** (server **MQTT**). Spravovaná služba ho provozuje na adrese `localhost:1883`.

Flow pro zpracování dat v **Node-RED** začíná zprávou **MQTT**.

:::tip

V **Node-RED** přijímejte data uplinků uzlem `mqtt in`.

:::

Po přijetí zprávy **MQTT** je třeba payload dekódovat podle firmwaru, který zařízení **LoRaWAN** (např. **CHESTER**) používá.

:::caution

Payload lze dekódovat přímo na serveru **LoRaWAN**, doporučujeme to ale udělat až v **Node-RED**. Tam máte k dispozici plnohodnotnou knihovnu **Node.js** pro parsování binárních bufferů a robustnější interpret jazyka **JavaScript** s pokročilými nástroji pro ladění.

:::

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
