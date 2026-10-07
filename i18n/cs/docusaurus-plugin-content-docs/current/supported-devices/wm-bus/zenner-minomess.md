---
slug: zenner-minomess
title: Zenner Minomess
---
import Image from '@theme/IdealImage';

# Zenner Minomess {#zenner-minomess}

[Webové stránky](https://zenner.com/products/wwz_minomess_lorawan_wm-bus-2/)

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/supported-devices/wm-bus/images/zenner-minomess.png')} width={376} height={376} alt="Vodoměr Zenner Minomess s válečkovým počítadlem a označením wM-Bus na čelní straně" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Popis {#description}

Minomess je kompaktní suchoběžný vodoměr se stíněnou magnetickou spojkou a sedmimístným válečkovým počítadlem. Díky rádiovému modulu wireless M-Bus (wM-Bus) se snadno začlení do systémů dálkového odečtu.

## Konfigurace {#configuration}

:::info

Zařízení se dodává **předkonfigurované**.
:::

## Konfigurace adresy wM-Bus {#wireless-m-bus-address-configuration}

### Kde na zařízení najdete adresu {#where-to-find-the-address-on-the-device}

Adresa (8 číslic) se zobrazuje **na displeji zařízení vlevo od jednotky m³**, viz obrázek níže.  

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/supported-devices/wm-bus/images/zenner-minomess.png')} width={376} height={376} alt="Číselník vodoměru Minomess s osmimístnou adresou wM-Bus vyznačenou na displeji vlevo od jednotky m3" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

---

### Přiřazení adresy wM-Bus k zařízení CHESTER {#mapping-the-wm-bus-address-to-chester}

Adresu přiřadíte v **terminálu CHESTER**, například v těchto aplikacích:

- [**HARDWARIO Monitor (Windows)**](https://github.com/hardwario/hio-monitor/releases)
- [**HARDWARIO Manager (Android)**](https://play.google.com/store/apps/details?id=com.hardwario.manager)
- [**Terminál pro Google Chrome**](https://terminal.hardwario.com/)

---

### Přidávání a správa adres wM-Bus v zařízení CHESTER {#managing-and-adding-wm-bus-device-addresses-in-chester}

Správu seznamu **adres wM-Bus** (**přidávání a odebírání**), nastavení skenování i příklady konfigurací pro typická nasazení popisuje dokumentace aplikace CHESTER wM-Bus:

- [**Konfigurace seznamu adres**](/chester/catalog-applications/chester-wm-bus#address-list-configuration): **správa a úprava** seznamu propojených **adres** wM-Bus
- [**Konfigurace skenování**](/chester/catalog-applications/chester-wm-bus#scan-configuration): **úprava nastavení skenování** pro komunikaci se zařízeními
- [**Příklady konfigurací**](/chester/catalog-applications/chester-wm-bus#example-configurations): referenční **šablony** pro typická nasazení

---

## Šifrování zpráv a správa klíčů {#message-encryption-and-key-management}

**Odesílané zprávy jsou šifrované**, aby se při přenosu dat šetřila energie a prodloužila výdrž baterie.

**Přijatá data je proto nutné dešifrovat** pomocí **dešifrovacích klíčů**.  
Máte dvě možnosti:

- [**HARDWARIO Cloud**](/chester/catalog-applications/chester-wm-bus#hardwario-cloud--decryption-keys): návod, jak zadávat a spravovat dešifrovací klíče
- [**Dešifrovací stránka**](https://wmbusmeters.org/): online nástroj pro ruční dešifrování a analýzu dat
