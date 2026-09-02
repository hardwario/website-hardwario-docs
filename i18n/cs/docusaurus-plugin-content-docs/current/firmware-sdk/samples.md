---
slug: samples
title: Ukázky
description: "V podsložce SDK samples\\ najdete mnoho ukázek vysvětlujících práci s různými senzory a subsystémy. Každá ukázka je samostatný projekt, který můžete zkompilovat a nahrát do zařízení CHESTER."
---
import Image from '@theme/IdealImage';

# Ukázky {#samples}

V podsložce SDK `samples\` najdete mnoho ukázek vysvětlujících práci s různými senzory a subsystémy. Každá ukázka je samostatný projekt, který můžete zkompilovat a nahrát do zařízení CHESTER.

| Ukázka            | Poznámka                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| accel             | Příklad s akcelerometrem                                                                                     |
| adc               | Analogově-digitální převodník                                                                                |
| blinky            | Blikání LED                                                                                                  |
| chester_c2        | **CHESTER-C2**                                                                                               |
| chester_k         | **CHESTER-K1** 4kanálový diferenciální vstup                                                                 |
| chester_s1        | **CHESTER-S1** teplota, vlhkost, tlak, CO2, PIR senzor, tlačítko                                             |
| chester_x0        | [**CHESTER-X0**](../extension-modules/chester-x0.md) (4kanálový vstup/výstup)                                |
| chester_x2        | [**CHESTER-X2**](../extension-modules/chester-x2.md) (sériová komunikace RS-485 a TTL UART)                   |
| chester_x2_loop   | [**CHESTER-X2**](../extension-modules/chester-x2.md) příklad TX/RX smyčky                                     |
| chester_x3        | [**CHESTER-X3**](../extension-modules/chester-x3.md) (přesný ADC, RTD, PT1000, tenzometr)                     |
| chester_x4        | [**CHESTER-X4**](../extension-modules/chester-x4.md) Snižující DC/DC s ADC a 4 napájecími výstupy            |
| chester_x7        | [**CHESTER-X7**](../extension-modules/chester-x7.md) Jednokanálový diferenciální vstup                        |
| chester_z         | **CHESTER-Z1** Záložní modul s dobíjecí baterií, DC/DC převodníkem a nabíječkou                              |
| ctr_barometer_tag | Podpora Barometer Tag ze sady TOWER Kit                                                                       |
| ctr_batt          | Měření napětí baterie **CHESTER-M** v klidu nebo při zátěži                                                   |
| ctr_ble           | BLE advertising                                                                                              |
| ctr_ble_scan      | BLE skener                                                                                                   |
| ctr_buf           | Použití `ctr_buf` pro zabalení čísel, řetězců a dat do binární struktury                                     |
| ctr_edge          | Přerušení na pinech                                                                                          |
| ctr_edge_x0       | Přerušení na pinech modulu [**CHESTER-X0**](../extension-modules/chester-x0.md)                               |
| ctr_info          | Čtení informací o zařízení z bloku PIB (sériové číslo, varianta, …)                                          |
| ctr_lte_if_v2     | Příklad použití knihovny LTE_v2                                                                              |
| ctr_machine_probe | Čtení teploty, vlhkosti, osvětlení, magnetometru a akcelerometru ze **Machine Probe**                          |
| ctr_meteo         | Čtení rychlosti a směru větru a srážek z meteostanice                                                        |
| ctr_soil_sensor   | Čtení vlhkosti a teploty ze senzoru **Soil Sensor**                                                           |
| ds18b20           | Čtení teploty z několika 1-Wire teplotních senzorů DS18B20                                                   |
| ds2484            |                                                                                                              |
| expander          | Příklad s GPIO expanderem TCA9534A                                                                           |
| gnss              | Příklad GNSS pro získání údajů o poloze                                                                      |
| gpio              | Zápis na GPIO piny                                                                                           |
| hygro             | Čtení teploty a vlhkosti ze senzoru hygro na CHESTER-S2                                                       |
| i2c_master        | Příklad komunikace I2C v režimu master                                                                       |
| i2c_slave         | Příklad komunikace I2C v režimu slave                                                                        |
| lrw               | Příklad LoRaWAN                                                                                              |
| lte               | Příklad LTE                                                                                                  |
| lte_cbor          | Příklad LTE s kódováním CBOR do JSON                                                                         |
| modbus            | Příklad čtení RS-485 Modbus                                                                                  |
| opt3001           | Příklad luxmetru OPT3001 pro čtení osvětlení                                                                 |
| people_counter    |                                                                                                              |
| pt1000            | Čtení teploty RTD s modulem [**CHESTER-X3**](../extension-modules/chester-x3.md) a senzorem PT1000            |
| rfmux             | Přepínání RFMUX mezi LTE/LoRaWAN a interní/externí antenou                                                   |
| sensor_pnp_npn    | Detekce změny vstupního pinu modulu [**CHESTER-X0**](../extension-modules/chester-x0.md) pomocí `ctr_edge`    |
| sleep             | Nízkopříkonový příklad pro test spotřeby v nečinnosti                                                        |
| sleep_chester_x2  | Nízkopříkonový příklad pro test spotřeby v nečinnosti s [**CHESTER-X2**](../extension-modules/chester-x2.md)  |
| therm             | Čtení teploty z teplotního senzoru na desce CHESTER-M                                                        |
| wdog              | Příklad watchdogu                                                                                            |
| weight_scale      |                                                                                                              |
