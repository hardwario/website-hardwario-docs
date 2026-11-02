---
slug: payload
title: Payload a dekodér
description: Jak jsou sestavené uplinky zařízení STICKER, jaký dekodér použít pro jakou verzi firmwaru a jak vypadají dekódovaná data.
---

# Payload a dekodér {#payload-and-decoder}

:::caution Koncept
Tato stránka je koncept pro interní kontrolu. Tvrzení označená **[ověřit]** je ještě potřeba potvrdit na hardwaru nebo u vlastníka produktu.
:::

:::info Firmware v2.0.0
Tato stránka popisuje **firmware STICKER v2.0.0**. Kde se firmware v1.4.x chová jinak, upozorní na to poznámka **Firmware v1.4.x**.
:::

Zařízení STICKER posílá data jako kompaktní binární uplinky, tedy zprávy ze zařízení do sítě. Dekodér na síťovém serveru, takzvaný formátovač payloadu (payload formatter), je převádí na JSON. Tato stránka vysvětluje, jak jsou uplinky sestavené, jaký dekodér použít pro jakou verzi firmwaru a jak vypadají dekódovaná data. Hodí se, když data ze zařízení STICKER napojujete na vlastní systém nebo když dekódované hodnoty nevypadají správně.

## Struktura uplinku {#uplink-structure}

Každý uplink se posílá na určitý fPort, tedy číslo portu zprávy LoRaWAN, podle kterého příjemce pozná, co zpráva nese:

| fPort | Směr | Obsah |
|---|---|---|
| 2 | Uplink | Telemetrie: pravidelná hlášení a hlášení vyvolaná alarmem nebo příkazem |
| 3 | Uplink | Alarmové hlášení: alarmové události s časem a hodnotou |
| 85 | Uplink | Odpovědi na příkazy, Info a settings-info, rámce historie |
| 85 | Downlink | Příkazy, viz [**Zpracování downlinků**](downlinks.md) |
| 10 | Uplink | Jen kalibrační režim (test ve výrobě), s vlastním dekodérem `calibration.js` |
| 1 | Uplink | Bitmapový formát firmwaru v1.3.x a starších; firmware v2.0.0 ho neposílá |

Jak je payload sestavený:

- **Bajt verze:** prvním bajtem každého uplinku na fPortech 2, 3 a 85 je verze payloadu, `0x01`. Příkazy posílané do zařízení (downlinky) bajt verze nemají.
- **Tělo v protobufu:** zbytek tvoří protobuf, kompaktní binární formát s číslovanými poli. Pole, která hlášení nepotřebuje, se vynechávají, takže hlášení zůstává krátké.
- **Škálovaná celá čísla:** hodnoty se přenášejí jako celá čísla, například teplota v setinách stupně. Dekodér je převede zpět na běžné jednotky.
- **`null`, nebo chybějící klíč:** když je senzor zapnutý, ale nemá platnou hodnotu (například proto, že je sonda odpojená), jeho klíč v datech zůstane a má hodnotu `null`. Když klíč chybí, je schopnost v nastavení vypnutá.
- **Systémová skupina:** každé telemetrické hlášení začíná napětím baterie, příznakem `boot` (`true` v prvním hlášení po startu) a stavem alarmů (`alarm_status` a `alarm_status_flags`).
- **Pořadí:** ostatní skupiny následují v pevném pořadí: teplota a vlhkost na desce, barometr, světlo, akcelerometr, PIR, Hallovy spínače, vstupy a měření 1-Wire.
- **Stránky:** datová rychlost (DR) uplinku určuje, kolik bajtů se do něj vejde. Hlášení, které se při aktuální datové rychlosti nevejde, se rozdělí na stránky odeslané asi 3 s po sobě. Každá stránka je výsek téhož měření a nese `page_index` a `page_count`; dekodér přidá `pages`, například `"1/2"`. Měření 1-Wire se mezi stránky nikdy nerozdělí. Stejně se stránkují i odpovědi na fPort 85 a alarmová hlášení.
- **LoRa P2P:** přes [**LoRa P2P**](../connectivity/lora-p2p.md) putují stejné payloady v rádiovém rámci za obalovým bajtem `0x81` a číslem portu, takže je ProXimos Hub dekóduje stejným dekodérem.

<details>
<summary><b>Škálované hodnoty</b></summary>

| Dekódovaný klíč | Při přenosu | Dekódovaná jednotka |
|---|---|---|
| `voltage` (baterie) | V × 50, v krocích po 20 mV; 0 znamená, že ještě neproběhlo měření | V |
| `temperature` | °C × 100 | °C |
| `humidity` | % × 2 | % |
| `pressure` | hPa × 10 | hPa |
| `altitude` | m × 10 | m |
| `illuminance` | lx ÷ 2 | lx |
| `input_a_voltage`, `input_b_voltage` | mV | V |
| `orientation` | 1–6 | 1–6 |
| Čítače, například `hall_left_count` | 32bitové celé číslo | Beze změny |
| Měření 1-Wire (`w1_sensors`) | Pro každou sondu: slot, typ, maska platných kanálů a sbalené hodnoty | `values` a `units` pro každý kanál daného typu sondy |

</details>

## Dekodér {#the-decoder}

- **Soubor:** `ttn.js` ve složce `app/decoder` repozitáře firmwaru, u tagu příslušné verze firmwaru. Pro firmware v2.0.0 použijte [**ttn.js pro v2.0.0**](https://github.com/hardwario/sticker-firmware/blob/v2.0.0/app/decoder/ttn.js) na GitHubu. Samotné vydání (release) na GitHubu obsahuje jen obrazy firmwaru a jejich kontrolní součty, dekodér ne.
- **Funkce:** soubor je obyčejný JavaScript (ES5) pro formátovač payloadu na síťovém serveru. The Things Stack v3 a ChirpStack v4 používají `decodeUplink`, `encodeDownlink` a `decodeDownlink`. ChirpStack v3 používá funkci `Decode(fPort, bytes)`, která dekóduje jen uplinky, takže tam příkazy posílejte jako hex.
- **Instalace:** nastavte soubor jako formátovač payloadu pro uplink i downlink, viz [**The Things Stack**](../connectivity/lorawan-tts.md) a [**ChirpStack v4**](../connectivity/lorawan-chirpstack.md).
- **Bez paměti:** dekodér dekóduje každý uplink samostatně a stránky nikdy nespojuje. Stránky odpovědi spojuje vaše aplikace podle DevEUI, fPortu a `seq`, stránky alarmového hlášení podle `base_time`.
- **Neznámá verze:** payload s neznámým bajtem verze dostane varování `unknown payload version` a dekodér z něj přesto dekóduje, co jde.
- **Příkazy:** [**Generátor příkazů přes downlink**](../connectivity/downlink-commands-generator.mdx) sestavuje příkazy stejným kodérem.

## Kompatibilita mezi verzemi firmwaru {#compatibility-between-firmware-versions}

Firmware v1.4.x i v2.0.0 začínají payload bajtem verze `0x01`, ale alarmové události, měření 1-Wire a bity `device_status` kódují každý jinak. Dekodér oba formáty podle payloadu nerozliší, proto každé zařízení potřebuje dekodér, který odpovídá jeho firmwaru.

- **Volba podle Info:** každé zařízení hlásí verzi firmwaru v uplinku Info (`info.fw_version`). Dekodéry obou verzí toto pole čtou správně, takže vždy zjistíte, jaký dekodér zařízení potřebuje, viz [**Verze a aktualizace firmwaru**](firmware.md).
- **Smíšená flotila:** přiřaďte dekodér podle verze firmwaru jednotlivým zařízením nebo profilům zařízení, nebo použijte jeden dekodér, který formát vybere podle verze firmwaru z Info.
- **Starší formáty:** dekodér v2.0.0 stále dekóduje rámce historie z v1.4.x bez pole `channels` a bitmapu na fPort 1 z v1.3.x a starších.

Co ukáže nesprávný dekodér:

| Firmware zařízení | Dekodér | Co uvidíte |
|---|---|---|
| v1.4.x | v2.0.0 | Měření 1-Wire se špatným typem senzoru a hodnotami `null`; alarmové události se špatným kanálem a hodnotou a u vstupů a Hallových spínačů s neznámým slotem; špatné `device_status_flags` |
| v2.0.0 | v1.4.x | Měření 1-Wire bez hodnot; alarmové události se špatným zdrojem, veličinou a hodnotou; špatné `device_status_flags` |

:::note Firmware v1.4.x
Firmware v1.4.x používá stejné fPorty i bajt verze. Měření 1-Wire ale označuje starými čísly typů (1 pro DS18B20 a 2 pro MACHINE PROBE, dnes 2 a 3), v alarmových událostech uvádí místo slotu a kanálu zdroj a veličinu a bity `device_status` seskupuje jinak. Zařízení s v1.4.x dekódujte souborem `ttn.js` z verze v1.4.0.
:::

## Příklady dekódovaných dat {#decoded-examples}

Každý příklad ukazuje payload v hexadecimálním zápisu a objekt `data`, který vrátí dekodér v2.0.0. Příklady označené **[ověřit]** vznikly podle definice protokolu a prošly dekodérem v2.0.0, ze skutečného zařízení ale nepocházejí.

### Telemetrie {#telemetry}

Hlášení zachycené na skutečném zařízení se zapnutým akcelerometrem a oběma Hallovými spínači (fPort 2). Baterie má 3,36 V, teplota je 23,65 °C a vlhkost 54 %. Skupiny Hallových spínačů se posílají celé, i když jsou oba počty 0, protože mají zapnuté schopnosti.

```text
0108a801100018fa24206c4002900100980104a00100a80104
```

<details>
<summary><b>Dekódovaná telemetrie</b></summary>

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

### Měření 1-Wire {#1-wire-readings}

Testovací rámec ze sady testů dekodéru se sondou MACHINE PROBE ve slotu 3 a sondou DS18B20 ve slotu 1 (fPort 2). Testovací rámec obsahuje jen skupinu 1-Wire; skutečné hlášení nese navíc `voltage`, `boot` a `alarm_status`. Vypsaný je každý kanál daného typu sondy; kanál bez hodnoty je `null`. Slot, ve kterém sonda chybí nebo je v něm sonda jiného typu, se posílá bez hodnot, takže se všechny jeho kanály dekódují jako `null`.

```text
01da010d0803100358236205fa24d80102da010a0801100258016202cc21
```

<details>
<summary><b>Dekódovaná měření 1-Wire</b></summary>

```json
{
  "w1_sensors": [
    {
      "slot": 3,
      "type": 3,
      "type_name": "machine-probe",
      "values": {
        "temperature": 23.65,
        "humidity": 54,
        "temperature-aux": null,
        "illuminance": null,
        "magnetic-field": null,
        "tilt": 1,
        "accel-x": null,
        "accel-y": null,
        "accel-z": null
      },
      "units": {
        "temperature": "degC",
        "humidity": "%RH",
        "temperature-aux": "degC",
        "illuminance": "lx",
        "magnetic-field": "mT",
        "tilt": "bool",
        "accel-x": "m/s2",
        "accel-y": "m/s2",
        "accel-z": "m/s2"
      }
    },
    {
      "slot": 1,
      "type": 2,
      "type_name": "dallas",
      "values": { "temperature": 21.5 },
      "units": { "temperature": "degC" }
    }
  ]
}
```

</details>

### Info {#info}

Info po zapnutí (fPort 85) **[ověřit]**: sestavení release firmwaru 2.0.0, doba běhu 42 s, baterie 3062 mV a žádné aktivní alarmy. Po zapnutí ještě nejsou nastavené hodiny, takže `unix_time` chybí a `device_status_flags` obsahuje `time_unsynced`. Info po startu má `seq` 0, takže v dekódovaných datech klíč `seq` není. Přes NFC nese Info navíc DevEUI a claim token, přes rádio nikdy.

```text
011a13080228d285d8cc04302a50f617580570808004
```

<details>
<summary><b>Dekódované Info</b></summary>

```json
{
  "info": {
    "fw_major": 2,
    "fw_minor": 0,
    "fw_patch": 0,
    "build_type": 0,
    "debug": false,
    "device_status": 65536,
    "active_alarms": [],
    "serial_number": 1234567890,
    "uptime_s": 42,
    "battery": 3062,
    "reset_cause": 5,
    "fw_version": "2.0.0",
    "build_type_name": "main",
    "device_status_flags": ["time_unsynced"],
    "reset_cause_flags": ["pin", "brownout"]
  }
}
```

</details>

### Alarmové hlášení {#alarm-report}

Alarmové hlášení se dvěma událostmi (fPort 3) **[ověřit]**: pravidlo 7 zaznamená, že teplota na desce vystoupila nad horní mez na 26,6 °C, čímž se otevře okno pro sběr, a o 5 s později pravidlo 0 zaznamená sepnutí levého Hallova spínače. První změna má čas `base_time`, každá další k němu přičte svůj posun. Když hodiny nebyly nastavené (`time_synced: false`), jsou časy událostí `null`.

```text
010880cae2d00610021a0728c829380748021a0820052802480350052001
```

<details>
<summary><b>Dekódované alarmové hlášení</b></summary>

```json
{
  "base_time": 1780000000,
  "total": 2,
  "time_synced": true,
  "alarms": [
    {
      "slot": "mb",
      "channel": "temperature",
      "rule": 7,
      "event": "activate",
      "type": "high",
      "value": 26.6,
      "time": 1780000000
    },
    {
      "slot": "mb",
      "channel": "hall-left-state",
      "rule": 0,
      "event": "activate",
      "type": "trigger",
      "value": 1,
      "time": 1780000005
    }
  ],
  "truncated": false
}
```

</details>

### Rámec historie {#history-frame}

Rámec historie z opětovného odeslání přes `req_history` se `seq` 1 a výchozími kanály (teplota a vlhkost) na fPort 85 **[ověřit]**. Záznamy nenesou vlastní čas: čas záznamu číslo n (počítáno od 0) je `t0_unix` + n × `interval_s` a s `time_synced: false` se časy záznamů dekódují jako `null`. Druhý testovací rámec ze sady testů dekodéru ukazuje rámec, který je stránkou 1 ze 2; chybí mu pole `channels`, stejně jako rámcům z v1.4.x.

```text
0108012a191880cae2d006220666085a70085c2803308407380152020001
01080a2a121880cae2d006220366085a280330840738016802
```

<details>
<summary><b>Dekódované rámce historie</b></summary>

```json
{
  "seq": 1,
  "history_frame": {
    "records": [
      { "time": 1780000000, "temperature": 21.5, "humidity": 45 },
      { "time": 1780000900, "temperature": 21.6, "humidity": 46 }
    ],
    "t0_unix": 1780000000,
    "present": 3,
    "interval_s": 900,
    "time_synced": true,
    "channels": ["temperature", "humidity"]
  }
}
```

```json
{
  "seq": 10,
  "history_frame": {
    "records": [
      { "time": 1780000000, "temperature": 21.5, "humidity": 45 }
    ],
    "t0_unix": 1780000000,
    "present": 3,
    "interval_s": 900,
    "time_synced": true
  },
  "page_count": 2,
  "page_index": 0,
  "pages": "1/2"
}
```

</details>

Jak se historie zaznamenává a čte, popisují stránky [**Historie a čítače**](history-and-counters.md) a [**Historie senzorů**](../developer-access/sensor-history.md).
