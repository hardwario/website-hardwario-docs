---
slug: how-to-lte-v2
title: "Jak na: LTE v2"
description: "Tento článek ukazuje, jak upgradovat existující firmware pro zařízení CHESTER na LTE v2 a Cloud v2."
---
import Image from '@theme/IdealImage';

# Jak na: LTE v2 {#how-to-lte-v2}

Tento článek ukazuje, jak upgradovat existující firmware pro zařízení CHESTER na LTE v2 a [Cloud v2](../../cloud/).

LTE v2 používá novější UDP protokol, který podporuje downlink zprávy a automaticky se stará o fragmentaci, potvrzování a podepisování paketů pomocí SHA-256.

Downlink zprávy nebo konfigurační zprávy lze posílat přes API nebo v uživatelském rozhraní HARDWARIO Cloud v2.

Konfigurační zprávy `app config ...` lze poslat na jakékoli zařízení používající LTE v2. Není potřeba nic přidávat do vaší aplikace, o vše se postará subsystém `ctr_cloud`.

Aktuálně jsou už všechny katalogové aplikace ve složce `applications/*` v CHESTER SDK migrované na Cloud v2 a můžete se jimi inspirovat.

## Příklady firmwaru CHESTER LTE v2 {#chester-lte-v2-firmware-examples}

### Demo {#demo}

Jednoduchý příklad, kde potřebujete jen základní desku CHESTER-M a můžete odesílat data uplinkem a příkazy downlinkem pro změnu LED nebo změnu konfigurace.

Po [nahrání firmwaru LTE modemu](#flash-lte-modem-firmware) na verzi `v1.7.0` nebo vyšší můžete nahrát do APP/BLE MCU aplikaci CHESTER Demo pomocí [HARDWARIO CLI](../developer-tools/command-line-tools.md) zadáním:

`hardwario chester app flash f702b81a61a54cd984b4ee0e594e65df`

https://github.com/hardwario/chester-sdk/tree/main/applications/demo

### CHESTER Control {#chester-control}

Jde o vylepšenou aplikaci [CHESTER Input](../catalog-applications/legacy/chester-input.md).

Po [nahrání firmwaru LTE modemu](#flash-lte-modem-firmware) na verzi `v1.7.0` nebo vyšší můžete nahrát do APP/BLE MCU aplikaci CHESTER Control pomocí [HARDWARIO CLI](../developer-tools/command-line-tools.md) zadáním:

`hardwario chester app flash a1201384db424cb394b5e9130293f708`

https://github.com/hardwario/chester-sdk/tree/main/applications/control

- Přidány rekonfigurovatelné vstupy: kterýkoli ze 4 vstupů můžete přenastavit na měření napětí, proudu, počítání pulzů nebo reakci na změnu logické úrovně.
- Přidána možnost řízení s modulem [CHESTER-X4](../extension-modules/chester-x4.md) ve slotu B pro přepínání 4 výstupů napájených z externího DC napájení.

Projekt také obsahuje [ukázkové skripty](https://github.com/hardwario/chester-sdk/tree/main/applications/control/codec), jak posílat downlink konfiguraci a zprávy pomocí `curl`.

CHESTER Control také obsahuje definice konfigurace pomocí maker. Konfigurační parametry tedy definujete pouze v souboru `app_config.h` a nastavení, shell a příkazy nápovědy se generují makry.

### Ostatní katalogové aplikace {#other-catalogue-apps}

Aktuálně jsou už všechny katalogové aplikace ve složce `applications/*` v CHESTER SDK migrované na Cloud v2 a můžete se jimi inspirovat. Nebo použijte předpřipravený [**firmware**](../catalog-applications/catalog-applications#application-firmware)

## Změny pro LTE v2 {#changes-for-lte-v2}

### Nahrání firmwaru LTE modemu {#flash-lte-modem-firmware}

LTE modem je potřeba aktualizovat na verzi `v1.7.0` nebo vyšší. Tento firmware není zpětně kompatibilní s verzí `v1.3.0`, která je pouze pro starší LTE v1.

Postupujte podle článku [LTE modem přes J-Link](../firmware-flashing/lte-modem-over-j-link.md) a [stáhněte firmware v1.7.0](pathname:///download/hio-chester-lte-v1.7.0.zip).

### Konfigurace projektu {#project-configuration}
Do souboru `prj.conf` přidejte `CONFIG_CTR_CLOUD=y`.

V souboru `CMakeLists.txt` změňte shield z `ctr_lte` na `ctr_lte_v2`.

### Dekodéry a enkodéry {#decoders-and-encoders}

:::info

Jako příklad, jak nové soubory kodeků vypadají, použijte projekty [Demo](#demo) a [CHESTER Control](#chester-control).

:::

Ve složce `codec` aktualizujte `cbor-decoder.yaml` a volitelně vytvořte `cbor-encoder.yaml`

Soubory `.yaml` enkodéru a dekodéru mají nyní tyto změny:
- Přidána hlavička.
- Nyní jsou plně hierarchické. Musíte definovat kompletní strom, který se pak stane JSON.
- [Modifikátory](how-to-cbor.md#modificators) jako `div`, `fpp`, `key`, `tso`,… mají nyní prefix `$`.

YAML soubory se generují do C souboru `.h` pomocí příkazu `west gen-codec` spuštěného ve složce vaší aplikace (kde spouštíte `west build`).

Místo ~~`msg_key.h`~~ se nyní YAML generuje do souboru `src/app_codec.h`.

Aktualizujte svůj `app_cbor.c` na nové hierarchické definice. Každá úroveň je oddělena dvojitým podtržítkem, například `CODEC_KEY_E_NETWORK__PARAMETER__EEST`.
Nezapomeňte také vložit nový hlavičkový soubor `#include "app_codec.h"`.

### Inicializace {#initialization}

S LTE v2 jsme přidali další vrstvu `ctr_cloud`, kterou používáte místo ~~`ctr_lte`~~.

Do souboru `app_init.c` přidejte `#include <chester/ctr_cloud.h>` a použijte `ctr_cloud_init()` místo ~~`ctr_lte_start()`~~.

Volitelně můžete:

- Zavolat `ctr_cloud_set_callback()` pro nastavení callbacku pro downlink zprávy
- Nastavit interval dotazování pomocí `ctr_cloud_set_pull_interval()`, který definuje, jak často se zařízení CHESTER automaticky dotazuje Cloudu na zařazené downlink zprávy.
- Použít `ctr_cloud_wait_initialized(K_FOREVER)`, které zastaví hlavní úlohu, dokud není navázáno spojení s cloudem a odeslány všechny kodeky a konfigurace.

### Odesílání dat {#send-data}

Místo ~~`ctr_lte_send()`~~ nyní volejte `ctr_cloud_send()`. Vložte nový `#include <chester/ctr_cloud.h>`

V projektu Demo jsme také odstranili soubor `app_send.c`, protože pouze vytvářel nového workera, aniž by ho bylo skutečně potřeba. Odesílání je nyní v `app_work.c`.

Funkce `ctr_cloud_send()` je nyní blokující, takže návratový kód říká, zda byla data úspěšně odeslána, nebo ne. Není nyní potřeba žádný callback, což také přidávalo další asynchronní složitost.

### IP a port {#ip-and-port}

Pro SIM karty Vodafone použijte APN `hardwario`, IP `192.168.192.4` a port `5002`. Nepoužívejte předchozí název APN ~~`hardwario.com`~~.

U ostatních operátorů jdou data přes veřejný internet, musíte nastavit veřejnou IP serveru `20.101.123.47` a port je stejný `5002`.
