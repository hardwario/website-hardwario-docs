---
slug: payload
title: Payload a dekodér
description: Co nese který uplink zařízení STICKER, kde získat dekodér a jak vypadají dekódovaná data.
---

# Payload a dekodér {#payload-and-decoder}

Zařízení STICKER posílá data jako krátké binární uplinky (zprávy ze zařízení) a dekodér na síťovém serveru je převádí na JSON. Na této stránce zjistíte, co který uplink nese, kde dekodér získat a jak vypadají dekódovaná data.

## Co nese který uplink {#what-each-uplink-carries}

Co uplink nese, poznáte podle čísla fPort, které má každá zpráva LoRaWAN.

| fPort | Obsah |
|---|---|
| 2 | **Telemetrie:** pravidelná měření a k nim hlášení navíc po alarmu nebo příkazu |
| 3 | **Alarmový report:** alarmové události s časem a hodnotou |
| 85 | **Uplink Info** (informace o zařízení), **uplink s nastavením** (hlavní parametry), odpovědi na příkazy a vyčtené záznamy historie. Tento port používají i příkazy do zařízení. |
| 10 | Jen v kalibračním režimu (test ve výrobě) |

- **Telemetrie** začíná napětím baterie, příznakem `boot` (`true` v prvním hlášení po startu) a stavem alarmů. Za nimi následují hodnoty všech zapnutých senzorů.
- **Jednotky:** dekodér vrací hodnoty v běžných jednotkách, například °C, %, hPa, lx a V.
- **Části:** kolik bajtů se vejde do jednoho uplinku, závisí na přenosové rychlosti, a ta je u zařízení daleko od brány nízká. Hlášení, které se nevejde, se rozdělí na části odeslané zhruba 3 s po sobě. Dekodér každou část označí, například `"pages": "1/2"`.
- **LoRa P2P:** ProXimos Hub dekóduje stejné uplinky stejným dekodérem, viz [**Režim LoRa P2P**](../connectivity/lora-p2p.md).

## Chybějící hodnoty {#missing-values}

Klíč s hodnotou `null` znamená, že senzor je zapnutý, ale nemá platné měření, například kvůli odpojené sondě. Když klíč úplně chybí, je senzor v nastavení vypnutý.

## Dekodér {#the-decoder}

Dekodér je soubor `ttn.js` z repozitáře firmwaru STICKER, viz [**ttn.js na GitHubu**](https://github.com/hardwario/sticker-firmware/blob/v2.0.0/app/decoder/ttn.js). Samotné vydání na GitHubu obsahuje jen soubory firmwaru, dekodér ne.

- **Instalace:** na síťovém serveru nastavte soubor jako formátovač payloadu pro uplink i downlink, viz [**The Things Stack**](../connectivity/lorawan-tts.md) a [**ChirpStack v4**](../connectivity/lorawan-chirpstack.md).
- **Příkazy:** když soubor slouží i jako formátovač downlinků, můžete příkazy zařazovat do fronty v JSON, viz [**Příkazy přes downlink**](../connectivity/downlink-commands.md). ChirpStack v3 soubor použije jen k dekódování uplinků, proto tam příkazy posílejte v hex.
- **Bez spojování:** dekodér zpracuje každý uplink samostatně a části nikdy nespojuje. Části odpovědi spojí až vaše aplikace podle DevEUI, fPortu a pořadového čísla.

## Příklady {#examples}

- **Alarmový report** (fPort 3): pole `alarms` obsahuje každou změnu s údaji `slot`, `channel`, `rule` (u vestavěného alarmu `null`), `event` (`activate` nebo `deactivate`), `type`, `value` a `time`. Pole `total` udává počet všech změn, včetně těch, které se do reportu nevešly. Dokud zařízení nemá nastavené hodiny, mají všechna pole `time` hodnotu `null`.
- **Vyčtené záznamy historie** (fPort 85): každý `history_frame` nese pole `records` se záznamy, z nichž každý má svůj čas `time` a uložené hodnoty, a také `seq` vašeho požadavku.

Kdy zařízení tyto zprávy posílá, popisují stránky [**Alarmy**](alarms.md) a [**Historie a čítače**](history-and-counters.md).

<details>
<summary><b>Příklad telemetrie</b></summary>

Hlášení ze zařízení se zapnutým akcelerometrem a oběma Hallovými spínači (fPort 2). Baterie má 3,36 V, teplota je 23,65 °C a vlhkost 54 %. Hodnoty Hallových spínačů se posílají, i když oba čítače ukazují 0, protože jsou spínače zapnuté.

```text
0108a801100018fa24206c4002900100980104a00100a80104
```

```json
{
  "voltage": 3.36,
  "boot": false,
  "alarm_status": 0,
  "alarm_status_flags": [],
  "temperature": 23.65,
  "humidity": 54,
  "orientation": 2,
  "hall_left_count": 0,
  "hall_left_is_active": true,
  "hall_right_count": 0,
  "hall_right_is_active": true
}
```

</details>

<details>
<summary><b>Příklad uplinku Info</b></summary>

Hlavní pole dekódovaného uplinku Info (fPort 85): sestavení release, doba běhu 42 s, baterie 3062 mV a žádné aktivní alarmy.

```text
011a13080228d285d8cc04302a50f617580570808004
```

```json
{
  "info": {
    "fw_version": "2.0.0",
    "build_type_name": "main",
    "debug": false,
    "serial_number": 1234567890,
    "uptime_s": 42,
    "battery": 3062,
    "active_alarms": []
  }
}
```

</details>
