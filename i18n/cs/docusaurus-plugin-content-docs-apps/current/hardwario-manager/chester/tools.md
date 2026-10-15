---
slug: tools
title: Nástroje
title_meta: "Nástroje (HARDWARIO Manager pro CHESTER)"
---

# Nástroje pro CHESTER {#chester-tools}

**CHESTER → Tools** obsahuje tři akce, které pracují se samotným zařízením, ne
s jeho konfigurací.

<img src="/img/hw-manager/hw-manager-chester-tools.png" alt="Menu CHESTER Tools se položkami Firmware update, Reboot device a Factory reset" width="320" />

| Nástroj | Co dělá |
|---|---|
| [**Firmware update**](./firmware-update.md) | Nahraje nový firmware přes Bluetooth podle QR kódu, ID firmwaru nebo ze souboru |
| **Reboot device** | Restartuje zařízení CHESTER. Až naběhne, aplikace se znovu připojí |
| **Factory reset** | Obnoví výchozí konfiguraci zařízení CHESTER z výroby |

---

## Reboot device {#reboot-device}

Restartuje zařízení. Zařízení CHESTER při restartu přeruší spojení Bluetooth,
proto aplikace restart počká a pak se k zařízení znovu připojí podle sériového
čísla, s pokusy v prodlužujících se intervalech (od 30 sekund do 4 minut). Pokusy
hlásí pruh s tlačítkem **Cancel**. Nastavení uložená v zařízení restart vydrží,
neuložené změny se ztratí.

Zařízení restartuje i **Factory reset** a aplikace se pak znovu připojí stejně.

## Factory reset {#factory-reset}

Obnoví výchozí konfiguraci zařízení z výroby. Tato akce je nevratná, proto ji
aplikace před spuštěním nechá potvrdit.

:::danger Factory reset smaže, co jste nastavili
Intervaly, komunikační režim, nastavení LTE i LoRaWAN a sloty s přiřazenými tagy
BLE se vrátí na výchozí hodnoty. Pokud byste konfiguraci mohli ještě
potřebovat, nejdřív ji vyexportujte. **Share configuration** na obrazovce
[**Konfigurace**](./configuration.md) ji celou vypíše jako příkazy shellu, které
lze později vložit zpět.
:::

Pokud akce selže, aplikace to vždy oznámí a pod volbou **Details** zobrazí
původní chybu. Viz [**Řešení problémů**](./troubleshooting.md).
