---
slug: command-line-tools
title: Nástroje pro příkazovou řádku
title_meta: "Nástroje pro příkazovou řádku (CHESTER)"
---
import Image from '@theme/IdealImage';

# Nástroje HARDWARIO pro příkazovou řádku {#hardwario-command-line-tools}

:::caution

Pokud používáte **Firmware SDK**, není potřeba tento nástroj instalovat zvlášť. Instaluje se automaticky, když postupujete podle článků **[Firmware SDK](/chester/category/firmware-sdk/) > Instalace na ...**.

:::

S nástrojem HARDWARIO pro příkazovou řádku můžete:

- **Nahrát aplikační firmware APP/BLE** (nRF52)
- Zobrazit interaktivní terminál pro **konfiguraci** a **ladění**
- Přistupovat k bloku **Product Information Block** (PIB) v paměti flash UICR, který obsahuje **HARDWARIO Serial Number** (HSN) a další parametry
- Aktualizovat firmware modemu (nRF9160)

## Instalace Pythonu {#install-python}

**HARDWARIO CLI** je nástroj napsaný v **Pythonu 3**. Python nainstalujte podle postupu pro svůj operační systém.

- **Ubuntu**: Python 3 už by měl být v systému nainstalovaný.

- **macOS**: Postupujte podle kapitoly [Instalace správce balíčků](firmware-sdk/../../firmware-sdk/installation-on-macos.md#install-package-manager) a nainstalujte Homebrew. Poté spusťte `brew install python3`.

- **Windows**: Postupujte podle kapitoly [Instalace Pythonu](firmware-sdk/../../firmware-sdk/installation-on-windows.md#install-python).

## Instalace HARDWARIO CLI {#install-hardwario-cli}

:::caution

Důrazně doporučujeme virtuální prostředí Pythonu, jak ho popisují návody k instalaci pro [Ubuntu](../firmware-sdk/installation-on-ubuntu.md), [macOS](../firmware-sdk/installation-on-macos.md) a [Windows](../firmware-sdk/installation-on-windows.md). Předejdete tak konfliktům se závislostmi jiných balíčků.

Pokud ale Python používáte jen kvůli HARDWARIO CLI, ke konfliktům balíčků by dojít nemělo.

:::

HARDWARIO CLI nainstalujete tímto příkazem v terminálu:

```
pip install hardwario
```

Po instalaci zkuste spustit následující příkaz:

```
hardwario --version
```

Odpověď by měla vypadat podobně:

```
hardwario.chester v1.23.0
hardwario.cloud v1.4.1
hardwario.common v1.7.2
```

## Aplikační firmware APP/BLE {#appble-application-firmware}

Připojte programátor J-Link k [portu APP SWD](segger-j-link.md#segger-j-link-to-app-port-connection).

V této kapitole používáme příkazy `hardwario chester app`. Když zadáte samotný tento příkaz, nástroj vypíše všechny dostupné příkazy a můžete si projít jejich možnosti.

### Interaktivní konzole {#interactive-console}

Interaktivní terminál otevřete příkazem `hardwario chester app console`.

### Nahrání firmwaru {#image-flashing}

Firmware nahrajete příkazem `hardwario chester app flash <parameter>`.

Parametr `<parameter>` může být:

- Soubor **BIN** nebo **HEX**.
- Unikátní ID, které jste dostali e-mailem nebo najdete u [firmwaru katalogových aplikací](../catalog-applications/index.md#application-firmware). Má tento formát: `34677881d57f4b0eb85507f176627bee`.

### Reset procesoru {#processor-reset}

Firmware resetujete příkazem `hardwario chester app reset`.

### Product Information Block {#product-information-block}

PIB je samostatný blok paměti flash UICR v čipu nRF52, který obsahuje informace o zařízení zapsané ve výrobě.

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

Pokud PIB omylem smažete, obnovíte ho příkazem `write`. Nástroj se vás postupně zeptá na všechny parametry. Původní hodnoty najdete v poslední zprávě **JSON** v **HARDWARIO Cloud**.

## Firmware modemu LTE {#lte-modem-firmware}

Připojte programátor J-Link k [portu LTE SWD](segger-j-link.md#segger-j-link-to-lte-port-connection).

### Nahrání firmwaru {#image-flashing-1}

Firmware modemu nahrajete příkazem `hardwario chester lte flash firmware.zip`.

### Smazání paměti flash {#flash-erasing}

### Reset procesoru {#processor-reset-1}

## Firmware modemu LoRaWAN {#lorawan-modem-firmware}

### Nahrání firmwaru {#image-flashing-2}

### Smazání paměti flash {#flash-erasing-1}

### Reset procesoru {#processor-reset-2}

## Příkazy pro cloudový kodek {#cloud-codec-commands}

:::caution

V Cloud v2 posílá zařízení CHESTER kodek samo, takže tento krok už nemusíte dělat.

:::

Když přiřadíte zařízení do skupiny v **HARDWARIO Cloud**, musíte skupině přiřadit kodek, aby cloud věděl, jak přijatá binární data interpretovat a převést do **JSON**. Kodek můžete přiřadit i konkrétnímu zařízení, doporučujeme ale přiřadit ho celé skupině: jen tak budou stejný kodek automaticky používat i nová zařízení.

:::tip

Pokud vyvíjíte vlastní firmware a měníte soubor **YAML** kodeku, hlavičkový soubor `msg_key.h` se teď vygeneruje znovu automaticky při příkazu `west build`.

:::

Pro práci s kodeky musí být **API token** nastavený přímo v příkazu, nebo v proměnné prostředí. **API token** získáte v [**HARDWARIO Cloud v1 ve svém profilu**](https://hardwario.cloud/#/profile).

```
hardwario cloud --token <your_token> commands...
```

Nebo nastavte proměnnou prostředí:

```
export HARDWARIO_CLOUD_TOKEN=<your_token>
```

Příkaz `hardwario cloud` vypíše všechny dostupné příkazy, takže si můžete projít i další funkce.


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

Cloud vrátí **ID kodeku**. Poznamenejte si ho, budete ho potřebovat v dalších příkazech.

### Přiřazení kodeku {#attach-a-codec}

Nově vytvořený **kodek** přiřadíte ke **skupině**. Přejděte do skupiny v **HARDWARIO Cloud** a zkopírujte **ID skupiny** z **URL** nebo ze **stránky s detailem skupiny**.

```
hardwario cloud codec attach --id <codec-id> --group-id <group-id>
```

### Nahrání kodeku {#upload-a-codec}

Posledním krokem je nahrání kodeku.

```
hardwario cloud codec upload --id <codec-id> --decoder-type cbor --decoder codec/cbor-decoder.yaml
```

Když soubor **YAML** upravíte a znovu vygenerujete `msg_key.h`, stačí **zopakovat jen tento krok**.

## Aliasy příkazů {#command-aliases}

Pokud často sestavujete a zkoušíte, hodí se vám tyto aliasy příkazů. Přidejte je do inicializačního skriptu svého terminálu.

```
alias wb='west build'
alias wu='west update'
alias wf='west flash'
alias wr='rm -rf build/'
alias wc='hardwario chester app console'
alias wfc='west flash && hardwario chester app console'
```
