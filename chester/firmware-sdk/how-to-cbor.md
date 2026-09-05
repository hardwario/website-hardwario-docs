---
slug: how-to-cbor
title: "How to: CBOR"
---
import Image from '@theme/IdealImage';

# How to: CBOR

**CHESTER** with Cloud v2 uses [**CBOR**](https://cbor.io/) to encode and decode transmitted data. Thanks to **CBOR**, you can describe how the transmitted data will look like using the **YAML** file, then in your C code, you use the keys from this **YAML** file.

In the initial session messages, Cloud sends codec hash in the **session down** message. CHESTER compares the hash with its own codec hash and if needed, it uploads decoder with **decoder up** message and optionally uploads encoder in **encoder up** message.

To use **CBOR** with **CHESTER** you need to:

- Create a `codec\cbor-decoder.yaml` file in your application folder that describes the JSON attributes.
- Optionally create a `codec\cbor-encoder.yaml` file for downlink commands (see CHESTER Control code)
- Header file `src/app_codec.h` is automatically generated when `west build` is called.
- Use these definitions in `app_cbor.c` and add the needed data.

YAML file have a header, then in `schema` you define a strictly hiearchical structure.

In `src/app_codec.h` there are generated #defines with names like `CODEC_KEY_E_` where `E` stands for Encoder (viewed from CHESTER perspective).

In you inherit items to deeper structure, then in header file you will see `__` double underscore.
For example `CODEC_KEY_E_NETWORK__MESSAGE__VERSION` for YAML example below.

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

You can see more practical examples in CHESTER SDK in the catalog applications `chester/applications/*` folder.

Naming `cbor-decoder.yaml` and `cbor-encoder.yaml` is took from the Cloud perspective. So CHESTER is encoding data using **decoder** file because cloud is using this YAML file for decoding.

:::

## YAML

In the **YAML** you define the name of the keys that will later be used in decoded **JSON**. However, the **YAML** file can define other things:

- **Modificators**
- **Enumerators**
- **Time series data**, **periodical** (TSP) or with time **offset** (TSO)

### Modificators

Modificators are:

- `$add`
- `$sub`
- `$mul`
- `$div`
- `$fpp`: floating point decimal places in JSON
- `$key`: rename the **JSON** key

The example below creates a key with name `temperature`. In **CHESTER** you need to multiply value by 100, then in **HARDWARIO Cloud** it is automatically divided by 100, and in the final **JSON**, the number has two decimal places.

```yaml
- temperature:
  - $div: 100
  - $fpp: 2
```

The **CHESTER** C code will look like this:

```c
zcbor_uint32_put(zs, CODEC_KEY_E_TEMPERATURE);
zcbor_int32_put(zs, g_app_data.therm_temperature * 100.f);
```

Output **JSON** will be:

```json
"temperature": 21.75
```

### Enumerators

Define string values and send them efficiently as an integer.

```yaml
- backup_state:
  - $enum:
    - inactive
    - active
```

The **CHESTER** C code will look like this:

```c
zcbor_uint32_put(zs, CODEC_KEY_E_BACKUP_STATE);
zcbor_uint32_put(zs, g_app_data.backup.line_present ? 1 : 0);
```

Output **JSON** will be:

```json
"backup_state": "active"
```

### Time Series Period

**Time Series Period (TSP)** efficiently encodes value or multiple values with the timestamps. In the **CHESTER**, you only send reference **timestamp**, **period** and **values**. The decoder automatically adds an absolute timestamp to each value.

```yaml
- measurements_val:
  - $tsp:
    - avg:
    - mdn:
```

The **CHESTER** C code will look like this:

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

Output **JSON** will be:

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

Notice that in the JSON the timestamp for each sample is absolute. It is computed from the reference timestamp 16793217**60** of the first sample; then next sample has a timestamp bigger by 30 seconds 16793217**90**.

### Time Series Offset

**Time Series Offset (TSO)** is similar to the previous **Time Series Period (TSP)**. However, the time between samples is not periodic, and every sample has its own offset relative to the previous one.

This code also shows how you can combine modificators inside the TSO.

```yaml
- trigger_events:
  - $key: "events"
  - $tso:
    - type:
      - $enum:
        - deactivated
        - activated
```

The **CHESTER** C code will look like this:

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

Output **JSON** will be:

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
