---
slug: concentratord-spi-not-detected
title: Koncentrátor FIBER Lite nikdy nezobrazí Gateway ID
---

**Příznak:** na zařízení FIBER Lite (SPI/RAK2287) logy vlastní služby koncentrátoru nikdy nevypíšou
Gateway ID, stránka brány v ChirpStack nikdy nezobrazí časovou značku „Last seen at“ a do ChirpStack
nedorazí žádný join-request, přestože koncové zařízení LoRaWAN je zapnuté a v dosahu.

Postupujte v uvedeném pořadí. První dvě příčiny jsou zdaleka nejčastější a obě vypadají jako vadný
hardware, přitom jde čistě o konfiguraci.

## 1. Démon se zasekne na „Opening SPI communication interface“ {#1-the-daemon-hangs-on-opening-spi-communication-interface}

Zjistěte, kde se služba skutečně zastaví:

```sh
sudo journalctl -u chirpstack-concentratord -n 30 --no-pager
```

Pokud je poslední řádek `Opening SPI communication interface` a nic už nenásleduje (žádná chyba,
žádný timeout, jen ticho), koncentrátor **není** vadný. Profil výrobce (`model=`) dodává jen
mapování pinů, offsety RSSI a tabulku zesílení; kanálový plán **nedodává**. Když v konfiguraci chybí
sekce `[gateway.concentrator]`, každé rádio se nakonfiguruje jako `enabled: false` na frekvenci 0
a HAL pod ním se natrvalo zablokuje.

Ověříte to o něco výš ve stejném logu:

```sh
sudo journalctl -u chirpstack-concentratord | grep 'Configuring radio'
```

Rádia hlášená jako `enabled: false, center_freq: 0` znamenají, že chybí kanálový plán. Přidejte blok
`[gateway.concentrator]` ze stránky
[Instalace ChirpStack Concentratord](/fiber/installation/concentratord) a restartujte službu.
Rádia musí naběhnout jako `enabled: true` se skutečnými frekvencemi.

## 2. Concentratord běží, ale do MQTT nic nedorazí {#2-concentratord-runs-but-nothing-reaches-mqtt}

Pokud Concentratord zapisuje do logu Gateway ID a řádky `Frame received`, ale ChirpStack přesto nic
nezobrazuje, je spojení přerušené mezi službami Concentratord a MQTT Forwarder. Obě služby hlásí `active`, takže
`systemctl status` na odhalení nestačí.

Zkontrolujte oprávnění socketů IPC:

```sh
ls -la /tmp/concentratord_*
```

Uživatel `chirpstack` k nim musí mít přístup přes skupinu, tedy vlastníka `root:chirpstack` a režim `srwxrwx---`:

```text
srwxrwx--- 1 root chirpstack 0 /tmp/concentratord_command
srwxrwx--- 1 root chirpstack 0 /tmp/concentratord_event
```

Pokud mají vlastníka `root:root` a režim `srwxr-xr-x`, forwarder se nepřipojí, protože připojení k unixovému
socketu vyžaduje oprávnění k **zápisu**. Přidejte `Group=chirpstack` a `UMask=0007` do sekce
`[Service]` souboru `/etc/systemd/system/chirpstack-concentratord.service` a poté:

```sh
sudo systemctl daemon-reload
sudo systemctl restart chirpstack-concentratord
sudo systemctl restart chirpstack-mqtt-forwarder
```

## 3. SPI není zapnuté nebo deska HAT nedosedá {#3-spi-is-not-enabled-or-the-hat-is-not-seated}

Jen pokud se služba vůbec nedostane k otevření SPI:

```sh
grep spi /boot/firmware/config.txt   # expect: dtparam=spi=on (uncommented)
ls /dev/spidev*                       # expect: /dev/spidev0.0 and /dev/spidev0.1
```

Řádek `dtparam=spi=on` je v Raspberry Pi OS ve výchozím stavu zakomentovaný. Pokud je, odkomentujte ho
a restartujte systém. Pokud `/dev/spidev*` ani potom neexistuje, deska HAT RAK2287 nemá kontakt
s konektorem GPIO na Raspberry Pi 5. Nasaďte ji znovu a zkontrolujte, zda nejsou ohnuté piny.

## 4. Ověření, že samotný čip koncentrátoru odpovídá {#4-proving-the-concentrator-chip-itself-responds}

Pokud potřebujete definitivně odlišit „mrtvý hardware“ od „špatné konfigurace“, načtěte registry
čipu SX1302 přímo přes SPI a přitom přepínejte resetovací linku. Nainstalujte `python3-spidev`
a `python3-libgpiod`, držte resetovací pin (`gpiochip0`, linka 17) na nízké úrovni a přečtěte registr
5bajtovým rámcem `[0x00, addr >> 8, addr & 0xFF, 0x00, 0x00]`; výsledek je v bajtu 4.

Pokud se hodnoty registrů **liší** podle toho, zda je reset držený na vysoké úrovni, nebo uvolněný,
čip žije a chyba je v softwaru. Hodnoty, které v obou stavech zůstávají na `0x00`, ukazují na usazení
desky HAT nebo na sběrnici SPI.

Pokud nic z toho nepomůže, pošlete prosím společnosti HARDWARIO popis toho, co jste zkoušeli,
a kompletní log služby, abychom mohli tuto stránku doplnit.
