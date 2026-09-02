---
title: Data
description: "Downlink typu data posílá do zařízení objekt JSON. Váš firmware jej dekóduje"
---

# Data {#data}

Downlink typu **data** posílá do zařízení objekt JSON. Váš firmware jej dekóduje
do struktury s vyplněnými hodnotami — použijte jej k ovládání výstupů, změně
požadované hodnoty nebo ke spuštění akce.

## Odeslání data downlinku {#send-a-data-downlink}

1. Otevřete u zařízení sekci **Messages** a klikněte na **+&nbsp;SCHEDULE DOWNLINK**.
2. Nastavte **Message type** na **data**.
3. Zadejte JSON **Body**, který váš firmware očekává, a klikněte na **SEND**.

![Dialog "Schedule downlink" s typem zprávy "data" a tělem ve formátu JSON](../../../../../cloud/downlink/images/downlink-data.png)

Například aplikace CHESTER Control se čtyřmi výstupy může přijímat:

```json
{
  "output_1_state": 0,
  "output_2_state": 0,
  "output_3_state": 0,
  "output_4_state": 0
}
```

Konkrétní klíče závisí na firmwaru vašeho zařízení. Stejně jako každý downlink je
i tato zpráva **zařazena do fronty** a doručena při dalším startu zařízení, při
odeslání uplinku nebo při dotazu zařízení na HARDWARIO Cloud.
