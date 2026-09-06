---
slug: power-management
title: Správa napájení
description: "Tento dokument zabíhá do technických detailů a vysvětluje správu napájení sady HARDWARIO TOWER Industrial IoT Kit na úrovni hardwaru."
title_meta: "Správa napájení (HARDWARIO TOWER)"
---
import Image from '@theme/IdealImage';

:::caution

Tento dokument zabíhá do technických detailů a vysvětluje správu napájení sady HARDWARIO TOWER Industrial IoT Kit na úrovni hardwaru.

:::

Sada **HARDWARIO TOWER Industrial IoT Kit** byla navržena tak, aby umožňovala připojení více zdrojů napájení.

Například díky tomu může být modul [**Core Module**](../hardware-modules/about-core-module.md) napájen z **USB kabelu** a zároveň mít **vložené baterie v modulu Battery Module**. HARDWARIO TOWER tento problém řeší automaticky výběrem **vhodného zdroje napájení**.

:::info

  **Co to znamená?**

  Například když je připojen externí zdroj napájení (adaptér nebo USB), **baterie se odpojí**. Je také možné mít současně **připojeno více externích zdrojů**, například **adaptér zapojený do modulu Power Module** a **USB kabel v modulu Core Module**.

  V takovém případě má prioritu modul, který se nachází ve **fyzicky nižší vrstvě**, a bude to právě on, **kdo bude dodávat napájení** do systému.

:::

## Vysvětlení správy napájení {#power-management-explanation}

Konektor **TOWER** má dva signály pro distribuci napájení v systému:

- **VDD**: Kladná napájecí větev
  - 3,1 V při napájení z baterií
  - 3,3 V z externího zdroje napájení
- **GND**: Zem (negativní větev)

Modul, který může dodávat napájení do systému, se nazývá **energizer**. Energie je dodávána buď z **externího zdroje napájení**, nebo z **baterií**.

:::note

  V obou případech obsahuje **energizer** elektronický obvod pro **inteligentní správu napájení**.

:::

Tento doplňkový elektronický obvod ovládá (nebo je ovládán) **dvěma pomocnými signály na konektoru TOWER**:

#### Signál BAT_OFF {#signal-batoff}

Tento signál odpojí baterie a zabrání jejich vybíjení, pokud je dostupný jiný zdroj napájení a baterie nejsou potřeba.

#### Signál VDD_OFF {#signal-vddoff}

Tento signál je fyzicky rozdělen na dvě části:

- Signál **VDD_OFF_IN**
  - Tento signál je na **spodní straně modulu (strana s piny)** a odpojuje výstup napájení daného modulu.
  - Každý **modul se zdrojem napájení** (kromě baterie) používá **VDD_OFF_IN** ze **spodní strany**, který mu říká, aby odpojil napájení, protože je aktivní jiný zdroj napájení (logická ***1*** = **odpojit** napájení),

- Signál **VDD_OFF_OUT**
  - Tento signál je na **horní straně modulu (strana se zdířkami)** a je zapojen do signálu **VDD_OFF_IN** modulu nad daným modulem.
  - Každý **modul se zdrojem napájení** (kromě baterie) poskytuje signál **VDD_OFF_OUT** na **horní straně** modulu, čímž ostatním modulům oznamuje, **že dodává napájení**.

## Příklad zapojení {#connection-example}

Možné moduly se zdrojem napájení jsou v tuto chvíli **Power Module** a **Core Module (když je připojen k USB)**. Pokud jsou naskládány na sobě, prioritu má **ten nejnižší**, a podle této logiky existují **dvě možnosti**:

- **Core Module nad modulem Power Module**, TOWER je **napájen z modulu Power Module**
- **Core Module pod modulem Power Module**, TOWER je **napájen z USB (co se týká 3,3V VDD)**

:::caution

Na tohle je třeba dávat pozor v případě, že se snažíte postavit zařízení, které obsahuje například [**Smart LED Strip**](./how-to/smart-led-strip.md). Zařízení nebude fungovat podle očekávání, pokud umístíte **Core Module pod modul Power Module**.

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
