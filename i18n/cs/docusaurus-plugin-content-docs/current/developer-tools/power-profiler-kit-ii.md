---
slug: power-profiler-kit-ii
title: Power Profiler Kit II
description: "Tento článek poskytuje informace o Power Profiler Kit II (dále označovaném jako PPK2) od Nordic Semiconductor."
---
import Image from '@theme/IdealImage';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import ReactPlayer from 'react-player'

# Power Profiler Kit II {#power-profiler-kit-ii}

Tento článek poskytuje informace o **Power Profiler Kit II** (dále označovaném jako **PPK2**) od **Nordic Semiconductor**.

:::info

**Power Profiler Kit II** můžete zakoupit přímo od **HARDWARIO**.

:::

## Nastavení {#setup}

Abyste mohli **Power Profiler Kit II** používat, musíte nainstalovat nebo spustit ** nRF Connect for Desktop**.

Instalační balíček pro váš operační systém si můžete stáhnout [zde](https://www.nordicsemi.com/Products/Development-tools/nRF-Connect-for-desktop/Download#infotabs).

<Tabs groupId="operating-system">
<TabItem value="windows" label="Windows" default>
Spusťte instalátor a nainstalujte aplikaci.

</TabItem>
<TabItem value="linux" label="Linux">
Aplikace je ve formátu .AppImage, takže ji musíte označit jako spustitelnou. Máte dvě možnosti:

- v konzoli spustit ```bash chmod u+x "AppImage File" ```
- **kliknout pravým tlačítkem** na stažený soubor .appimage a vybrat **Properties**. V dalším okně přejít na kartu **Permissions** a zaškrtnout políčko **“Allow executing file as program”**.

</TabItem>
<TabItem value="macOS" label="macOS">


</TabItem>
</Tabs>
<br />

Protože **nRF Connect for Desktop** je multifunkční aplikace, musíte nainstalovat podporu pro **PPK2**.

<div class="container">
    <div class="row">
    <div class="col col--8">
      <div><Image img={require('../../../../../chester/developer-tools/images/nrf-connect-ppk2-install.png')} alt="Seznam aplikací nRF Connect for Desktop s vyznačenou aplikací Power Profiler a jejím tlačítkem Install"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

Po dokončení instalace byste měli **Power Profiler** vidět v horní části seznamu aplikací. Aplikaci spustíte kliknutím na tlačítko **Open**.

<div class="container">
    <div class="row">
    <div class="col col--8">
      <div><Image img={require('../../../../../chester/developer-tools/images/nrf-connect-ppk2-open.png')} alt="Nainstalovaná aplikace Power Profiler v nRF Connect for Desktop se zobrazeným tlačítkem Open"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

Po kliknutí na tlačítko **Open** byste měli vidět okno podobné tomuto:

<div class="container">
    <div class="row">
    <div class="col col--10">
      <div><Image img={require('../../../../../chester/developer-tools/images/nrf-connect-plain.png')} alt="Hlavní okno aplikace Power Profiler před připojením zařízení, s prázdným grafem měření"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

## Základní použití {#basic-usage}

K připojení zařízení **CHESTER** k **PPK2** budete potřebovat tento hardware:

- zařízení **CHESTER**
- **Power Profiler Kit II**
- kabel micro USB
- napájecí kabel z **PPK2** do zařízení **CHESTER** (dodává se s **PPK2**, pokud jej kupujete od **HARDWARIO**)

Připojte napájecí kabel z **PPK2** do zařízení **CHESTER**.

:::caution

Ujistěte se, že je napájecí kabel do **PPK2** připojen stejným způsobem jako na obrázku!

:::

<div class="container">
    <div class="row">
    <div class="col col--10">
      <div><Image img={require('../../../../../chester/developer-tools/images/ppk2-chester-device.jpg')} alt="Deska PPK2 připojená ke konektoru baterie na základní desce CHESTER, s USB v portu DATA/POWER"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

Nyní se musíte připojit ke svému **PPK2**. Zapojte konec kabelu micro USB do portu **USB DATA/POWER** na **PPK2** a druhý konec do počítače. **PPK2** by nyní mělo **pulzovat zeleným světlem**.

Poté musíte své **PPK2** vybrat v **nRF Connect for Desktop**.


<Image img={require('../../../../../chester/developer-tools/images/nrf-connect-select-device.png')} alt="Aplikace Power Profiler s vyznačeným tlačítkem SELECT DEVICE v levém horním rohu"/>

<br />

Klikněte na **SELECT DEVICE** a zvolte své zařízení **PPK2**.

<Image img={require('../../../../../chester/developer-tools/images/nrf-connect-choose-device.png')} alt="Rozbalený seznam SELECT DEVICE se zařízením PPK2 zobrazeným podle sériového čísla"/>

<br />

**PPK2** by nyní mělo svítit buď **červeně** (režim měření **Source**), nebo **modře** (režim měření **Ampere**).

Pro zahájení záznamu dat musíte:

1. Vybrat režim, ve kterém chcete pracovat.

1. Nastavit napájecí napětí na **3600mV**

1. Zapnout napájení výstupu

1. Spustit záznam dat

1. Chcete-li si prohlédnout data v určitém čase, můžete si je buď **přiblížit** myší/trackpadem, nebo můžete kliknout na přepínač **Live view** a vidět data v aktuálním čase.

<div class="container">
    <div class="row">
    <div class="col col--12">
      <div><Image img={require('../../../../../chester/developer-tools/images/nrf-connect-main-window.png')} alt="Okno Power Profiler s číslovanými kroky: režim měření, napájecí napětí 3600 mV, napájení výstupu, Start, Live view"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

Když kliknete na **Start** pro zahájení záznamu dat, vaše **PPK2** začne pulzovat barvou vašeho režimu a v aplikaci uvidíte měření.

<div class="container">
    <div class="row">
    <div class="col col--12">
      <div><Image img={require('../../../../../chester/developer-tools/images/nrf-connect-running.png')} alt="Power Profiler zaznamenávající data, se špičkami spotřeby proudu a průměrnými/maximálními hodnotami okna"/></div>
    </div>
    <div class="col col--2">
    </div>
  </div>
</div>
<br />

## Videonávod {#video-tutorial}

Zde je krátký videonávod, **jak používat Power Profiler Kit II**, od **Nordic Semiconductor**.

<ReactPlayer controls src='https://youtu.be/B42lPvkUSoc' />
