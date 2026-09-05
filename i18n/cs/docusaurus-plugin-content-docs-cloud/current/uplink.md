---
slug: uplink
title: Uplink
description: "downlinku. Uplinky nesou data, která CHESTER hlásí: naměřené hodnoty ze"
---

# Uplink {#uplink}

**Uplink** je zpráva odeslaná **ze zařízení do Cloudu**, protějšek
[**downlinku**](/cloud/downlink). Uplinky nesou data, která CHESTER hlásí: naměřené hodnoty ze
senzorů spolu s informacemi o stavu, relaci a kodeku.

## Plán hlášení {#reporting-schedule}

Zařízení hlásí data podle plánu daného jeho konfigurací:

- **`interval-sample`**: jak často zařízení odečítá své senzory
- **`interval-aggreg`**: jak často se tyto vzorky agregují
- **`interval-report`**: jak často se agregovaná data odesílají do Cloudu jako uplink

Tyto hodnoty lze změnit vzdáleně pomocí [**Config downlinku**](/cloud/downlink/config).

## Payload a dekódování {#payload-and-decoding}

Kvůli úspoře energie a vysílacího času zařízení kóduje svá data úsporně (**CBOR**) pomocí svého
**kodeku**. Cloud je dekóduje do čitelného JSON pomocí odpovídajícího dekodéru, který zařízení
automaticky nahraje pokaždé, když se jeho kodek změní. Dekódovaný JSON je to, co vidíte a zkoumáte
ve [**Zprávách**](/cloud/messages) daného zařízení.

## Typy zpráv {#message-types}

Uplink zprávy mají směr **up**. Úplný seznam typů zpráv (Data, Session, Config,
Encoder, Decoder, …) a informace o tom, jak je procházet a filtrovat, najdete na stránce
[**Zprávy**](/cloud/messages).
