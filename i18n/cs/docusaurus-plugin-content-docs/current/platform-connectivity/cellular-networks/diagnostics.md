---
slug: diagnostics
title: Diagnostika a řešení problémů
description: "Pokud se zařízení nedostane do registrovaného stavu, postupujte v tomto pořadí:"
---
import Image from '@theme/IdealImage';

# Diagnostika a řešení problémů {#diagnostics-and-troubleshooting}

Pokud se zařízení nedostane do registrovaného stavu, postupujte v tomto pořadí:

1. Zkontrolujte, že je režim rádia nastaven na `lte` — viz [**Nastavení SIM karty**](sim-card-setup.md).
2. Ověřte aktuální nastavení a stav registrace pomocí `lte config show` a `lte state`.
3. Proskenujte sítě, které jsou na daném místě skutečně viditelné, jak je popsáno níže.
4. Porovnejte výsledek s kontrolním seznamem [**Požadavky na síť**](network-requirements.md) a u SIM karet Vodafone s tabulkou [**Vodafone SIM EU28+2**](vodafone-coverage.md).

Skenování sítě je jediná metoda, která vám řekne, co je na daném místě skutečně dostupné, a proto je to správný nástroj ve chvíli, kdy dokumentovaná konfigurace nefunguje.

---

## Výpis dostupných sítí {#list-available-networks}

Zařízení CHESTER můžete použít ke skenování sítí, které vidí. To slouží především k řešení problémů.
musíte použít spojení J-Link RTT s [HARDWARIO CLI](../../developer-tools/command-line-tools.md), přes BLE připojení to nefunguje.

Otevřete konzoli HARDWARIO CLI zadáním `hardwario chester app console`

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

Nezapomeňte po získání odpovědi `%COPS` vypnout testovací režim modemu, aby zařízení CHESTER mohlo opět správně fungovat.

```
lte config test false
config save
```

:::

Odpověď se objeví v logu aplikace během několika minut (např. ~3 minuty při běžném bandlocku pro Bands 2, 4, 5, 8, 12, 20, 28) ve tvaru:

`%COPS: (2,"","","26201",7),(1,"","","26202",7)`

**Vysvětlení výstupu:**

`%COPS: [(<stat>,long alphanumeric <oper>,short alphanumeric <oper>,numeric <oper>[,<AcT>])]`

`<stat>`
- 0 – Neznámý
- 1 – Dostupný
- 2 – Aktuální
- 3 – Zakázaný

`<oper>`
- PLMNID operátora

`<AcT>`
- 7 – LTE-M
- 9 – NB-IoT
