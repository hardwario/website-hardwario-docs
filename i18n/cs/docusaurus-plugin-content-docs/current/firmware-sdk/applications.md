---
slug: applications
title: Aplikace
description: "V podsložce SDK applications\\ získáte přístup ke kompletnímu kódu našich katalogových aplikací. Kód můžete upravit, doplnit funkcionalitu nebo na základě struktury projektu vyvinout vlastní aplikaci."
---
import Image from '@theme/IdealImage';

# Aplikace {#applications}

V podsložce SDK `applications\` získáte přístup ke kompletnímu kódu našich [**katalogových aplikací**](../catalog-applications/index.md). Kód můžete upravit, doplnit funkcionalitu nebo na základě struktury projektu vyvinout vlastní aplikaci.

Funkce aplikace rozdělujeme do jednotlivých souborů. Tento styl nemusíte dodržovat. Doporučujeme ho však proto, abyste mohli v budoucnu snadno znovu použít vylepšenou funkcionalitu z katalogových aplikací ve svém kódu.

## Soubory projektu {#project-files}

V textu níže vysvětlujeme, co dělá každý soubor v projektu.

| Soubor                             | Popis                                                                                       |
| ---------------------------------- | ------------------------------------------------------------------------------------------- |
| app_backup.c <br /> app_backup.h   | Funkce zálohování baterie pro CHESTER-Z1                                                    |
| app_cbor.c <br /> app_cbor.h       | Kódování binárních dat do CBOR, cloud pak provede převod do JSON (pouze LTE)                |
| app_config.c <br /> app_config.h   | Možnosti konfigurace používané příkazem shellu `app config` + obslužné rutiny vlastních příkazů shellu |
| app_data.c <br /> app_data.h       | Struktury s naměřenými daty připravenými k odeslání                                         |
| app_handler.c <br /> app_handler.h | Obslužné rutiny zpětných volání pro LTE nebo CHESTER-Z1                                     |
| app_init.c <br /> app_init.h       | Inicializace aplikace                                                                       |
| app_power.c <br /> app_power.h     | Měření napětí interní baterie CHESTER-M                                                     |
| app_send.c <br /> app_send.h       | Funkce LTE/LoRaWAN pro odeslání dat                                                         |
| app_sensor.c <br /> app_sensor.h   | Vzorkování a agregace senzorů aplikace                                                      |
| app_shell.c                        | Příkazy shellu                                                                              |
| app_work.c <br /> app_work.h       | Workery a časovače, které spouštějí měření                                                  |
| main.c                             | Vstupní bod aplikace, blikání LED                                                           |
| msg_key.h                          | Automaticky generováno příkazem `west build` na základě `codec/cbor-decoder.yaml`           |

## Průběh aplikace {#application-flow}

### main.c {#mainc}
Kód začíná v `main.c`, kde je volána funkce `app_init()`. V této funkci `app_init()` jsou vytvořena všechna ostatní vlákna a jediné, co `main.c` poté dělá, je krmení watchdogu a blikání LED.

### app_init.c {#appinitc}
V tomto souboru jsou inicializovány všechny subsystémy a hardware. Rovněž se rozsvítí červená LED a kód čeká, dokud není LTE Attach úspěšný. Poté červená LED zhasne a kód pokračuje.

Důležitý kód je volán v `app_work_init()`, který vytváří časovače pro odesílání reportů a pro vzorkování/agregaci senzorů.

### app_work.c {#appworkc}

Tento soubor obsahuje hlavní funkcionalitu a logiku aplikace.

Každá periodická akce (reportování, vzorkování, agregace) má vytvořen vlastní časovač. Obslužné rutiny časovačů jsou volány v kontextu přerušení, takže ke každému časovači vytvořenému pomocí `K_TIMER_DEFINE` máme odpovídající worker vytvořený pomocí `K_WORK_DEFINE`. Tímto způsobem můžeme z workeru volat libovolné funkce a používat API s čekáním a blokováním.

Ve funkci `app_work_init()` jsou časovače nastaveny na základě konfiguračních možností, jako je `g_app_config.interval_sample`.

Když je časovač spuštěn, jsou volány funkce vzorkování nebo agregace ze souboru `app_sensor.c`.
Když je spuštěn časovač reportu, je volána funkce `app_send()` v souboru `app_send.c`.

### app_sensor.c {#appsensorc}

Podíváme-li se například na soubor `app_sensor.h` aplikace CHESTER Clime, najdeme tam tyto funkce pro senzor vlhkosti:

```
int app_sensor_hygro_sample(void);
int app_sensor_hygro_aggreg(void);
int app_sensor_hygro_clear(void);
```

Tyto funkce jsou volány z workerů v `app_work.c`.

Funkce s `*_sample` provede měření a přidá naměřenou hodnotu do svého interního bufferu (viz struktura `app_data_hygro` a pole `sample_*` v `app_data.h`).

Funkce s `*_aggreg` provádí agregaci naměřených dat v bufferu. Počítá minimální, maximální, průměrnou a mediánovou hodnotu.
Tyto 4 hodnoty jsou spolu s aktuálním časovým razítkem uloženy do struktury `app_data_hygro` do struktury `measurements` v `app_data.h`.

Funkce s `*_clear` je volána ihned po odeslání naměřených dat, aby se uvolnilo místo pro nové agregace. Tato funkce je volána z `send_work_handler()`.

Když je spuštěn časovač reportu, je volána funkce `app_send()` z `app_send.c`.

### app_send.c {#appsendc}

Tato funkce se v některých aplikacích dělí podle varianty LTE nebo LoRaWAN. Viz funkce `compose()`.

Pro LTE/NB-IoT je volána funkce `app_cbor_encode()` ze souboru `app_cbor.c`. Tato funkce zakóduje všechna data ve strukturách měření do CBOR a HARDWARIO Cloud
tato data později převede do reprezentace JSON.

Pro variantu aplikace s LoRaWAN používáme funkce `ctr_buf` k vytvoření binárních dat LoRaWAN. Na LoRaWAN nepoužíváme CBOR, protože payload LoRaWAN by měl být v některých konkrétních regionech opravdu malý. Potřebujeme tedy maximální datovou efektivitu.

## Přidání senzoru {#adding-sensor}

- Povolte senzor v `prj.conf` nebo přidejte shield v `CMakeLists.txt`
- Přidejte inicializaci senzoru do `app_init()`
- Vytvořte datové struktury senzoru pro vzorky a měření v `app_data.h`
- Vytvořte funkce `*_sample`, `*_aggreg` a `*_clear` v `app_sensor.c/h`
- Použijte existující nebo vytvořte nové časovače v `app_work.c`, které volají výše uvedené funkce `app_sensor`
- Zavolejte funkci `*_clear` v `send_work_handler()`
- V případě potřeby vytvořte nové položky YAML v `codec/cbor-decoder.yaml`. Soubor `msg_key.h` bude po `west build` znovu vygenerován
- Nahrajte aktualizovaný kodek do HARDWARIO Cloud pomocí `hardwario cloud codec upload ...`
- Zakódujte naměřená data do CBOR v `app_cbor.c`

## Přidání konfigurační volby do shellu {#adding-shell-config-option}

- Přidejte novou položku do struktury `app_config` v `app_config.h`
- Chcete-li nastavit jinou výchozí hodnotu než nula/false, přidejte inicializaci do `m_app_config_interim` v `app_config.c`
- Vytvořte definici a implementaci nové funkce `app_config_cmd_config_*` v souborech `app_config.c/h`
- Přidejte nový příkaz shellu přidáním `SHELL_CMD_ARG` do `app_shell.c`
- Vytvořte a přidejte novou tiskovou funkci do `app_config_cmd_config_show`, která je volána, když zadáte příkaz shellu `app config show`
- Přidejte vytvořenou proměnnou do seznamu ukládaných a načítaných konfiguračních voleb pomocí `SETTINGS_SET_SCALAR` a `EXPORT_FUNC_SCALAR`
