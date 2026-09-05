---
slug: rtc-remoteio-error
title: Chyba RTC -EREMOTEIO
description: "Na zařízení FIBER Lite je to očekávané a neškodné. Znamená to, že krok Configure Hardware"
---

**Symptom:** `dmesg` vypisuje `rtc-pcf85063 ...: error -EREMOTEIO: RTC chip is not present`.

Na zařízení FIBER Lite je to očekávané a neškodné. Znamená to, že krok [**Configure Hardware**](/fiber/installation/configure-hardware)
byl proveden podle bloku config.txt z karty FIBER (CM4) místo karty FIBER Lite,
včetně řádku s overlay pro externí RTC. Odeberte z `/boot/firmware/config.txt`
jakýkoli řádek `dtoverlay=i2c-rtc,...` a restartujte; nativní vestavěné RTC (`rtc0`) v Raspberry Pi 5
jej nepotřebuje.
