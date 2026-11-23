---
slug: ble-tags
title: BLE tagy
description: "Přiřazení externích senzorových tagů Bluetooth ke slotům zařízení CHESTER v aplikaci HARDWARIO Manager, jejich hodnoty a uložení či vyprázdnění slotů."
---

# Přiřazení senzorových tagů BLE {#bind-ble-sensor-tags}

CHESTER umí číst externí **senzorové tagy Bluetooth** a hlásit jejich hodnoty
spolu se svými. Každý tag obsadí v zařízení jeden **slot**; přiřazením tagu do
slotu dáte zařízení CHESTER pokyn, aby tag sledovalo. Číslo slotu zároveň
určuje, jak se hodnoty tagu pojmenují v telemetrii, takže přesun tagu do jiného
slotu změní i označení jeho hodnot.

Otevřete **CHESTER → BLE tagy**. Aplikace načte sloty (**Načítání BLE
tagů…**).

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-ble-tags.png" alt="Obrazovka BLE tagy s názvem zařízení, nadpisem Sloty s obsazením 2 z 8, jednou kartou slotu, který se nehlásí, a jednou s hodnotami, počtem volných slotů s tlačítkem Zobrazit a sekcí V okolí, mimo sloty s tlačítkem Vyhledat" width="320" />

:::info Otevření obrazovky může zapnout skener tagů
Ke čtení tagů je potřeba skener tagů v zařízení. Pokud je vypnutý, aplikace ho
pro tuto relaci zapne a oznámí to: *Skener tagů byl vypnutý, pro tuto relaci je
zapnutý. Aby zůstal zapnutý i po restartu, uložte konfiguraci.* Dokud změnu
neuložíte, skener se při příštím restartu zařízení zase vypne.
:::

Pokud firmware zařízení sloty pro tagy nemá, obrazovka ohlásí **Žádné sloty pro
BLE tagy**.

---

## Sloty {#the-slots}

Stránka nese v záhlaví název zařízení. U nadpisu **Sloty** je uvedeno, kolik
jich je obsazených, například **Obsazeno 2 z 8**.

Každý obsazený slot je karta s číslem slotu, stavovou kontrolkou a posledními
hodnotami: teplotou, vlhkostí, napětím baterie a sílou signálu v dBm, podle toho,
co tag hlásí, a navíc **magnet**, **moving** nebo **slabá baterie**, když to tag
hlásí. Tag, který se ještě neozval, ukazuje **Zatím žádné hodnoty**; tag, který
se odmlčel, ukazuje **Nehlásí se**, případně i kdy byl naposledy slyšet.

Nabídka **⋮** u slotu (**Možnosti slotu 1**) ukazuje adresu Bluetooth tagu
a pracuje jen s tímto slotem: **Vyprázdnit slot**, nebo **Prohodit se slotem 2**
a tak dál.

Prázdné sloty jsou skryté za počtem, například **6 volných slotů**; **Zobrazit**
je vypíše a **Skrýt** je zase sbalí. Slot s neuloženou změnou zůstane vidět
v každém případě.

Tlačítko obnovení v horní liště (**Načíst znovu**) znovu načte sloty a jejich
uložené hodnoty. **Více akcí → Načíst hodnoty tagů** počká až minutu na čerstvé
hodnoty ze všech přiřazených tagů a pak oznámí, kolik jich načetlo.

---

## Přiřazení tagu {#bind-a-tag}

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-chester-ble-tags-nearby.png" alt="Sekce V okolí, mimo sloty se seznamem tagů nalezených vyhledáváním, u každého adresa Bluetooth, síla signálu, hodnoty a tlačítko Přiřadit" width="320" />

1. V sekci **V okolí, mimo sloty** klepněte na **Vyhledat**. Vyhledávání trvá
   asi 20 sekund, za každý nově nalezený tag o něco déle, nejvýš 30 sekund,
   a vedle nadpisu běží odpočet. Tlačítkem **Zrušit** ho zastavíte. Během
   vyhledávání je skener tagů v zařízení zaneprázdněný a vlastní hodnoty
   nesbírá.
2. Nalezené tagy, které ještě nejsou ve slotu, se vypíšou s adresou, silou
   signálu a hodnotami. Klepněte na **Přiřadit** a vyberte slot: **Slot 2
   (prázdný)**, nebo obsazený slot, u kterého se aplikace nejdřív zeptá
   **Nahradit slot 2?**
3. Klepněte na **Uložit do zařízení**. Aplikace se zeptá **Uložit sloty tagů?**
   *Zařízení se restartuje, aby změny použilo, čímž se přeruší Bluetooth
   spojení.* Zvolte **Uložit**.

**Přiřadit**, **Vyprázdnit slot** a **Prohodit se slotem** změnu jen připraví.
Do zařízení CHESTER se nic nedostane, dokud ji neuložíte, a **Uložit do
zařízení** zůstane neaktivní, dokud něco nezměníte. **Více akcí → Vrátit
změny** připravené změny zahodí a při odchodu z obrazovky s neuloženými změnami
se aplikace nejdřív zeptá **Zahodit změny?**

Po uložení se zařízení restartuje a aplikace na něj počká a sama se znovu
připojí, stejně jako po [**uložení konfigurace**](./configuration.md#saving).

### Další způsoby přidání tagu {#other-ways-to-add-a-tag}

**Více akcí** pod tlačítkem **Uložit do zařízení** nabízí další tři cesty. Na
rozdíl od **Přiřadit** se **projeví v zařízení okamžitě**, bez **Uložit do
zařízení**:

| Akce | Co dělá |
|---|---|
| **Spárovat všechny tagy v okolí** | Po potvrzení zařízení postupně přiřadí do volného slotu každý tag, který slyší silněji než −70 dBm, dokud se sloty nezaplní nebo se nikdo nový neozve. Tagy, které nechcete, předtím odneste dál: cizí tag zabere slot |
| **Přidat podle adresy** | Zadejte adresu Bluetooth tagu, například `C0:FF:EE:00:00:01`. Tag se uloží do prvního volného slotu |
| **Přidat podle QR kódu** | Naskenujte QR kód na tagu. Tag se uloží do prvního volného slotu; tag, který už slot má, aplikace ohlásí jako **Už je spárovaný** |

Ve starším firmwaru, který neumí zapsat zvolený slot, uloží **Přiřadit** tag
rovnou do prvního volného slotu, nabídka **⋮** místo **Vyprázdnit slot** nabízí
**Odebrat ze zařízení** a tlačítko **Uložit do zařízení** chybí. Firmware, který
neumí vypsat nepřiřazené tagy, oznámí *Tento firmware neumí vypsat nespárované
tagy. Přidejte tag podle adresy nebo naskenováním jeho QR kódu.*

---

## Vyprázdnění slotů {#clear-the-slots}

**Vyprázdnit slot** v nabídce **⋮** slot vyprázdní, jakmile změny uložíte.

**Více akcí → Odebrat všechny tagy** vyprázdní všechny sloty najednou. Aplikace
se zeptá **Odebrat všechny tagy?** *Všechny sloty v zařízení se vyprázdní. Tuto
akci nelze vrátit zpět.* Volbou **Odebrat vše** se sloty v zařízení vyprázdní
okamžitě, bez **Uložit do zařízení**.

---

## Související nastavení {#related-settings}

Skener tagů má vlastní konfiguraci ve skupině **BLE tagy** v sekci
[**Pokročilá konfigurace**](./configuration.md): zda je zapnutý a podle firmwaru
také jak často a jak dlouho vyhledává a hodnoty slotů. V shellu jsou to příkazy
`tag config`, například `tag config enabled`, `tag config scan-interval`,
`tag config scan-duration` a `tag config slot-<n>`. Viz
[**Terminál**](./terminal.md).
