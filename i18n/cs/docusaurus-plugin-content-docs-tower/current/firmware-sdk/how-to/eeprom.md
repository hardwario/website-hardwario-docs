---
slug: how-to-eeprom
title: "How To: EEPROM"
description: "Nebojte se omezeného počtu cyklů W/E. Za standardních podmínek čip garantuje 100 000 cyklů. Pamatujte, že tyto cykly jsou zápisové/mazací."
---
import Image from '@theme/IdealImage';

**EEPROM** je speciální druh paměti. Jde o malou (6 KB na čipu [**Core Module**](../../hardware-modules/about-core-module.md)) paměť s omezeným počtem **zápisových/mazacích cyklů**. Je to **nevolatilní paměť** – to znamená, že k uchování uložených informací nepotřebuje napájení. Bajty zapsané/uložené v EEPROM tedy **zůstanou na svém místě, dokud nejsou vymazány/přepsány** (i bez napájení)

:::info

Nebojte se omezeného počtu cyklů W/E. Za standardních podmínek čip garantuje **100 000 cyklů**. Pamatujte, že tyto cykly jsou **zápisové/mazací**.

Čtení z EEPROM se nepočítá, takže je zcela **bezpečné číst** z ní, kolikrát chcete.

:::


## Odkazy {#references}
- [**EEPROM SDK Module**](https://sdk.hardwario.com/group__twr__eeprom.html)
- Příklad v GitHub repozitáři

### Velikost EEPROM {#eeprom-size}
[**TOWER Core Module**](../../hardware-modules/about-core-module.md) obsahuje 6 KB EEPROM. Pokud potřebujete tuto hodnotu zjistit ve svém kódu, je v SDK k dispozici funkce: `size_t twr_eeprom_get_size(void)`

## Příklad čtení/zápisu {#readwrite-example}

:::info

  V tomto příkladu zapíšeme do EEPROM hodnotu typu float a řetězec hned po startu modulu Core Module. Při každém stisku tlačítka budou data z EEPROM přečtena a odeslána do počítače. Chcete-li vyzkoušet, že je paměť persistentní, můžete zkusit zakomentovat oba řádky `twr_eeprom_write` (poté, co původní příklad jednou spustíte).

  Mělo by to stále fungovat a debug by měl vypsat stejný řetězec.

:::

:::note

Vezměte prosím na vědomí, že některé naše moduly (aktuálně pouze modul `twr_radio_*`) používají **posledních několik desítek bajtů** v EEPROM. Pokud tyto moduly používáte, nezapomeňte využívat adresy paměti od **0 do 6000**.

Tím zajistíte, že žádná data nebudou přepsána.

:::

:::info

Očekávaný výstup níže uvedeného příkladu.

```bash showLineNumbers
EEPROM size: 6144
Data:
3.141590
hello world!
```

:::

<details>
<summary>
<b>
Příklad testovacího kódu pro EEPROM
</b>
</summary>
<p>




  ```c showLineNumbers
  #include <application.h>

  twr_button_t button;

  void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
  {
      (void) self;
      (void) event_param;

      if (event == TWR_BUTTON_EVENT_PRESS)
      {
          size_t eeprom = twr_eeprom_get_size();
          char readEeprom[13];
          float readFloat;

          twr_eeprom_read(0, &readFloat, 4);
          twr_eeprom_read(4, readEeprom, 12);
          readEeprom[12] = '\0';

          twr_log_debug("EEPROM size: %d\r\nData:\r\n%f\r\n%s", eeprom, readFloat, readEeprom);
      }
  }

  void application_init(void)
  {
      twr_log_init(TWR_LOG_LEVEL_DEBUG, TWR_LOG_TIMESTAMP_ABS);

      float toWriteFloat = 3.14159;
      char toWrite[] = "hello world!";
      twr_eeprom_write(0, &toWriteFloat, sizeof(toWriteFloat));
      twr_eeprom_write(sizeof(toWriteFloat), toWrite, sizeof(toWrite));

      // Initialize button
      twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, false);
      twr_button_set_event_handler(&button, button_event_handler, NULL);
  }
  ```

</p>
</details>
