---
slug: chirpstack-decoding
title: Data Decoding
---
import Image from '@theme/IdealImage';

# Data Decoding

This tutorial guides you through the process of configuring payload codecs in ChirpStack v4 so that your LoRaWAN data can be properly decoded and viewed.

---

LoRaWAN data is transmitted in a compressed format and needs to be decoded.  

1. Go to **Device Profiles → Codec**.  
2. Select **Payload Codec** and paste your decoding code.  

For **STICKER**, choose **JavaScript functions** as the payload codec, then click **Submit**.  

![ChirStack v4 - Gateways](images/chirpstack-tutorial-17.png)

#### Viewing Decoded Data  

1. Navigate to **Applications → Events**.  
2. Select **Up** to view uplink messages.  
3. You will now see **decoded data**.  

#### Example of Codec (STICKER)

import EditCodeBlock from './edit-code-block.js';

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


## Video Tutorial

:::tip
If you need further assistance or a visual demonstration of the process described in this guide, consult the [**Video Guide**](/apps/videos-apps/chirpstack-decoding).
:::