---
title: REST API
description: "REST API pro HARDWARIO Cloud v2: čtení zařízení a zpráv, správa tagů a proměnných, odesílání downlinků a automatizace všeho, co umí webové rozhraní."
---

# HARDWARIO Cloud REST API {#hardwario-cloud-rest-api}

HARDWARIO Cloud v2 nabízí kompletní REST API pro vše, co můžete dělat ve webovém
rozhraní: čtení zařízení a zpráv, správu tagů a proměnných, odesílání
downlinků a další.

- **Základní URL:** `https://api.hardwario.cloud/v2`
- **Interaktivní reference:** [**Dokumentace API ve Swaggeru**](https://api.hardwario.cloud/v2/documentation/): úplný a vždy aktuální seznam endpointů a schémat.
- **Formát:** JSON. Posílejte `Accept: application/json`; ID jsou UUID.

:::tip Pro data v reálném čase použijte konektory
Zprávy ze zařízení v reálném čase doručujte [**konektory**](/cloud/connectors)
(webhooky HTTPS), ne opakovaným dotazováním REST API. Dotazování zvyšuje zpoždění
doručení, datový provoz i zátěž služby, kdežto webhook vám každou zprávu pošle
hned, jak dorazí.
:::

## Návody {#guides}

- [**Autentizace**](authentication.md): vytvoření klíče API a autentizace požadavků.
- [**Čtení dat**](reading-data.md): výpis prostorů, zařízení a zpráv; filtrování a stránkování.
- [**Správa zařízení**](devices.md): zprovoznění, aktualizace a odebrání zařízení.
- [**Tagy**](tags.md): vytváření tagů a jejich přiřazování k zařízením.
- [**Proměnné**](variables.md): metadata typu klíč–hodnota pro jednotlivá zařízení.
- [**Odesílání downlinků**](downlinks.md): odesílání konfigurace, příkazů shellu a datových příkazů do zařízení.
- [**Příklady**](examples.md): kompletní ukázky v cURL, Pythonu a Node.js.
