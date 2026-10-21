---
title: Maintenance
---

# Maintenance (`settings`)

The `settings` command persists and resets stored configuration over the developer shell (see [**Firmware Setup**](firmware-setup.md) for opening the console). A `config` change applies in RAM immediately but is lost on reboot until it is saved.

The resets form a **severity ladder**: each tier keeps a strict subset of the one above it, and every one reboots. For the conceptual view (and the NFC equivalents in HARDWARIO Manager) see the [**reset ladder**](../features.md) on the Firmware Features page.

:::info Firmware v2.0.0
The reset ladder was introduced in firmware v1.4.0. In **STICKER firmware v2.0.0**, `settings factory-reset` also clears the pulse counters and the history, and the factory and vendor resets also clear the P2P pairing. `settings vendor-reset` wipes the claim token and closes the claim window; the owner re-opens it from the app.
:::

---

| Command | What it does |
|---|---|
| `settings save` | Persist staged `config` changes to flash, then reboot. |
| `settings device-reset` | Reset config + alarm rules to defaults; **keeps device identity, the full LoRaWAN provisioning, the pulse counters and the history** (stays provisioned and connected). |
| `settings factory-reset` | Reset config + alarm rules to defaults, including the radio settings and `radio-mode`; keeps device identity, DevEUI and JoinEUI. **Drops the radio session and keys** (the LoRaMac state and the P2P pairing), so the device joins afresh, and **clears the pulse counters and the history**. |
| `settings vendor-reset <new-secret-key>` | Erase storage + history and re-provision to **serial number, nonce counter and vendor token only**: wipes the claim token, DevEUI and JoinEUI and closes the claim window. Requires a new 32-hex-digit `secret_key` in the same call. Refused when the device's `vendor-reset-allow` policy is off. |
| `settings erase` | Full NVS wipe, **including identity and LoRaWAN credentials**. Destructive and shell-only. |

## Reset Tiers in Detail

| | `device-reset` | `factory-reset` | `vendor-reset` | `settings erase` |
|---|---|---|---|---|
| Available over | NFC, shell | NFC, shell | vendor NFC channel, shell | shell |
| Serial number, nonce counter, vendor token | keep | keep | keep | wiped |
| Secret key | keep | keep | replaced (from the command) | wiped |
| Claim token | keep | keep | wiped | wiped |
| Claim window | keep | keep | → `done` | → `active` |
| `vendor-reset-allow` | keep | keep | default | default |
| DevEUI, JoinEUI | keep | keep | wiped | wiped |
| Other radio settings and keys, `radio-mode` (except the link checks) | keep | default | default | default |
| Rest of the configuration (including `radio-link-check-interval` / `-fail-rejoin`), alarm rules | default | default | default | default |
| Pulse counters, history | keep | cleared | cleared | counters wiped, history kept |
| LoRaMac state (DevNonce, frame counters), P2P pairing | keep | wiped | wiped | wiped |

:::caution Destructive tiers
`settings factory-reset` drops the radio keys (forcing a re-join) and clears the counters and history; `settings vendor-reset` erases everything except the serial number, nonce counter and vendor token (and sets a new secret key); `settings erase` returns the unit to a blank state with no identity. None of these can be undone.
:::
