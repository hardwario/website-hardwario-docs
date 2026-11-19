---
slug: one-wire-sensors
title: Senzory 1-Wire
description: "Načtení sběrnice 1-Wire zařízení STICKER Input přes NFC a přiřazení externích teplotních senzorů do čtyř slotů, které určují kanál LoRaWAN každého čidla."
---

# Nastavení senzorů 1-Wire {#set-up-1-wire-sensors}

Přiřaďte externí teplotní senzory 1-Wire připojené k zařízení **STICKER Input**
ke čtyřem slotům senzorů v zařízení.

1. Nejprve senzory k zařízení STICKER zapojte: viz
   [**Zapojení vstupů STICKER Input**](/sticker/sticker-input-wiring/external-sensors).
2. Otevřete **HARDWARIO Manager** a přejděte na **STICKER → Senzory → Senzory 1-Wire**.
3. Zvolte **Načíst sloty a prohledat sběrnici 1-Wire** a přiložte telefon
   k zařízení. Aplikace přečte sloty a vypíše všechny senzory nalezené na
   sběrnici.
4. Každý senzor umístěte do slotu (viz níže).
5. Klepněte na **Uložit do zařízení** a znovu přiložte telefon k zařízení STICKER.

<img src="/img/hw-manager/hw-manager-1w-sensors.png" alt="Obrazovka Senzory 1-Wire se zapnutou sběrnicí 1-Wire, nápovědou k přesunu senzoru podržením a přetažením a čtyřmi sloty, všemi prázdnými" width="320" />

Přepínač **Sběrnice 1-Wire** nahoře zapíná a vypíná sběrnici i čtení senzorů ve
slotech. Při vypnuté sběrnici obrazovka ukazuje jen tento přepínač.

---

## Přiřazení, přesun a vyprázdnění {#assign-move-and-clear}

- **Přiřazení senzoru.** Senzor, který není v žádném slotu, je v části **Mimo
  sloty**. Klepněte na jeho tlačítko **Přiřadit** a vyberte slot, nebo senzor
  podržte a přetáhněte na slot. Pokud je slot obsazený, aplikace se před
  nahrazením senzoru zeptá.
- **Přesun nebo prohození.** Podržte slot a přetáhněte ho na jiný: sloty se
  prohodí, prázdný slot senzor jednoduše převezme.
- **Vyprázdnění slotu.** Otevřete nabídku **⋮** u slotu a zvolte **Vymazat slot**.

Když senzor při přetahování podržíte u horního nebo dolního okraje seznamu,
seznam se posune.

U každého slotu je vidět stav jeho senzoru: **Připojen**, **Není na sběrnici**,
**Nahrazen jiným senzorem** nebo **Na sběrnici je senzor jiného typu**.

---

## Která sonda je která {#check-which-probe-is-which}

Klepnutím na senzor, ve slotu i mimo něj, otevřete jeho stránku: typ, sériové
číslo, slot, stav, typ, který slot očekává, a hodnoty z posledního čtení.

Hodnoty pocházejí ze čtení, nejsou živé. Dvě sondy od sebe rozeznáte tak, že
jednu zahřejete v ruce, zvolíte **Více akcí → Načíst a znovu prohledat**
a podíváte se, která hodnota vzrostla.

---

## Typ senzoru ve slotu {#sensor-type-of-a-slot}

S firmwarem v2.0.0 si každý slot pamatuje i typ senzoru, který očekává. Změníte
ho volbou **Nastavit typ senzoru…** v nabídce **⋮** slotu. Nový typ restartuje
záznam historie, takže záznamy uložené v zařízení se ztratí, a dokud na slot
míří pravidla alarmů, zařízení změnu odmítne: nejprve je odstraňte. Očekávaný
typ se přesouvá se svým senzorem, proto se aplikace ze stejného důvodu zeptá
i při prohození dvou slotů, které očekávají různé typy.

---

## Vrácení před uložením {#undo-before-saving}

Pokud si to před uložením rozmyslíte, **Více akcí → Vrátit na načtené hodnoty**
vrátí sloty do stavu přečteného ze zařízení.

:::info Pořadí slotů určuje kanály
Pořadí slotů určuje, na kterém kanálu senzor odesílá hodnoty přes LoRaWAN.
Dodržujte proto stejné pořadí na všech zařízeních, jinak bude stejný kanál na
různých zařízeních znamenat jinou sondu.
:::
