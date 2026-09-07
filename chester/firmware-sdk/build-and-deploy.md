---
slug: build-and-deploy
title: Build and Deploy
---
import Image from '@theme/IdealImage';

# Build and Deploy

This article will explain how to build, deploy and upload an application firmware to the **HARDWARIO Cloud**.

## Build

1. Go to the application folder. It could be:
    - Your `application/` folder of you your project.
    - Catalog application from `chester/applications/` folder.
    - Code samples in the `chester/samples/` folder.

2. Build the application with `west build` command.

   :::tip

   Make sure that the `build.board` is configured with `west config build.board chester`, please see the previous **Installation chapter**

   :::

## Deploy

For the final firmware build, you would like to build a firmware with the name and version in it. The firmware version and name will be visible in the **HARDWARIO Manager** application and the device's shell when you type `info show` command. The firmware version is also sent in the NB-IoT packet.

1. Clean previous build with `rm -rf build/`.

2. Add environment variables `FW_NAME` and `FW_VERSION` to the build command:
     - Linux and macOS: `FW_NAME="CHESTER Input Z" FW_VERSION="v1.5.0" west build`.
     - Windows: `cmd /C "set FW_NAME=CHESTER Input Z && set FW_VERSION=v1.5.0 && west build"`.

:::tip

HARDWARIO uses [Semantic Versioning](https://semver.org/). Please note that also the letter **v** has to be in the firmware version, for example, `v1.2.0`.

:::

Now you can distribute the binary or ZIP file for **DFU update**. Or you can upload it to the **HARDWARIO Cloud**. Please see the next chapter.

:::tip

You can also hardcode the firmware name and version in your project. You can add these lines before the `project` command to your `CMakeLists.txt` project file:

```
set(ENV{FW_NAME} "CHESTER Input Z")
set(ENV{FW_VERSION} "v1.5.0")

project(input)
```

:::

## Firmware Upload

You can also use **HARDWARIO CLI** upload function, so the firmware is uploaded to your **HARDWARIO Cloud** account, and you can share firmware with your customers with a **QR Code**, **URL**, or by **e-mail**.

:::tip

You must have your **HARDWARIO Cloud** secret token in the environment variable `HARDWARIO_CLOUD_TOKEN`, or you must supply your secret token in the `--token` parameter. This parameter needs to be placed exactly between the `fw` and `list` parameters.

You find the needed token in [HARDWARIO Cloud v1 in your profile](https://hardwario.cloud/#/profile) as the `API token`.

:::

When your firmware is built, just call from the same project folder:

`hardwario chester app fw upload --name="hio-chester-input-z" --version="v1.5.0"`

Then you receive an email containing **links to the firmware** and **QR Code**, which can be scanned in **HARDWARIO Manager** phone application for firmware upgrade.
