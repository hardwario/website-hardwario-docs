---
slug: /sdk-v4-migration-guide
title: Průvodce migrací na SDK v4.0.0
description: "CHESTER SDK v4.0.0 zvyšuje verzi použitého nRF Connect SDK z v2.9 na v3.4 (Zephyr 4.x, Zephyr SDK 1.0.1). Jde o vydání se zpětně nekompatibilními změnami: mění se Python toolchain, Zephyr SDK a — u aplikací mimo repozitář SDK — také build systém…"
---

# Průvodce migrací na CHESTER SDK v4.0.0 {#chester-sdk-v400-migration-guide}

CHESTER SDK **v4.0.0** zvyšuje verzi použitého nRF Connect SDK z **v2.9** na **v3.4** (Zephyr 4.x, Zephyr SDK 1.0.1). Jde o vydání se **zpětně nekompatibilními změnami**: mění se Python toolchain, Zephyr SDK a — u aplikací mimo repozitář SDK — také build systém (sysbuild + rozdělení oddílů pomocí DTS).

> Začněte z workspace ve verzi **v3.5.5** (poslední vydání s NCS v2.9). Ověřte, že se sestaví, a teprve pak postupujte podle tohoto průvodce. Nepřecházejte ze starší workspace přímo na v4.0.0.

## 0. Aktualizace workspace {#0-update-the-workspace}

Nejprve aktualizujte `west.yml`, aby ukazoval na CHESTER SDK v4.0.0:

```yaml
  - name: chester
    remote: hardwario
    repo-path: chester-sdk
    revision: v4.0.0 # <-- Change here
    import: true
```

Poté aktualizujte workspace a nainstalujte potřebné toolchainy:

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

Smažte případný existující adresář `build` a sestavte projekt od začátku — sysbuild mění rozvržení sestavení, takže inkrementální build nad stromem s NCS v2.9 nebude funkční.

> **Pokud sestavujete pouze aplikace dodávané se SDK, tímto jste hotovi.** Katalogové aplikace už byly migrovány v rámci v4.0.0. Zbytek tohoto průvodce se týká **správců aplikací mimo repozitář SDK**.

## 1. Migrace na sysbuild + oddíly v DTS {#1-migrate-to-sysbuild--dts-partitions}

NCS v3.4 sestavuje pomocí **sysbuild** a deska CHESTER nyní definuje rozvržení flash paměti v **device tree** místo Nordic Partition Manageru (PM). PM je pro tuto desku vypnutý, takže se `pm_static.yml` ani `child_image/` už nečtou.

**Každou aplikaci mimo repozitář SDK je nutné převést.** Všechny katalogové aplikace byly migrovány v jednom commitu, který lze použít jako referenci: [ef27da1e applications: Migrate to sysbuild + DTS partitions](https://github.com/hardwario/chester-sdk/commit/ef27da1e).

Rozdíl pro jednotlivé aplikace:

| Akce                  | Cesta                                 | Obsah |
|-----------------------|---------------------------------------|---------|
| **Přidat**            | `sysbuild.conf`                       | `SB_CONFIG_BOOTLOADER_MCUBOOT=y` / `SB_CONFIG_MCUBOOT_MODE_SWAP_SCRATCH=y` / `SB_CONFIG_MERGED_HEX_FILES=y` |
| **Přesunout**         | `child_image/mcuboot.conf` → `sysbuild/mcuboot.conf` | přidat `CONFIG_BOOT_MAX_IMG_SECTORS_AUTO=n` (nové, povinné) |
| **Smazat**            | `child_image/` (celý adresář)         | včetně `child_image/mcuboot/boards/chester_nrf52840.overlay` |
| **Smazat**            | `pm_static.yml`                       | už se nečte |
| **Upravit** `app.overlay`| odstranit napojení PM na externí flash | vypustit chosen node `nordic,pm-ext-flash` a ruční oddíl `littlefs_storage` na `&spi_flash0` — nyní přichází z DTS desky |
| **Upravit** `prj.conf`| odstranit Kconfig pro PM              | `CONFIG_PM_OVERRIDE_EXTERNAL_DRIVER_CHECK` / `CONFIG_PM_PARTITION_REGION_LITTLEFS_EXTERNAL` |

Výchozí rozvržení v DTS desky (`boards/hardwario/chester/chester_nrf52840.dts`) odpovídá staré mapě PM, takže běžná aktualizace firmwaru zachová data na existujících zařízeních.

**Nestandardní rozvržení:** pokud vaše nasazená zařízení používala *jinou* mapu oddílů, OTA by oddíly přesunula a uložená data by se ztratila. Starou mapu reprodukujte tím, že v `app.overlay` znovu definujete uzly oddílů (overlay aplikace má přednost před DTS desky). Vzor najdete v `applications/control` — fixuje `littlefs-storage` na historickou velikost 24 KB. Souvislosti: [Migrating to sysbuild](https://nrfconnectdocs.nordicsemi.com/ncs/latest/nrf/releases_and_maturity/migration/migration_sysbuild.html#partition_manager) od Nordicu.

## 2. Zbývající změny ve zdrojových kódech a Kconfigu {#2-remaining-source--kconfig-changes}

### 2a. Odstraňte zastaralý Kconfig (prohledejte celý strom aplikace, ne jen `prj.conf`) {#2a-remove-stale-kconfig-grep-the-whole-app-tree-not-just-prjconf}

TinyCrypt byl v NCS 3.0 odstraněn; BLE host nyní používá PSA Crypto.

```diff
-CONFIG_TINYCRYPT=y
-CONFIG_TINYCRYPT_SHA256=y
-CONFIG_ADC_TLA2021_INIT_PRIORITY=60
```

U aplikací založených na generátoru odstraňte z `project.yaml` funkce `subsystem-tinycrypt*` / řádky `extras:` a znovu vygenerujte projekt — **nebo** smažte ony tři řádky z `prj.conf` ručně (ne obojí). Aplikace, které používají pouze `CONFIG_CTR_CLOUD` / `CONFIG_CTR_BLE`, získají migraci na PSA automaticky.

### 2b. Podmíněné — proveďte pouze tehdy, pokud danou funkci používáte {#2b-conditional--apply-only-if-the-feature-is-used}

| Pokud…                                         | Změna |
|------------------------------------------------|--------|
| ovládáte integrovanou **PWM/RGB LED** (`ctr_led`) | deska má `pwm_leds` vypnuté — znovu je zapněte v `app.overlay` a nastavte `zephyr,user { ctr_leds = <&gpio_leds>, <&pwm_leds>; }` (viz `samples/ctr_led`) |
| vkládáte **TinyCrypt** v `src/*.c`             | nepoužívané `#include <tinycrypt/...>` → smazat; skutečné hashování → PSA Crypto (`<psa/crypto.h>`, `CONFIG_NRF_SECURITY=y`, `CONFIG_PSA_WANT_ALG_SHA_256=y`) |
| inicializujete **UART/Modbus** `struct uart_config` | `.stop_bits_client` → `.stop_bits` |
| používáte světelný senzor **OPT3001**          | `CONFIG_OPT3001=y` → `CONFIG_OPT300X=y` |
| máte pevně zapsaný compatible pro **TLA2024**  | `ti,tla2024` → `hardwario,tla2024` (bateriový `ti,tla2021` bez změny) |
| píšete **surový BLE / nízkoúrovňový** kód      | `BT_LE_ADV_OPT_CONNECTABLE`→`BT_LE_ADV_OPT_CONN`; vypustit `USE_NAME`/`FORCE_NAME_IN_AD` (přidat `BT_DATA_NAME_COMPLETE`); odstraněno: `CONFIG_BT_FIXED_PASSKEY`, `CONFIG_BT_CTLR`, `CONFIG_BT_TINYCRYPT_ECC`; zvyšte `CONFIG_BT_BUF_EVT_RX_COUNT`, pokud jste ho snižovali; callback `shell_set_bypass()` získal `void *user_data`; `#include <nrf52840.h>` → `#include <soc.h>` |

Aplikace, které se těchto věcí dotýkají pouze přes API subsystémů CHESTER (`ctr_cloud`, `ctr_radon`, …), nepotřebují žádnou změnu — oprava je uvnitř SDK.

## Kontrolní seznam {#checklist}

- [ ] Začněte z funkční aplikace ve verzi **v3.5.5** (NCS v2.9)
- [ ] Aktualizujte `west.yml` na **v4.0.0**
- [ ] `west update` → `west zephyr-export` → `west sdk install -t arm-zephyr-eabi` → `west packages pip --install -- -U`
- [ ] `rm -rf build` a čisté sestavení
- [ ] **(aplikace mimo repozitář SDK)** přidejte `sysbuild.conf`; přesuňte konfiguraci mcuboot + přidejte `CONFIG_BOOT_MAX_IMG_SECTORS_AUTO=n`; smažte `child_image/` a `pm_static.yml`; odstraňte napojení PM z `app.overlay`/`prj.conf` (referenční commit `ef27da1e`)
- [ ] **(nestandardní rozvržení)** reprodukujte starou mapu oddílů v `app.overlay`
- [ ] Odstraňte `CONFIG_TINYCRYPT*` / `CONFIG_ADC_TLA2021_INIT_PRIORITY`
- [ ] Proveďte změny z bodu 2b, které se vaší aplikace týkají
- [ ] Před nasazením ověřte mapu oddílů / kompatibilitu OTA
