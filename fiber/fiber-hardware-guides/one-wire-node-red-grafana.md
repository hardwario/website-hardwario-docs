---
title: Reading 1-Wire Sensors into Grafana
---

# Reading 1-Wire Sensors into Grafana

**FIBER only** — FIBER Lite has no 1-Wire hub (see [What's Different](/fiber/fiber-lite/introduction#whats-different)).

This guide covers reading FIBER's 8 independent 1-Wire ports via the Linux `w1-gpio` kernel
driver, feeding the readings through Node-RED, storing them in InfluxDB, and visualizing them in
Grafana — on top of the shared stack from [Installation](/fiber/installation).

:::danger

**Content pending.** This page needs FIBER's exact 1-Wire GPIO pin (for the `w1-gpio`
devicetree overlay, the same pattern as the RTC overlay in
[Configure Hardware](/fiber/installation/configure-hardware)) before the real procedure can be
written.

:::
