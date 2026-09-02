---
slug: chirpstack-decoding
title: Dekódování dat
description: "Tento návod vás provede nastavením kodeků payloadu v ChirpStack v4, aby se vaše data z LoRaWAN správně dekódovala a bylo je možné zobrazit."
---
import Image from '@theme/IdealImage';

# Dekódování dat {#data-decoding}

Tento návod vás provede nastavením kodeků payloadu v ChirpStack v4, aby se vaše data z LoRaWAN správně dekódovala a bylo je možné zobrazit.

---

Data z LoRaWAN se přenášejí v komprimovaném formátu a je potřeba je dekódovat.  

1. Přejděte na **Device Profiles → Codec**.  
2. Zvolte **Payload Codec** a vložte svůj dekódovací kód.  

U zařízení **STICKER** zvolte jako payload codec **JavaScript functions** a klikněte na **Submit**.  

![ChirStack v4 - brány](../../../../../../apps/chirpstack/chirpstack-configuration/images/chirpstack-tutorial-17.png)

#### Zobrazení dekódovaných dat {#viewing-decoded-data}

1. Přejděte na **Applications → Events**.  
2. Zvolte **Up** pro zobrazení uplink zpráv.  
3. Nyní uvidíte **dekódovaná data**.  

#### Ukázka kodeku (STICKER) {#example-of-codec-sticker}

import EditCodeBlock from '../../../../../../apps/chirpstack/chirpstack-configuration/edit-code-block.js';

<EditCodeBlock initialText={`
/**
 * Decode uplink function
 * 
 * @param {object} input
 * @param {number[]} input.bytes Byte array containing the uplink payload, e.g. [255, 230, 255, 0]
 * @param {number} input.fPort Uplink fPort.
 * @param {Record<string, string>} input.variables Object containing the configured device variables.
 * 
 * @returns {{data: object}} Object representing the decoded payload.
 */
function decodeUplink(input) {

  function toSignedInt16(value) {
    return value > 0x7fff ? value - 0x10000 : value;
  }

  var data = {};
  var bytes = input.bytes;
  var header = (bytes[0] << 8) | bytes[1];
  var index = 2;

  if (header & (1 << 15)) {
    data.boot = true;
  } else {
    data.boot = false;
  }

  if (header & (1 << 14)) {
    var orientation = header & 0xf;
    data.orientation = orientation === 0x0f ? null : orientation;
  } else {
    data.orientation = null;
  }

  if (header & (1 << 13)) {
    var voltage = bytes[index++];
    data.voltage = voltage === 0xff ? null : voltage / 50;
  } else {
    data.voltage = null;
  }

  if (header & (1 << 12)) {
    var temperature = (bytes[index++] << 8) | bytes[index++];
    data.temperature = temperature === 0x7fff ? null : toSignedInt16(temperature) / 100;
  } else {
    data.temperature = null;
  }

  if (header & (1 << 11)) {
    var humidity = bytes[index++];
    data.humidity = humidity === 0xff ? null : humidity / 2;
  } else {
    data.humidity = null;
  }

  if (header & (1 << 10)) {
    var illuminance = (bytes[index++] << 8) | bytes[index++];
    data.illuminance = illuminance === 0xffff ? null : illuminance * 2;
  } else {
    data.illuminance = null;
  }

  if (header & (1 << 9)) {
    var ext_temperature_1 = (bytes[index++] << 8) | bytes[index++];
    data.ext_temperature_1 = ext_temperature_1 === 0x7fff ? null : toSignedInt16(ext_temperature_1) / 100;
  } else {
    data.ext_temperature_1 = null;
  }

  if (header & (1 << 8)) {
    var ext_temperature_2 = (bytes[index++] << 8) | bytes[index++];
    data.ext_temperature_2 = ext_temperature_2 === 0x7fff ? null : toSignedInt16(ext_temperature_2) / 100;
  } else {
    data.ext_temperature_2 = null;
  }

  if (header & (1 << 7)) {
    var motion_count = (bytes[index++] << 24) | (bytes[index++] << 16) | (bytes[index++] << 8) |
      bytes[index++];
    data.motion_count = motion_count === 0xffffffff ? null : motion_count;
  } else {
    data.motion_count = null;
  }

  if (header & (1 << 6)) {
    var altitude = (bytes[index++] << 8) | bytes[index++];
    data.altitude = altitude === 0x7fff ? null : toSignedInt16(altitude) / 10;
  }
  else {
    data.altitude = null;
  }

  if (header & (1 << 5)) {
    var pressure = (bytes[index++] << 24) | (bytes[index++] << 16) | (bytes[index++] << 8) |
      bytes[index++];
    data.pressure = pressure === 0xffffffff ? null : pressure;
  } else {
    data.pressure = null;
  }

  return {
    data: data,
    warnings: [],
    errors: []
  };
}
/**
 * Encode downlink function.
 * 
 * @param {object} input
 * @param {object} input.data Object representing the payload that must be encoded.
 * @param {Record<string, string>} input.variables Object containing the configured device variables.
 * 
 * @returns {{bytes: number[]}} Byte array containing the downlink payload.
 */
function encodeDownlink(input) {
  return {
    // bytes: [225, 230, 255, 0]
  };
}

`} />


## Videonávod {#video-tutorial}

:::tip
Pokud potřebujete další pomoc nebo vizuální ukázku postupu popsaného v tomto návodu, podívejte se na [**videonávod**](https://docs.hardwario.com/apps/videos-apps/chirpstack-decoding).
:::
