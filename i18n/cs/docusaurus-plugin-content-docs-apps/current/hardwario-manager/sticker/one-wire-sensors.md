---
slug: one-wire-sensors
title: Senzory 1-Wire
description: "Přiřaďte externí teplotní senzory 1-Wire připojené k zařízení STICKER Input"
---

# Nastavení senzorů 1-Wire {#set-up-1-wire-sensors}

Přiřaďte externí teplotní senzory 1-Wire připojené k zařízení **STICKER Input**
do senzorových slotů zařízení.

1. Nejprve senzory k zařízení STICKER zapojte — viz
   [**Zapojení vstupů STICKER Input**](/sticker/sticker-input-wiring/external-sensors).
2. Otevřete **HARDWARIO Manager** a přejděte na **STICKER → Tools → 1-Wire sensors**.
3. Zvolte **Read slots & scan the 1-Wire bus** a přiložte telefon k zařízení.
   Každý nalezený senzor nahlásí svou unikátní adresu ROM.
4. **Přiřaďte** každý senzor do jednoho ze čtyř slotů. Slot můžete **vyprázdnit**
   nebo dva senzory mezi sloty **prohodit**.
5. Klepněte na **Save to device** a znovu přiložte telefon k zařízení STICKER.

<img src="/img/hw-manager/hw-manager-1w-sensors.png" alt="Čtyři sloty 1-Wire se senzory nalezenými na sběrnici" width="320" />

Vedle senzorů se během práce zobrazují živé hodnoty, což je nejrychlejší způsob,
jak poznat, která fyzická sonda je která — zahřejte jednu v ruce a sledujte,
který řádek se hýbe.

**Revert to read values** vrátí sloty do stavu, jaký nahlásilo zařízení, pokud si
to před uložením rozmyslíte.

:::info Pořadí slotů určuje kanály
Pořadí slotů určuje, na kterém kanálu každý senzor přes LoRaWAN reportuje, takže
ho držte v celé flotile stejné — jinak stejný kanál znamená na různých zařízeních
jinou sondu.
:::
