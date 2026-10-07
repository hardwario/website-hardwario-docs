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

Za fyzické zabezpečení samotného zařízení **CHESTER** odpovídá výhradně zákazník. Kryptografické klíče (například klíče **SIM karty**) ale chrání čipy typu smartcard.

:::tip

Na **základní desce CHESTER** je **akcelerometr MEMS**, který dokáže ohlásit manipulaci se zařízením. Polohu zařízení lze sledovat volitelným **modulem GNSS**.

:::

## Rádio Bluetooth {#bluetooth-radio}

Platforma **CHESTER** používá certifikovaný stack **Bluetooth Low Energy** (BLE) od **Nordic Semiconductor** v implementaci **SoftDevice**. Použitý **System-on-Chip** (nRF52840) podporuje specifikaci BLE verze 5.3. Přístup ke všem zpřístupněným **službám** a **charakteristikám** Bluetooth chrání standardní bezpečnostní mechanismy Bluetooth (šifrované a autentizované spojení).

Nové spojení může navázat jen protistrana, která zná předem nastavený **Bluetooth passkey**. Passkey BLE je náhodné číslo, které generuje **HARDWARIO**, a uživatel ho může změnit.

:::tip

**Bluetooth stack** je ve firmwaru volitelný a dá se snadno vypnout.

:::

## Konektivita LTE {#lte-connectivity}

Spojení LTE zabezpečuje standardní mechanismus systému **Evolved Packet System** (EPS). Podrobnosti specifikace EPS najdete v **3GPP LTE Release 13**.

Identita zařízení a jeho služby konektivity vycházejí z karty **Universal Integrated Circuit Card** (UICC).

U operátora **Vodafone** používá **HARDWARIO** vlastní **Access Point Name** (APN) s privátním adresním prostorem IP. Zařízení v tomto APN jsou oddělená od veřejného internetového provozu.

:::caution

Zařízení sice sdílejí stejný adresní prostor IP, ale nemohou komunikovat mezi sebou, jen s **HARDWARIO Cloud**.

:::

## IPsec tunel Vodafone {#vodafone-ipsec-tunnel}

Spojení mezi systémem **Evolved Packet System** (EPS) a **HARDWARIO Cloud** zabezpečuje tunel **IPsec**, který definují standardy **IETF** a který používá silnou kryptografii.

Klíče navázaného tunelu se obnovují (**re-keying**) v intervalu kratším než **60 minut**.

Tunel **IPsec** používá IKEv2 (`aes256-sha256-modp2048`).

## Komunikace zařízení {#device-communication}

Zařízení **CHESTER** komunikuje s **HARDWARIO Cloud** protokolem **FLAP** přes UDP. Každý paket FLAP putuje v **obálce MAC** s 64bitovým autentizačním kódem zprávy (MAC) založeným na SHA-256 s klíčem, kterým je jedinečný **claim token** zařízení, takže paket nelze na cestě podvrhnout ani změnit. Obálka MAC data nešifruje: důvěrnost zajišťuje privátní APN s tunelem IPsec popsaným výše. Zařízení postavená na nRF9151 mohou místo ní použít obálku **DTLS 1.2** s předsdíleným klíčem. Podrobnosti najdete na stránkách [**Obálka MAC protokolu FLAP**](/cloud/device-protocol/mac-envelope) a [**Obálka DTLS protokolu FLAP**](/cloud/device-protocol/dtls-envelope).

## Bezpečnost HARDWARIO Cloud {#hardwario-cloud-security}

Infrastruktura **HARDWARIO Cloud** běží v datových centrech cloudového poskytovatele **DigitalOcean**. Všechny servery používají linuxovou distribuci **Ubuntu LTS**. Tým **HARDWARIO** celou infrastrukturu pravidelně udržuje a podrobuje bezpečnostním auditům.

Celá cloudová infrastruktura je navržena tak, aby se pokud možno vyhnula jedinému bodu selhání. Každou komponentu pravidelně zálohují **automatické snapshoty**.

Zprávy zpracovává služba **data streaming**, která zvyšuje spolehlivost doručení dat.

## Infrastruktura zákazníka {#customer-infrastructure}

K datům zařízení a ke správě zařízení nabízí **HARDWARIO Cloud** tři služby:

* **REST API** (backend se řídí principem API-first)

* Asynchronní **callbacky** (fronta webhooků)

* **Webový portál** pro uživatele (funguje nad REST API)

Všechny tyto služby jsou dostupné z veřejného internetu přes HTTPS/TLS. Přihlásit se k nim lze **API tokenem**, přes **Google identity** (OAuth) nebo **uživatelským jménem a heslem**.

API tokeny podporují **omezení úrovně přístupu** (access level scoping) pro autorizaci operací.
