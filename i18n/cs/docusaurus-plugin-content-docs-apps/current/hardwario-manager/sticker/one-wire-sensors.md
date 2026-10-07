---
slug: one-wire-sensors
title: Senzory 1-Wire
---

# Nastavení senzorů 1-Wire {#set-up-1-wire-sensors}

Přiřaďte externí teplotní senzory 1-Wire připojené k zařízení **STICKER Input**
ke slotům senzorů v zařízení.

1. Nejprve senzory k zařízení STICKER zapojte: viz
   [**Zapojení vstupů STICKER Input**](/sticker/sticker-input-wiring/external-sensors).
2. Otevřete **HARDWARIO Manager** a přejděte na **STICKER → Tools → 1-Wire sensors**.
3. Zvolte **Read slots & scan the 1-Wire bus** a přiložte telefon k zařízení.
   Každý nalezený senzor nahlásí svou jedinečnou adresu ROM.
4. **Přiřaďte** každý senzor k jednomu ze čtyř slotů. Slot můžete **vyprázdnit**
   nebo dva senzory mezi sloty **prohodit**.
5. Klepněte na **Save to device** a znovu přiložte telefon k zařízení STICKER.

<img src="/img/hw-manager/hw-manager-1w-sensors.png" alt="Čtyři sloty 1-Wire se senzory nalezenými na sběrnici" width="320" />

Vedle senzorů se průběžně zobrazují aktuální hodnoty. Podle nich nejrychleji
poznáte, která fyzická sonda je která: jednu zahřejte v ruce a sledujte, u kterého
řádku se hodnota mění.

Pokud si to před uložením rozmyslíte, volba **Revert to read values** vrátí sloty
do stavu přečteného ze zařízení.

:::info Pořadí slotů určuje kanály
Pořadí slotů určuje, na kterém kanálu senzor odesílá hodnoty přes LoRaWAN.
Dodržujte proto stejné pořadí na všech zařízeních, jinak bude stejný kanál na
různých zařízeních znamenat jinou sondu.
:::
