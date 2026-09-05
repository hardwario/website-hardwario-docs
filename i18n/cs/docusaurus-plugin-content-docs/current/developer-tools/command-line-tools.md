---
slug: command-line-tools
title: Nástroje pro příkazovou řádku
description: "Pokud používáte Firmware SDK, není potřeba tento nástroj instalovat zvlášť. Instaluje se automaticky, když postupujete podle článků Firmware SDK > Instalace na ...."
---
import Image from '@theme/IdealImage';

# Nástroje HARDWARIO pro příkazovou řádku {#hardwario-command-line-tools}

:::caution

Pokud používáte **Firmware SDK**, není potřeba tento nástroj instalovat zvlášť. Instaluje se automaticky, když postupujete podle článků **[Firmware SDK](../category/firmware-sdk/) > Instalace na ...**.

:::

Nástroj HARDWARIO pro příkazovou řádku umožňuje:

- **Nahrát APP/BLE** aplikační firmware (nRF52)
- Zobrazit interaktivní terminál pro **konfiguraci** a **debugování**
- Přístup k **Product Information Block** (PIB) v UICR flash paměti, který obsahuje **HARDWARIO Serial Number** (HSN) a další parametry
- Aktualizovat firmware modemu (nRF9160)

## Instalace Pythonu {#install-python}

**HARDWARIO CLI** je nástroj v **Pythonu 3**. Nainstalujte Python podle níže uvedených kroků pro váš operační systém.

- **Ubuntu**: Python 3 by již měl být ve vašem OS nainstalován.

- **macOS**: Postupujte podle kapitoly [Instalace balíčků](firmware-sdk/../../firmware-sdk/installation-on-macos.md#install-package-manager) a nainstalujte Homebrew. Poté spusťte `brew install python3`.

- **Windows**: Postupujte podle kapitoly [Instalace Pythonu](firmware-sdk/../../firmware-sdk/installation-on-windows.md#install-python).

## Instalace HARDWARIO CLI {#install-hardwario-cli}

:::caution

Důrazně doporučujeme použít virtuální prostředí Pythonu, jak je vysvětleno v článcích o instalaci pro [Ubuntu](../firmware-sdk/installation-on-ubuntu.md), [macOS](../firmware-sdk/installation-on-macos.md) a [Windows](../firmware-sdk/installation-on-windows.md). Pomůže to zabránit konfliktům se závislostmi jiného balíčku.

Pokud však Python používáte/instalujete pouze pro HARDWARIO CLI, ke konfliktům balíčků Pythonu by dojít nemělo.

:::

HARDWARIO CLI nainstalujete zadáním následujícího příkazu v terminálu:

```
pip install hardwario
```

Po instalaci zkuste spustit následující příkaz:

```
hardwario --version
```

měli byste dostat podobnou odpověď:

```
hardwario.chester v1.23.0
hardwario.cloud v1.4.1
hardwario.common v1.7.2
```

## Aplikační firmware APP/BLE {#appble-application-firmware}

Připojte J-Link k [portu APP SWD](segger-j-link.md#segger-j-link-to-app-port-connection).

V této kapitole používáme příkazy `hardwario chester app`. Když zadáte předchozí příkaz, nástroj vám zobrazí všechny možné příkazy, takže si můžete prozkoumat dostupné volby.

### Interaktivní konzole {#interactive-console}

Interaktivní terminál otevřete příkazem `hardwario chester app console`.

### Nahrání obrazu {#image-flashing}

Firmware nahrajete příkazem `hardwario chester app flash <parameter>`.

Parametr `<parameter>` může být:

- Soubor **BIN** nebo **HEX**.
- Unikátní ID, které vám bylo zasláno e-mailem nebo z našich [firmwarů katalogových aplikací](../catalog-applications/index.md#application-firmware). Má tento formát: `34677881d57f4b0eb85507f176627bee`.

### Reset procesoru {#processor-reset}

Firmware resetujete příkazem `hardwario chester app reset`.

### Product Information Block {#product-information-block}

PIB je samostatný blok UICR flash paměti v NRF52, který obsahuje výrobně naprogramované informace o zařízení.

Data PIB přečtete příkazem `hardwario chester app pib read`.

```
Vendor name: HARDWARIO
Product name: CHESTER-M
Hardware variant: CDGLS
Hardware revision: R3.2
Serial number: 0000000000
Claim token: 98ae432aa12ea82458ed04b4816bf225
BLE passkey: 275889
```

Můžete také použít příkaz `write` v případě, že PIB omylem smažete. Nástroj se vás zeptá na každý parametr. Původní parametry najdete v poslední **JSON** zprávě v **HARDWARIO Cloud**.

## Firmware LTE modemu {#lte-modem-firmware}

Připojte J-Link k [portu LTE SWD](segger-j-link.md#segger-j-link-to-lte-port-connection).

### Nahrání obrazu {#image-flashing-1}

Firmware modemu nahrajete příkazem `hardwario chester lte flash firmware.zip`.

### Smazání flash paměti {#flash-erasing}

### Reset procesoru {#processor-reset-1}

## Firmware LoRaWAN modemu {#lorawan-modem-firmware}

### Nahrání obrazu {#image-flashing-2}

### Smazání flash paměti {#flash-erasing-1}

### Reset procesoru {#processor-reset-2}

## Příkazy pro cloudový kodek {#cloud-codec-commands}

:::caution

V Cloudu v2 zařízení CHESTER pošle kodek samo. Tento krok už není potřeba provádět.

:::

Když přiřadíte zařízení do skupiny v **HARDWARIO Cloud**, musíte skupině přiřadit kodek, aby Cloud věděl, jak interpretovat přijatá binární data a převést je do **JSON**. Kodek lze přiřadit i konkrétnímu zařízení, ale doporučujeme přiřazovat ho celé skupině. Jen tak budou nová zařízení používat stejný kodek automaticky.

:::tip

Pokud vyvíjíte vlastní firmware a měníte **YAML** soubor kodeku: hlavičkový soubor `msg_key.h` se nyní automaticky znovu vygeneruje, když zadáte `west build`.

:::

Práce s kodeky vyžaduje nastavení vašeho **API tokenu** buď přímo v příkazu, nebo v prostředí. **API token** získáte v [**HARDWARIO Cloud v1 ve svém profilu**](https://hardwario.cloud/#/profile).

```
hardwario cloud --token <your_token> commands...
```

Nebo nastavte proměnnou prostředí příkazové řádky

```
export HARDWARIO_CLOUD_TOKEN=<your_token>
```

Zadáním `hardwario cloud` vám nástroj zobrazí všechny možné příkazy, takže můžete prozkoumat další funkce.


```
Usage: hardwario cloud codec [OPTIONS] COMMAND [ARGS]...

  Codec commands.

Options:
  --help  Show this message and exit.

Commands:
  attach  Attach codec to group or device.
  author  Autor commands.
  create  Create new codec.
  delete  Delete codec.
  list    List of codec.
  show    Show codec detail.
  upload  Upload codec.
```

### Vytvoření kodeku {#create-a-codec}

```
hardwario cloud codec create --name chester-input-z
```

Cloud vám odpoví **ID kodeku**. Uložte si ho někam, budeme ho potřebovat v dalších příkazech.

### Připojení kodeku {#attach-a-codec}

Nově vytvořený **kodek** připojíme ke **skupině**. Přejděte do skupiny v **HARDWARIO Cloud** a zkopírujte **ID skupiny** z **URL** nebo ze **stránky s detailem skupiny**.

```
hardwario cloud codec attach --id <codec-id> --group-id <group-id>
```

### Nahrání kodeku {#upload-a-codec}

Posledním krokem je nahrání kodeku.

```
hardwario cloud codec upload --id <codec-id> --decoder-type cbor --decoder codec/cbor-decoder.yaml
```

Pokud aktualizujete svůj **YAML** soubor a znovu vygenerujete `msg_key.h`, stačí **zopakovat pouze tento krok**.

## Aliasy příkazů {#command-aliases}

Pokud vyvíjíte a iterujete poměrně často, mohou se vám tyto aliasy příkazů hodit. Přidejte je do inicializačního skriptu svého terminálu.

```
alias wb='west build'
alias wu='west update'
alias wf='west flash'
alias wr='rm -rf build/'
alias wc='hardwario chester app console'
alias wfc='west flash && hardwario chester app console'
```
