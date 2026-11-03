---
title: CHESTER Push
description: "CHESTER Push je katalogová aplikace pro hlášení stiskem tlačítka: co umí, jaký má hardware, šablona krabičky a jaký firmware používá."
---

# CHESTER Push {#chester-push}

![Zařízení CHESTER Push se čtyřmi tlačítky na barevných štítcích (Production, Warning, Failure, Help), pohled shora](/img/chester/catalog-applications/chester-push.webp)

Zařízení **CHESTER Push** je tlačítkový terminál. Jakmile stisknete kterékoli z jeho tlačítek, odešle hlášení do HARDWARIO Cloud přes NB-IoT/LTE nebo LoRaWAN.

:::info Firmware

Konfigurační parametry, formát dat a firmware ke stažení popisuje stránka **[Firmware CHESTER Push](../../firmware/chester-push/index.md)**.

:::

## Co umí {#what-it-can-do}

- Okamžitě odešle data, jakmile stisknete kterékoli tlačítko.
- Rozliší krátký a dlouhý stisk a u každého tlačítka počítá obojí.
- Každý stisk potvrdí rozsvícením LED v tlačítku a pípnutím.
- Běží z baterie Li-Ion a okamžitě hlásí výpadek i obnovení externího napájení, takže poslouží i ke sledování výpadků napájení.
- V každé zprávě hlásí teplotu a orientaci zařízení.
- Má dvě sestavení firmwaru: hlavní je vhodné pro provoz na baterii, [**CHESTER Push FM**](../../firmware/chester-push/chester-push-fm.md) nechává svítit naposledy stisknuté tlačítko.

## Hardware {#hardware}

Hardware této aplikace tvoří tyto položky (objednací kódy):

* `CHESTER-M-CGLS`: základní deska CHESTER
* `CHESTER-Z1-F`: čtyři tlačítka (další varianty viz [**Objednací kódy**](../../ordering-codes.md#chester-z))
* `CHESTER-E2-LP`: krabička se světlovodem a anténním pigtailem SMA

Podrobnosti najdete na stránce [**Objednací kódy**](../../ordering-codes.md).

## Tlačítka {#push-buttons}

Zařízení **CHESTER Push** má na krabičce tlačítka. U větších objednávek lze počet tlačítek přizpůsobit. Standardní provedení má čtyři tlačítka na levé straně, dodat můžeme i verzi s jedním tlačítkem uprostřed krabičky. Na přání zákazníka také upravíme potisk krabičky a vedle jednotlivých tlačítek doplníme textové popisky (nebo symboly).

Každé tlačítko má také **indikační LED**, takže obsluha vidí, že zařízení stisk zaznamenalo. Stisk navíc slyšitelně potvrdí **pípnutí** z vestavěného bzučáku.

## Napájení {#power-supply}

Aplikace **CHESTER Push** využívá rozšiřující modul **CHESTER-Z1-F** s dobíjecí baterií **Li-Ion** a napájecím zdrojem DC/DC (rozsah vstupního napětí 6 VDC až 26 VDC), který nabíjí baterii a zajišťuje stabilní napájení. Zpráva obsahuje také informaci, zda je připojené externí napájení, napětí na externím vstupu DC a napětí baterie. Díky tomu lze zařízení **CHESTER Push** použít i ke sledování výpadků napájení. Modul popisuje stránka [**CHESTER-Z1**](../../extension-modules/chester-z1.md).

## Šablona krabičky {#enclosure-template}

Pro vlastní návrh krabičky můžete použít [**šablonu předního krytu**](pathname:///download/hio-enclosure-4push-130x175-cmyk.pdf).

## Kde začít {#getting-started}

Základy jsou společné pro všechny katalogové aplikace CHESTER:

- [**První kroky**](/chester/first-steps): jak připojit zařízení ke cloudu.
- [**Společné funkce**](../../firmware/common-functionality.md): jak fungují LED, tlačítko a nastavení sítě.
- [**Konektivita platformy**](/chester/category/platform-connectivity/): jak pracovat s interaktivní konzolí.
