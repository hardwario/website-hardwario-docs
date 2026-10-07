---
slug: first-steps
title: Rychlý průvodce
description: "Rychlý průvodce zařízením GLIDER: zapněte ho, zaregistrujte v HARDWARIO Cloud a sledujte, jak přicházejí první naměřené hodnoty."
title_meta: "Rychlý průvodce (GLIDER)"
---
import Image from '@theme/IdealImage';

# Rychlý průvodce zařízením GLIDER {#glider-quick-start-guide}

Děkujeme, že jste si vybrali zařízení GLIDER.

Podle následujících kroků zařízení nastavíte a jeho data pak budete sledovat v reálném čase v **HARDWARIO Cloud**.

---

## Krok 1: Vytvořte si účet v HARDWARIO Cloud {#step-1-create-a-hardwario-cloud-account}

1. Přejděte na [**https://hardwario.cloud**](https://hardwario.cloud)
2. Klikněte na **SIGN UP**
3. Vytvořte si účet pomocí:
 - účtu **Google** nebo **Microsoft**
 - **e-mailu a hesla** (nezapomeňte e-mail ověřit)
4. Po ověření se **přihlaste**.

:::info
Kvůli vyšší bezpečnosti doporučujeme přihlašovat se přes **Google** nebo **Microsoft**, protože tito poskytovatelé identity používají ověřené přihlašovací údaje a **pokročilé mechanismy ochrany účtu**.
:::

---

## Krok 2: Vytvořte si prostor {#step-2-create-your-space}

1. V pravém horním rohu klikněte na **SPACES → NEW SPACE**
2. Pojmenujte prostor (například `my-home`, `office-sensors`, `warehouse`)
3. Do tohoto prostoru budete přidávat svá **zařízení GLIDER**.

:::caution
Při pojmenování prostoru se prosím řiďte [**konvencemi pojmenování**](/cloud/#naming-conventions).
:::

---

## Krok 3: Přidejte zařízení {#step-3-add-a-device}

1. Vyberte svůj prostor (**Space**)
2. Přejděte na **DEVICES → +NEW DEVICE**
3. Zadejte údaje o svém zařízení **GLIDER**, a to jedním z těchto způsobů:

 **Možnost 1: naskenujte QR kód**
 Funkcí **`SCAN DEVICE`** v HARDWARIO Cloud **naskenujte QR kód** na zařízení GLIDER. Všechny **údaje** se pak **vyplní automaticky**.

 **Možnost 2: ručně**
 Ručně vyplňte tato pole:
 - **Name**
 - **Serial Number (SN)**
 - **Claim Token**

:::info
**Claim Token** a **sériové číslo** jsou pro každé zařízení jedinečné. Zjistíte je tak, že QR kód na zařízení **naskenujete** libovolnou čtečkou QR kódů, nebo spustíte **`AT$INFO?`** v [**konzoli AT přes USB-C**](console/usb-at.md) či **`info show`** v [**konzoli RTT přes J-Link**](console/rtt-jlink.md).
:::

4. Zařízení uložte. GLIDER je teď **zaregistrovaný v cloudu**.

:::tip
**Potřebujete více podrobností?**
Podrobnosti o **HARDWARIO Cloud** najdete v jeho dokumentaci:
 [https://docs.hardwario.com/cloud/](/cloud/)
:::

---

## Krok 4: Zapněte zařízení GLIDER {#step-4-power-up-your-glider}

:::caution
> **Důležité:** Přidejte zařízení do cloudu **dříve, než jej zapnete.**
> Jinak může připojení trvat déle (až několik hodin).
:::

1. Vložte **nano-SIM kartu** (pokud zařízení nebylo dodáno už zprovozněné).
2. Pevně našroubujte **anténu LTE** na konektor SMA.
3. Připojte zařízení ke zdroji napájení. GLIDER se spustí a začne vyhledávat mobilní síť.
4. Počkejte několik minut, než do HARDWARIO Cloud dorazí první uplink.

:::info
Zařízení GLIDER **nesignalizuje** připojení k cloudu pomocí LED. Nejrychleji ověříte, že je zařízení online, v přehledu **Show device messages** v HARDWARIO Cloud (viz [Krok 6](#step-6-see-your-data-in-the-cloud)), případně připojte [**konzoli RTT (J-Link)**](console/rtt-jlink.md) a čtěte přímo log modemu.
:::

Pokud se zařízení nepřipojí, zkuste rychle některý z těchto kroků:

- **Stiskněte tlačítko čtyřikrát**, zařízení se restartuje.
- **Odpojte a znovu připojte napájení.**
- Kvůli lepšímu příjmu mobilního signálu přesuňte zařízení blíž k oknu nebo do otevřeného prostoru.

---

#### Řešení problémů se síťovým režimem a připojením {#network-mode--connectivity-troubleshooting}

Pokud se zařízení stále nedaří připojit k síti (zejména s vlastní SIM kartou nebo v roamingu):

* **Zkontrolujte síťový režim:** GLIDER má ve výchozím stavu zapnuté **pásmo LTE 8** a **pásmo LTE 20** (Evropa). Při nasazení mimo EU možná budete muset zapnout další pásma.
* **Ověřte APN/PLMN:** Pokud používáte jinou než výchozí SIM kartu, nakonfigurujte APN přes konzoli AT.
* **Čtěte logy modemu:** Připojte [**konzoli RTT (J-Link)**](console/rtt-jlink.md). Modem do logu přímo vypisuje každý pokus o připojení, úroveň signálu a vyjednávání APN.

---

## Krok 5: Zkontrolujte stavovou LED {#step-5-check-the-status-led}

GLIDER má na desce tři stavové LED (červenou, zelenou, žlutou). Kvůli úspoře energie toho záměrně signalizují jen málo:

- Každých **5 sekund** firmware na **30 ms** krátce rozsvítí LED:
    - **zelenou**, když není aktivní žádné pravidlo alarmu,
    - **červenou**, když je aktivní alespoň jedno pravidlo alarmu.
- Když firmware rozpozná stisk tlačítka, **žlutá LED** blikne **jednou za každý zaznamenaný stisk** (50 ms svítí, 200 ms nesvítí). Například po trojitém stisku žlutá LED třikrát krátce blikne a teprve pak se spustí odpovídající akce.
- Během startu jsou všechny LED zhasnuté.

:::caution
Bliknutí na 30 ms je jen krátký záblesk, ne zřetelné blikání, a na jasném světle se dá snadno přehlédnout. LED hlásí **pouze stav alarmu**; připojení k mobilní síti ani ke cloudu nesignalizují. Zda je zařízení online, ověříte v dashboardu cloudu nebo v některé z konzolí.
:::

:::info
LED můžete také ručně rozsvítit a zhasnout z libovolné konzole příkazem `led`, viz [**Příkazy shellu**](commands/shell-commands.md).
:::

---

## Krok 6: Podívejte se na svá data v cloudu {#step-6-see-your-data-in-the-cloud}

1. V [**HARDWARIO Cloud**](https://hardwario.cloud) otevřete **DEVICES**
2. Klikněte na **ikonu chatu** vedle zařízení
3. Zobrazí se **zprávy a aktuální data** odeslaná ze zařízení GLIDER

Ve výchozím nastavení GLIDER vzorkuje senzory každých **60 sekund** a odesílá payload každých **300 sekund (5 minut)**. Okamžitý uplink vynutíte takto:

- **Konzole AT (USB-C):** `AT$SHELL="app send"`
- **Konzole RTT (J-Link):** `app send`

Strukturu payloadu vysvětluje stránka [**CBOR payload**](payload.md).

---

## Krok 7: Nakonfigurujte zařízení {#step-7-configure-your-device}

Připojené zařízení můžete konfigurovat:

- v [**konzoli AT přes USB-C**](console/usb-at.md), která je doporučená pro běžné zprovoznění,
- v [**konzoli RTT přes J-Link**](console/rtt-jlink.md), která dává plný vývojářský přístup k logům a shellu Zephyr.

Běžné konfigurační úlohy:

| Nastavení | Jak je změnit |
| :--- | :--- |
| Interval vzorkování (výchozí 60 s) | `app config interval-sample <seconds>` |
| Interval odesílání (výchozí 300 s) | `app config interval-send <seconds>` |
| Přiřazení senzoru DS18B20 ke slotu | `therm scan --save` (automatická detekce) |
| Zapnutí digitálního vstupu CH1 | `inputs config 1-mode counter` |
| Konfigurace teplotního alarmu | `alarm config 1-enabled true`, `alarm config 1-threshold 30` |

Změny pak uložte do flash paměti a zařízení restartujte:

```text
AT&W
```

Úplný popis najdete na stránkách [**Konfigurace**](configuration.md) a [**Příkazy shellu**](commands/shell-commands.md).

---

## Krok 8: Zkontrolujte a aktualizujte firmware zařízení GLIDER {#step-8-check-and-update-glider-firmware}

Vyplatí se ověřit, že v zařízení GLIDER běží **nejnovější verze firmwaru**.

### Kontrola verze firmwaru {#check-firmware-version}

Zkontrolovat ji můžete dvěma způsoby:

1. **Přes USB-C (konzole AT):**
 ```text
 AT+CGMR
 ```
 …nebo pro podrobnější výpis:
 ```text
 AT$INFO?
 ```

2. **Přes J-Link (shell Zephyr):**
 ```bash
 info show
 ```

### Aktualizace firmwaru {#update-firmware}

Pokud je k dispozici novější verze, můžete zařízení GLIDER aktualizovat dvěma způsoby:

1. **Přes konzoli AT (USB-C)**: doporučeno pro zařízení v ostrém provozu a aktualizace v terénu. Ladicí sondu nepotřebujete.
 [**Aplikace přes AT (USB-C)**](firmware-flashing/application-over-at.md)

2. **Přes J-Link (SWD)**: doporučeno pro vývoj.
 [**Aplikace přes J-Link**](firmware-flashing/application-over-j-link.md)

Přehled obou metod najdete na stránce [**Nahrání firmwaru**](firmware-flashing/index.md).

---

 **A je to!**
Zařízení GLIDER je teď připojené, nakonfigurované a aktuální a může sbírat a odesílat data do cloudu.

---

## Krok 9: Prozkoumejte aplikace a integrace {#step-9-explore-applications-and-integrations}

Zařízení GLIDER umí mnohem víc než jen odesílat data.
Jeho funkce můžete rozšířit pomocí [**HARDWARIO Applications**](/apps/), hotových modulů a nástrojů, které vám pomohou:

- **Vizualizovat data** pomocí dashboardů a grafů
- **Integrovat zařízení GLIDER** do stávajících IoT systémů
- **Vytvářet automatizace a analýzy** pro konkrétní využití

Všechny aplikace se snadno nasazují a ze zařízení GLIDER udělají kompletní IoT řešení.

:::info
 Více informací a dostupné aplikace najdete zde:
[**https://docs.hardwario.com/apps/**](/apps/)
:::
