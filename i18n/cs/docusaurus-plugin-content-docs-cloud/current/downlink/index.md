---
title: Downlink
description: "Zprávy downlink v HARDWARIO Cloud: tři druhy zpráv, které může Cloud poslat zařízení CHESTER, a k čemu se každý z nich hodí."
---

# Downlink {#downlink}

**Downlink** je zpráva odeslaná **z Cloudu do zařízení**. HARDWARIO Cloud podporuje tři
druhy downlink zpráv:

- [**Data**](data.md): odeslání JSON příkazů, které dekóduje váš firmware.
- [**Config**](config.md): změna konfigurace zařízení pomocí příkazů `app config`.
- [**Shell**](shell.md): spouštění příkaz shelluů a čtení jejich odpovědí.

Chcete-li z webového rozhraní odeslat downlink typu **Data** nebo **Config**, otevřete zprávy zařízení a klikněte
na **+&nbsp;SCHEDULE DOWNLINK** v pravém horním rohu. Protože zařízení obvykle spí, aby šetřilo
energii, je downlink **zařazen do fronty** a doručen při příštím startu, odeslání uplinku nebo dotazu
do Cloudu, odpověď se proto nemusí objevit okamžitě.
