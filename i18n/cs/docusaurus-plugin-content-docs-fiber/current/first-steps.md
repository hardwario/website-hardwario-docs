---
slug: first-steps
title: Rychlý průvodce
description: "Rychlý průvodce zařízením FIBER: zprovozněte bránu, nainstalujte stack LoRaWAN a připojte první zařízení LoRaWAN."
title_meta: "Rychlý průvodce (FIBER)"
---

# Rychlý průvodce zařízením FIBER {#fiber-quick-start-guide}

Děkujeme, že jste si vybrali FIBER.

Podle následujících kroků ho uvedete do provozu a připojíte své první zařízení LoRaWAN.

Podrobnější informace najdete v části [**Instalace**](/fiber/installation/), která obsahuje kompletní postup
se snímky obrazovky, a v části [**Popis hardwaru**](/fiber/category/hardware-description/) s parametry platformy.

---

## Krok 1: Nahrání Raspberry Pi OS {#step-1-flash-raspberry-pi-os}

:::tip

**Máte FIBER Lite (Raspberry Pi 5)?** Následující 4 kroky se týkají zařízení FIBER s modulem CM4 a pro vás
neplatí: nepotřebujete propojku BOOT, `rpiboot` ani adaptér PoE. Přejděte přímo na kapitolu
[Varianta FIBER Lite](#fiber-lite-variant) na konci tohoto průvodce.

:::

1. Otevřete horní kryt (čtyři šroubky pod gumovými nožičkami), přesuňte propojku do polohy **BOOT**,
   připojte adaptér PoE a kabelem USB-B propojte HOST a TARGET. Kompletní postup najdete na stránce
   [Nahrání Raspberry Pi OS](/fiber/installation/flash/).
1. Nainstalujte a spusťte **rpiboot** ([raspberrypi/usbboot](https://github.com/raspberrypi/usbboot)),
   který přepne TARGET do režimu bootloaderu. Poté se na počítači HOST objeví jako velkokapacitní
   úložiště USB.
1. Nahrajte systém nástrojem Raspberry Pi Imager (Device: **Raspberry Pi 4**, Storage:
   **RPi-MSD-0001 Media**); v kroku Customisation nastavte název hostitele, uživatelské jméno a heslo
   a zapněte SSH.
1. Stiskněte **RESET** na zařízení TARGET, počkejte, až systém naběhne, a jeho IP adresu zjistěte
   v seznamu přidělených adres (leases) na serveru DHCP.

---

## Krok 2: Instalace softwarového stacku {#step-2-install-the-software-stack}

```sh
ssh fiber@<TARGET IP ADDRESS>
```

Potom postupně projděte tyto stránky (kompletní příkazy a konfigurace najdete na stránce [Instalace](/fiber/installation/)):

1. [Aktualizace systému](/fiber/installation/update-system/)
1. [Konfigurace hardwaru](/fiber/installation/configure-hardware/): sběrnice I2C + RTC
1. [Instalace ChirpStack](/fiber/installation/chirpstack/)
1. [Instalace ChirpStack Concentratord](/fiber/installation/concentratord/): RAK5146 připojený přes USB
1. [Instalace ChirpStack MQTT Forwarder](/fiber/installation/mqtt-forwarder/)
1. [Instalace Node-RED](/fiber/installation/node-red/)
1. [Instalace InfluxDB](/fiber/installation/influxdb/)
1. [Instalace Grafany](/fiber/installation/grafana/)
1. [Dashboard](/fiber/installation/dashboard/)

---

## Krok 3: Registrace brány a zařízení {#step-3-register-a-gateway-and-a-device}

Dokud v ChirpStack nezaregistrujete bránu a zařízení, nic se k síti nepřipojí. Kompletní postup
v uživatelském rozhraní najdete na stránce [Registrace brány a zařízení](/fiber/installation/register-device/):
přidejte bránu s ID z logů Concentratord, vytvořte profil zařízení a aplikaci a nakonec zadejte
DevEUI a klíče OTAA svého zařízení STICKER nebo CHESTER.

---

## Krok 4: Zapnutí testovacího zařízení {#step-4-power-on-your-test-device}

Zapněte fyzické zařízení LoRaWAN. Sledujte v ChirpStack záložku **LoRaWAN frames** (živý náhled).
Pokud je brána v dosahu a vše předchozí je správně nastavené, měl by se během několika sekund objevit
join-request a po něm join-accept.

Pokud se neobjeví vůbec nic, zkontrolujte nejprve u brány údaj **Last seen at**. Když k bráně
nepřichází žádný provoz, je problém na straně rádia/koncentrátoru, nikoli v registraci zařízení.

---

## Krok 5: Přístup ke službám {#step-5-access-your-services}

| Služba | URL |
|---|---|
| ChirpStack | `http://[TARGET IP ADDRESS]:8080/` |
| Node-RED | `http://[TARGET IP ADDRESS]:1880/` |
| InfluxDB | `http://[TARGET IP ADDRESS]:8086/` |
| Grafana | `http://[TARGET IP ADDRESS]:3000/` |
| Dashboard | `http://[TARGET IP ADDRESS]/` |

:::danger

Než zařízení připojíte do jakékoli sdílené sítě, změňte **výchozí přihlášení `admin`/`admin`
v ChirpStack**. Žádný z instalačních kroků ho automaticky nezmění.

:::

---

✅ **Hotovo.**
Vaše zařízení FIBER má nahraný systém, běží na něm ChirpStack a přijímá skutečné uplinky LoRaWAN.

---

## Varianta FIBER Lite {#fiber-lite-variant}

**FIBER Lite** (Raspberry Pi 5) používá zcela stejný softwarový stack jako FIBER: ChirpStack,
Node-RED, InfluxDB, Grafana i Dashboard se instalují stejným způsobem, bez dalších kroků.
Rozdíly jsou jen v hardwaru:

- **Nahrání systému**: žádná propojka BOOT, žádný `rpiboot`, vůbec žádná aktivace bootloaderu. Nástrojem
  Raspberry Pi Imager nahrajte obraz přímo na běžnou kartu microSD a vložte ji do zařízení. Metody zjištění IP adresy,
  postup nastavení statické IP a přihlášení přes SSH najdete v části
  [Nahrání Raspberry Pi OS](/fiber/installation/flash/) (záložka FIBER Lite).
- **Konfigurace hardwaru**: řádek s overlayem RTC úplně vynechejte, protože Pi 5 má vestavěné RTC.
- **Concentratord**: RAK5146 se připojuje přes **SPI** pomocí desky HAT RAK2287, ne přes USB, a má proto
  jinou konfiguraci i instalační postup (viz záložka FIBER Lite na stránce
  [Instalace ChirpStack Concentratord](/fiber/installation/concentratord/)). Postupujte přesně podle této záložky.
  Kanálový plán (channel plan) i oba řádky s oprávněními služby jsou povinné; pokud kterýkoli z nich
  vynecháte, instalace tiše selže bez chybového hlášení.
- FIBER Lite nemá displej ani senzory 1-Wire: všechna specifika FIBER Lite (BOM, hardwarové
  rozdíly) najdete v části [Úvod do FIBER Lite](/fiber/fiber-lite/introduction/) v postranním panelu. Máte
  klasické zařízení FIBER? V postranním panelu najdete [**Návody k hardwaru FIBER**](/fiber/category/fiber-hardware-guides/),
  kde se dozvíte, co dělat s jeho displejem a senzory 1-Wire.

Pokud se cokoli nechová podle očekávání, podívejte se do sekce **Řešení problémů** pod položkou FIBER Lite v postranním panelu.
