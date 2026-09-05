---
slug: sim-card-setup
title: Nastavení SIM karty
description: "Tato kapitola provede zařízení od vybalení až k registrovanému připojení k síti. Postupujte v uvedeném pořadí: nejprve nastavte režim rádia, potom použijte nastavení pro vaši SIM kartu a nakonec ověřte výsledek."
---
import Image from '@theme/IdealImage';

# Nastavení SIM karty {#sim-card-setup}

Tato kapitola provede zařízení od vybalení až k registrovanému připojení k síti. Postupujte v uvedeném pořadí: nejprve nastavte režim rádia, potom použijte nastavení pro vaši SIM kartu a nakonec ověřte výsledek.

Každou změnu konfigurace je nutné potvrdit příkazem `config save`, který nastavení uloží a zařízení restartuje.

---

## Krok 1 - Volba režimu rádia {#step-1---select-the-radio-mode}

Některé katalogové firmwary umí použít buď mobilní síť (NB-IoT/LTE-M), nebo síť LoRaWAN. Po zapnutí takový firmware **neodesílá** žádná data, **LED bliká žlutě** a je potřeba nejprve zvolit režim rádia.

Výchozí stav je, že zařízení **nepoužívá žádné rádio** (režim `none`), takže tento krok je povinný u následujících katalogových aplikací:

- [CHESTER Clime](https://docs.hardwario.com/chester/catalog-applications/chester-clime)
- [CHESTER Control](https://docs.hardwario.com/chester/catalog-applications/chester-control)
- [CHESTER Push](https://docs.hardwario.com/chester/catalog-applications/chester-push)
- [CHESTER Current](https://docs.hardwario.com/chester/catalog-applications/chester-current)
- [CHESTER Scale](https://docs.hardwario.com/chester/catalog-applications/chester-scale)
- [CHESTER Meteo](https://docs.hardwario.com/chester/catalog-applications/chester-meteo)
- [CHESTER Range](https://docs.hardwario.com/chester/catalog-applications/chester-range)

Nastavte parametr `mode` na síť, kterou chcete použít:

```
app config mode lte
```

```
app config mode lrw
```

Použijte `lte` pro síť NB-IoT/LTE-M a `lrw` pro LoRaWAN. Poté změnu potvrďte:

```
config save
```

Zařízení se restartuje a začne používat zvolenou síť.

---

## Krok 2 - Použijte nastavení pro vaši SIM kartu {#step-2---apply-the-settings-for-your-sim-card}

Vyberte sekci odpovídající vaší SIM kartě. Pokud je parametr ponechán **prázdný**, zařízení provede **automatickou konfiguraci** podle dostupného hardwaru a prostředí sítě.

### SIM karta Vodafone {#vodafone-sim-card}

Referenční nastavení LTE pro zařízení CHESTER se SIM kartou **Vodafone**:

```
lte config mode "lte-m,nb-iot"
lte config bands ""
lte config network ""
lte config apn ""
lte config auth "none"
lte config username ""
lte config password ""
lte config addr "192.168.192.4"
```

### SIM karta 1NCE {#1nce-sim-card}

Referenční nastavení LTE pro zařízení CHESTER se SIM kartou **1NCE**:

```
lte config mode "lte-m,nb-iot"
lte config bands ""
lte config network ""
lte config apn "iot.1nce.net"
lte config auth "none"
lte config username ""
lte config password ""
lte config addr "157.245.24.13"
```

### Ostatní SIM karty {#other-sim-cards}

U SIM karty od jiného poskytovatele vyjděte z nastavení níže a nastavte `apn` podle vydavatele vaší SIM karty:

```
lte config antenna "internal"
lte config mode "lte-m,nb-iot"
lte config bands ""
lte config network ""
lte config apn ""
lte config auth "none"
lte config username ""
lte config password ""
lte config addr "157.245.24.13"
lte config modemtrace false
```

| Vydavatel SIM karty    | APN              |
| :--------------------- | :----------------|
| 1NCE                   | iot.1nce.net     |
| Onomondo               | onomondo         |
| Slovak Telekom         | nbiot.telekom.sk |
| Mobily Saudi Arabia    | M2M-NB           |

Pokud váš poskytovatel není v seznamu, zjistěte u něj APN a to, zda je vyžadována autentizace APN. Kapitola [**Požadavky na síť**](network-requirements.md) obsahuje kontrolní seznam, který mu můžete přímo předat.

Nezapomeňte konfiguraci uložit:

```
config save
```

---

## Otestované SIM karty a operátoři {#tested-sim-cards-and-operators}

Níže uvedené kombinace byly ověřeny společností **HARDWARIO** v provozu. Tento seznam se rozšiřuje s uváděním dalších operátorů do provozu. Pokud tu váš operátor není, neznamená to, že zařízení nebude fungovat, jen jsme to sami neověřili.

{/* Growth table: add a row for every newly validated operator / SIM card variant. Keep the Status column honest - only mark a row as verified once it has actually run in the field. */}

| SIM karta / operátor | Pokrytí | Technologie | APN | Poznámky |
| :------------------ | :------- | :--------- | :-- | :---- |
| **Vodafone** (HARDWARIO) | Evropa + roamingoví partneři po celém světě | NB-IoT, LTE-M | `hardwario` | PLMN ID a APN pro jednotlivé země jsou uvedeny v [**Vodafone SIM EU28+2**](vodafone-coverage.md). |
| **1NCE** (HARDWARIO) | Neevropské země | NB-IoT, LTE-M | `iot.1nce.net` | Doporučeno mimo Evropu. |
| **Vodafone United Kingdom** | Velká Británie | NB-IoT | `hardwario` | Roaming do sítě Vodafone UK, PLMN `23415`. |
| **Onomondo** | Více operátorů | NB-IoT, LTE-M | `onomondo` | APN potvrzeno, není potřeba uzamčení pásma ani PLMN. |
| **Slovak Telekom** | Slovensko | NB-IoT | `nbiot.telekom.sk` | |
| **Mobily** | Saúdská Arábie | NB-IoT | `M2M-NB` | |
| **Vodafone Ukraine** | Ukrajina | pouze NB-IoT | *(prázdné)* | Vyžaduje firmware modemu **Nordic nRF9160** verze **v1.3.7**, viz [**Firmware modemu Nordic nRF9160**](../../firmware-flashing/lte-modem-over-j-link.md#nordic-nrf9160-modem-firmware). Jinak použijte nastavení z části [**Ostatní SIM karty**](#other-sim-cards) bez úprav. |

:::note

Roamingoví partneři a sdílené sítě se v čase mění, takže funkční kombinace může přestat fungovat bez jakékoli změny na zařízení. Pokud se dříve funkční nasazení přestane registrovat, proveďte na místě [**sken sítě**](diagnostics.md#list-available-networks) před tím, než začnete měnit konfiguraci.

:::

---

## Krok 3 - Ověřte svá nastavení {#step-3---verify-your-settings}

Zobrazení aktuální konfigurace:

```
lte config show
```

Dotaz na stav registrace LTE:

```
lte state
```

Přečtení IMSI (International Mobile Subscriber Identity) SIM karty. Funguje i tehdy, když zařízení **CHESTER** není připojeno k síti:

```
lte imsi
```

Přečtení ICCID (Integrated Circuit Card Identifier):

```
lte iccid
```

Přečtení IMEI zařízení (International Mobile Equipment Identity):

```
lte imei
```

Pokud se zařízení nedostane do registrovaného stavu, pokračujte kapitolou [**Diagnostika a řešení problémů**](diagnostics.md).
