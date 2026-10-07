---
slug: power-management
title: Správa napájení
title_meta: "Správa napájení (HARDWARIO TOWER)"
---
import Image from '@theme/IdealImage';

:::caution

Tento dokument jde do technických podrobností a vysvětluje správu napájení sady HARDWARIO TOWER Industrial IoT Kit na úrovni hardwaru.

:::

Sada **HARDWARIO TOWER Industrial IoT Kit** je navržená tak, aby k ní šlo připojit více zdrojů napájení najednou.

Modul [**Core Module**](../hardware-modules/about-core-module.md) tak může být napájený **kabelem USB** a zároveň můžete mít **v modulu Battery Module vložené baterie**. HARDWARIO TOWER v takovém případě automaticky vybere **vhodný zdroj napájení**.

:::info

  **Co to znamená?**

  Když je například připojený externí zdroj napájení (adaptér nebo USB), **baterie se odpojí**. Současně může být **připojeno i více externích zdrojů**, například **adaptér zapojený do modulu Power Module** a **kabel USB v modulu Core Module**.

  V takovém případě má přednost modul ve **fyzicky nižší vrstvě** a **napájení systému dodává právě on**.

:::

## Vysvětlení správy napájení {#power-management-explanation}

Konektor **TOWER** má dva signály pro distribuci napájení v systému:

- **VDD**: Kladná napájecí větev
  - 3,1 V při napájení z baterií
  - 3,3 V z externího zdroje napájení
- **GND**: Zem (záporná větev)

Modul, který může systém napájet, se nazývá **energizer**. Energii dodává buď z **externího zdroje napájení**, nebo z **baterií**.

:::note

  V obou případech obsahuje **energizer** elektronický obvod pro **inteligentní správu napájení**.

:::

Tento doplňkový obvod pracuje se **dvěma pomocnými signály na konektoru TOWER**, které buď sám ovládá, nebo jimi je ovládán:

#### Signál BAT_OFF {#signal-batoff}

Tento signál odpojí baterie a zabrání jejich vybíjení, pokud je dostupný jiný zdroj napájení a baterie nejsou potřeba.

#### Signál VDD_OFF {#signal-vddoff}

Tento signál je fyzicky rozdělen na dvě části:

- Signál **VDD_OFF_IN**
  - Tento signál je na **spodní straně modulu (strana s piny)** a odpojuje výstup napájení daného modulu.
  - Každý **modul se zdrojem napájení** (kromě baterie) čte signál **VDD_OFF_IN** na **spodní straně**; ten mu říká, že má odpojit napájení, protože je aktivní jiný zdroj (logická ***1*** = **odpojit** napájení).

- Signál **VDD_OFF_OUT**
  - Tento signál je na **horní straně modulu (strana se zdířkami)** a je propojený se signálem **VDD_OFF_IN** modulu nad ním.
  - Každý **modul se zdrojem napájení** (kromě baterie) poskytuje signál **VDD_OFF_OUT** na **horní straně** modulu, čímž ostatním modulům oznamuje, **že dodává napájení**.

## Příklad zapojení {#connection-example}

Zdrojem napájení může v současnosti být modul **Power Module** a modul **Core Module (když je připojený k USB)**. Pokud jsou v sestavě oba nad sebou, přednost má **ten nižší**, takže existují **dvě možnosti**:

- **Core Module nad modulem Power Module**: TOWER je **napájený z modulu Power Module**
- **Core Module pod modulem Power Module**: TOWER je **napájený z USB (jde o napětí VDD 3,3 V)**

:::caution

Dejte na to pozor, pokud stavíte zařízení, které obsahuje například [**Smart LED Strip**](./how-to/smart-led-strip.md). Pokud umístíte **Core Module pod modul Power Module**, zařízení nebude fungovat podle očekávání.

:::

## Příklady obvodů {#circuits-examples}

:::info

Toto je příklad elektronického obvodu **bateriového energizeru**.

:::

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div><Image img={require('../../../../../tower/firmware-sdk/images/energizer-circuit-battery.png')} alt="Schéma bateriového energizeru: čtyři články AAA do step-down převodníku TPS62745 na 3,1 V s odpojením zátěže" /></div>
    </div>
    <div class="col col--2">
      <p>
      </p>
    </div>
  </div>
</div>
<br />

:::info

  Toto je příklad elektronického obvodu energizeru napájeného z **externího zdroje napájení**.

:::

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div><Image img={require('../../../../../tower/firmware-sdk/images/energizer-circuit-external.png')} alt="Schéma energizeru s externím napájením: USB 5 V přes diody do regulátoru TLV73333 se signály VDD_OFF a BAT_OFF" /></div>
    </div>
    <div class="col col--2">
      <p>
      </p>
    </div>
  </div>
</div>
