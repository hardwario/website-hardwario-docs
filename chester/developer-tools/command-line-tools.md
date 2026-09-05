---
slug: command-line-tools
title: Command Line Tools
---
import Image from '@theme/IdealImage';

# HARDWARIO Command Line Tools

:::caution

You do not need to install this separately if you use **Firmware SDK**. This tool is installed automatically when you follow **[Firmware SDK](../category/firmware-sdk/) > Installation on ...** articles.

:::

HARDWARIO command line tool allows you to:

- **Flash APP/BLE** application firmware (nRF52)
- Show interactive terminal for **configuration** and **debugging**
- Access **Product Information Block** (PIB) in UICR flash memory that contains **HARDWARIO Serial Number** (HSN) and other parameters
- Update modem firmware (nRF9160)

## Install Python

**HARDWARIO CLI** is a **Python 3** tool. Please install Python by following the steps below based on your operating system.

- **Ubuntu**: Python 3 should already be installed on your OS.

- **macOS**: Follow the [Install Packages](firmware-sdk/../../firmware-sdk/installation-on-macos.md#install-package-manager) chapter to install Homebrew. Then run `brew install python3`.

- **Windows**: Follow the [Install Python](firmware-sdk/../../firmware-sdk/installation-on-windows.md#install-python) chapter.

## Install HARDWARIO CLI

:::caution

We strongly suggest using Python virtual environment as explained in Installation articles for [Ubuntu](../firmware-sdk/installation-on-ubuntu.md), [macOS](../firmware-sdk/installation-on-macos.md) and [Windows](../firmware-sdk/installation-on-windows.md). This helps to prevent conflicts with the dependencies of another package.

However, if you use/install Python only for HARDWARIO CLI, there should not be any Python package conflicts.

:::

Install HARDWARIO CLI by typing the following command in your terminal:

```
pip install hardwario
```

After installation, try to run the following:

```
hardwario --version
```

you should get a similar response:

```
hardwario.chester v1.23.0
hardwario.cloud v1.4.1
hardwario.common v1.7.2
```

## APP/BLE Application Firmware

Connect J-Link to the [APP SWD Port](segger-j-link.md#segger-j-link-to-app-port-connection).

In this chapter, we use the `hardwario chester app` commands. If you type the previous command, the tool will show you all the possible commands so you can explore the options.

### Interactive Console

Use the command `hardwario chester app console` to open the interactive terminal.

### Image Flashing

Use the command `hardwario chester app flash <parameter>` to flash the firmware.

The `<parameter>` can be:

- A **BIN** or **HEX** file.
- A unique ID that was sent to you by email or from our [Catalog Application firmwares](../catalog-applications/index.md#application-firmware). It has this format `34677881d57f4b0eb85507f176627bee`.

### Processor Reset

Use the command `hardwario chester app reset` to reset the firmware.

### Product Information Block

PIB is a separate UICR flash block in NRF52 memory that contains factory-programmed device information.

Use `hardwario chester app pib read` to read the PIB data.

```
Vendor name: HARDWARIO
Product name: CHESTER-M
Hardware variant: CDGLS
Hardware revision: R3.2
Serial number: 0000000000
Claim token: 98ae432aa12ea82458ed04b4816bf225
BLE passkey: 275889
```

You can also use the `write` command in case you delete the PIB by mistake. The tool will ask you for every parameter. You can find the original parameters in the last **JSON** message in the **HARDWARIO Cloud**.

## LTE Modem Firmware

Connect J-Link to the [LTE SWD Port](segger-j-link.md#segger-j-link-to-lte-port-connection).

### Image Flashing

Use the command `hardwario chester lte flash firmware.zip` to flash the modem firmware.

### Flash Erasing

### Processor Reset

## LoRaWAN Modem Firmware

### Image Flashing

### Flash Erasing

### Processor Reset

## Cloud Codec Commands

:::caution

In the Cloud v2, CHESTER will send the codec itself. You don't need to follow this step anymore.

:::

When you assign your device to the **HARDWARIO Cloud** group, you have to assign a codec to the group, so the Cloud knows how to interpret received binary data and convert them to the **JSON**. Codec could also be assigned to a specific device, but we suggest assigning them to the whole group. Only then new devices will use the same codec automatically.

:::tip

If you develop your own firmware and change the codec **YAML** file. The `msg_key.h` header file is now automatically regenerated when you type `west build`.

:::

Working with codecs needs your **API token** to be set in the command itself or in your environment. You get your **API token** in [**HARDWARIO Cloud v1 in your profile**](https://hardwario.cloud/#/profile).

```
hardwario cloud --token <your_token> commands...
```

Or set command line environment variable

```
export HARDWARIO_CLOUD_TOKEN=<your_token>
```

By typing `hardwario cloud` the tool shows you all possible commands, so you can explore more functions.


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

### Create a Codec

```
hardwario cloud codec create --name chester-input-z
```

The cloud will reply to you with a **codec ID**. Please save it somewhere; we will need it in the next commands.

### Attach a Codec

We attach the newly created **codec** to the **group**. Go to the **HARDWARIO Cloud** group and copy the **group ID** from the **URL** or from the **group detail page**.

```
hardwario cloud codec attach --id <codec-id> --group-id <group-id>
```

### Upload a Codec

The final step is uploading the codec.

```
hardwario cloud codec upload --id <codec-id> --decoder-type cbor --decoder codec/cbor-decoder.yaml
```

In case you update your **YAML** file and regenerate the `msg_key.h`, all you need to do is **repeat only this step again**.

## Command Aliases

If you develop and iterate quite frequently, you might find these command aliases useful. Add them to your terminal init script.

```
alias wb='west build'
alias wu='west update'
alias wf='west flash'
alias wr='rm -rf build/'
alias wc='hardwario chester app console'
alias wfc='west flash && hardwario chester app console'
```
