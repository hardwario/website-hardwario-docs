---
title: Registrace brány a zařízení
description: "Instalace softwaru zajistí, že ChirpStack i koncentrátor běží, ale do sítě se nic nepřipojí,"
---

# Registrace brány a zařízení {#register-a-gateway-and-a-device}

Instalace softwaru zajistí, že ChirpStack i koncentrátor běží, ale do sítě se nic nepřipojí,
dokud nejsou uvnitř samotného ChirpStacku zaregistrovány **brána** a alespoň jedno **zařízení**.
Tuhle část nelze skriptovat. Provádí se přes uživatelské rozhraní ChirpStack, stejným způsobem
bez ohledu na to, která varianta FIBER ji provozuje.

1. Přihlaste se do ChirpStack (`http://[TARGET IP ADDRESS]:8080/`, `admin`/`admin` nebo cokoli,
   na co jste to změnili). Výchozí tenant s názvem **ChirpStack** už existuje. Použijte jej,
   nebo si vytvořte vlastní v části **Tenants**.

1. V části **Gateways** klikněte na **Add gateway**:
   - **Gateway ID**: zkopírujte z logů Concentratord (`sudo journalctl -fu
     chirpstack-concentratord`), vypíše se ve chvíli, kdy se koncentrátor připojí.
   - **Name**: cokoli výstižného.
   - **Region**: musí odpovídat jedné z hodnot `enabled_regions` v `/etc/chirpstack/chirpstack.toml`
     (např. `eu868` pro Evropu).

   Po uložení se na detailu brány zobrazí časová značka **Last seen at**, která se periodicky
   aktualizuje, pokud řetězec koncentrátor → MQTT forwarder → ChirpStack skutečně funguje.

1. V části **Device profiles** klikněte na **Add device profile**. Nastavte minimálně:
   - **Region**: stejný region jako u brány.
   - **MAC version**: musí odpovídat tomu, co vaše testovací zařízení (např. STICKER, CHESTER)
     skutečně používá (LoRaWAN 1.0.x u většiny zařízení HARDWARIO; ověřte v dokumentaci zařízení).
   - **Regional parameters revision**: ponechte výchozí hodnotu ChirpStacku, pokud zařízení
     nevyžaduje konkrétní revizi.
   - **Join type**: **OTAA** pro typická zařízení HARDWARIO.

1. V části **Applications** klikněte na **Add application**, pod kterou zařízení seskupíte.

1. Uvnitř této aplikace klikněte na **Add device**:
   - **Device EUI**: DevEUI vytištěné na fyzickém zařízení nebo v jeho dokumentaci.
   - **Device profile**: ten vytvořený výše.
   - **Device name**: cokoli výstižného.

   Po vytvoření zařízení otevřete jeho kartu **OTAA keys** a nastavte **Application key**
   (`AppKey`), a **Network key** (`NwkKey`), pokud je profil zařízení LoRaWAN 1.1, tak, aby
   odpovídaly tomu, co je naprogramováno ve fyzickém zařízení. Tyto klíče musí být na obou
   stranách naprosto shodné, jinak připojení k síti bez hlášení selže.

1. Zapněte fyzické zařízení LoRaWAN. Sledujte kartu **LoRaWAN frames** zařízení (živý náhled)
   v rozhraní ChirpStack. Pokud je brána v dosahu a vše výše je nastaveno správně, měl by se
   během několika sekund objevit join-request a následně join-accept. Pokud se neobjeví vůbec
   nic, zkontrolujte nejprve časovou značku **Last seen at** u brány, protože pokud k bráně nedorazí
   žádný provoz, problém je na straně rádia/koncentrátoru, ne v registraci zařízení.
