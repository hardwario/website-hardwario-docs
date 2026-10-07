---
slug: requirements
title: Požadavky
---
import Image from '@theme/IdealImage';

# Požadavky {#requirements}

Tento **článek** shrnuje, co potřebujete, pokud chcete začít vyvíjet s CHESTER SDK.

## Hardwarové vybavení {#hardware-setup}

* Vývojová deska CHESTER DevKit

  * Může dodat HARDWARIO

* USB programátor/debugger SEGGER J-Link Compact Plus + Cortex-M Adapter

  * Může dodat HARDWARIO

* Napájecí zdroj USB Power Profiler Kit 2 (PPK2)

  * Může dodat HARDWARIO

* Dva kabely Micro-USB pro J-Link a PPK2

  * Může dodat HARDWARIO

* Jeden z těchto operačních systémů:

  :::caution

  Všechny operační systémy jsou podporované a fungují stejně, na platformě Windows je ale sestavení extrémně pomalé. Pro seriózní vývoj proto doporučujeme počítač s Ubuntu nebo macOS. Lepších výsledků dosáhnete i ve virtualizovaném prostředí (např. [VirtualBox](https://www.virtualbox.org/)).

  :::

  * Ubuntu 20.04 / 22.04
  * macOS 11 / 12
  * Windows 10 / Windows 11

## Přístup na GitHub {#github-access}

Nejnovější SDK sdílíme na GitHubu v repozitáři [chester-sdk](https://github.com/hardwario/chester-sdk). Založte si účet na GitHubu a podle další kapitoly k němu přidejte klíč SSH.

## Vygenerování klíče SSH {#generate-ssh-key}

Pokud ještě nemáte vygenerovaný pár klíčů SSH (veřejný a soukromý), vytvořte ho tímto příkazem:

```
ssh-keygen
```

Příkaz vygeneruje klíče do domovské složky: ve složce `.ssh` v domovském adresáři pak najdete soubory `id_rsa` (soukromý klíč) a `id_rsa.pub` (veřejný klíč).

:::warning

Soukromý klíč se nesmí dostat k nikomu jinému. Zkontrolujte oprávnění souboru s klíčem.

:::

## Nahrání klíče SSH {#upload-ssh-key}

Veřejný klíč SSH nahrajte do svého účtu na **GitHubu**. Přihlaste se na **GitHub** a otevřete **Settings** (v pravém horním rohu). Poté klikněte na **SSH Keys and PGP keys**, klikněte na **New SSH key**, vložte obsah svého veřejného klíče do textového pole, pojmenujte jej a klikněte na **Add SSH key**.

Připojení můžete otestovat tímto příkazem:

```
ssh -T git@github.com
```

Výstup by měl vypadat zhruba takto:

```
Hi <YOUR_NICK_NAME>! You've successfully authenticated, but GitHub does not provide shell access.
```
