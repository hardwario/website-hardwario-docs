---
slug: ble-tags
title: BLE tagy
description: "Zařízení CHESTER umí číst externí Bluetooth senzorové tagy a hlásit jejich"
---

# Navázání senzorových BLE tagů {#bind-ble-sensor-tags}

Zařízení CHESTER umí číst externí **Bluetooth senzorové tagy** a hlásit jejich
hodnoty spolu s vlastními. Každý tag zabírá na zařízení jeden **slot**; navázáním
tagu do slotu říkáte zařízení CHESTER, aby ho vyhledávalo.

Otevřete **CHESTER → BLE tags**.

<img src="/img/hw-manager/hw-manager-chester-ble-tags.png" alt="Obrazovka BLE tags se dvěma ze čtyř obsazených slotů, u každého adresa tagu, teplota, napětí a síla signálu" width="320" />

---

## Sloty {#the-slots}

Záhlaví uvádí název zařízení a počet jeho slotů a seznam zobrazuje, kolik jich je
využitých — například *Slots (2 of 4)*.

Každý obsazený slot zobrazuje **Bluetooth adresu** tagu a jeho poslední hodnoty:
teplotu, napětí baterie a sílu signálu v dBm. Prázdné sloty jsou ve výchozím
stavu skryté; **Show empty** je odkryje, takže si můžete vybrat, kam nový tag
patří.

Menu **⋮** u slotu působí jen na daný slot — použijte ho, když chcete slot
vyprázdnit pro další použití.

---

## Navázání tagu {#bind-a-tag}

1. Pod **Nearby** vyhledejte tagy v dosahu pomocí **Tag actions**.
2. Vyberte požadovaný tag a navažte ho do slotu.
3. Klepněte na **Save to device**.

Do zařízení CHESTER se nic nedostane, dokud neuložíte — **Save to device** a
**Revert changes** zůstávají neaktivní, dokud něco skutečně nezměníte, takže samotná
tlačítka vám řeknou, jestli něco čeká.

Akcí obnovení v horní liště sloty a jejich aktuální hodnoty ze zařízení znovu
přečtete.

---

## Vyprázdnění slotů {#clear-the-slots}

**Remove all tags** vyprázdní všechny sloty naráz. Stejně jako u jednoho slotu je
změna připravená, dokud nedáte **Save to device**.

---

## Související nastavení {#related-settings}

Skener tagů má vlastní konfiguraci — jestli je zapnutý, jak často a jak dlouho
skenuje. Ta je ve skupině **BLE tags** v
[**pokročilé konfiguraci**](./configuration.md), a v shellu jsou to příkazy
`tag config`: `enabled`, `scan-interval`, `scan-duration` a
`slot-0` … `slot-3`. Viz [**Terminál**](./terminal.md).
