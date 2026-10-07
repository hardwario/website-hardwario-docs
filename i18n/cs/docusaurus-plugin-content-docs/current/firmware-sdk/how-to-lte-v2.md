---
slug: how-to-lte-v2
title: "Jak na: LTE v2"
---
import Image from '@theme/IdealImage';

# Jak na: LTE v2 {#how-to-lte-v2}

Tento článek ukazuje, jak převést existující firmware zařízení CHESTER na LTE v2 a [Cloud v2](/cloud/).

LTE v2 používá novější protokol nad UDP, který podporuje zprávy přes downlink a sám se stará o fragmentaci, potvrzování a autentizaci paketů (autentizačním kódem zprávy založeným na SHA-256). Protokol popisuje stránka [**Protokol zařízení (FLAP)**](/cloud/device-protocol/).

Zprávy přes downlink, včetně konfiguračních, můžete posílat přes API nebo z uživatelského rozhraní HARDWARIO Cloud v2.

Konfigurační zprávy `app config ...` můžete poslat do každého zařízení s LTE v2. Do aplikace nemusíte nic přidávat, o vše se postará subsystém `ctr_cloud`.

Všechny katalogové aplikace ve složce `applications/*` v CHESTER SDK už jsou převedené na Cloud v2, takže se jimi můžete inspirovat.

## Příklady firmwaru CHESTER LTE v2 {#chester-lte-v2-firmware-examples}

### Demo {#demo}

Jednoduchý příklad, ke kterému stačí základní deska CHESTER-M: posílá data uplinkem a downlinkem přijímá příkazy pro ovládání LED nebo změnu konfigurace.

Až [aktualizujete firmware modemu LTE](#flash-lte-modem-firmware) na verzi `v1.7.0` nebo vyšší, nahrajte do MCU APP/BLE aplikaci CHESTER Demo nástrojem [HARDWARIO CLI](../developer-tools/command-line-tools.md) příkazem:

`hardwario chester app flash f702b81a61a54cd984b4ee0e594e65df`

https://github.com/hardwario/chester-sdk/tree/main/applications/demo

### CHESTER Control {#chester-control}

Jde o vylepšenou aplikaci [CHESTER Input](../catalog-applications/legacy/chester-input.md).

Až [aktualizujete firmware modemu LTE](#flash-lte-modem-firmware) na verzi `v1.7.0` nebo vyšší, nahrajte do MCU APP/BLE aplikaci CHESTER Control nástrojem [HARDWARIO CLI](../developer-tools/command-line-tools.md) příkazem:

`hardwario chester app flash a1201384db424cb394b5e9130293f708`

https://github.com/hardwario/chester-sdk/tree/main/applications/control

- Přidány rekonfigurovatelné vstupy: kterýkoli ze 4 vstupů můžete přenastavit na měření napětí nebo proudu, čítání impulzů nebo reakci na změnu logické úrovně.
- Přidána možnost řízení: modul [CHESTER-X4](../extension-modules/chester-x4.md) ve slotu B spíná 4 výstupy napájené z externího stejnosměrného zdroje.

Projekt obsahuje i [ukázkové skripty](https://github.com/hardwario/chester-sdk/tree/main/applications/control/codec), které ukazují, jak pomocí `curl` posílat downlinkem konfiguraci a zprávy.

Konfigurace je v aplikaci CHESTER Control definovaná makry: parametry definujete jen v souboru `app_config.h` a obsluhu nastavení, příkazy shellu a nápovědu z nich vygenerují makra.

### Ostatní katalogové aplikace {#other-catalogue-apps}

Všechny katalogové aplikace ve složce `applications/*` v CHESTER SDK už jsou převedené na Cloud v2, takže se jimi můžete inspirovat. Můžete také použít hotový [**firmware**](/chester/catalog-applications/catalog-applications/#application-firmware).

## Změny pro LTE v2 {#changes-for-lte-v2}

### Nahrání firmwaru modemu LTE {#flash-lte-modem-firmware}

Modem LTE je potřeba aktualizovat na verzi `v1.7.0` nebo vyšší. Tento firmware není zpětně kompatibilní s verzí `v1.3.0`, která slouží jen pro starší LTE v1.

Postupujte podle článku [Modem LTE přes J-Link](../firmware-flashing/lte-modem-over-j-link.md) a [stáhněte firmware v1.7.0](pathname:///download/hio-chester-lte-v1.7.0.zip).

### Konfigurace projektu {#project-configuration}
Do souboru `prj.conf` přidejte `CONFIG_CTR_CLOUD=y`.

V souboru `CMakeLists.txt` změňte shield z `ctr_lte` na `ctr_lte_v2`.

### Dekodéry a enkodéry {#decoders-and-encoders}

:::info

Jako příklad, jak nové soubory kodeků vypadají, použijte projekty [Demo](#demo) a [CHESTER Control](#chester-control).

:::

Ve složce `codec` aktualizujte `cbor-decoder.yaml` a volitelně vytvořte `cbor-encoder.yaml`.

V souborech `.yaml` enkodéru a dekodéru se změnilo toto:
- Přidána hlavička.
- Jsou plně hierarchické: definujete celý strom, ze kterého pak vznikne JSON.
- [Modifikátory](how-to-cbor.md#modificators) jako `div`, `fpp`, `key`, `tso`,… mají teď předponu `$`.

Ze souborů YAML se příkazem `west gen-codec` vygeneruje hlavičkový soubor C (`.h`). Příkaz spusťte ve složce aplikace (tam, kde spouštíte `west build`).

Místo do ~~`msg_key.h`~~ se YAML teď generuje do souboru `src/app_codec.h`.

Upravte `app_cbor.c` podle nových hierarchických definic. Úrovně se oddělují dvojitým podtržítkem, například `CODEC_KEY_E_NETWORK__PARAMETER__EEST`.
Nezapomeňte také vložit nový hlavičkový soubor `#include "app_codec.h"`.

### Inicializace {#initialization}

S LTE v2 jsme přidali další vrstvu `ctr_cloud`, kterou používáte místo ~~`ctr_lte`~~.

Do souboru `app_init.c` přidejte `#include <chester/ctr_cloud.h>` a použijte `ctr_cloud_init()` místo ~~`ctr_lte_start()`~~.

Volitelně můžete:

- Funkcí `ctr_cloud_set_callback()` nastavit callback pro zprávy přes downlink.
- Funkcí `ctr_cloud_set_pull_interval()` nastavit interval dotazování, tedy jak často se zařízení CHESTER samo ptá cloudu na čekající zprávy přes downlink.
- Použít `ctr_cloud_wait_initialized(K_FOREVER)`, které pozastaví hlavní úlohu, dokud se nenaváže spojení s cloudem a neodešlou se všechny kodeky a konfigurace.

### Odesílání dat {#send-data}

Místo ~~`ctr_lte_send()`~~ nyní volejte `ctr_cloud_send()`. Vložte nový hlavičkový soubor `#include <chester/ctr_cloud.h>`.

V projektu Demo jsme také odstranili soubor `app_send.c`, protože jen vytvářel nový worker, který nebyl potřeba. Odesílání je nyní v `app_work.c`.

Funkce `ctr_cloud_send()` je teď blokující, takže z návratového kódu poznáte, jestli se data odeslala. Callback už není potřeba, a odpadá tak i složitost asynchronního zpracování.

### IP a port {#ip-and-port}

Pro SIM karty Vodafone použijte APN `hardwario`, IP `192.168.192.4` a port `5002`. Nepoužívejte předchozí název APN ~~`hardwario.com`~~.

U ostatních operátorů jdou data přes veřejný internet, proto nastavte veřejnou IP adresu serveru `20.101.123.47`; port zůstává stejný (`5002`).
