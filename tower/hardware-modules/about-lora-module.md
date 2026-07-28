---
slug: about-lora-module
title: About LoRa Module
---
import Image from '@theme/IdealImage';

<div class="container">
  <div class="row">
    <div class="col col--4">
      <div><Image img={require('./images/lora-module.png')} alt="LoRa Module with a shielded LoRa radio and an SMA antenna connector" /></div>
    </div>
    <div class="col col--6">
      <p>
        The <b>LoRa Module</b> allows you to communicate to the <b>LoRaWAN wireless network</b>, a network made for the IoT. This technology makes it possible to communicate from a battery-powered device directly to a server, even for several years. The LoRa Module uses <b>radio frequency 868 MHz</b>.
      </p>
      <p>
        Thanks to specific zig-zag modulation, the LoRa device can communicate with the gateway over a distance of tens of kilometers.
      </p>
      <p>
        This network has a wide range of applications. Its use is particularly useful in energy consumption meters (e.g. water meters, gas meters, etc.), environmental sensors (e.g. a CO₂ sensor), and also in applications for early reports of accidents or defects (e.g. water leak detector).
      </p>
    </div>
  </div>
</div>

## Features
- LoRaWAN module **CMWX1ZZABZ-078 (Murata)**
- Communication using UART and AT commands
- SMA antenna **ANT-SS900**
- Standby power consumption 2 μA
- Operating voltage range: 1.8 to 3.6 V
- Operating temperature range: -20 to 70 °C
- Dimensions: 33 x 55 mm

## References
- [**Store**](https://www.hardwario.store/p/lora-module)
- [**Schematics**](https://github.com/hardwario/bc-hardware/tree/master/out/bc-module-lora)
- [**SDK Library**](https://sdk.hardwario.com/group__twr__cmwx1zzabz)
- [**Header File**](https://github.com/hardwario/twr-sdk/blob/master/twr/inc/twr_cmwx1zzabz.h)
- [**Source File**](https://github.com/hardwario/twr-sdk/blob/master/twr/src/twr_cmwx1zzabz.c)
- [**Projects**](https://www.hackster.io/hardwario/projects?part_id=74067)
