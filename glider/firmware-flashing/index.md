---
slug: firmware-flashing
title: Firmware Flashing
description: "How to update GLIDER firmware: the two supported methods and what each one needs."
title_meta: "Firmware Flashing (GLIDER)"
---
import Image from '@theme/IdealImage';

# Firmware Flashing

GLIDER firmware can be updated in two ways:

- [**Over USB-C**](application-over-at.md): no debug probe required. Recommended for production units and field updates.
- [**Over J-Link (SWD)**](application-over-j-link.md): requires a J-Link probe. Used during firmware development.

Both methods end with the same result: a new application image running on the nRF9151. Pick the path that matches what hardware you have on hand.
