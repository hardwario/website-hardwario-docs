---
slug: messages
title: Zprávy
description: "Stránka Messages zobrazuje všechny zprávy vyměněné mezi zařízeními a Cloudem. Dostanete se na ni ze dvou míst:"
---

# Zprávy {#messages}

Stránka **Messages** zobrazuje všechny zprávy vyměněné mezi zařízeními a Cloudem. Dostanete se na ni ze dvou míst:

- **Levý panel → Messages** — zobrazuje zprávy ze všech zařízení v prostoru
- **Detail zařízení → záložka Messages** — zobrazuje pouze zprávy daného zařízení

## Typy zpráv {#message-types}

| Typ | Směr | Popis |
|---|---|---|
| **data** | up | Periodický uplink payload s hodnotami ze senzorů |
| **session** | up/down | Vyměněna při startu zařízení — obsahuje informace o firmwaru, hash konfigurace a parametry sítě |
| **config** | down | Konfigurace odeslaná do zařízení (pouze při změně hashe konfigurace) |
| **encoder** | up | Mapování JSON klíčů použité ke komprimaci datových zpráv |
| **decoder** | up | Mapování JSON klíčů použité k dekomprimaci datových zpráv |
| **shell** | down | Příkazy shellu naplánované pro zařízení |
| **firmware** | down | Pakety aktualizace firmwaru FOTA |

## Stavy downlinku {#downlink-states}

Zprávy typu downlink (směr: `down`) mají stav doručení:

| Stav | Význam |
|---|---|
| **pending** | Čeká, než se zařízení probudí a dotáže se Cloudu |
| **sent** | Doručeno do zařízení |
| **cancelled** | Ručně zrušeno — zařízení tuto zprávu neobdrží |

## Filtrování {#filtering}

Ve výchozím stavu seznam zobrazuje zprávy za **posledních 10 dní**. Pomocí filtrovací lišty lze změnit:

- **Time range** — rozšíření nebo zúžení období
- **Type** — filtr podle typu zprávy (data, session, config, …)
- **Direction** — pouze uplink, pouze downlink, nebo obojí

## Zobrazení zprávy {#viewing-a-message}

- Klepnutím na **ikonu šipky** v řádku zprávy zobrazíte rychlý náhled JSON přímo v seznamu
- Klepnutím na **ikonu ⓘ** otevřete úplný detail zprávy
- Klepnutím na **ikonu porovnání** u dvou zpráv zobrazíte rozdíl jejich JSON těl

## Základní dashboard {#basic-dashboard}

Dashboard je **nástroj pro ladění**, který umožňuje vykreslit hodnoty ze zpráv pomocí krátké JavaScriptové funkce.

Klepněte na ikonu **Dashboard** nad seznamem zpráv, vložte funkci, která z každé zprávy vytáhne hodnoty, a graf se aktualizuje v reálném čase.

**Příklad — vykreslení teploty z teploměru:**

<details>
<summary><b>Zobrazit příklad</b></summary>
<p>

```js
return {
  date: message.created_at,
  Temperature: message.body?.thermometer?.temperature,
}
```

</p>
</details>

**Příklad — vykreslení všech měření z agregovaného pole:**

<details>
<summary><b>Zobrazit příklad</b></summary>
<p>

```js
const points = message.body?.hygrometer?.temperature?.measurements?.map(m => m.avg);
return {
  date: message.created_at,
  Temperature: points,
}
```

</p>
</details>

:::info

Pro produkční dashboardy a vizualizaci dat použijte [Connector](connectors.md), který data odešle do specializované služby, jako je Grafana, Ubidots nebo ThingsBoard.

:::
