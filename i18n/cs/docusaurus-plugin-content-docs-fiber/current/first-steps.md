---
slug: first-steps
title: Rychlý průvodce
description: "Děkujeme, že jste si vybrali FIBER."
---

# Rychlý průvodce zařízením FIBER {#fiber-quick-start-guide}

Děkujeme, že jste si vybrali FIBER.

Podle následujících kroků jej uvedete do provozu a připojíte své první zařízení LoRaWAN.

Podrobnější informace najdete v části [**Instalace**](/fiber/installation/), která obsahuje kompletní postup
se snímky obrazovky, a v části [**Popis hardwaru**](/fiber/category/hardware-description/) s parametry platformy.

---

## Krok 1: Nahrání Raspberry Pi OS {#step-1-flash-raspberry-pi-os}

:::tip

**Máte FIBER Lite (Raspberry Pi 5)?** Následující 4 kroky se týkají zařízení FIBER založeného na CM4 a pro vás
neplatí: na vaší desce není propojka BOOT, `rpiboot` ani PoE adaptér. Přejděte přímo na kapitolu
[Varianta FIBER Lite](#fiber-lite-variant) na konci tohoto průvodce.

:::

1. Otevřete horní kryt (čtyři šroubky pod gumovými nožičkami), přesuňte propojku do polohy **BOOT**,
   připojte PoE adaptér a kabel USB-B HOST↔TARGET, kompletní postup najdete v části
   [Připojení zařízení TARGET k HOST](/fiber/installation/flash/).
1. Nainstalujte a spusťte **rpiboot** ([raspberrypi/usbboot](https://github.com/raspberrypi/usbboot)),
   který přepne TARGET do režimu bootloaderu. Poté se na počítači HOST objeví jako velkokapacitní
   úložiště USB.
1. Nahrajte systém pomocí Raspberry Pi Imager (Device: **Raspberry Pi 4**, Storage:
   **RPi-MSD-0001 Media**), v kroku Customisation nastavte hostname, uživatelské jméno/heslo a
   zapněte SSH.
1. Stiskněte **RESET** na zařízení TARGET, vyčkejte na náběh systému a zjistěte jeho IP adresu
   z přidělených zápůjček na vašem DHCP serveru.

---

## Krok 2: Instalace softwarového stacku {#step-2-install-the-software-stack}

```sh
ssh fiber@<TARGET IP ADDRESS>
```

Poté postupně (kompletní příkazy a konfigurace viz [Instalace](/fiber/installation/)):

1. [Aktualizace systému](/fiber/installation/update-system/)
1. [Konfigurace hardwaru](/fiber/installation/configure-hardware/): sběrnice I2C + RTC
1. [Instalace ChirpStack](/fiber/installation/chirpstack/)
1. [Instalace ChirpStack Concentratord](/fiber/installation/concentratord/): RAK5146 připojený přes USB
1. [Instalace ChirpStack MQTT Forwarder](/fiber/installation/mqtt-forwarder/)
1. [Instalace Node-RED](/fiber/installation/node-red/)
1. [Instalace InfluxDB](/fiber/installation/influxdb/)
1. [Instalace Grafana](/fiber/installation/grafana/)
1. [Dashboard](/fiber/installation/dashboard/)

---

## Krok 3: Registrace brány a zařízení {#step-3-register-a-gateway-and-a-device}

Dokud nejsou v ChirpStack zaregistrovány brána a zařízení, nic se k síti nepřipojí. Kompletní postup
v uživatelském rozhraní najdete v části [Registrace brány a zařízení](/fiber/installation/register-device/):
přidejte bránu pomocí ID z logů Concentratord, vytvořte profil zařízení a aplikaci a poté přidejte
DevEUI a OTAA klíče vašeho zařízení STICKER nebo CHESTER.

---

## Krok 4: Zapnutí testovacího zařízení {#step-4-power-on-your-test-device}

Zapněte fyzické zařízení LoRaWAN. Sledujte v ChirpStack záložku **LoRaWAN frames** (živý náhled).
Pokud je brána v dosahu a vše výše je správně nakonfigurováno, měl by se během několika sekund objevit
join-request následovaný join-accept.

Pokud se neobjeví vůbec nic, zkontrolujte nejprve u brány časový údaj **Last seen at**, protože pokud k bráně
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

Dříve než zařízení vystavíte do jakékoli sdílené sítě, změňte **výchozí přihlášení `admin`/`admin`
v ChirpStack**. Žádný z instalačních kroků jej automaticky nemění.

:::

---

✅ **A je to!**
Vaše zařízení FIBER má nahraný systém, běží na něm ChirpStack a přijímá skutečné uplinky LoRaWAN.

---

## Varianta FIBER Lite {#fiber-lite-variant}

**FIBER Lite** (Raspberry Pi 5) používá zcela stejný softwarový stack jako FIBER: ChirpStack,
Node-RED, InfluxDB, Grafana i Dashboard se instalují stejným způsobem, bez dalších kroků.
Rozdíly jsou pouze v hardwaru:

- **Nahrání firmwaru**: žádná propojka BOOT, žádný `rpiboot`, vůbec žádná aktivace bootloaderu. Pomocí
  Raspberry Pi Imager nahrajte obraz přímo na běžnou microSD kartu a vložte ji. Metody zjištění IP adresy,
  postup nastavení statické IP a přihlášení přes SSH najdete v části
  [Nahrání Raspberry Pi OS](/fiber/installation/flash/) (záložka FIBER Lite).
- **Konfigurace hardwaru**: řádek s overlay pro RTC úplně vynechejte, Pi 5 má RTC integrované.
- **Concentratord**: RAK5146 se připojuje přes **SPI** pomocí HAT RAK2287, nikoli přes USB, má tedy
  odlišnou konfiguraci a instalační postup (viz záložka FIBER Lite v části
  [Instalace ChirpStack Concentratord](/fiber/installation/concentratord/)). Postupujte podle této záložky přesně:
  channel plan i oba řádky s oprávněními služby jsou povinné a vynechání kteréhokoli z nich
  selže tiše, bez jakéhokoli chybového hlášení.
- FIBER Lite nemá displej ani senzory 1-Wire: všechna specifika FIBER Lite (BOM, hardwarové
  rozdíly) najdete v části [Úvod do FIBER Lite](/fiber/fiber-lite/introduction/) v postranním panelu. Máte
  klasický FIBER? V postranním panelu najdete [**Hardwarové návody FIBER**](/fiber/category/fiber-hardware-guides/),
  kde je popsáno, co s jeho displejem a senzory 1-Wire.

Pokud se cokoli nechová podle očekávání, podívejte se do části **Řešení problémů** pod FIBER Lite v postranním panelu.
