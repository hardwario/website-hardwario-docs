---
slug: installation
title: Instalace
description: "Tato část popisuje zavedení a konfiguraci systému Linux a celého softwarového stacku LoRaWAN +"
---
import Image from '@theme/IdealImage';

# Instalace {#installation}

Tato část popisuje zavedení a konfiguraci systému Linux a celého softwarového stacku LoRaWAN +
monitoring, **jeden společný postup pro obě hardwarové varianty FIBER**:

- **FIBER**: průmyslová verze založená na **Compute Module 4**.
- **FIBER Lite**: testovací zařízení postavené na Raspberry Pi 5.

Obě varianty se liší pouze na úrovni hardwaru (nahrání firmwaru, RTC, připojení koncentrátoru
LoRaWAN přes USB vs. SPI). Na těchto několika místech má stránka záložky. Vše ostatní,
včetně InfluxDB, Grafany a značkového dashboardu, je identické a instaluje se na obě varianty.

:::warning Pro které zařízení to je?

**Zařízení FIBER, které jste obdrželi, je již nastavené. Na těchto stránkách není nic, co byste museli spouštět.** Dodává se
jako hotové zařízení: operační systém, ChirpStack, koncentrátor i zbytek
stacku jsou součástí jeho image a aktualizuje se jako celek, ne balíček po balíčku. Přejděte
přímo na [Registrace brány a zařízení](installation/register-device) a na
[**Hardwarové návody FIBER**](category/fiber-hardware-guides) kvůli displeji a senzorům 1-Wire.

Tyto stránky popisují **postup sestavení**: jak se takový image skládá a jak rozjet
jednotku **FIBER Lite** z prázdné microSD karty. Postupujte podle nich u zařízení FIBER Lite nebo když sestavujete
image FIBER od nuly.

:::

:::info

V bočním panelu najdete [**FIBER Lite**](fiber-lite/introduction) s hardwarovými rozdíly zařízení FIBER Lite
(bez displeje, bez senzorů 1-Wire) a [**Hardwarové návody FIBER**](category/fiber-hardware-guides)
s tím, co dělat s displejem a hardwarem 1-Wire, který má pouze FIBER.

:::

V tomto průvodci používáme dva pojmy:

- **HOST:** Počítač, ze kterého budete nastavení provádět.
- **TARGET:** Samotné zařízení FIBER, které nastavujete.

Postupujte podle níže uvedených stránek v tomto pořadí:

1. [**Nahrání Raspberry Pi OS**](installation/flash)
1. [**Aktualizace systému**](installation/update-system)
1. [**Konfigurace hardwaru**](installation/configure-hardware): sběrnice I2C + RTC
1. [**Instalace ChirpStack**](installation/chirpstack)
1. [**Instalace ChirpStack Concentratord**](installation/concentratord)
1. [**Instalace ChirpStack MQTT Forwarder**](installation/mqtt-forwarder)
1. [**Registrace brány a zařízení**](installation/register-device)
1. [**Instalace Node-RED**](installation/node-red)
1. [**Instalace InfluxDB**](installation/influxdb)
1. [**Instalace Grafany**](installation/grafana)
1. [**Dashboard**](installation/dashboard)
1. [**Firewall**](installation/firewall)
1. [**Porty a výchozí přihlašovací údaje**](installation/ports-and-credentials)

## Tok dat {#data-flow}

ChirpStack, Node-RED, InfluxDB a Grafana běží všechny **na samotném zařízení**, nejsou potřeba
žádné oddělené servery ani cloudové služby:

<div style={{ width: '600px', margin: '0 auto' }}>

<Image img={require('../../../../fiber/fiber-lite/images/data-flow.png')} />

</div>

Úvodní stránka na portu 80 odkazuje na všechny služby a zobrazuje aktuální systémové statistiky, takže zařízení je
použitelné bez memorování portů nebo přiřazení IP adres ke službám.
