---
title: Downlink
description: "Zprávy downlink v HARDWARIO Cloud: tři druhy zpráv, které může cloud poslat zařízení CHESTER, a k čemu se který hodí."
---

# Downlink {#downlink}

**Downlink** je zpráva odeslaná **z cloudu do zařízení**. HARDWARIO Cloud podporuje tři
druhy zpráv downlink:

- [**Data**](data.md): odeslání příkazů ve formátu JSON, které dekóduje firmware zařízení.
- [**Config**](config.md): změna konfigurace zařízení pomocí příkazů `app config`.
- [**Shell**](shell.md): spouštění příkazů shellu a čtení jejich odpovědí.

Chcete-li z webového rozhraní odeslat downlink typu **Data** nebo **Config**, otevřete zprávy zařízení a klikněte
na **+&nbsp;SCHEDULE DOWNLINK** v pravém horním rohu. Zařízení kvůli úspoře energie obvykle spí, proto se downlink
**zařadí do fronty** a doručí se při příštím startu zařízení, odeslání uplinku nebo dotazu
na cloud. Odpověď se tedy nemusí objevit okamžitě.
