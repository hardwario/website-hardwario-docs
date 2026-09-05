---
title: Maintenance
---

# Maintenance (`settings`)

The `settings` command persists and resets stored configuration over the developer shell (see [**Firmware Setup**](firmware-setup.md) for opening the console). A `config` change applies in RAM immediately but is lost on reboot until it is saved.

The resets form a **severity ladder**: each tier keeps a strict subset of the one above it, and every one reboots. For the conceptual view (and the NFC equivalents in HARDWARIO Manager) see the [**reset ladder**](../features.md) on the Firmware Features page.

:::info Firmware v1.4.0
The reset ladder below is **new in the upcoming STICKER firmware v1.4.0** (#299). On v1.3.x there is a single `settings reset` alongside `settings save`; v1.4.0 splits resets into `device-reset` / `factory-reset` / `vendor-reset` and adds `settings erase`. The old `settings reset` becomes **`settings device-reset`** (same behaviour).
:::

---

| Command | What it does |
|---|---|
| `settings save` | Persist staged `config` changes to flash, then reboot. |
| `settings device-reset` | Reset config + alarm rules to defaults; **keeps device identity and the full LoRaWAN provisioning** (stays provisioned and connected). |
| `settings factory-reset` | Reset config + alarm rules to defaults; keeps device identity only and **drops the LoRaWAN session/keys**, so the device re-joins the network. |
| `settings vendor-reset <new-secret-key>` | Erase storage + history and re-provision to **serial number + vendor token only**; requires a new 32-hex-digit `secret_key` in the same call. Refused when the device's `vendor-reset-allow` policy is off. |
| `settings erase` | Full NVS wipe, **including identity and LoRaWAN credentials**. Destructive and shell-only. |

:::caution Destructive tiers
`settings factory-reset` drops the LoRaWAN keys (forcing a re-join); `settings vendor-reset` erases everything except the serial number and vendor token (and sets a new secret key); `settings erase` returns the unit to a blank state with no identity. None of these can be undone.
:::
