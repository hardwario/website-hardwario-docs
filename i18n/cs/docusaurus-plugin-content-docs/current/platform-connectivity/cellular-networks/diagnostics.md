---
slug: diagnostics
title: Diagnostika a řešení problémů
---
import Image from '@theme/IdealImage';

# Diagnostika a řešení problémů {#diagnostics-and-troubleshooting}

Pokud se zařízení nezaregistruje do sítě, postupujte v tomto pořadí:

1. Zkontrolujte, že je režim rádia nastavený na `lte`, viz [**Nastavení SIM karty**](sim-card-setup.md).
2. Ověřte aktuální nastavení a stav registrace příkazy `lte config show` a `lte state`.
3. Postupem popsaným níže zjistěte, které sítě jsou v místě skutečně viditelné.
4. Porovnejte výsledek s kontrolním seznamem [**Požadavky na síť**](network-requirements.md) a u SIM karet Vodafone s tabulkou [**Vodafone SIM EU28+2**](vodafone-coverage.md).

Jen skenování sítí ukáže, co je na daném místě skutečně dostupné. Proto je to ten správný nástroj, když zdokumentovaná konfigurace nefunguje.

---

## Výpis dostupných sítí {#list-available-networks}

Zařízení CHESTER umí vyhledat sítě, které vidí; slouží to hlavně k řešení problémů.
Potřebujete k tomu spojení J-Link RTT s [HARDWARIO CLI](../../developer-tools/command-line-tools.md), přes BLE to nefunguje.

Konzoli HARDWARIO CLI otevřete příkazem `hardwario chester app console`.

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

Jakmile dostanete odpověď `%COPS`, nezapomeňte vypnout testovací režim modemu, jinak zařízení CHESTER nebude správně fungovat.

```
lte config test false
config save
```

:::

Odpověď se v logu aplikace objeví za několik minut (např. asi za 3 minuty při běžném omezení na pásma 2, 4, 5, 8, 12, 20, 28) v tomto tvaru:

`%COPS: (2,"","","26201",7),(1,"","","26202",7)`

**Vysvětlení výstupu:**

`%COPS: [(<stat>,long alphanumeric <oper>,short alphanumeric <oper>,numeric <oper>[,<AcT>])]`

`<stat>`
- 0: Neznámý
- 1: Dostupný
- 2: Aktuální
- 3: Zakázaný

`<oper>`
- PLMNID operátora

`<AcT>`
- 7: LTE-M
- 9: NB-IoT
