---
slug: firmware
title: Verze a aktualizace firmwaru
description: Jak zjistit, jaký firmware v zařízení STICKER běží, a jak ho aktualizovat pomocí programátoru J-Link.
---

# Verze a aktualizace firmwaru {#firmware-versions-and-updates}

Tato stránka ukazuje, jak zjistit, jaký firmware v zařízení STICKER běží, a jak ho aktualizovat. Podpora se obvykle nejdřív ptá právě na verzi.

## Jak zjistit verzi firmwaru {#find-the-firmware-version}

- **Uplink Info:** zařízení posílá uplink Info (informace o zařízení) na fPort 85 po každém připojení k síti a pak ve výchozím nastavení každých 24 h. Verzi ukazuje dekódované pole `fw_version`, například `"2.0.0"`.
- **Na vyžádání:** zařaďte na fPort 85 downlink `08032200`, tedy příkaz `get_info`. Zařízení po svém dalším uplinku odpoví uplinkem Info.
- **HARDWARIO Manager:** přečtěte informace o zařízení přes NFC, viz [**Informace o zařízení a klíče LoRaWAN**](/apps/hardwario-manager/sticker/device-info).

## Jak aktualizovat firmware {#update-the-firmware}

Firmware lze aktualizovat jen programátorem J-Link připojeným k programovacím ploškám zařízení. Aktualizace přes rádio ani přes NFC neexistuje, takže každá aktualizace vyžaduje fyzický přístup k zařízení. Nástroje a postup popisuje stránka [**Nastavení firmwaru**](../developer-access/firmware-setup.md).

Nahrání firmwaru bez smazání čipu zachová nastavení, klíče i čítače. Potřebnou historii senzorů si vyčtěte ještě před aktualizací.

:::caution Nikdy nemažte celý čip
Smazání celého čipu (mass erase) odstraní sériové číslo, secret key i klíče LoRaWAN. Aplikace HARDWARIO Manager pak se zařízením už nedokáže komunikovat.
:::

## Soubory vydání {#release-files}

Každé [**vydání na GitHubu**](https://github.com/hardwario/sticker-firmware/releases) obsahuje obrazy firmwaru a soubor s kontrolními součty. Pro nainstalovaná zařízení použijte:

- obraz **release**
- `SHA256SUMS` pro kontrolu stažených souborů příkazem `sha256sum -c SHA256SUMS`
