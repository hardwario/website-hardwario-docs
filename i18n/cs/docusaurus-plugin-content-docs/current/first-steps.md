---
slug: first-steps
title: Rychlý průvodce
description: "Děkujeme, že jste si vybrali zařízení CHESTER."
---
import Image from '@theme/IdealImage';

# Rychlý průvodce pro CHESTER {#chester-quick-start-guide}

Děkujeme, že jste si vybrali zařízení CHESTER.

Následujícími kroky ho nastavíte a začnete si zobrazovat živá data v HARDWARIO Cloud.

Podrobnější informace najdete také v [**manuálu CHESTER (EN/CZ)**](https://drive.google.com/drive/folders/1pFwF87Mc1c_9w0otSzTuk2yR6CwalqVB?usp=drive_link), který si můžete stáhnout ve formátu PDF.


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

## Krok 2: Vytvořte si Space {#step-2-create-your-space}

1. V pravém horním rohu klikněte na **SPACES → NEW SPACE**  
2. Pojmenujte svůj space (například: `my-home`, `office-sensors`, `warehouse`)  
3. Zde budou žít vaše **zařízení CHESTER**.

:::caution
Při vytváření space se prosím řiďte našimi [**konvencemi pojmenování**](https://docs.hardwario.com/cloud/#naming-conventions).
:::

---

## Krok 3: Přidejte zařízení {#step-3-add-a-device}

1. Vyberte svůj **Space**  
2. Přejděte na **DEVICES → +NEW DEVICE**  
3. Zadejte informace o svém zařízení **CHESTER**: můžete zvolit jednu z následujících možností:

   **Možnost 1 – Naskenujte QR kód:**  
   Použijte funkci **`⛶ SCAN DEVICE`** v HARDWARIO Cloud a **naskenujte QR kód** na svém zařízení CHESTER a všechny **informace** se **vyplní automaticky**!  

   **Možnost 2 – Ručně:**  
   Zařízení můžete přidat ručně vyplněním následujících polí:  
   - **Name**  
   - **HARDWARIO Serial Number (HSN)**  
   - **Claim Token**

:::info
**Claim Token** je pro každé zařízení unikátní. Získáte ho **naskenováním QR kódu** na zařízení jakoukoli čtečkou QR kódů nebo příkazem **`info show`**, když je zařízení připojené přes **J-Link**.
:::


4. Uložte: vaše zařízení CHESTER je nyní **zaregistrované v cloudu**!

:::tip
**Potřebujete více podrobností?**  
Podrobnější informace o **HARDWARIO Cloud** najdete zde:  
👉 [https://docs.hardwario.com/cloud/](https://docs.hardwario.com/cloud/)

Nebo se podívejte na náš **videotutoriál**, jak přidat zařízení CHESTER do cloudu:  
👉 [https://docs.hardwario.com/chester/videos-chester/chester-cloud](https://docs.hardwario.com/chester/videos-chester/chester-cloud)
:::



---

## Krok 4: Zapněte napájení zařízení CHESTER {#step-4-power-up-your-chester}

:::caution
> **Důležité:** Přidejte zařízení do cloudu **před jeho zapnutím.**  
> Jinak může připojení trvat delší dobu (až několik hodin).
:::

- Vložte baterie nebo připojte externí zdroj napájení  
- Vyčkejte několik minut, než se zařízení připojí k HARDWARIO Cloud. Po úspěšném připojení bude zařízení **blikat zelenou LED**  
  *(Chování LED je vysvětleno níže v [Kroku 5: Zkontrolujte stavovou LED](#step-5-check-the-status-led))*  
- Pokud používáte starší model **CHESTER-M** se superkondenzátory, vyčkejte po vložení baterií asi **30 sekund**, protože kondenzátory se musí nabít, než začne LED blikat.  
- Pokud se zařízení nepřipojí, vyzkoušejte jednu z těchto rychlých akcí:

   🔹 **Stiskněte tlačítko čtyřikrát** → restartuje zařízení  
   🔹 **Vyjměte a znovu vložte baterie**  
   🔹 Pro **CHESTER-M** (s modrými superkondenzátory):  
     - Držte tlačítko nebo ho stiskněte **pětkrát**, dokud se nerozsvítí **bílá LED**. Tím se kondenzátory vybijí (trvá ≈ 30 s)

---

### Režim sítě a řešení problémů s připojením {#network-mode--connectivity-troubleshooting}

Pokud má zařízení stále problém s připojením k síti (zejména při použití vlastní SIM karty nebo roamingu):

* **Zkontrolujte režim sítě:** Podle regionu může být potřeba vynutit konkrétní režim, například **NB-IoT** nebo **LTE-M**. Podrobnosti viz [**průvodce nastavením SIM karty**](https://docs.hardwario.com/chester/platform-connectivity/cellular-networks/sim-card-setup).
* **Zkontrolujte APN/PLMN:** Pokud jste mimo Českou republiku nebo používáte SIM jiného operátora než Vodafone, nastavte správně PLMN a APN podle [**průvodce nastavením SIM karty**](https://docs.hardwario.com/chester/platform-connectivity/cellular-networks/sim-card-setup), případně viz referenci [**konfiguračních parametrů**](https://docs.hardwario.com/chester/platform-connectivity/cellular-networks/configuration-parameters).
* **Veřejná IP pro Cloud v2:** Při použití vlastní SIM karty musíte také nastavit [**správné parametry IP a portu**](https://docs.hardwario.com/chester/firmware-sdk/how-to-lte-v2#ip-and-port) pro kompatibilitu s Cloud v2.

---


## Krok 5: Zkontrolujte stavovou LED {#step-5-check-the-status-led}

- **Blikání zelenou každých 5 sekund** → připojeno k HARDWARIO Cloud ✅  
- **Žádné blikání /** [**jiné barvy**](https://docs.hardwario.com/chester/catalog-applications/common-functionality/#led-behaviour) → stále se připojuje nebo došlo k chybě. Zkontrolujte SIM, pokrytí sítě nebo napájení  

:::info
Podrobnosti o všech barevných stavech LED a jejich význam najdete v [**dokumentaci chování LED**](https://docs.hardwario.com/chester/catalog-applications/common-functionality/#led-behaviour).
:::

## Krok 6: Podívejte se na data v cloudu {#step-6-see-your-data-in-the-cloud}

1. V [**HARDWARIO Cloud**](https://hardwario.cloud) otevřete **DEVICES**  
2. Klikněte na **ikonu chatu** u svého zařízení  
3. Uvidíte **zprávy a živá data** odesílaná ze zařízení CHESTER 🎉  

---

## Krok 7: Nakonfigurujte zařízení {#step-7-configure-your-device}

Po připojení můžete:

- Použít [**HARDWARIO Manager**](https://docs.hardwario.com/chester/platform-connectivity/hardwario-manager) (mobilní aplikace přes BLE)
- Použít [**HARDWARIO Monitor**](https://docs.hardwario.com/chester/platform-connectivity/hardwario-monitor) (J-Link nebo BLE z počítače)
- Použít [**HARDWARIO Terminal**](https://docs.hardwario.com/chester/platform-connectivity/hardwario-terminal) (prohlížeč Google Chrome přes WebSerial/WebBluetooth)
- Přistupovat ke [**vzdálenému shellu**](https://docs.hardwario.com/cloud/downlink/#shell-commands) a provádět i [**aktualizace firmwaru vzduchem**](https://docs.hardwario.com/cloud/firmware)

---

## Krok 8: Zkontrolujte a aktualizujte firmware zařízení CHESTER {#step-8-check-and-update-chester-firmware}

Vždy je dobré se ujistit, že vaše zařízení CHESTER běží na **nejnovější verzi firmwaru**.

### Kontrola verze firmwaru {#check-firmware-version}
Zkontrolovat ji můžete třemi způsoby:

1. **Pomocí** [**HARDWARIO Manager (mobilní aplikace)**](https://docs.hardwario.com/chester/platform-connectivity/hardwario-manager)
   - Otevřete aplikaci a připojte se k zařízení CHESTER přes Bluetooth
   - Verze firmwaru se zobrazí automaticky

2. **Pomocí** [**HARDWARIO Monitor (desktopová aplikace)**](https://docs.hardwario.com/chester/platform-connectivity/hardwario-monitor)
   - Připojte zařízení CHESTER přes J-Link nebo BLE
   - Spusťte příkaz:
     ```bash
     info show
     ```
   - V konzoli uvidíte informace o firmwaru a aplikaci

3. **Pomocí** [**HARDWARIO Terminal (Google Chrome)**](https://docs.hardwario.com/chester/platform-connectivity/hardwario-terminal)
   - Otevřete Chrome a přejděte na [**terminal.hardwario.com**](https://terminal.hardwario.com)
   - Připojte zařízení CHESTER přes J-Link (WebSerial) nebo BLE (WebBluetooth)
   - Spusťte příkaz:
     ```bash
     info show
     ```
   - V terminálu uvidíte informace o firmwaru a aplikaci

### Stažení nejnovějšího firmwaru {#download-the-latest-firmware}
Nejnovější buildy firmwaru najdete vždy zde:  
👉 [**Dostupné buildy aplikačního firmwaru**](https://docs.hardwario.com/chester/catalog-applications/#application-firmware)

:::info
 Tabulka firmwaru je řazená podle typu zařízení CHESTER, proto vyberte správný typ pro své zařízení.
:::

### Aktualizace firmwaru {#update-firmware}
Pokud je dostupná novější verze, můžete ji aktualizovat jednou z těchto metod:

1. **Aktualizace přes HARDWARIO Manager (mobilní aplikace)**

   - Postupujte podle tohoto podrobného návodu: 👉 [**Aktualizace firmwaru pomocí HARDWARIO Manager**](https://docs.hardwario.com/chester/platform-connectivity/hardwario-manager#firmware-update)

2. **Aktualizace firmwaru z cloudu (FOTA)**
   - Zařízení CHESTER můžete aktualizovat i **na dálku** přes cloud.
   - Kompletní technické podrobnosti najdete v tomto návodu: 👉 [**dokumentace k aktualizaci firmwaru**](https://docs.hardwario.com/cloud/firmware/)

3. **Ruční aktualizace přes J-Link**
   - Pokud dáváte přednost ručnímu nahrání firmwaru, podívejte se na tento návod: 👉 [**Aktualizace aplikace přes J-Link**](https://docs.hardwario.com/chester/firmware-flashing/application-over-j-link)

---

✅ **A to je vše!**  
Vaše zařízení CHESTER je nyní připojené, nakonfigurované a aktuální, připravené sbírat a odesílat data do cloudu.

---

## Krok 9: Prozkoumejte aplikace a integrace {#step-9-explore-applications-and-integrations}

Vaše zařízení CHESTER umí mnohem víc než jen odesílat data!  
Jeho funkce můžete rozšířit pomocí [**HARDWARIO Applications**](https://docs.hardwario.com/apps/), hotových modulů a nástrojů, které vám pomohou:

- 📊 **Vizualizovat data** pomocí dashboardů a grafů  
- 🌐 **Integrovat zařízení CHESTER** do existujících **sítí LoRaWAN** nebo jiných IoT systémů  
- ⚙️ **Vytvářet automatizace a analytiku** pro váš konkrétní případ použití  

Všechny aplikace se snadno nasazují a dokážou vaše zařízení CHESTER přeměnit v kompletní IoT řešení.

:::info
👉 Více informací a dostupné aplikace najdete zde:  
[**https://docs.hardwario.com/apps/**](https://docs.hardwario.com/apps/)
:::
