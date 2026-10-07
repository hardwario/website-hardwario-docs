---
slug: how-to-eeprom
title: "Jak na: EEPROM"
---
import Image from '@theme/IdealImage';

**EEPROM** je zvláštní druh paměti. Jde o malou paměť (na čipu modulu [**Core Module**](../../hardware-modules/about-core-module.md) má 6 KB) s omezeným počtem **zápisových a mazacích cyklů**. Je to **nevolatilní paměť**, takže k uchování dat nepotřebuje napájení. Bajty zapsané do EEPROM tedy **zůstanou uložené, dokud je nevymažete nebo nepřepíšete** (i bez napájení).

:::info

Omezeného počtu cyklů W/E se nebojte. Za standardních podmínek čip zaručuje **100 000 cyklů**. Počítají se jen cykly **zápisu a mazání**.

Čtení z EEPROM se nepočítá, takže z ní můžete **bez obav číst**, kolikrát chcete.

:::


## Odkazy {#references}
- [**Modul SDK pro EEPROM**](https://sdk.hardwario.com/group__twr__eeprom.html)
- Příklad v repozitáři na GitHubu

### Velikost EEPROM {#eeprom-size}
Modul [**TOWER Core Module**](../../hardware-modules/about-core-module.md) má 6 KB EEPROM. Pokud potřebujete tuto hodnotu zjistit v kódu, použijte funkci SDK `size_t twr_eeprom_get_size(void)`.

## Příklad čtení/zápisu {#readwrite-example}

:::info

  V tomto příkladu hned po startu modulu Core Module zapíšeme do EEPROM hodnotu typu float a řetězec. Při každém stisknutí tlačítka se data z EEPROM přečtou a odešlou do počítače. Že paměť data uchová, si ověříte tak, že (po prvním spuštění původního příkladu) zakomentujete oba řádky `twr_eeprom_write`.

  Příklad by měl fungovat dál a v ladicím výpisu by se měl objevit stejný řetězec.

:::

:::note

Některé naše moduly (zatím jen modul `twr_radio_*`) používají **posledních několik desítek bajtů** EEPROM. Pokud je používáte, pracujte jen s adresami od **0 do 6000**.

Žádná data se tak nepřepíšou.

:::

:::info

Očekávaný výstup příkladu níže:

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
Příklad kódu: test EEPROM
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
