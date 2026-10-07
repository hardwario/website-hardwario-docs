---
slug: uplink
title: Uplink
description: "Uplink je zpráva odeslaná ze zařízení do cloudu, protějšek downlinku."
---

# Uplink {#uplink}

**Uplink** je zpráva odeslaná **ze zařízení do cloudu**, opak
[**downlinku**](/cloud/downlink). Uplinky nesou data, která zařízení CHESTER hlásí: naměřené hodnoty ze
senzorů spolu s informacemi o stavu, relaci a kodeku.

## Plán hlášení {#reporting-schedule}

Zařízení posílá data podle plánu, který určuje jeho konfigurace:

- **`interval-sample`**: jak často zařízení vzorkuje senzory
- **`interval-aggreg`**: jak často se tyto vzorky agregují
- **`interval-report`**: jak často se agregovaná data odesílají do cloudu jako uplink

Tyto hodnoty můžete změnit na dálku [**downlinkem konfigurace**](/cloud/downlink/config).

## Payload a dekódování {#payload-and-decoding}

Aby šetřilo energii a vysílací čas, kóduje zařízení data kompaktně (**CBOR**) pomocí svého
**kodeku**. Cloud je odpovídajícím dekodérem převede do čitelného JSON; dekodér zařízení nahraje
automaticky pokaždé, když se jeho kodek změní. Právě dekódovaný JSON vidíte a zkoumáte
ve [**zprávách**](/cloud/messages) zařízení.

## Typy zpráv {#message-types}

Zprávy uplink mají směr **up**. Úplný seznam typů zpráv (Data, Session, Config,
Encoder, Decoder, …) a informace o tom, jak je procházet a filtrovat, najdete na stránce
[**Zprávy**](/cloud/messages).
