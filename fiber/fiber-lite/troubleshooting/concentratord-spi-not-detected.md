---
slug: concentratord-spi-not-detected
title: FIBER Lite Concentrator Never Shows a Gateway ID
---

**Symptom:** on FIBER Lite (SPI/RAK2287), the concentrator's own service logs never print a
Gateway ID, the ChirpStack gateway page never shows a "Last seen at" timestamp, and no
join-request ever reaches ChirpStack — even though the LoRaWAN end-device is powered on and in
range.

:::danger

This hardware path is **not yet verified on real hardware** (see
[Install ChirpStack Concentratord](/fiber/installation/concentratord)) — the checks below are
starting points based on how the SPI/RAK2287 path is documented to work, not a confirmed fix.
Exact service and binary names depend on whatever RAKwireless's own SX1302 HAL installer sets up
on your system; adjust the commands below to match what it actually installed.

:::

Work through these in order:

1. **Confirm SPI is enabled and the HAT is electrically seated** — the single most common cause
   of "nothing at all" on any SPI peripheral:

   ```sh
   grep spi /boot/firmware/config.txt   # expect: dtparam=spi=on (uncommented)
   ls /dev/spidev*                       # expect: at least one device
   ```

   If `dtparam=spi=on` is missing or commented out, add/uncomment it and reboot. If
   `/dev/spidev*` still shows nothing after that, the RAK2287 HAT isn't making contact with the
   Pi 5's GPIO header — reseat it and check for bent pins before going further.

1. **Confirm RAKwireless's own installer actually finished**, rather than silently failing
   partway. The generic USB ChirpStack Concentratord configuration used on FIBER (CM4) does
   **not** work here — this path needs RAKwireless's SX1302 HAL installer, which sets up the SPI
   device path and GPIO reset-pin handling the RAK2287 needs. Re-run it and read its output in
   full rather than assuming it succeeded.

1. **Check whatever service the installer created is actually running**, and read its logs from
   the very start of the process — the real failure (SPI open error, wrong device path, chip ID
   mismatch) shows up in the first few lines, before a crash loop just repeats the same symptom
   over and over.

If none of this resolves it, that's a genuinely useful data point — please report exactly what
you tried, the RAK2287 installer version, and the log output back to HARDWARIO so this page (and
the underlying procedure) can be corrected against real hardware.
