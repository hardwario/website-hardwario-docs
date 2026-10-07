---
slug: applications
title: Aplikace
---
import Image from '@theme/IdealImage';

# Aplikace {#applications}

V podsložce `applications\` v SDK najdete kompletní kód našich [**katalogových aplikací**](../catalog-applications/index.md). Kód můžete upravit, doplnit o další funkce nebo podle struktury projektu vyvinout vlastní aplikaci.

Funkce aplikace rozdělujeme do samostatných souborů. Tento styl dodržovat nemusíte, doporučujeme ho ale proto, abyste později mohli do svého kódu snadno převzít vylepšené funkce z katalogových aplikací.

## Soubory projektu {#project-files}

Co který soubor projektu dělá, popisuje tabulka níže.

| Soubor                             | Popis                                                                                       |
| ---------------------------------- | ------------------------------------------------------------------------------------------- |
| app_backup.c <br /> app_backup.h   | Funkce záložní baterie modulu CHESTER-Z1                                                    |
| app_cbor.c <br /> app_cbor.h       | Kódování binárních dat do CBOR, převod do JSON pak udělá cloud (jen LTE)                    |
| app_config.c <br /> app_config.h   | Konfigurační volby pro příkaz shellu `app config` + obsluha vlastních příkazů shellu         |
| app_data.c <br /> app_data.h       | Struktury s naměřenými daty připravenými k odeslání                                         |
| app_handler.c <br /> app_handler.h | Obsluha callbacků pro LTE nebo CHESTER-Z1                                                   |
| app_init.c <br /> app_init.h       | Inicializace aplikace                                                                       |
| app_power.c <br /> app_power.h     | Měření napětí vnitřní baterie desky CHESTER-M                                               |
| app_send.c <br /> app_send.h       | Funkce LTE/LoRaWAN pro odeslání dat                                                         |
| app_sensor.c <br /> app_sensor.h   | Vzorkování a agregace dat ze senzorů aplikace                                               |
| app_shell.c                        | Příkazy shellu                                                                              |
| app_work.c <br /> app_work.h       | Workery a časovače, které spouštějí měření                                                  |
| main.c                             | Vstupní bod aplikace, blikání LED                                                           |
| msg_key.h                          | Automaticky generováno příkazem `west build` na základě `codec/cbor-decoder.yaml`           |

## Průběh aplikace {#application-flow}

### main.c {#mainc}
Běh programu začíná v `main.c` voláním funkce `app_init()`. Ta vytvoří všechna ostatní vlákna; `main.c` pak už jen obnovuje watchdog a bliká LED.

### app_init.c {#appinitc}
Tento soubor inicializuje všechny subsystémy a hardware. Zároveň rozsvítí červenou LED a čeká, dokud se zařízení úspěšně nepřipojí k síti LTE (LTE Attach). Pak červená LED zhasne a kód pokračuje.

Důležitá je funkce `app_work_init()`, která vytváří časovače pro odesílání reportů a pro vzorkování a agregaci dat ze senzorů.

### app_work.c {#appworkc}

Tento soubor obsahuje hlavní funkce a logiku aplikace.

Každá periodická akce (reportování, vzorkování, agregace) má vlastní časovač. Obsluhy časovačů běží v kontextu přerušení, a proto ke každému časovači vytvořenému makrem `K_TIMER_DEFINE` patří odpovídající worker vytvořený makrem `K_WORK_DEFINE`. Z workeru pak můžeme volat libovolné funkce a používat API s čekáním a blokováním.

Funkce `app_work_init()` nastaví časovače podle konfiguračních voleb, například `g_app_config.interval_sample`.

Když časovač vyprší, zavolají se funkce pro vzorkování nebo agregaci ze souboru `app_sensor.c`.
Když vyprší časovač reportu, zavolá se funkce `app_send()` ze souboru `app_send.c`.

### app_sensor.c {#appsensorc}

Podíváme-li se například na soubor `app_sensor.h` aplikace CHESTER Clime, najdeme tam tyto funkce pro senzor vlhkosti:

```
int app_sensor_hygro_sample(void);
int app_sensor_hygro_aggreg(void);
int app_sensor_hygro_clear(void);
```

Tyto funkce volají workery v `app_work.c`.

Funkce `*_sample` změří hodnotu a přidá ji do svého interního bufferu (viz struktura `app_data_hygro` a pole `sample_*` v `app_data.h`).

Funkce `*_aggreg` agreguje naměřená data v bufferu: počítá minimum, maximum, průměr a medián.
Tyto 4 hodnoty uloží spolu s aktuálním časovým razítkem do struktury `measurements` ve struktuře `app_data_hygro` v `app_data.h`.

Funkce `*_clear` se volá hned po odeslání naměřených dat, aby uvolnila místo pro nové agregace. Volá ji funkce `send_work_handler()`.

Když vyprší časovač reportu, zavolá se funkce `app_send()` z `app_send.c`.

### app_send.c {#appsendc}

V některých aplikacích se tato funkce větví podle varianty (LTE nebo LoRaWAN), viz funkce `compose()`.

U LTE/NB-IoT se volá funkce `app_cbor_encode()` ze souboru `app_cbor.c`. Ta zakóduje všechna data ze struktur měření do CBOR a HARDWARIO Cloud
je později převede do JSON.

Ve variantě aplikace pro LoRaWAN vytváříme binární data funkcemi `ctr_buf`. CBOR u LoRaWAN nepoužíváme, protože payload LoRaWAN musí být v některých regionech opravdu malý a data je potřeba kódovat co nejúsporněji.

## Přidání senzoru {#adding-sensor}

- Povolte senzor v `prj.conf` nebo přidejte shield v `CMakeLists.txt`
- Přidejte inicializaci senzoru do `app_init()`
- Vytvořte datové struktury senzoru pro vzorky a měření v `app_data.h`
- Vytvořte funkce `*_sample`, `*_aggreg` a `*_clear` v `app_sensor.c/h`
- Použijte existující nebo vytvořte nové časovače v `app_work.c`, které volají výše uvedené funkce `app_sensor`
- Zavolejte funkci `*_clear` v `send_work_handler()`
- V případě potřeby vytvořte nové položky YAML v `codec/cbor-decoder.yaml`. Soubor `msg_key.h` se po `west build` vygeneruje znovu
- Nahrajte aktualizovaný kodek do HARDWARIO Cloud příkazem `hardwario cloud codec upload ...`
- Zakódujte naměřená data do CBOR v `app_cbor.c`

## Přidání konfigurační volby do shellu {#adding-shell-config-option}

- Přidejte novou položku do struktury `app_config` v `app_config.h`
- Chcete-li nastavit jinou výchozí hodnotu než nula/false, přidejte inicializaci do `m_app_config_interim` v `app_config.c`
- Vytvořte definici a implementaci nové funkce `app_config_cmd_config_*` v souborech `app_config.c/h`
- Přidejte do `app_shell.c` nový příkaz shellu pomocí `SHELL_CMD_ARG`
- Vytvořte novou funkci pro výpis a přidejte ji do `app_config_cmd_config_show`, která se volá po zadání příkazu shellu `app config show`
- Přidejte vytvořenou proměnnou do seznamu ukládaných a načítaných konfiguračních voleb pomocí `SETTINGS_SET_SCALAR` a `EXPORT_FUNC_SCALAR`
