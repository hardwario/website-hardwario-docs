---
slug: platform-security
title: Bezpečnost platformy
description: "Tento článek poskytuje základní přehled bezpečnosti platformy CHESTER. Článek je rozdělen do několika kapitol, které popisují jednotlivé oblasti."
---
import Image from '@theme/IdealImage';

# Bezpečnost platformy {#platform-security}

Tento článek poskytuje základní přehled bezpečnosti platformy **CHESTER**. Článek je rozdělen do několika kapitol, které popisují jednotlivé oblasti.

## Fyzická bezpečnost {#physical-security}

U samotného hardwarového zařízení **CHESTER** je tato oblast výhradně odpovědností zákazníka. Kryptografické klíče (například pro **SIM kartu**) jsou však chráněny čipy na platformě smartcard.

:::tip

**Základní deska CHESTER** integruje **MEMS akcelerometr**, který umí nahlásit upozornění na manipulaci se zařízením, a pozici zařízení lze sledovat pomocí volitelného **modulu GNSS**.

:::

## Bluetooth rádio {#bluetooth-radio}

Platforma **CHESTER** používá certifikovaný stack **Bluetooth Low Energy** (BLE) od **Nordic Semiconductor** v jejich implementaci **SoftDevice**. Použitý **System-on-Chip** (nRF52840) podporuje specifikaci BLE verze 5.3. Přístup ke všem vystaveným Bluetooth **službám** a **charakteristikám** je chráněn (šifrované a autentizované spojení) standardními bezpečnostními mechanismy Bluetooth.

Nová spojení jsou možná pouze s protistranami, které znají předem zprovozněný **Bluetooth passkey**. BLE passkey je náhodné číslo generované společností **HARDWARIO** a uživatel jej může změnit.

:::tip

**Bluetooth stack** je v implementaci firmwaru volitelný a lze jej snadno vypnout.

:::

## Konektivita LTE {#lte-connectivity}

Bezpečnost LTE spojení je zajištěna standardním mechanismem v rámci **Evolved Packet System** (EPS). Podrobnosti specifikace EPS najdete v **3GPP LTE Release 13**.

Identita zařízení a služby konektivity jsou odvozeny z **Universal Integrated Circuit Card** (UICC).

V případě operátora **Vodafone** používá **HARDWARIO** vlastní **Access Point Name** (APN) s privátním IP prostorem. Zařízení v rozsahu APN jsou izolována od veřejného internetového provozu.

:::caution

Ačkoli zařízení sdílejí stejný síťový IP prostor, nemohou mezi sebou komunikovat. Mohou komunikovat pouze s **HARDWARIO Cloud**.

:::

## IPsec tunel Vodafone {#vodafone-ipsec-tunnel}

Konektivita mezi **Evolved Packet System** (EPS) a **HARDWARIO Cloud** je zabezpečena tunelem **IPsec**. Tunel **IPsec** je definován standardy **IETF** a používá silnou kryptografii.

Interval **re-keying** u navázaného tunelu je kratší než **60 minut**.

Tunel **IPsec** používá IKEv2 (`aes256-sha256-modp2048`).

## Bezpečnost HARDWARIO Cloud {#hardwario-cloud-security}

Infrastruktura **HARDWARIO Cloud** běží v datových centrech cloudového poskytovatele **DigitalOcean**. Celá infrastruktura běží na linuxové serverové distribuci **Ubuntu LTS**. Tým **HARDWARIO** provádí pravidelné bezpečnostní audity a údržbu celé infrastruktury.

Celá cloudová infrastruktura je navržena tak, aby eliminovala jediný bod selhání. Každá komponenta je zálohována pravidelnými **automatizovanými snapshoty**.

Zprávy jsou zpracovávány službou **data streaming**, která zvyšuje spolehlivost doručení dat.

## Infrastruktura zákazníka {#customer-infrastructure}

**HARDWARIO Cloud** poskytuje tři služby pro přístup k datům zařízení a funkcím správy zařízení:

* **REST API** (backend se řídí principem API-first)

* Asynchronní **callbacky** (frontа webhooků)

* **Webový portál** pro uživatele (funguje nad REST API)

Všechny tyto služby fungují ve veřejné internetové konektivitě nad standardy HTTPS/TLS. Přístup ke službám je zajištěn prostřednictvím **API tokenu**, **Google identity** (OAuth) a přihlášení pomocí **uživatelského jména a hesla**.

API tokeny podporují **omezení úrovně přístupu** (access level scoping) pro autorizaci operací.
