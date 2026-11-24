---
slug: tools
title: Nástroje
description: "Nástroje pro CHESTER v aplikaci HARDWARIO Manager: aktualizace firmwaru z QR kódu, podle ID nebo ze souboru, restart a obnovení továrního nastavení."
title_meta: "Nástroje (HARDWARIO Manager pro CHESTER)"
---

# Nástroje pro CHESTER {#chester-tools}

**CHESTER → Nástroje** obsahuje tři akce, které pracují přímo se zařízením,
nikoli s jeho konfigurací.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-tools.png" alt="Menu Nástroje zařízení CHESTER s položkami Aktualizace firmwaru, Restartovat zařízení a Tovární nastavení, každá s popisem" width="320" />

| Nástroj | Co dělá |
|---|---|
| [**Aktualizace firmwaru**](./firmware-update.md) | Nahrát nový firmware přes Bluetooth (QR, ID nebo soubor) |
| **Restartovat zařízení** | Restartuje CHESTER (přeruší připojení) |
| **Tovární nastavení** | Obnoví konfiguraci zařízení CHESTER na tovární hodnoty |

Dokud jedna akce běží, ostatní jsou neaktivní: spojení zvládne vždy jen jeden
příkaz.

---

## Restartovat zařízení {#reboot-device}

Restartuje zařízení. Aplikace se nejdřív zeptá:

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-reboot.png" alt="Dialog Restartovat zařízení? s textem, že se CHESTER restartuje a přeruší připojení, s tlačítky Zrušit a Restartovat" width="320" />

Zvolte **Restartovat**. Aplikace to potvrdí hlášením **Příkaz k restartu
odeslán**. CHESTER při restartu přeruší spojení Bluetooth a aplikace na něj
počká a sama se znovu připojí. Průběh sledujete po návratu na obrazovku
**Připojit k CHESTER**: pruh ukazuje **Připojování k CHESTER** se sériovým
číslem, číslo pokusu a odpočet a tlačítkem **Zrušit** čekání ukončíte. První
pokus přijde po 30 sekundách, viz [**Ukládání**](./configuration.md#saving).

Nastavení už uložená v zařízení restart přežijí; co bylo změněné, ale
neuložené, ne.

## Tovární nastavení {#factory-reset}

Obnoví konfiguraci zařízení na tovární hodnoty. Je to nevratná akce, takže se
aplikace nejdřív zeptá: **Obnovit tovární nastavení?** *Všechny hodnoty
konfigurace zařízení CHESTER se vrátí na tovární výchozí. Tuto akci nelze vzít
zpět.* Pokračujte volbou **Obnovit**.

Aplikace to potvrdí hlášením **Příkaz k obnovení odeslán**. Zařízení se
restartuje s výchozí konfigurací a aplikace se k němu znovu připojí stejně jako
po restartu.

:::danger Obnovení továrního nastavení smaže, co jste nastavili
Intervaly, komunikační režim, nastavení LTE a LoRaWAN i vše ostatní
v konfiguraci se vrátí na výchozí hodnoty. Pokud budete konfiguraci ještě
potřebovat, nejdřív si ji vyexportujte. **Sdílet konfiguraci** na obrazovce
[**Konfigurace**](./configuration.md) vypíše celou konfiguraci jako text.
:::

Pokud akce selže, aplikace to ohlásí, místo aby selhala potichu. Původní chybové
hlášení najdete po rozbalení **Technické podrobnosti**, i s tlačítkem pro
zkopírování. Viz [**Řešení problémů**](./troubleshooting.md).
