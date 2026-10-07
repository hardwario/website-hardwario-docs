---
slug: messages
title: Zprávy
description: "Stránka Messages v HARDWARIO Cloud zobrazuje všechny zprávy mezi vašimi zařízeními a cloudem, s filtry a detailem každé zprávy."
---

# Zprávy {#messages}

Stránka **Messages** zobrazuje všechny zprávy mezi zařízeními a cloudem. Dostanete se na ni ze dvou míst:

- **Levý panel → Messages**: zobrazuje zprávy ze všech zařízení v prostoru
- **Detail zařízení → záložka Messages**: zobrazuje pouze zprávy daného zařízení

## Typy zpráv {#message-types}

| Typ | Směr | Popis |
|---|---|---|
| **data** | up | Pravidelný payload uplinku s naměřenými hodnotami ze senzorů |
| **session** | up/down | Vyměňuje se při startu zařízení. Obsahuje informace o firmwaru, hash konfigurace a parametry sítě |
| **config** | down | Konfigurace odeslaná do zařízení (pouze při změně hashe konfigurace) |
| **encoder** | up | Mapování klíčů JSON pro kompresi datových zpráv |
| **decoder** | up | Mapování klíčů JSON pro dekompresi datových zpráv |
| **shell** | down | Příkazy shellu naplánované pro zařízení |
| **firmware** | down | Pakety aktualizace firmwaru FOTA |

## Stavy downlinku {#downlink-states}

Zprávy downlink (směr `down`) mají stav doručení:

| Stav | Význam |
|---|---|
| **pending** | Čeká, až se zařízení probudí a zeptá se cloudu |
| **sent** | Doručeno do zařízení |
| **cancelled** | Ručně zrušeno. Zařízení tuto zprávu neobdrží |

## Filtrování {#filtering}

Ve výchozím stavu seznam ukazuje zprávy za **posledních 10 dní**. Ve filtrovací liště můžete změnit:

- **Time range**: delší nebo kratší období
- **Type**: filtr podle typu zprávy (data, session, config, …)
- **Direction**: pouze uplink, pouze downlink, nebo obojí

## Zobrazení zprávy {#viewing-a-message}

- Kliknutím na **ikonu šipky** v řádku zprávy zobrazíte rychlý náhled JSON přímo v seznamu
- Kliknutím na **ikonu ⓘ** otevřete úplný detail zprávy
- Kliknutím na **ikonu porovnání** u dvou zpráv zobrazíte rozdíly v jejich tělech JSON

## Základní dashboard {#basic-dashboard}

Dashboard je **ladicí nástroj**: krátkou funkcí v JavaScriptu v něm vykreslíte hodnoty ze zpráv.

Klikněte na ikonu **Dashboard** nad seznamem zpráv, vložte funkci, která z každé zprávy vytáhne hodnoty, a graf se aktualizuje v reálném čase.

**Příklad: vykreslení teploty z teploměru**

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

**Příklad: vykreslení všech měření z agregovaného pole**

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

Pro produkční dashboardy a vizualizaci dat použijte [konektor](connectors.md), který data odešle do specializované služby, například Grafana, Ubidots nebo ThingsBoard.

:::
