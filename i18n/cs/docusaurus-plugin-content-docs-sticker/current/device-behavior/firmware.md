---
slug: firmware
title: Verze a aktualizace firmwaru
description: Jak zjistit, jaký firmware v zařízení STICKER běží, a jak ho aktualizovat pomocí sondy J-Link.
---

# Verze a aktualizace firmwaru {#firmware-versions-and-updates}

Tato stránka ukazuje, jak zjistit, jaký firmware v zařízení STICKER běží, a jak ho aktualizovat. Podpora se obvykle nejdřív ptá právě na verzi.

## Jak zjistit verzi firmwaru {#find-the-firmware-version}

- **Uplink Info:** zařízení posílá uplink Info (informace o zařízení) na fPort 85 po každém připojení k síti a pak ve výchozím nastavení každých 24 h. Verzi ukazuje dekódované pole `fw_version`, například `"2.0.0"`.
- **Na vyžádání:** zařaďte na fPort 85 downlink `08032200`, tedy příkaz `get_info`. Zařízení po svém dalším uplinku odpoví uplinkem Info.
- **HARDWARIO Manager:** přečtěte informace o zařízení přes NFC, viz [**Informace o zařízení a klíče LoRaWAN**](/apps/hardwario-manager/sticker/device-info).

V nainstalovaném zařízení má běžet obraz release. Poznáte ho podle uplinku Info, který pak ukazuje `build_type_name` `main` a `debug` `false`. Obraz debug kvůli shellu nenechá procesor usnout, a tím vybíjí baterie.

## Jak aktualizovat firmware {#update-the-firmware}

Firmware lze aktualizovat jen ladicí sondou J-Link připojenou k programovacím ploškám zařízení (SWD). Aktualizace přes rádio ani přes NFC neexistuje, takže každá aktualizace vyžaduje fyzický přístup k zařízení. Nástroje a postup popisuje stránka [**Nastavení firmwaru**](../developer-access/firmware-setup.md).

Nahrání firmwaru bez smazání čipu zachová nastavení, klíče i čítače. Obraz debug nebo provisioning přepíše uloženou historii senzorů, proto si potřebnou historii vyčtěte ještě před nahráním.

:::caution Nikdy nemažte celý čip
Smazání celého čipu (mass erase) odstraní sériové číslo, secret key i klíče LoRaWAN. Aplikace HARDWARIO Manager pak se zařízením už nedokáže komunikovat.
:::

## Soubory vydání {#release-files}

Každé [**vydání na GitHubu**](https://github.com/hardwario/sticker-firmware/releases) obsahuje tři obrazy firmwaru a soubor s kontrolními součty:

- obraz **release** pro nainstalovaná zařízení
- obraz **debug** se shellem pro diagnostiku
- obraz **provisioning** pro výrobu
- `SHA256SUMS` pro kontrolu stažených souborů příkazem `sha256sum -c SHA256SUMS`
