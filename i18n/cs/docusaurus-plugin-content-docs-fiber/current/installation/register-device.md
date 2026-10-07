---
title: Registrace brány a zařízení
---

# Registrace brány a zařízení {#register-a-gateway-and-a-device}

Po instalaci softwaru ChirpStack i koncentrátor běží, do sítě se ale nic nepřipojí, dokud přímo
v ChirpStack nezaregistrujete **bránu** a alespoň jedno **zařízení**. Tuto část nelze skriptovat.
Dělá se v uživatelském rozhraní ChirpStack, a to stejně u obou variant FIBER.

1. Přihlaste se do ChirpStack (`http://[TARGET IP ADDRESS]:8080/`, `admin`/`admin`, nebo údaje,
   na které jste je změnili). Výchozí tenant s názvem **ChirpStack** už existuje. Použijte ho,
   nebo si vytvořte vlastní v části **Tenants**.

1. V části **Gateways** klikněte na **Add gateway**:
   - **Gateway ID**: zkopírujte z logů Concentratord (`sudo journalctl -fu
     chirpstack-concentratord`), vypíše se ve chvíli, kdy se koncentrátor připojí.
   - **Name**: libovolný výstižný název.
   - **Region**: musí odpovídat jedné z hodnot `enabled_regions` v `/etc/chirpstack/chirpstack.toml`
     (např. `eu868` pro Evropu).

   Po uložení se na stránce s detailem brány zobrazí časová značka **Last seen at**, která se pravidelně
   aktualizuje, pokud řetězec koncentrátor → MQTT forwarder → ChirpStack skutečně funguje.

1. V části **Device profiles** klikněte na **Add device profile**. Nastavte minimálně:
   - **Region**: stejný region jako u brány.
   - **MAC version**: musí odpovídat verzi, kterou testovací zařízení (např. STICKER, CHESTER)
     skutečně používá (u většiny zařízení HARDWARIO LoRaWAN 1.0.x; ověřte v dokumentaci zařízení).
   - **Regional parameters revision**: ponechte výchozí hodnotu ChirpStack, pokud zařízení
     nevyžaduje konkrétní revizi.
   - **Join type**: **OTAA** u běžných zařízení HARDWARIO.

1. V části **Applications** klikněte na **Add application** a vytvořte aplikaci, do které zařízení seskupíte.

1. V této aplikaci klikněte na **Add device**:
   - **Device EUI**: DevEUI vytištěné na fyzickém zařízení nebo v jeho dokumentaci.
   - **Device profile**: profil vytvořený výše.
   - **Device name**: libovolný výstižný název.

   Po vytvoření zařízení otevřete jeho záložku **OTAA keys** a nastavte **Application key**
   (`AppKey`), u profilu LoRaWAN 1.1 také **Network key** (`NwkKey`), tak, aby odpovídaly klíčům
   naprogramovaným ve fyzickém zařízení. Klíče musí být na obou stranách naprosto shodné, jinak
   připojení k síti tiše selže.

1. Zapněte fyzické zařízení LoRaWAN. V rozhraní ChirpStack sledujte záložku **LoRaWAN frames**
   zařízení (živý náhled). Pokud je brána v dosahu a vše předchozí je správně nastavené, měl by se
   během několika sekund objevit join-request a po něm join-accept. Pokud se neobjeví vůbec nic,
   zkontrolujte nejprve časovou značku **Last seen at** u brány: když k bráně nedorazí žádný provoz,
   problém je na straně rádia/koncentrátoru, ne v registraci zařízení.
