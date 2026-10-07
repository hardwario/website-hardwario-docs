---
slug: rtc-remoteio-error
title: Chyba RTC -EREMOTEIO
---

**Příznak:** `dmesg` vypisuje `rtc-pcf85063 ...: error -EREMOTEIO: RTC chip is not present`.

Na zařízení FIBER Lite je to očekávané a neškodné. Znamená to, že jste krok [**Konfigurace hardwaru**](/fiber/installation/configure-hardware)
provedli s blokem config.txt ze záložky FIBER (CM4) místo záložky FIBER Lite, tedy i s řádkem
overlaye pro externí RTC. Odeberte z `/boot/firmware/config.txt` všechny řádky `dtoverlay=i2c-rtc,...`
a restartujte systém; vestavěné RTC (`rtc0`) v Raspberry Pi 5 je nepotřebuje.
