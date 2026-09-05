---
title: REST API
description: "HARDWARIO Cloud v2 nabízí kompletní REST API pro vše, co umíte ve webovém"
---

# HARDWARIO Cloud REST API {#hardwario-cloud-rest-api}

HARDWARIO Cloud v2 nabízí kompletní REST API pro vše, co umíte ve webovém
rozhraní: čtení zařízení a zpráv, správu tagů a proměnných, odesílání
downlinků a další.

- **Základní URL:** `https://api.hardwario.cloud/v2`
- **Interaktivní reference:** [**Dokumentace API Swagger**](https://api.hardwario.cloud/v2/documentation/), kompletní, vždy aktuální seznam endpointů a schémat.
- **Formát:** JSON. Posílejte `Accept: application/json`; ID jsou UUID.

:::tip Pro živá data preferujte konektory
Pro doručování zpráv ze zařízení v reálném čase použijte [**konektory**](/cloud/connectors)
(HTTPS webhooky) místo dotazování REST API. Dotazování zvyšuje zpoždění
doručení, datový provoz i zátěž služby. Webhook vám každou zprávu odešle
v okamžiku, kdy dorazí.
:::

## Návody {#guides}

- [**Autentizace**](authentication.md): vytvoření API klíče a autentizace požadavků.
- [**Čtení dat**](reading-data.md): výpis prostorů, zařízení a zpráv; filtrování a stránkování.
- [**Správa zařízení**](devices.md): zprovoznění, aktualizace a odebrání zařízení.
- [**Tagy**](tags.md): vytváření tagů a jejich přiřazování k zařízením.
- [**Proměnné**](variables.md): metadata typu klíč–hodnota pro jednotlivá zařízení.
- [**Odesílání downlinků**](downlinks.md): odeslání konfiguračních, shellových a datových příkazů do zařízení.
- [**Příklady**](examples.md): kompletní ukázky v cURL, Pythonu a Node.js.
