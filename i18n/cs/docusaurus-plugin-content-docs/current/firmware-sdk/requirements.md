---
slug: requirements
title: Požadavky
description: "Tento článek definuje požadavky, pokud chcete začít s vývojem s CHESTER SDK."
---
import Image from '@theme/IdealImage';

# Požadavky {#requirements}

Tento **článek** definuje požadavky, pokud chcete začít s vývojem s CHESTER SDK.

## Hardwarové vybavení {#hardware-setup}

* Vývojová deska CHESTER DevKit

  * Může poskytnout HARDWARIO

* USB programátor/debugger SEGGER J-Link Compact Plus + Cortex-M Adapter

  * Může poskytnout HARDWARIO

* USB zdroj napájení Power Profiler Kit 2 (PPK2)

  * Může poskytnout HARDWARIO

* Dva Micro-USB kabely pro J-Link a PPK2

  * Může poskytnout HARDWARIO

* Jeden z těchto operačních systémů:

  :::caution

  Přestože jsou všechny operační systémy podporovány a fungují stejným způsobem, zaznamenali jsme extrémně dlouhé časy sestavení na platformě Windows. Pro seriózní vývoj doporučujeme pořídit PC s Ubuntu nebo macOS. Případně dosáhnete lepších výsledků ve virtualizovaném prostředí (např. [VirtualBox](https://www.virtualbox.org/)).

  :::

  * Ubuntu 20.04 / 22.04
  * macOS 11 / 12
  * Windows 10 / Windows 11

## Přístup na GitHub {#github-access}

Nejnovější SDK sdílíme na GitHubu v repozitáři [chester-sdk](https://github.com/hardwario/chester-sdk). Vytvořte si prosím účet na GitHubu a pokračujte podle další kapitoly, jak přidat SSH klíč.

## Vygenerování SSH klíče {#generate-ssh-key}

Pokud jste svůj veřejný/soukromý SSH klíč ještě nevygenerovali, můžete tak učinit tímto příkazem:

```
ssh-keygen
```

Ten vám pomůže vygenerovat klíče ve vaší domovské složce. Ve složce `.ssh` ve svém domovském adresáři byste měli mít soubory `id_rsa` (soukromý klíč) a `id_rsa.pub` (veřejný klíč).

:::warning

Musíte se ujistit, že se soukromý klíč nedostane k nikomu jinému. Ověřte oprávnění souboru s klíčem.

:::

## Nahrání SSH klíče {#upload-ssh-key}

Váš veřejný SSH klíč musí být nahrán do vašeho účtu na **GitHubu**. Přihlaste se na **GitHub** a otevřete **Settings** (v pravém horním rohu). Poté klikněte na **SSH Keys and PGP keys**, klikněte na **New SSH key**, vložte obsah svého veřejného klíče do textového pole, pojmenujte jej a klikněte na **Add SSH key**.

Připojení můžete otestovat tímto příkazem:

```
ssh -T git@github.com
```

Měl by vypsat něco takového:

```
Hi <YOUR_NICK_NAME>! You've successfully authenticated, but GitHub does not provide shell access.
```
