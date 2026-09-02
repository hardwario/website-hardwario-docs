---
slug: about-lora-module
title: O modulu LoRa
description: "Díky specifické zig-zag modulaci může zařízení LoRa komunikovat s bránou na vzdálenost desítek kilometrů."
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/lora-module.png')} alt="Modul LoRa se stíněným rádiem LoRa a SMA konektorem pro antenu" /></div>
    </div>
    <div class="col col--6">
      <p>
        <b>Modul LoRa</b> umožňuje komunikovat v <b>bezdrátové síti LoRaWAN</b>, tedy v síti vytvořené pro IoT. Tato technologie umožňuje komunikaci z bateriově napájeného zařízení přímo na server, a to i po několik let. Modul LoRa využívá <b>radiovou frekvenci 868 MHz</b>.
      </p>
      <p>
        Díky specifické zig-zag modulaci může zařízení LoRa komunikovat s bránou na vzdálenost desítek kilometrů.
      </p>
      <p>
        Tato síť má široké spektrum použití. Uplatní se především u měřičů spotřeby energií (např. vodoměry, plynoměry apod.), u senzorů prostředí (např. senzor CO₂) a také v aplikacích pro včasné hlášení havárií nebo závad (např. detektor úniku vody).
      </p>
    </div>
  </div>
</div>

## Vlastnosti {#features}
- Modul LoRaWAN **CMWX1ZZABZ-078 (Murata)**
- Komunikace pomocí UART a AT příkazů
- SMA antena **ANT-SS900**
- Spotřeba v pohotovostním režimu 2 μA
- Rozsah provozního napětí: 1,8 až 3,6 V
- Rozsah provozních teplot: -20 až 70 °C
- Rozměry: 33 x 55 mm

## Odkazy {#references}
- [**Store**](https://www.hardwario.store/p/lora-module)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-lora)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__cmwx1zzabz)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_cmwx1zzabz.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_cmwx1zzabz.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=74067)
