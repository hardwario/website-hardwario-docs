---
slug: first-steps
title: Rychlý průvodce
description: "Rychlý start se zařízením CHESTER: rozbalte ho, vložte SIM a baterii, připojte se aplikací HARDWARIO Manager a odešlete první data do cloudu."
title_meta: "Rychlý průvodce (CHESTER)"
---
import Image from '@theme/IdealImage';

# Rychlý průvodce zařízením CHESTER {#chester-quick-start-guide}

Děkujeme, že jste si vybrali zařízení CHESTER.

Podle následujících kroků zařízení nastavíte a jeho data uvidíte v reálném čase v HARDWARIO Cloud.

Tištěný [**návod k použití CHESTER**](https://www.hardwario.com/cs/resources/manuals/#chester), který je součástí balení (bezpečnost, první spuštění, informace o rádiu, bateriích a likvidaci), si můžete stáhnout i jako PDF v angličtině a češtině.


---

## Krok 1: Vytvořte si účet v HARDWARIO Cloud {#step-1-create-a-hardwario-cloud-account}

1. Přejděte na [**https://hardwario.cloud**](https://hardwario.cloud)  
2. Klikněte na **SIGN UP**  
3. Vytvořte účet pomocí:  
   - účtu **Google** nebo **Microsoft**
   - **e-mailu a hesla** (nezapomeňte e-mail ověřit)  
4. Po ověření se **přihlaste**.

:::info
Pro vyšší bezpečnost doporučujeme ověřování přes **Google** nebo **Microsoft**, protože tito poskytovatelé identity používají ověřené přihlašovací údaje a **pokročilé mechanismy ochrany účtu**.
:::

---

## Krok 2: Vytvořte si prostor {#step-2-create-your-space}

1. V pravém horním rohu klikněte na **SPACES → NEW SPACE**  
2. Pojmenujte svůj prostor (například: `my-home`, `office-sensors`, `warehouse`)  
3. Do tohoto prostoru budete přidávat svá **zařízení CHESTER**.

:::caution
Při vytváření prostoru se prosím řiďte našimi [**konvencemi pojmenování**](/cloud/#naming-conventions).
:::

---

## Krok 3: Přidejte zařízení {#step-3-add-a-device}

1. Vyberte svůj prostor (**Space**)  
2. Přejděte na **DEVICES → +NEW DEVICE**  
3. Zadejte údaje o svém zařízení **CHESTER**, a to jedním z těchto způsobů:

   **Možnost 1: naskenujte QR kód**  
   Funkcí **`⛶ SCAN DEVICE`** v HARDWARIO Cloud **naskenujte QR kód** na zařízení CHESTER. Všechny **údaje** se pak **vyplní automaticky**.  

   **Možnost 2: ručně**  
   Zařízení přidáte ručně vyplněním těchto polí:  
   - **Name**  
   - **HARDWARIO Serial Number (HSN)**  
   - **Claim Token**

:::info
**Claim Token** je pro každé zařízení unikátní. Získáte ho **naskenováním QR kódu** na zařízení jakoukoli čtečkou QR kódů nebo příkazem **`info show`**, když je zařízení připojené přes **J-Link**.
:::


4. Zařízení uložte. CHESTER je teď **zaregistrovaný v cloudu**.

:::tip
**Potřebujete více podrobností?**  
Podrobnější informace o **HARDWARIO Cloud** najdete zde:  
👉 [https://docs.hardwario.com/cloud/](/cloud/)

Nebo se podívejte na náš **videonávod**, jak přidat zařízení CHESTER do cloudu:  
👉 [https://docs.hardwario.com/chester/videos-chester/chester-cloud](/chester/videos-chester/chester-cloud)
:::



---

## Krok 4: Zapněte zařízení CHESTER {#step-4-power-up-your-chester}

:::caution
> **Důležité:** Zařízení přidejte do cloudu **dřív, než ho zapnete.**  
> Jinak může připojení trvat déle (až několik hodin).
:::

- Vložte baterie nebo připojte externí zdroj napájení  
- Počkejte několik minut, než se zařízení připojí k HARDWARIO Cloud. Po úspěšném připojení **blikne zelená LED**  
  *(Chování LED vysvětluje níže [Krok 5: Zkontrolujte stavovou LED](#step-5-check-the-status-led))*  
- U staršího modelu **CHESTER-M** se superkondenzátory počkejte po vložení baterií asi **30 sekund**: kondenzátory se musí nabít, než LED začne blikat.  
- Pokud se zařízení nepřipojí, zkuste jeden z těchto rychlých kroků:

   🔹 **Stiskněte tlačítko čtyřikrát** → zařízení se restartuje  
   🔹 **Vyjměte a znovu vložte baterie**  
   🔹 U modelu **CHESTER-M** (s modrými superkondenzátory):  
     - Podržte tlačítko nebo ho stiskněte **pětkrát**, dokud se nerozsvítí **bílá LED**. Tím se kondenzátory vybijí (trvá to ≈ 30 s)

---

### Režim sítě a řešení problémů s připojením {#network-mode--connectivity-troubleshooting}

Pokud se zařízení stále nedaří připojit k síti (hlavně s vlastní SIM kartou nebo v roamingu):

* **Zkontrolujte režim sítě:** Podle regionu může být potřeba vynutit konkrétní režim, například **NB-IoT** nebo **LTE-M**. Podrobnosti najdete v [**průvodci nastavením SIM karty**](/chester/platform-connectivity/cellular-networks/sim-card-setup).
* **Zkontrolujte APN/PLMN:** Pokud jste mimo Českou republiku nebo používáte SIM jiného operátora než Vodafone, nastavte správně PLMN a APN podle [**průvodce nastavením SIM karty**](/chester/platform-connectivity/cellular-networks/sim-card-setup), případně se podívejte do přehledu [**konfiguračních parametrů**](/chester/platform-connectivity/cellular-networks/configuration-parameters).
* **Veřejná IP pro Cloud v2:** S vlastní SIM kartou musíte kvůli kompatibilitě s Cloud v2 nastavit také [**správné parametry IP a portu**](/chester/firmware-sdk/how-to-lte-v2#ip-and-port).

---


## Krok 5: Zkontrolujte stavovou LED {#step-5-check-the-status-led}

- **Zelené bliknutí každých 5 sekund** → připojeno k HARDWARIO Cloud ✅  
- **Žádné blikání /** [**jiné barvy**](/chester/catalog-applications/common-functionality/#led-behaviour) → stále se připojuje nebo došlo k chybě. Zkontrolujte SIM, pokrytí sítě nebo napájení  

:::info
Podrobnosti o všech barevných stavech LED a jejich významu najdete v [**dokumentaci k chování LED**](/chester/catalog-applications/common-functionality/#led-behaviour).
:::

## Krok 6: Podívejte se na data v cloudu {#step-6-see-your-data-in-the-cloud}

1. V [**HARDWARIO Cloud**](https://hardwario.cloud) otevřete **DEVICES**  
2. Klikněte na **ikonu chatu** u svého zařízení  
3. Uvidíte **zprávy a data v reálném čase** ze zařízení CHESTER 🎉  

---

## Krok 7: Nakonfigurujte zařízení {#step-7-configure-your-device}

Po připojení můžete:

- Použít [**HARDWARIO Manager**](/chester/platform-connectivity/hardwario-manager) (mobilní aplikace přes BLE)
- Použít [**HARDWARIO Monitor**](/chester/platform-connectivity/hardwario-monitor) (J-Link nebo BLE z počítače)
- Použít [**HARDWARIO Terminal**](/chester/platform-connectivity/hardwario-terminal) (prohlížeč Google Chrome přes WebSerial/WebBluetooth)
- Používat [**vzdálený shell**](/cloud/downlink/shell) a dokonce [**bezdrátově aktualizovat firmware**](/cloud/firmware)

---

## Krok 8: Zkontrolujte a aktualizujte firmware zařízení CHESTER {#step-8-check-and-update-chester-firmware}

Vyplatí se ověřit, že v zařízení CHESTER běží **nejnovější verze firmwaru**.

### Kontrola verze firmwaru {#check-firmware-version}
Zkontrolovat ji můžete třemi způsoby:

1. **Pomocí** [**HARDWARIO Manager (mobilní aplikace)**](/chester/platform-connectivity/hardwario-manager)
   - Otevřete aplikaci a připojte se k zařízení CHESTER přes Bluetooth
   - Verze firmwaru se zobrazí automaticky

2. **Pomocí** [**HARDWARIO Monitor (desktopová aplikace)**](/chester/platform-connectivity/hardwario-monitor)
   - Připojte zařízení CHESTER přes J-Link nebo BLE
   - Spusťte příkaz:
     ```bash
     info show
     ```
   - V konzoli uvidíte informace o firmwaru a aplikaci

3. **Pomocí** [**HARDWARIO Terminal (Google Chrome)**](/chester/platform-connectivity/hardwario-terminal)
   - Otevřete Chrome a přejděte na [**terminal.hardwario.com**](https://terminal.hardwario.com)
   - Připojte zařízení CHESTER přes J-Link (WebSerial) nebo BLE (WebBluetooth)
   - Spusťte příkaz:
     ```bash
     info show
     ```
   - V terminálu uvidíte informace o firmwaru a aplikaci

### Stažení nejnovějšího firmwaru {#download-the-latest-firmware}
Nejnovější sestavení firmwaru najdete vždy zde:  
👉 [**Dostupná sestavení aplikačního firmwaru**](/chester/catalog-applications/catalog-applications#application-firmware)

:::info
 Tabulka firmwaru je členěná podle typu zařízení CHESTER, vyberte proto ten, který odpovídá vašemu zařízení.
:::

### Aktualizace firmwaru {#update-firmware}
Pokud je dostupná novější verze, můžete firmware aktualizovat jedním z těchto způsobů:

1. **Aktualizace přes HARDWARIO Manager (mobilní aplikace)**

   - Postupujte podle tohoto podrobného návodu: 👉 [**Aktualizace firmwaru pomocí HARDWARIO Manager**](/chester/platform-connectivity/hardwario-manager#firmware-update)

2. **Aktualizace firmwaru z cloudu (FOTA)**
   - Zařízení CHESTER můžete aktualizovat i **na dálku** přes cloud.
   - Všechny technické podrobnosti najdete zde: 👉 [**dokumentace k aktualizaci firmwaru**](/cloud/firmware/)

3. **Ruční aktualizace přes J-Link**
   - Pokud chcete firmware nahrát ručně, postupujte podle tohoto návodu: 👉 [**Aktualizace aplikace přes J-Link**](/chester/firmware-flashing/application-over-j-link)

---

✅ **Hotovo.**  
Zařízení CHESTER je připojené, nakonfigurované a aktuální a může sbírat data a odesílat je do cloudu.

---

## Krok 9: Prozkoumejte aplikace a integrace {#step-9-explore-applications-and-integrations}

Zařízení CHESTER umí mnohem víc než jen odesílat data.  
Jeho funkce rozšíříte pomocí [**HARDWARIO Applications**](/apps/), tedy hotových modulů a nástrojů, se kterými můžete:

- 📊 **Vizualizovat data** pomocí dashboardů a grafů  
- 🌐 **Integrovat zařízení CHESTER** do existujících **sítí LoRaWAN** nebo jiných systémů IoT  
- ⚙️ **Vytvářet automatizace a analytiku** pro své konkrétní využití  

Všechny aplikace se snadno nasazují a ze zařízení CHESTER udělají kompletní řešení IoT.

:::info
👉 Více informací a dostupné aplikace najdete zde:  
[**https://docs.hardwario.com/apps/**](/apps/)
:::
