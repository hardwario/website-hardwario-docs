---
slug: requirements
title: Requirements
---
import Image from '@theme/IdealImage';

# Requirements

This **article** defines the requirements if you want to start development with the CHESTER SDK.

## Hardware Setup

* Development board CHESTER DevKit

  * Can be provided by HARDWARIO

* USB programmer/debugger SEGGER J-Link Compact Plus + Cortex-M Adapter

  * Can be provided by HARDWARIO

* USB power source Power Profiler Kit 2 (PPK2)

  * Can be provided by HARDWARIO

* Two Micro-USB cables for J-Link and PPK2

  * Can be provided by HARDWARIO

* One of these operating systems:

  :::caution

  Despite all the operating systems being supported and working the same way, we have experienced extremely long build times on the Windows platform. For serious development, we recommend getting a PC with Ubuntu, or macOS. Alternatively, you will get better results in a virtualized environment (e.g. [VirtualBox](https://www.virtualbox.org/)).

  :::

  * Ubuntu 20.04 / 22.04
  * macOS 11 / 12
  * Windows 10 / Windows 11

## GitHub Access

We share the latest SDK on GitHub in [chester-sdk](https://github.com/hardwario/chester-sdk) repository. Please create a GitHub account and follow the next chapter on how to add an SSH key.

## Generate SSH Key

If you have not generated your SSH public/private key yet, you can do so using this command:

```
ssh-keygen
```

This will help you to generate the keys in your home folder. You should have files `id_rsa` (private key) and `id_rsa.pub` (public key) in the folder `.ssh` of your home directory.

:::warning

You must make sure the private key will not get to anybody else. Verify permissions on your key file.

:::

## Upload SSH Key

Your public SSH key must be uploaded to your **GitHub** account. Log in to **GitHub** and open **Settings** (from the top right corner). Next, click on **SSH Keys and PGP keys**, click **New SSH key**, insert the content of your public key to the text area, give it a name, and click on **Add SSH key**.

You can test your connection with this command:

```
ssh -T git@github.com
```

It should output something like this:

```
Hi <YOUR_NICK_NAME>! You've successfully authenticated, but GitHub does not provide shell access.
```
