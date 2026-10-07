---
slug: bmeters-rfm-tx1.1
title: BMeters RFM-TX1.1
---
import Image from '@theme/IdealImage';

# BMeters RFM-TX1.1 {#bmeters-rfm-tx11}

[Webové stránky](https://www.bmeters.com/en/products/rfm-tx1/)

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/supported-devices/wm-bus/images/bmeters-rfm-tx1.1.png')} width={376} height={376} alt="Kulatý bílý rádiový modul BMeters RFM-TX1.1 pro vodoměry GSD8-RFM" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

## Popis {#description}

RFM-TX1.1 je rádiový modul pro přenos dat o spotřebě, určený pro jednovtokové vodoměry GSD8-RFM.

## Konfigurace {#configuration}

:::info

Zařízení se dodává **předkonfigurované**, ale v programu [**BMetering Software**](http://keygenerator.bmetering.com/API/DownloadBMetering) ho můžete přeprogramovat a upravit.

:::

### Postup konfigurace {#configuration-procedure}

1. Rádiový modul nastavte pomocí [**přijímače RFM-RX2**](https://www.bmeters.com/en/products/rfm-rx2/) a programu [**BMetering Software**](http://keygenerator.bmetering.com/API/DownloadBMetering).  
2. Konfiguraci spustíte stiskem **červeného tlačítka** na spodní desce modulu.  
3. Sledujte **červenou LED**:  
   - Pokud bliká nepřetržitě přibližně **20 sekund**, konfigurace proběhla úspěšně.  
   - Pokud bliká jen pár sekund, konfigurace selhala a postup je nutné zopakovat.  
4. Po úspěšné konfiguraci **nasaďte modul na vodoměr** podle obrázku.  
5. Pečlivě **zarovnejte optický index vodoměru** s otvorem v desce modulu.  
6. Jednou rukou přidržte otočný číselník vodoměru. Druhou rukou přitlačte modul na vodoměr a **otočte jím po směru hodinových ručiček**, až zapadne.  
7. V **odečítacím softwaru** ověřte, že se data sbírají správně a že není aktivní žádný alarm.  
8. (Volitelně) Proti neoprávněné manipulaci vložte **oranžovou plombu** do dvou malých otvorů na levé straně modulu a nalepte **samolepicí plombu**.  

![Montáž modulu BMeters RFM-TX1.1](../../../../../../chester/supported-devices/wm-bus/images/bmeters-rfm-tx1.1-installation.png)

## Konfigurace adresy wM-Bus {#wireless-m-bus-address-configuration}

### Kde na zařízení najdete adresu {#where-to-find-the-address-on-the-device}

Adresa (8 číslic) je **vlevo pod čárovým kódem**, viz obrázek níže.  

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/supported-devices/wm-bus/images/bmeters-rfm-tx1.1.png')} width={376} height={376} alt="RFM-TX1.1 s vyznačenou osmimístnou adresou wM-Bus vlevo pod čárovým kódem" />
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
