---
slug: concentratord-spi-not-detected
title: FIBER Lite Concentrator Never Shows a Gateway ID
---

**Symptom:** on FIBER Lite (SPI/RAK2287), the concentrator's own service logs never print a
Gateway ID, the ChirpStack gateway page never shows a "Last seen at" timestamp, and no
join-request ever reaches ChirpStack, even though the LoRaWAN end-device is powered on and in
range.

Work through these in order. The first two are by far the most common, and both look like broken
hardware while being pure configuration.

## 1. The daemon hangs on "Opening SPI communication interface"

Check where the service actually stops:

```sh
sudo journalctl -u chirpstack-concentratord -n 30 --no-pager
```

If the last line is `Opening SPI communication interface` and nothing follows (no error, no
timeout, just silence), the concentrator is **not** faulty. The vendor profile (`model=`) supplies
only the pin mapping, RSSI offsets and gain table; it does **not** supply a channel plan. With the
`[gateway.concentrator]` section missing from the configuration, every radio is configured as
`enabled: false` at frequency 0 and the underlying HAL blocks indefinitely.

Confirm by looking further up the same log:

```sh
sudo journalctl -u chirpstack-concentratord | grep 'Configuring radio'
```

Radios reported as `enabled: false, center_freq: 0` mean the channel plan is missing. Add the
`[gateway.concentrator]` block from
[Install ChirpStack Concentratord](/fiber/installation/concentratord) and restart the service.
The radios must come up `enabled: true` with real frequencies.

## 2. Concentratord runs, but nothing reaches MQTT

If Concentratord logs a Gateway ID and `Frame received` lines, but ChirpStack still shows nothing,
the break is between Concentratord and the MQTT Forwarder. Both services report `active`, so
`systemctl status` is not enough to spot it.

Check the permissions on the IPC sockets:

```sh
ls -la /tmp/concentratord_*
```

They must be group-accessible to the `chirpstack` user, i.e. `root:chirpstack` and mode `srwxrwx---`:

```text
srwxrwx--- 1 root chirpstack 0 /tmp/concentratord_command
srwxrwx--- 1 root chirpstack 0 /tmp/concentratord_event
```

If they are `root:root` mode `srwxr-xr-x`, the forwarder cannot connect, because connecting to a unix
socket requires **write** permission. Add `Group=chirpstack` and `UMask=0007` to the
`[Service]` section of `/etc/systemd/system/chirpstack-concentratord.service`, then:

```sh
sudo systemctl daemon-reload
sudo systemctl restart chirpstack-concentratord
sudo systemctl restart chirpstack-mqtt-forwarder
```

## 3. SPI is not enabled, or the HAT is not seated

Only if the service never gets as far as opening SPI at all:

```sh
grep spi /boot/firmware/config.txt   # expect: dtparam=spi=on (uncommented)
ls /dev/spidev*                       # expect: /dev/spidev0.0 and /dev/spidev0.1
```

`dtparam=spi=on` ships commented out in Raspberry Pi OS. If it is commented, uncomment it and
reboot. If `/dev/spidev*` is still missing afterwards, the RAK2287 HAT is not making contact with
the Pi 5's GPIO header. Reseat it and check for bent pins.

## 4. Proving the concentrator chip itself responds

If you need to separate "dead hardware" from "bad configuration" definitively, read the SX1302's
registers directly over SPI while toggling the reset line. Install `python3-spidev` and
`python3-libgpiod`, hold the reset pin (`gpiochip0` line 17) low, and read a register with the
5-byte frame `[0x00, addr >> 8, addr & 0xFF, 0x00, 0x00]`, taking the result from byte 4.

Register values that **change** between reset held high and reset released mean the chip is alive
and the fault is in software. Values that stay at `0x00` in both states point at the HAT seating
or the SPI bus.

If none of this resolves it, please report what you tried and the full service log back to
HARDWARIO so this page can be extended.
