---
title: Používání displeje
---

# Používání displeje {#using-the-display}

**Pouze FIBER**: FIBER Lite displej nemá (viz [Co je jinak](/fiber/fiber-lite/introduction#whats-different)).

Tento návod popisuje, jak zobrazit vlastní obsah na podsvíceném LCD zařízení FIBER.

:::danger

**Obsah se připravuje.** Displej **není** linuxový framebuffer, neexistuje pro něj zařízení `/dev/fb*`
ani DRM panel. Je připojený na **SPI6** (`/dev/spidev6.0`, chip select na GPIO18) a z uživatelského prostoru
ho řídí aplikace FIBER (`fiber_app`, kterou spouští služba `fiber.service`); ta má zařízení otevřené
po celou dobu svého běhu.

Návod vám proto nemůže jednoduše poradit, abyste zapisovali do `/dev/spidev6.0`: když to uděláte
za běhu aplikace, dostanete v lepším případě poškozený obraz. Displej navíc ukazuje stav alarmů
zařízení, takže jeho převzetí není jen kosmetická otázka. Než bude možné postup sepsat, musí
existovat podporovaný způsob, jak obsah na displej dostat přes aplikaci FIBER.

:::
