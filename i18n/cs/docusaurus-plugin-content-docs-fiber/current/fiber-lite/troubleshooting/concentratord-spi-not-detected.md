---
slug: concentratord-spi-not-detected
title: Koncentrátor FIBER Lite nikdy nezobrazí Gateway ID
description: "Gateway ID, stránka brány v ChirpStack nikdy nezobrazí časové razítko „Last seen at\" a do ChirpStack"
---

**Příznak:** na zařízení FIBER Lite (SPI/RAK2287) logy vlastní služby koncentrátoru nikdy nevypíšou
Gateway ID, stránka brány v ChirpStack nikdy nezobrazí časové razítko „Last seen at" a do ChirpStack
nedorazí žádný join-request, přestože koncové zařízení LoRaWAN je zapnuté a v dosahu.

Postupujte v uvedeném pořadí. První dvě příčiny jsou zdaleka nejčastější a obě vypadají jako vadný
hardware, přitom jde o čistou konfiguraci.

## 1. Démon se zasekne na „Opening SPI communication interface" {#1-the-daemon-hangs-on-opening-spi-communication-interface}

Zjistěte, kde se služba skutečně zastaví:

```sh
sudo journalctl -u chirpstack-concentratord -n 30 --no-pager
```

Pokud je poslední řádek `Opening SPI communication interface` a nic už nenásleduje (žádná chyba,
žádný timeout, jen ticho), koncentrátor **není** vadný. Profil výrobce (`model=`) poskytuje pouze
mapování pinů, offsety RSSI a tabulku zisku; **neposkytuje** kanálový plán. Když v konfiguraci chybí
sekce `[gateway.concentrator]`, každé rádio se nakonfiguruje jako `enabled: false` na frekvenci 0
a podkladová HAL se zablokuje na neurčito.

Ověřte to pohledem výše ve stejném logu:

```sh
sudo journalctl -u chirpstack-concentratord | grep 'Configuring radio'
```

Rádia hlášená jako `enabled: false, center_freq: 0` znamenají, že chybí kanálový plán. Přidejte blok
`[gateway.concentrator]` z kapitoly
[Install ChirpStack Concentratord](/fiber/installation/concentratord) a restartujte službu.
Rádia musí naběhnout jako `enabled: true` se skutečnými frekvencemi.

## 2. Concentratord běží, ale do MQTT nic nedorazí {#2-concentratord-runs-but-nothing-reaches-mqtt}

Pokud Concentratord loguje Gateway ID a řádky `Frame received`, ale ChirpStack přesto nic nezobrazuje,
přerušení je mezi Concentratord a MQTT Forwarderem. Obě služby hlásí `active`, takže
`systemctl status` na odhalení nestačí.

Zkontrolujte oprávnění IPC socketů:

```sh
ls -la /tmp/concentratord_*
```

Musí být skupinově přístupné uživateli `chirpstack`, tedy `root:chirpstack` a režim `srwxrwx---`:

```text
srwxrwx--- 1 root chirpstack 0 /tmp/concentratord_command
srwxrwx--- 1 root chirpstack 0 /tmp/concentratord_event
```

Pokud jsou `root:root` s režimem `srwxr-xr-x`, forwarder se nemůže připojit, protože připojení k unixovému
socketu vyžaduje oprávnění k **zápisu**. Přidejte `Group=chirpstack` a `UMask=0007` do sekce
`[Service]` souboru `/etc/systemd/system/chirpstack-concentratord.service` a poté:

```sh
sudo systemctl daemon-reload
sudo systemctl restart chirpstack-concentratord
sudo systemctl restart chirpstack-mqtt-forwarder
```

## 3. SPI není zapnuté nebo HAT nedosedá {#3-spi-is-not-enabled-or-the-hat-is-not-seated}

Jen v případě, že se služba nikdy nedostane ani k otevření SPI:

```sh
grep spi /boot/firmware/config.txt   # expect: dtparam=spi=on (uncommented)
ls /dev/spidev*                       # expect: /dev/spidev0.0 and /dev/spidev0.1
```

`dtparam=spi=on` se v Raspberry Pi OS dodává zakomentované. Pokud je zakomentované, odkomentujte ho
a restartujte systém. Pokud `/dev/spidev*` i poté chybí, HAT RAK2287 nemá kontakt s GPIO konektorem
Raspberry Pi 5. Přesaďte jej a zkontrolujte ohnuté piny.

## 4. Ověření, že samotný čip koncentrátoru odpovídá {#4-proving-the-concentrator-chip-itself-responds}

Pokud potřebujete definitivně odlišit „mrtvý hardware" od „špatné konfigurace", načtěte registry
čipu SX1302 přímo přes SPI a přitom přepínejte reset linku. Nainstalujte `python3-spidev` a
`python3-libgpiod`, držte reset pin (`gpiochip0` linka 17) v nízké úrovni a přečtěte registr
5bajtovým rámcem `[0x00, addr >> 8, addr & 0xFF, 0x00, 0x00]`, přičemž výsledek berte z bajtu 4.

Hodnoty registrů, které se **mění** mezi stavem s drženým resetem a uvolněným resetem, znamenají, že
čip žije a chyba je v softwaru. Hodnoty, které v obou stavech zůstávají na `0x00`, ukazují na dosednutí
HATu nebo na sběrnici SPI.

Pokud nic z uvedeného problém nevyřeší, nahlaste prosím společnosti HARDWARIO, co jste zkoušeli,
spolu s kompletním logem služby, aby bylo možné tuto stránku rozšířit.
