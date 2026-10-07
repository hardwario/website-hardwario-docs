---
slug: about-lora-module
title: O modulu LoRa Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('../../../../../tower/hardware-modules/images/lora-module.png')} alt="LoRa Module se stíněným rádiem LoRa a anténním konektorem SMA" /></div>
    </div>
    <div class="col col--6">
      <p>
        <b>LoRa Module</b> komunikuje v <b>bezdrátové síti LoRaWAN</b>, tedy v síti určené pro IoT. Zařízení na baterie s ní může posílat data přímo na server i několik let. Modul pracuje na <b>rádiové frekvenci 868 MHz</b>.
      </p>
      <p>
        Díky specifické zig-zag modulaci může zařízení LoRa komunikovat s bránou na vzdálenost desítek kilometrů.
      </p>
      <p>
        Síť má široké využití: hodí se hlavně pro měřiče spotřeby energií (např. vodoměry nebo plynoměry), pro senzory prostředí (např. senzor CO₂) a také pro včasné hlášení havárií nebo závad (např. detektor úniku vody).
      </p>
    </div>
  </div>
</div>

## Vlastnosti {#features}
- Modul LoRaWAN **CMWX1ZZABZ-078 (Murata)**
- Komunikace přes UART pomocí příkazů AT
- Anténa SMA **ANT-SS900**
- Spotřeba v pohotovostním režimu 2 μA
- Rozsah provozního napětí: 1,8 až 3,6 V
- Rozsah provozních teplot: -20 až 70 °C
- Rozměry: 33 x 55 mm

## Odkazy {#references}
- [**E-shop**](https://www.hardwario.store/p/lora-module)
- [**Schémata**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-lora)
- [**Knihovna SDK**](https://sdk.hardwario.com/group__twr__cmwx1zzabz)
- [**Hlavičkový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_cmwx1zzabz.h)
- [**Zdrojový soubor**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_cmwx1zzabz.c)
- [**Projekty**](https://www.hackster.io/hardwario/projects?part_id=74067)
