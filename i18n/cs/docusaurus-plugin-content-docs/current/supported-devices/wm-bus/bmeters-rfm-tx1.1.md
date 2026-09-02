---
slug: bmeters-rfm-tx1.1
title: BMeters RFM-TX1.1
description: "Webové stránky"
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

RFM-TX1.1 je rádiový modul určený k přenosu dat o spotřebě, použitelný pro jednovtokové vodoměry GSD8-RFM.

## Konfigurace {#configuration}

:::info

Zařízení je dodáváno **předkonfigurované**, ale lze jej přeprogramovat a upravit pomocí softwaru [**BMetering Software**](http://keygenerator.bmetering.com/API/DownloadBMetering).

:::

### Postup konfigurace {#configuration-procedure}

1. Nakonfigurujte rádiový modul pomocí [**přijímače RFM-RX2**](https://www.bmeters.com/en/products/rfm-rx2/) a softwaru [**BMetering Software**](http://keygenerator.bmetering.com/API/DownloadBMetering).  
2. Stisknutím **červeného tlačítka** na spodní desce modulu zahájíte konfiguraci.  
3. Sledujte **červenou LED**:  
   - Pokud bliká nepřetržitě přibližně **20 sekund**, konfigurace proběhla úspěšně.  
   - Pokud bliká jen pár sekund, konfigurace selhala a postup je nutné zopakovat.  
4. Po úspěšné konfiguraci **připojte modul k vodoměru** podle obrázku.  
5. Pečlivě **zarovnejte optický index vodoměru** s otvorem v desce modulu.  
6. Jednou rukou přidržte otočný číselník vodoměru. Druhou rukou přitlačte modul na vodoměr a **otočte po směru hodinových ručiček**, aby zapadl na místo.  
7. Ve **vyčítacím softwaru** ověřte, že sběr dat probíhá správně a že nejsou aktivní žádné alarmy.  
8. (Volitelné) Jako ochranu proti manipulaci vložte **oranžovou plombu** do dvou malých otvorů na levé straně modulu a nalepte **samolepicí plombu**.  

![BMeters RFM-TX1.1 – instalace](../../../../../../chester/supported-devices/wm-bus/images/bmeters-rfm-tx1.1-installation.png)

## Konfigurace adresy Wireless M-Bus {#wireless-m-bus-address-configuration}

### Kde na zařízení najít adresu {#where-to-find-the-address-on-the-device}

Adresa je umístěna na **levé straně pod čárovým kódem**, jak ukazuje obrázek níže (8 číslic).  

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div>
        <Image img={require('../../../../../../chester/supported-devices/wm-bus/images/bmeters-rfm-tx1.1.png')} width={376} height={376} alt="RFM-TX1.1 s vyznačenou 8místnou wM-Bus adresou vlevo pod čárovým kódem" />
      </div>
    </div>
    <div class="col col--24"></div>
  </div>
</div>
<br />

---

### Mapování wM-Bus adresy do zařízení CHESTER {#mapping-the-wm-bus-address-to-chester}

Mapování je nutné provést pomocí **CHESTER Terminal**, například s:  

- [**HARDWARIO Monitor (Windows)**](https://github.com/hardwario/hio-monitor/releases)
- [**HARDWARIO Manager (Android)**](https://play.google.com/store/apps/details?id=com.hardwario.manager)
- [**Google Chrome Terminal**](https://terminal.hardwario.com/)

---

### Správa a přidávání wM-Bus adres zařízení v jednotce CHESTER {#managing-and-adding-wm-bus-device-addresses-in-chester}

Zde můžete spravovat seznam **wM-Bus adres** (**přidat/odebrat**), upravit nastavení skenování a prohlédnout si příklady konfigurací pro typická nasazení.  

- [**Konfigurace seznamu adres**](/chester/catalog-applications/chester-wm-bus#address-list-configuration) – **správa a úprava** seznamu propojených wM-Bus **adres**  
- [**Konfigurace skenování**](/chester/catalog-applications/chester-wm-bus#scan-configuration) – **úprava nastavení skenování** pro komunikaci se zařízeními 
- [**Příklady konfigurací**](/chester/catalog-applications/chester-wm-bus#example-configurations) – referenční **šablony** pro typická nasazení 

---

## Šifrování zpráv a správa klíčů {#message-encryption-and-key-management}

**Přenášené zprávy jsou šifrované**, aby se optimalizovala spotřeba energie při přenosu dat, což prodlužuje celkovou výdrž baterie.

**Přijatá data je proto nutné dešifrovat**, což se provádí pomocí **dešifrovacích klíčů**.  
K tomu existují dvě možnosti:

- [**HARDWARIO Cloud**](/chester/catalog-applications/chester-wm-bus#hardwario-cloud--decryption-keys) – návod, jak zadat a spravovat dešifrovací klíče  
- [**Dešifrovací stránka**](https://wmbusmeters.org/) – online nástroj pro ruční dešifrování a analýzu dat
