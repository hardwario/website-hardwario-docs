---
slug: ble-tags
title: Tagy BLE
---

# Přiřazení senzorových tagů BLE {#bind-ble-sensor-tags}

Zařízení CHESTER umí číst externí **senzorové tagy Bluetooth** a odesílat jejich
hodnoty spolu s vlastními. Každý tag zabírá na zařízení jeden **slot**;
přiřazením tagu ke slotu zařízení CHESTER řeknete, aby tag sledovalo.

Otevřete **CHESTER → BLE tags**.

<img src="/img/hw-manager/hw-manager-chester-ble-tags.png" alt="Obrazovka BLE tags se dvěma ze čtyř obsazených slotů, u každého adresa tagu, teplota, napětí a síla signálu" width="320" />

---

## Sloty {#the-slots}

V záhlaví je název zařízení a počet jeho slotů, seznam ukazuje, kolik jich je
obsazených, například *Slots (2 of 4)*.

U každého obsazeného slotu je **adresa Bluetooth** tagu a jeho poslední hodnoty:
teplota, napětí baterie a síla signálu v dBm. Prázdné sloty jsou ve výchozím
stavu skryté; volbou **Show empty** je zobrazíte a můžete vybrat, ke kterému slotu
nový tag přiřadit.

Nabídka **⋮** u slotu se týká jen tohoto slotu. Pomocí ní slot vyprázdníte, když
ho chcete použít pro jiný tag.

---

## Přiřazení tagu {#bind-a-tag}

1. Pod **Nearby** vyhledejte tagy v dosahu pomocí **Tag actions**.
2. Vyberte požadovaný tag a přiřaďte ho ke slotu.
3. Klepněte na **Save to device**.

Do zařízení CHESTER se nic nezapíše, dokud změny neuložíte. Tlačítka **Save to
device** a **Revert changes** jsou neaktivní, dokud skutečně něco nezměníte, takže
už podle nich poznáte, jestli nějaké změny čekají na uložení.

Akcí obnovení v horní liště sloty a jejich aktuální hodnoty ze zařízení znovu
přečtete.

---

## Vyprázdnění slotů {#clear-the-slots}

**Remove all tags** vyprázdní všechny sloty najednou. Stejně jako u jednoho slotu
se změna do zařízení zapíše až po klepnutí na **Save to device**.

---

## Související nastavení {#related-settings}

Skener tagů má vlastní konfiguraci: jestli je zapnutý, jak často a jak dlouho
vyhledává. Najdete ji ve skupině **BLE tags** v
[**Advanced Configuration**](./configuration.md). V shellu jí odpovídají příkazy
`tag config`: `enabled`, `scan-interval`, `scan-duration` a
`slot-0` … `slot-3`. Viz [**Terminál**](./terminal.md).
