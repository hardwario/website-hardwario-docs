---
slug: firmware
title: Firmware
description: "Firmware zařízení CHESTER můžete aktualizovat na dálku z cloudu, bezdrátově a bez fyzického přístupu k zařízení."
---

# Aktualizace firmwaru {#firmware-updates}

Firmware zařízení CHESTER můžete aktualizovat na dálku z cloudu, bezdrátově a bez
fyzického přístupu k zařízení. Těmto aktualizacím se také říká **FOTA** (Firmware
Over-The-Air).

## 1. Získejte identifikátor firmwaru {#1-get-the-firmware-identifier}

Většina aktualizací využívá **hotový katalogový firmware**, takže nemusíte nic
sestavovat sami. V dokumentaci zařízení CHESTER otevřete tabulku
[**Katalogové aplikace → Firmware aplikací**](/chester/catalog-applications/catalog-applications#application-firmware),
najděte svou aplikaci a variantu a zkopírujte její **Identifier** (například
`424ab48d4d9a4b3880bd18faefe4ce0c`).

:::info Sestavte si vlastní firmware
Pomocí HARDWARIO CLI si můžete sestavit a nahrát **vlastní** firmware a jeho
identifikátor použít stejným způsobem, viz
[**Sestavení a nasazení**](/chester/firmware-sdk/build-and-deploy) v dokumentaci zařízení CHESTER.
:::

## 2. Naplánujte stažení do zařízení {#2-schedule-the-download-on-the-device}

Otevřete detail zařízení, přepněte na záložku **Firmware** a klikněte na
**+ DOWNLOAD FIRMWARE**.

![Záložka Firmware zařízení s tlačítkem + DOWNLOAD FIRMWARE](../../../../cloud/images/fota-firmware-tab.png)

Vložte **Identifier** firmwaru a klikněte na **ADD**.

![Dialog DOWNLOAD FIRMWARE s polem pro identifikátor firmwaru](../../../../cloud/images/fota-download-dialog.png)

## 3. Zařízení se aktualizuje samo {#3-the-device-updates-itself}

Při dalším startu, odeslání dat nebo dotazu na cloud začne zařízení CHESTER
stahovat nový firmware. Stahování běží **na pozadí asi 30 minut**, takže zařízení
normálně dál měří a odesílá data.

Seznam **Firmware** zobrazuje každé naplánované stažení a jeho **stav** (Scheduled,
Downloading, Swapping, Succeeded, Cancelled):

![Seznam firmwaru se zobrazením každého stažení a jeho stavu](../../../../cloud/images/fota-list.png)

Když záznam otevřete, můžete celou aktualizaci sledovat krok za krokem na časové ose:

![Časová osa aktualizace firmwaru: Scheduled, Downloading, Swapping, Succeeded](../../../../cloud/images/fota-timeline.png)

## Co se děje na zařízení {#what-happens-on-the-device}

Po stažení se nový firmware prohodí mezi externí pamětí SPI flash a interní pamětí
flash mikrokontroléru. Trvá to až dvě minuty a stavová LED přitom bliká zeleně, žlutě
a červeně. Potom se zařízení CHESTER s novým firmwarem znovu připojí k HARDWARIO Cloud,
firmware se ověří jako _healthy_ a zařízení cloudu potvrdí úspěšnou aktualizaci.

:::info Automatický návrat k předchozí verzi
Bootloader MCUboot je chráněný: pokud nový firmware neběží správně, zařízení se
vrátí k předchozí verzi a znovu se připojí se starým firmwarem.
:::
