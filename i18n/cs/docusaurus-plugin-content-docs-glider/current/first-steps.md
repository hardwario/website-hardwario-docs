---
slug: first-steps
title: Rychlý průvodce
description: "Děkujeme, že jste si vybrali zařízení GLIDER."
---
import Image from '@theme/IdealImage';

# Rychlý průvodce zařízením GLIDER {#glider-quick-start-guide}

Děkujeme, že jste si vybrali zařízení GLIDER.

Podle následujících kroků jej nastavíte a začnete sledovat živá data v **HARDWARIO Cloud**.

---

## Krok 1: Vytvořte si účet v HARDWARIO Cloud {#step-1-create-a-hardwario-cloud-account}

1. Přejděte na [**https://hardwario.cloud**](https://hardwario.cloud)
2. Klikněte na **SIGN UP**
3. Vytvořte si účet pomocí:
 - účtu **Google** nebo **Microsoft**
 - **e-mailu a hesla** (nezapomeňte e-mail ověřit)
4. Po ověření se **přihlaste**.

:::info
Pro vyšší bezpečnost doporučujeme přihlašování přes **Google** nebo **Microsoft**, protože tito poskytovatelé identity používají ověřené přihlašovací údaje a **pokročilé mechanismy ochrany účtu**.
:::

---

## Krok 2: Vytvořte si Space {#step-2-create-your-space}

1. V pravém horním rohu klikněte na **SPACES → NEW SPACE**
2. Pojmenujte svůj space (například: `my-home`, `office-sensors`, `warehouse`)
3. Zde budou žít vaše **zařízení GLIDER**.

:::caution
Při vytváření space se prosím řiďte našimi [**konvencemi pojmenování**](https://docs.hardwario.com/cloud/#naming-conventions).
:::

---

## Krok 3: Přidejte zařízení {#step-3-add-a-device}

1. Vyberte svůj **Space**
2. Přejděte na **DEVICES → +NEW DEVICE**
3. Zadejte informace o svém zařízení **GLIDER**: můžete zvolit jednu z následujících možností:

 **Možnost 1 – naskenujte QR kód:**
 Použijte funkci **`SCAN DEVICE`** v HARDWARIO Cloud a **naskenujte QR kód** na zařízení GLIDER – všechny **informace** se **vyplní automaticky**!

 **Možnost 2 – ručně:**
 Zařízení můžete přidat ručně vyplněním následujících polí:
 - **Name**
 - **Serial Number (SN)**
 - **Claim Token**

:::info
**Claim Token** a **sériové číslo** jsou pro každé zařízení jedinečné. Získáte je **naskenováním QR kódu** na zařízení libovolnou čtečkou QR kódů, spuštěním **`AT$INFO?`** přes [**USB-C AT konzoli**](console/usb-at.md) nebo spuštěním **`info show`** přes [**J-Link RTT konzoli**](console/rtt-jlink.md).
:::

4. Uložte to: vaše zařízení GLIDER je nyní **registrováno v cloudu**!

:::tip
**Potřebujete více podrobností?**
Podrobnější informace o **HARDWARIO Cloud** najdete zde:
 [https://docs.hardwario.com/cloud/](https://docs.hardwario.com/cloud/)
:::

---

## Krok 4: Zapněte zařízení GLIDER {#step-4-power-up-your-glider}

:::caution
> **Důležité:** Přidejte zařízení do cloudu **dříve, než jej zapnete.**
> Jinak může připojení trvat déle (až několik hodin).
:::

1. Vložte svou **nano-SIM kartu** (pokud zařízení nebylo dodáno již zprovozněné).
2. Pevně našroubujte **LTE anténu** na SMA konektor.
3. Připojte zařízení ke zdroji napájení. GLIDER nabootuje a začne vyhledávat mobilní síť.
4. Počkejte několik minut, než do HARDWARIO Cloud dorazí první uplink.

:::info
Zařízení GLIDER **nesignalizuje** připojení k cloudu pomocí LED. Nejrychlejší způsob, jak ověřit, že je zařízení online, je podívat se na **Show device messages** v HARDWARIO Cloud (viz [Krok 6](#step-6-see-your-data-in-the-cloud)), případně připojit [**RTT konzoli (J-Link)**](console/rtt-jlink.md) a číst log modemu přímo.
:::

Pokud se zařízení nepřipojí, zkuste některou z těchto rychlých akcí:

- **Stiskněte tlačítko čtyřikrát** pro restart zařízení.
- **Odpojte a znovu připojte napájení.**
- Přesuňte zařízení blíže k oknu nebo do otevřeného prostoru pro lepší příjem mobilního signálu.

---

#### Řešení problémů se síťovým režimem a připojením {#network-mode--connectivity-troubleshooting}

Pokud má vaše zařízení stále problém připojit se k síti (zejména při použití vlastní SIM karty nebo roamingu):

* **Zkontrolujte síťový režim:** GLIDER se dodává s výchozím zapnutím **LTE pásma 8** a **LTE pásma 20** (Evropa). Pro nasazení mimo EU může být potřeba zapnout další pásma.
* **Ověřte APN/PLMN:** Pokud používáte jinou než výchozí SIM kartu, nakonfigurujte APN přes AT konzoli.
* **Čtěte logy modemu:** Připojte [**RTT konzoli (J-Link)**](console/rtt-jlink.md) – modem vypisuje každý pokus o připojení, úroveň signálu a vyjednávání APN přímo do logu.

---

## Krok 5: Zkontrolujte stavovou LED {#step-5-check-the-status-led}

GLIDER má na desce tři stavové LED (červenou, zelenou, žlutou). Jejich chování je záměrně minimální kvůli úspoře energie:

- Každých **5 sekund** firmware vyšle krátký **30ms pulz**:
    - **Zelený pulz**, když není aktivní žádné pravidlo alarmu.
    - **Červený pulz**, když je aktivní alespoň jedno pravidlo alarmu.
- Po rozpoznání stisku tlačítka **žlutá LED** blikne **jednou za každý detekovaný stisk** (50 ms svítí, 200 ms nesvítí). Například trojité kliknutí vyvolá tři krátká žlutá bliknutí, než se spustí odpovídající akce.
- Během bootu nejsou LED řízeny.

:::caution
30ms pulz je rychlé blikutí, nikoli stálé blikání, a při jasném okolním osvětlení jej lze snadno přehlédnout. LED hlásí **pouze stav alarmu** – neindikují připojení k mobilní síti ani ke cloudu. K ověření, že je zařízení online, použijte cloudový dashboard nebo některou z konzolí.
:::

:::info
LED můžete také ručně přepínat z libovolné konzole příkazem `led`, viz [**Příkazy shellu**](commands/shell-commands.md).
:::

---

## Krok 6: Podívejte se na svá data v cloudu {#step-6-see-your-data-in-the-cloud}

1. V [**HARDWARIO Cloud**](https://hardwario.cloud) otevřete **DEVICES**
2. Klikněte na **ikonu chatu** vedle svého zařízení
3. Uvidíte **zprávy a živá data** odeslaná ze zařízení GLIDER

Ve výchozím nastavení GLIDER vzorkuje senzory každých **60 sekund** a odesílá payload každých **300 sekund (5 minut)**. Pro vynucení okamžitého uplinku:

- **AT konzole (USB-C):** `AT$SHELL="app send"`
- **RTT konzole (J-Link):** `app send`

Vysvětlení struktury payloadu najdete v části [**CBOR Payload**](payload.md).

---

## Krok 7: Nakonfigurujte své zařízení {#step-7-configure-your-device}

Po připojení můžete:

- Použít [**USB-C AT konzoli**](console/usb-at.md): doporučeno pro běžné zprovoznění
- Použít [**J-Link RTT konzoli**](console/rtt-jlink.md): plný vývojářský přístup s logy a Zephyr shellem

Běžné konfigurační úlohy:

| Nastavení | Jak je změnit |
| :--- | :--- |
| Interval vzorkování (výchozí 60 s) | `app config interval-sample <seconds>` |
| Interval odesílání (výchozí 300 s) | `app config interval-send <seconds>` |
| Přiřazení DS18B20 ke slotu | `therm scan --save` (automatická detekce) |
| Zapnutí digitálního vstupu CH1 | `inputs config 1-mode counter` |
| Konfigurace teplotního alarmu | `alarm config 1-enabled true`, `alarm config 1-threshold 30` |

Po provedení změn je uložte do flash paměti a restartujte:

```text
AT&W
```

Kompletní referenci najdete v článcích [**Konfigurace**](configuration.md) a [**Příkazy shellu**](commands/shell-commands.md).

---

## Krok 8: Zkontrolujte a aktualizujte firmware zařízení GLIDER {#step-8-check-and-update-glider-firmware}

Vždy je dobré se ujistit, že vaše zařízení GLIDER běží na **nejnovější verzi firmwaru**.

### Kontrola verze firmwaru {#check-firmware-version}

Zkontrolovat ji můžete dvěma způsoby:

1. **Přes USB-C (AT konzole):**
 ```text
 AT+CGMR
 ```
 …nebo pro bohatší výpis informací:
 ```text
 AT$INFO?
 ```

2. **Přes J-Link (Zephyr shell):**
 ```bash
 info show
 ```

### Aktualizace firmwaru {#update-firmware}

Pokud je k dispozici novější verze, můžete zařízení GLIDER aktualizovat dvěma způsoby:

1. **Přes AT konzoli (USB-C)**: doporučeno pro produkční jednotky a aktualizace v terénu. Není potřeba programátor.
 [**Aplikace přes AT (USB-C)**](firmware-flashing/application-over-at.md)

2. **Přes J-Link (SWD)**: doporučeno pro vývoj.
 [**Aplikace přes J-Link**](firmware-flashing/application-over-j-link.md)

Přehled obou metod najdete v článku [**Nahrání firmwaru**](firmware-flashing/index.md).

---

 **A je to!**
Vaše zařízení GLIDER je nyní připojeno, nakonfigurováno a aktuální – připraveno sbírat a odesílat data do cloudu.

---

## Krok 9: Prozkoumejte aplikace a integrace {#step-9-explore-applications-and-integrations}

Vaše zařízení GLIDER umí mnohem víc než jen odesílat data!
Jeho funkce můžete rozšířit pomocí [**HARDWARIO Applications**](https://docs.hardwario.com/apps/) – hotových modulů a nástrojů, které vám pomohou:

- **Vizualizovat data** pomocí dashboardů a grafů
- **Integrovat zařízení GLIDER** do stávajících IoT systémů
- **Vytvářet automatizace a analytiku** pro váš konkrétní případ použití

Všechny aplikace se snadno nasazují a mohou proměnit vaše zařízení GLIDER v kompletní IoT řešení.

:::info
 Zjistěte více a prozkoumejte dostupné aplikace zde:
[**https://docs.hardwario.com/apps/**](https://docs.hardwario.com/apps/)
:::
