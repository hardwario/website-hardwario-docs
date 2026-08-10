---
slug: /sdk-v4-migration-guide
title: SDK v4.0.0 Migration Guide
---

# CHESTER SDK v4.0.0 migration guide

CHESTER SDK **v4.0.0** bumps the underlying nRF Connect SDK from **v2.9** to **v3.4** (Zephyr 4.x, Zephyr SDK 1.0.1). This is a **breaking** release: the Python toolchain, the Zephyr SDK, and — for out-of-tree applications — the build system (sysbuild + DTS partitioning) all change.

> Start from a **v3.5.5** workspace (the last NCS v2.9 release). Confirm it builds, then apply this guide. Don't jump an older workspace straight to v4.0.0.

## 0. Update the workspace

First update your `west.yml` to track CHESTER SDK v4.0.0:

```yaml
  - name: chester
    remote: hardwario
    repo-path: chester-sdk
    revision: v4.0.0 # <-- Change here
    import: true
```

Then update the workspace and install the required toolchains:

```bash
# Pull updated CHESTER SDK + all modules
west update

# Update/install required python packages
west packages pip --install -- -U

# Export the Zephyr CMake package
west zephyr-export

# Install the required version of Zephyr SDK
west sdk install -t arm-zephyr-eabi
```

Delete any existing `build` directory and rebuild from scratch — sysbuild changes the build layout, so an incremental build on top of an NCS v2.9 tree will not work.

> **If you only build the applications shipped with the SDK, you are done here.** The catalog applications were already migrated as part of v4.0.0. The rest of this guide applies to **maintainers of out-of-tree applications**.

## 1. Migrate to sysbuild + DTS partitions

NCS v3.4 builds with **sysbuild**, and the CHESTER board now defines its flash layout in the **device tree** instead of Nordic's Partition Manager (PM). PM is disabled for the board, so `pm_static.yml` and `child_image/` are no longer read.

**Every out-of-tree app must be converted.** All catalog apps were migrated in one commit, which can be used as a reference: [ef27da1e applications: Migrate to sysbuild + DTS partitions](https://github.com/hardwario/chester-sdk/commit/ef27da1e).

The per-app delta:

| Action                | Path                                  | Content |
|-----------------------|---------------------------------------|---------|
| **Add**               | `sysbuild.conf`                       | `SB_CONFIG_BOOTLOADER_MCUBOOT=y` / `SB_CONFIG_MCUBOOT_MODE_SWAP_SCRATCH=y` / `SB_CONFIG_MERGED_HEX_FILES=y` |
| **Move**              | `child_image/mcuboot.conf` → `sysbuild/mcuboot.conf` | add `CONFIG_BOOT_MAX_IMG_SECTORS_AUTO=n` (new, required) |
| **Delete**            | `child_image/` (whole dir)            | incl. `child_image/mcuboot/boards/chester_nrf52840.overlay` |
| **Delete**            | `pm_static.yml`                       | no longer read |
| **Edit** `app.overlay`| remove PM external-flash plumbing     | drop the `nordic,pm-ext-flash` chosen node and the manual `littlefs_storage` partition on `&spi_flash0` — now from board DTS |
| **Edit** `prj.conf`   | remove PM Kconfig                     | `CONFIG_PM_OVERRIDE_EXTERNAL_DRIVER_CHECK` / `CONFIG_PM_PARTITION_REGION_LITTLEFS_EXTERNAL` |

The board's default DTS layout (`boards/hardwario/chester/chester_nrf52840.dts`) matches the old PM map, so a normal firmware update keeps existing devices' data.

**Non-standard layouts:** if your deployed devices used a *different* partition map, an OTA would move partitions and lose stored data. Reproduce the old map by redefining the partition nodes in `app.overlay` (the app overlay wins over the board DTS). See `applications/control` for the pattern — it pins `littlefs-storage` to its historical 24 KB size. Background: Nordic's [Migrating to sysbuild](https://nrfconnectdocs.nordicsemi.com/ncs/latest/nrf/releases_and_maturity/migration/migration_sysbuild.html#partition_manager).

## 2. Remaining source & Kconfig changes

### 2a. Remove stale Kconfig (grep the whole app tree, not just `prj.conf`)

TinyCrypt was removed in NCS 3.0; the BLE host uses PSA Crypto now.

```diff
-CONFIG_TINYCRYPT=y
-CONFIG_TINYCRYPT_SHA256=y
-CONFIG_ADC_TLA2021_INIT_PRIORITY=60
```

For generator-based apps, remove the `subsystem-tinycrypt*` features / `extras:` lines from `project.yaml` and regenerate — **or** delete the three lines from `prj.conf` by hand (not both). Apps that only use `CONFIG_CTR_CLOUD` / `CONFIG_CTR_BLE` get the PSA migration for free.

### 2b. Conditional — apply only if the feature is used

| If you…                                        | Change |
|------------------------------------------------|--------|
| drive the on-board **PWM/RGB LED** (`ctr_led`) | board ships `pwm_leds` disabled — re-enable it in `app.overlay` and set `zephyr,user { ctr_leds = <&gpio_leds>, <&pwm_leds>; }` (see `samples/ctr_led`) |
| include **TinyCrypt** in `src/*.c`             | unused `#include <tinycrypt/...>` → delete; real hashing → PSA Crypto (`<psa/crypto.h>`, `CONFIG_NRF_SECURITY=y`, `CONFIG_PSA_WANT_ALG_SHA_256=y`) |
| init a **UART/Modbus** `struct uart_config`    | `.stop_bits_client` → `.stop_bits` |
| use the **OPT3001** light sensor               | `CONFIG_OPT3001=y` → `CONFIG_OPT300X=y` |
| hardcode the **TLA2024** compatible            | `ti,tla2024` → `hardwario,tla2024` (battery `ti,tla2021` unchanged) |
| write **raw BLE / low-level** code             | `BT_LE_ADV_OPT_CONNECTABLE`→`BT_LE_ADV_OPT_CONN`; drop `USE_NAME`/`FORCE_NAME_IN_AD` (add `BT_DATA_NAME_COMPLETE`); removed: `CONFIG_BT_FIXED_PASSKEY`, `CONFIG_BT_CTLR`, `CONFIG_BT_TINYCRYPT_ECC`; raise `CONFIG_BT_BUF_EVT_RX_COUNT` if lowered; `shell_set_bypass()` cb gained `void *user_data`; `#include <nrf52840.h>` → `#include <soc.h>` |

Apps that touch these only through CHESTER subsystem APIs (`ctr_cloud`, `ctr_radon`, …) need no change — the fix is internal to the SDK.

## Checklist

- [ ] Start from a working **v3.5.5** (NCS v2.9) app
- [ ] Update `west.yml` to track **v4.0.0**
- [ ] `west update` → `west zephyr-export` → `west sdk install -t arm-zephyr-eabi` → `west packages pip --install -- -U`
- [ ] `rm -rf build` and rebuild clean
- [ ] **(out-of-tree apps)** add `sysbuild.conf`; move mcuboot conf + add `CONFIG_BOOT_MAX_IMG_SECTORS_AUTO=n`; delete `child_image/` and `pm_static.yml`; strip PM plumbing from `app.overlay`/`prj.conf` (ref commit `ef27da1e`)
- [ ] **(non-standard layout)** reproduce old partition map in `app.overlay`
- [ ] Remove `CONFIG_TINYCRYPT*` / `CONFIG_ADC_TLA2021_INIT_PRIORITY`
- [ ] Apply any 2b changes that touch your app
- [ ] Verify partition map / OTA compatibility before deploying
