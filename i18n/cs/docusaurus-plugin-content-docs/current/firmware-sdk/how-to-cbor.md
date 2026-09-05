---
slug: how-to-cbor
title: "Jak na: CBOR"
description: "Zařízení CHESTER s Cloud v2 používá CBOR pro kódování a dekódování přenášených dat. Díky CBOR můžete pomocí souboru YAML popsat, jak budou přenášená data vypadat, a poté ve svém kódu v C používat klíče z tohoto souboru YAML."
---
import Image from '@theme/IdealImage';

# Jak na: CBOR {#how-to-cbor}

Zařízení **CHESTER** s Cloud v2 používá [**CBOR**](https://cbor.io/) pro kódování a dekódování přenášených dat. Díky **CBOR** můžete pomocí souboru **YAML** popsat, jak budou přenášená data vypadat, a poté ve svém kódu v C používat klíče z tohoto souboru **YAML**.

V úvodních zprávách session posílá Cloud hash kodeku ve zprávě **session down**. CHESTER porovná tento hash se svým vlastním hashem kodeku a pokud je potřeba, nahraje dekodér zprávou **decoder up** a případně nahraje enkodér ve zprávě **encoder up**.

Abyste mohli s zařízením **CHESTER** používat **CBOR**, je potřeba:

- Vytvořit ve složce aplikace soubor `codec\cbor-decoder.yaml`, který popisuje atributy JSON.
- Případně vytvořit soubor `codec\cbor-encoder.yaml` pro downlink příkazy (viz kód CHESTER Control)
- Hlavičkový soubor `src/app_codec.h` se vygeneruje automaticky při zavolání `west build`.
- Použít tyto definice v `app_cbor.c` a přidat potřebná data.

Soubor YAML má hlavičku a poté v `schema` definujete striktně hierarchickou strukturu.

V `src/app_codec.h` jsou vygenerované #define s názvy jako `CODEC_KEY_E_`, kde `E` znamená Encoder (z pohledu zařízení CHESTER).

Pokud vnořujete položky do hlubší struktury, uvidíte v hlavičkovém souboru dvojité podtržítko `__`.
Například `CODEC_KEY_E_NETWORK__MESSAGE__VERSION` pro příklad YAML níže.

```
version: 2
type: decoder
name: com.hardwario.chester.app.clime
schema:
  - message:
      - version:
      - sequence:
      - timestamp:
...
```

:::info

Více praktických příkladů najdete v CHESTER SDK ve složce katalogových aplikací `chester/applications/*`.

Pojmenování `cbor-decoder.yaml` a `cbor-encoder.yaml` vychází z pohledu Cloudu. Zařízení CHESTER tedy kóduje data pomocí souboru **decoder**, protože cloud tento soubor YAML používá k dekódování.

:::

## YAML {#yaml}

V **YAML** definujete názvy klíčů, které se později použijí v dekódovaném **JSON**. Soubor **YAML** však může definovat i další věci:

- **Modifikátory**
- **Enumerátory**
- **Data časových řad**, **periodická** (TSP) nebo s časovým **offsetem** (TSO)

### Modifikátory {#modificators}

Modifikátory jsou:

- `$add`
- `$sub`
- `$mul`
- `$div`
- `$fpp`: počet desetinných míst čísla s plovoucí řádovou tečkou v JSON
- `$key`: přejmenování klíče v **JSON**

Příklad níže vytváří klíč s názvem `temperature`. V zařízení **CHESTER** je potřeba hodnotu vynásobit 100, poté je v **HARDWARIO Cloud** automaticky vydělena 100 a ve výsledném **JSON** má číslo dvě desetinná místa.

```yaml
- temperature:
  - $div: 100
  - $fpp: 2
```

Kód v C pro zařízení **CHESTER** bude vypadat takto:

```c
zcbor_uint32_put(zs, CODEC_KEY_E_TEMPERATURE);
zcbor_int32_put(zs, g_app_data.therm_temperature * 100.f);
```

Výstupní **JSON** bude:

```json
"temperature": 21.75
```

### Enumerátory {#enumerators}

Definujte textové hodnoty a posílejte je efektivně jako celé číslo.

```yaml
- backup_state:
  - $enum:
    - inactive
    - active
```

Kód v C pro zařízení **CHESTER** bude vypadat takto:

```c
zcbor_uint32_put(zs, CODEC_KEY_E_BACKUP_STATE);
zcbor_uint32_put(zs, g_app_data.backup.line_present ? 1 : 0);
```

Výstupní **JSON** bude:

```json
"backup_state": "active"
```

### Time Series Period {#time-series-period}

**Time Series Period (TSP)** efektivně kóduje hodnotu nebo více hodnot s časovými značkami. V zařízení **CHESTER** posíláte pouze referenční **timestamp**, **period** a **values**. Dekodér automaticky přidá ke každé hodnotě absolutní časovou značku.

```yaml
- measurements_val:
  - $tsp:
    - avg:
    - mdn:
```

Kód v C pro zařízení **CHESTER** bude vypadat takto:

```c
zcbor_uint32_put(zs, CODEC_KEY_E_MEASUREMENTS_VAL);
{
  zcbor_list_start_encode(zs, ZCBOR_VALUE_IS_INDEFINITE_LENGTH);

  zcbor_uint64_put(zs, g_app_data.counter.timestamp);         // unix timestamp 1679321760
  zcbor_uint32_put(zs, g_app_config.counter_interval_aggreg); // 30 seconds

  for (int i = 0; i < g_app_data.counter.measurement_count; i++) {
    zcbor_uint64_put(zs, g_app_data.counter.measurements[i].avg);
    zcbor_uint64_put(zs, g_app_data.counter.measurements[i].mdn);
  }

  zcbor_list_end_encode(zs, ZCBOR_VALUE_IS_INDEFINITE_LENGTH);
}
```

Výstupní **JSON** bude:

```json
measurements_val:
[
  {
    "timestamp": 1679321760,
    "avg": 123,
    "mdn": 456
  },
  {
    "timestamp": 1679321790,
    "avg": 123,
    "mdn": 456
  },
  ...
]
```

Všimněte si, že v JSON je časová značka každého vzorku absolutní. Vypočítá se z referenční časové značky 16793217**60** prvního vzorku; další vzorek pak má časovou značku větší o 30 sekund, tedy 16793217**90**.

### Time Series Offset {#time-series-offset}

**Time Series Offset (TSO)** je podobný předchozímu **Time Series Period (TSP)**. Čas mezi vzorky však není periodický a každý vzorek má svůj vlastní offset vůči předchozímu.

Tento kód také ukazuje, jak lze kombinovat modifikátory uvnitř TSO.

```yaml
- trigger_events:
  - $key: "events"
  - $tso:
    - type:
      - $enum:
        - deactivated
        - activated
```

Kód v C pro zařízení **CHESTER** bude vypadat takto:

```c
int64_t timestamp_abs = g_app_data.trigger.events[0].timestamp;

zcbor_uint32_put(zs, CODEC_KEY_E_TRIGGER_EVENTS);
{
  zcbor_list_start_encode(zs, ZCBOR_VALUE_IS_INDEFINITE_LENGTH);

  /* TSO absolute timestamp */
  zcbor_int64_put(zs, timestamp_abs);

  for (int i = 0; i < g_app_data.trigger.event_count; i++) {
    /* TSO offset timestamp */
    zcbor_int64_put(zs, g_app_data.trigger.events[i].timestamp - timestamp_abs);
    zcbor_uint32_put(zs, g_app_data.trigger.events[i].is_active ? 1 : 0);
  }

  zcbor_list_end_encode(zs, ZCBOR_VALUE_IS_INDEFINITE_LENGTH);
}
```

Výstupní **JSON** bude:

```json
events:
[
  {
    "timestamp": 1679321760,
    "event": "activated"
  },
  {
    "timestamp": 1679321765,
    "event": "deactivated"
  },
  {
    "timestamp": 1679321780,
    "event": "activated"
  },
  ...
]
```
