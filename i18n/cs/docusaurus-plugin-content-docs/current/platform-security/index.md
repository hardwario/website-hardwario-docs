---
slug: platform-security
title: Bezpečnost platformy
sidebar_label: Bezpečnost platformy
description: "Základní přehled zabezpečení platformy CHESTER: fyzická bezpečnost, Bluetooth, LTE a IPsec, komunikace zařízení a HARDWARIO Cloud."
---
import Image from '@theme/IdealImage';

# Bezpečnost platformy {#platform-security}

Tento článek podává základní přehled zabezpečení platformy **CHESTER**. Každá kapitola popisuje jednu oblast.

## Fyzická bezpečnost {#physical-security}

U samotného hardwarového zařízení **CHESTER** je tato oblast výhradně odpovědností zákazníka. Kryptografické klíče (například pro **SIM kartu**) jsou však chráněny čipy typu smartcard.

:::tip

Na **základní desce CHESTER** je **akcelerometr MEMS**, který dokáže ohlásit manipulaci se zařízením. Polohu zařízení lze sledovat volitelným **modulem GNSS**.

:::

## Bluetooth rádio {#bluetooth-radio}

Platforma **CHESTER** používá certifikovaný stack **Bluetooth Low Energy** (BLE) od **Nordic Semiconductor** v implementaci **SoftDevice**. Použitý **System-on-Chip** (nRF52840) podporuje specifikaci BLE verze 5.3. Přístup ke všem vystaveným Bluetooth **službám** a **charakteristikám** je chráněn (šifrované a autentizované spojení) standardními bezpečnostními mechanismy Bluetooth.

Nová spojení jsou možná pouze s protistranami, které znají předem nastavený **Bluetooth passkey**. BLE passkey je náhodné číslo generované společností **HARDWARIO** a uživatel jej může změnit.

:::tip

**Bluetooth stack** je v implementaci firmwaru volitelný a lze jej snadno vypnout.

:::

## Konektivita LTE {#lte-connectivity}

Spojení LTE zabezpečuje standardní mechanismus systému **Evolved Packet System** (EPS). Podrobnosti specifikace EPS najdete v **3GPP LTE Release 13**.

Identita zařízení a služby konektivity jsou odvozeny z **Universal Integrated Circuit Card** (UICC).

V případě operátora **Vodafone** používá **HARDWARIO** vlastní **Access Point Name** (APN) s privátním IP prostorem. Zařízení v rozsahu APN jsou izolována od veřejného internetového provozu.

:::caution

Ačkoli zařízení sdílejí stejný síťový IP prostor, nemohou mezi sebou komunikovat. Mohou komunikovat pouze s **HARDWARIO Cloud**.

:::

## IPsec tunel Vodafone {#vodafone-ipsec-tunnel}

Konektivita mezi **Evolved Packet System** (EPS) a **HARDWARIO Cloud** je zabezpečena tunelem **IPsec**. Tunel **IPsec** je definován standardy **IETF** a používá silnou kryptografii.

Klíče navázaného tunelu se obnovují (**re-keying**) v intervalu kratším než **60 minut**.

Tunel **IPsec** používá IKEv2 (`aes256-sha256-modp2048`).

## Komunikace zařízení {#device-communication}

Zařízení **CHESTER** komunikuje s **HARDWARIO Cloud** protokolem **FLAP** přes UDP. Každý paket FLAP putuje v **obálce MAC** s 64bitovým autentizačním kódem zprávy (MAC) založeným na SHA-256 s klíčem, kterým je jedinečný **claim token** zařízení, takže paket nelze na cestě podvrhnout ani změnit. Obálka MAC data nešifruje: důvěrnost zajišťuje privátní APN s tunelem IPsec popsaným výše. Zařízení postavená na nRF9151 mohou místo ní použít obálku **DTLS 1.2** s předsdíleným klíčem. Viz [**Obálka MAC protokolu FLAP**](/cloud/device-protocol/mac-envelope) a [**Obálka DTLS protokolu FLAP**](/cloud/device-protocol/dtls-envelope).

## Bezpečnost HARDWARIO Cloud {#hardwario-cloud-security}

Infrastruktura **HARDWARIO Cloud** běží v datových centrech cloudového poskytovatele **DigitalOcean**. Všechny servery používají linuxovou distribuci **Ubuntu LTS**. Tým **HARDWARIO** provádí pravidelné bezpečnostní audity a údržbu celé infrastruktury.

Celá cloudová infrastruktura je navržena tak, aby se pokud možno vyhnula jedinému bodu selhání. Každá komponenta je zálohována pravidelnými **automatizovanými snapshoty**.

Zprávy zpracovává služba **data streaming**, která zvyšuje spolehlivost doručení dat.

## Infrastruktura zákazníka {#customer-infrastructure}

**HARDWARIO Cloud** poskytuje tři služby pro přístup k datům zařízení a funkcím správy zařízení:

* **REST API** (backend se řídí principem API-first)

* Asynchronní **callbacky** (fronta webhooků)

* **Webový portál** pro uživatele (funguje nad REST API)

Všechny tyto služby jsou dostupné z veřejného internetu přes HTTPS/TLS. Přihlásit se k nim lze **API tokenem**, přes **Google identity** (OAuth) nebo **uživatelským jménem a heslem**.

API tokeny podporují **omezení úrovně přístupu** (access level scoping) pro autorizaci operací.
