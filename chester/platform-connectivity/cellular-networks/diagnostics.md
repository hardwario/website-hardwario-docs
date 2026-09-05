---
slug: diagnostics
title: Diagnostics and Troubleshooting
---
import Image from '@theme/IdealImage';

# Diagnostics and Troubleshooting

If a device does not reach a registered state, work through this order:

1. Confirm the radio mode is set to `lte`, see [**SIM Card Setup**](sim-card-setup.md).
2. Check the current settings and registration state with `lte config show` and `lte state`.
3. Scan for the networks actually visible at the site, as described below.
4. Compare the result against the [**Network Requirements**](network-requirements.md) checklist and, for Vodafone SIM cards, against the [**Vodafone SIM EU28+2**](vodafone-coverage.md) table.

The network scan is the only method that tells you what is genuinely available at a given location, which makes it the right tool when a documented configuration does not work.

---

## List Available Networks

You can use CHESTER to scan for networks it can see. This is mainly for troubleshooting purposes.
you have to use J-Link RTT connection with [HARDWARIO CLI](../../developer-tools/command-line-tools.md), this doesn't work with a BLE connection.

Open HARDWARIO CLI console by typing `hardwario chester app console`

```
lte config test true
config save

lte test uart enable
lte test wakeup
lte test cmd at\%xsystemmode=1,1,0,0
lte test cmd at+cfun=1
lte test cmd at\%cops=?

<wait for %COPS response>

lte config test false
config save
```

:::warning

Don't forget to disable modem test mode after you get the `%COPS` response so CHESTER can work properly again.

```
lte config test false
config save
```

:::

Response will be in application log during several minutes (e.g. ~3 minutes with usual bandlock for Bands 2, 4, 5, 8, 12, 20, 28) in the form like:

`%COPS: (2,"","","26201",7),(1,"","","26202",7)`

**Output explanation:**

`%COPS: [(<stat>,long alphanumeric <oper>,short alphanumeric <oper>,numeric <oper>[,<AcT>])]`

`<stat>`
- 0: Unknown
- 1: Available
- 2: Current
- 3: Forbidden

`<oper>`
- PLMNID of operator

`<AcT>`
- 7: LTE-M
- 9: NB-IoT

