---
slug: rtc-remoteio-error
title: RTC -EREMOTEIO Error
---

**Symptom:** `dmesg` shows `rtc-pcf85063 ...: error -EREMOTEIO: RTC chip is not present`.

This is expected and harmless on FIBER Lite — it means the [**Configure Hardware**](/fiber-lite/installation#configure-hardware)
step was followed using the CM4-based FIBER guide's config.txt block verbatim, including the
external RTC overlay line. Remove any `dtoverlay=i2c-rtc,...` line from `/boot/firmware/config.txt`
and reboot; the Raspberry Pi 5's native built-in RTC (`rtc0`) does not need it.
