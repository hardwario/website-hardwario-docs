---
title: Používání displeje
description: "Tato příručka popisuje, jak zobrazit vlastní obsah na podsvíceném LCD zařízení FIBER."
---

# Používání displeje {#using-the-display}

**Pouze FIBER**: FIBER Lite displej nemá (viz [Čím se liší](/fiber/fiber-lite/introduction#whats-different)).

Tato příručka popisuje, jak zobrazit vlastní obsah na podsvíceném LCD zařízení FIBER.

:::danger

**Obsah se připravuje.** Displej **není** linuxový framebuffer, neexistuje pro něj zařízení `/dev/fb*`
ani DRM panel. Je připojen na **SPI6** (`/dev/spidev6.0`, chip select na GPIO18) a řídí ho
z uživatelského prostoru aplikace FIBER (`fiber_app`, spouštěná službou `fiber.service`), která
toto zařízení drží otevřené po celou dobu svého běhu.

To znamená, že příručka vám nemůže jednoduše říct, ať zapisujete do `/dev/spidev6.0`: pokud to
uděláte za běhu aplikace, v lepším případě dostanete poškozený obraz, a displej navíc nese
informaci o stavu alarmů zařízení, takže jeho převzetí není kosmetické rozhodnutí. Než bude možné
tento postup sepsat, je potřeba podporovaný způsob, jak obsah na displej dostat přes aplikaci FIBER.

:::
