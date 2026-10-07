---
slug: installation
title: Instalace
description: "Instalace systému Linux a celého softwarového stacku pro LoRaWAN a monitoring na zařízení FIBER, společný postup pro obě hardwarové varianty."
title_meta: "Instalace (FIBER)"
---
import Image from '@theme/IdealImage';

# Instalace {#installation}

Tato část popisuje prvotní instalaci a konfiguraci systému Linux a celého softwarového stacku pro
LoRaWAN a monitoring. **Postup je společný pro obě hardwarové varianty FIBER**:

- **FIBER**: průmyslová verze postavená na modulu **Compute Module 4**.
- **FIBER Lite**: zařízení pro testování na stole postavené na Raspberry Pi 5.

Obě varianty se liší jen v hardwaru (nahrání systému, RTC, připojení koncentrátoru LoRaWAN
přes USB, nebo SPI). Na těchto několika místech mají stránky záložky. Vše ostatní včetně InfluxDB,
Grafany a dashboardu ve firemním vzhledu je stejné a instaluje se na obě varianty.

:::warning Pro které zařízení je tento postup?

**Zařízení FIBER, které jste dostali, je už nastavené. Z těchto stránek nemusíte nic spouštět.** Dodává se
jako hotové zařízení: operační systém, ChirpStack, koncentrátor i zbytek stacku jsou součástí jeho
image, který se aktualizuje jako celek, ne po jednotlivých balíčcích. Pokračujte rovnou stránkou
[Registrace brány a zařízení](/fiber/installation/register-device/); displeji a senzorům 1-Wire se věnuje
sekce [**Návody k hardwaru FIBER**](/fiber/category/fiber-hardware-guides/).

Tyto stránky popisují **postup sestavení**: jak se image skládá a jak zprovoznit jednotku
**FIBER Lite** s prázdnou kartou microSD. Postupujte podle nich u zařízení FIBER Lite nebo při
sestavování image FIBER od nuly.

:::

:::info

V postranním panelu najdete sekci [**FIBER Lite**](/fiber/fiber-lite/introduction/) s rozdíly v hardwaru
zařízení FIBER Lite (nemá displej ani senzory 1-Wire) a sekci [**Návody k hardwaru FIBER**](/fiber/category/fiber-hardware-guides/)
o displeji a hardwaru 1-Wire, které má jen FIBER.

:::

V tomto průvodci používáme dva pojmy:

- **HOST:** Počítač, ze kterého zařízení nastavujete.
- **TARGET:** Samotné zařízení FIBER, které nastavujete.

Projděte tyto stránky v uvedeném pořadí:

1. [**Nahrání Raspberry Pi OS**](/fiber/installation/flash/)
1. [**Aktualizace systému**](/fiber/installation/update-system/)
1. [**Konfigurace hardwaru**](/fiber/installation/configure-hardware/): sběrnice I2C + RTC
1. [**Instalace ChirpStack**](/fiber/installation/chirpstack/)
1. [**Instalace ChirpStack Concentratord**](/fiber/installation/concentratord/)
1. [**Instalace ChirpStack MQTT Forwarder**](/fiber/installation/mqtt-forwarder/)
1. [**Registrace brány a zařízení**](/fiber/installation/register-device/)
1. [**Instalace Node-RED**](/fiber/installation/node-red/)
1. [**Instalace InfluxDB**](/fiber/installation/influxdb/)
1. [**Instalace Grafany**](/fiber/installation/grafana/)
1. [**Dashboard**](/fiber/installation/dashboard/)
1. [**Firewall**](/fiber/installation/firewall/)
1. [**Porty a výchozí přihlašovací údaje**](/fiber/installation/ports-and-credentials/)

## Tok dat {#data-flow}

ChirpStack, Node-RED, InfluxDB i Grafana běží **přímo na zařízení**, bez samostatných serverů
a cloudových služeb:

<div style={{ width: '600px', margin: '0 auto' }}>

<Image img={require('../../../../fiber/fiber-lite/images/data-flow.png')} />

</div>

Úvodní stránka na portu 80 odkazuje na všechny služby a zobrazuje aktuální systémové statistiky, takže
zařízení můžete používat, aniž byste si museli pamatovat porty nebo to, která služba běží na které adrese.
