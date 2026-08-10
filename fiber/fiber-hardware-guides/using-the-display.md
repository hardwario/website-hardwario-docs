---
title: Using the Display
---

# Using the Display

**FIBER only** — FIBER Lite has no display (see [What's Different](/fiber/fiber-lite/introduction#whats-different)).

This guide covers putting your own content on FIBER's backlit LCD.

:::danger

**Content pending.** The display is **not** a Linux framebuffer — there is no `/dev/fb*` device
and no DRM panel for it. It is wired to **SPI6** (`/dev/spidev6.0`, chip select on GPIO18) and
driven from user space by the FIBER application (`fiber_app`, started by `fiber.service`), which
holds that device open for as long as it runs.

That means a guide cannot simply tell you to write to `/dev/spidev6.0`: doing so while the
application is running produces a corrupted screen at best, and the display carries the device's
alarm state, so taking it over is not a cosmetic decision. This page needs the supported way to
put content on the screen through the FIBER application before the procedure can be written.

:::
