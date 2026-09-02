---
slug: lora-at-commands
title: Konfigurace pomocí AT příkazů LoRa
description: "Tento dokument popisuje, jak konfigurovat zařízení HARDWARIO TOWER s LoRa pomocí AT příkazů přes virtuální sériový port USB."
---
import Image from '@theme/IdealImage';

Tento dokument popisuje, jak konfigurovat zařízení HARDWARIO TOWER s LoRa pomocí AT příkazů přes virtuální sériový port USB.

:::info

Tento dokument nevysvětluje příkazy a funkce specifické pro firmware konkrétního projektu. Ty jsou vysvětleny přímo v daném projektu.

Tyto příkazy platí pro veškerý firmware v [**HARDWARIO Playground**](../desktop-programming/about-playground.md) s prefixem `twr-lora-`.

:::

## Konfigurace LoRa {#lora-configuration}

Modul LoRa lze konfigurovat pomocí **AT příkazů** odeslaných do [**Core Module**](../hardware-modules/about-core-module.md) přes virtuální sériový port USB.

:::tip

Nejsnazší způsob, jak modul LoRa nakonfigurovat, je použít naši [**HARDWARIO Console**](../firmware-development/hardwario-tower-console.md), která je součástí [**HARDWARIO Code**](../firmware-development/about-hardwario-code.md).

:::

Můžete také použít aplikaci terminálového emulátoru, například [**Hterm**](http://der-hammer.info/pages/terminal.html), [**Putty**](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html), [**Picocom**](https://pkgs.org/download/picocom).

Parametry konfigurace jsou:
- Rychlost **115200**
- **8 datových bitů, 1 stop bit, bez parity** (8N1)
- `CR+LF` jako sekvence **konce řádku** pro vysílání i příjem

## O AT příkazech {#about-at-commands}

Pro výpis všech možných příkazů použijte `AT$HELP`. Sada podporovaných příkazů závisí na verzi vašeho firmwaru.

<details>
<summary>
<b>
Ukázkový výstup AT$HELP
</b>
</summary>
<p>

```showLineNumbers
AT$HELP
AT$DEVEUI
AT$DEVADDR
AT$NWKSKEY
AT$APPSKEY
AT$APPKEY
AT$APPEUI
AT$BAND 0:AS923, 1:AU915, 5:EU868, 6:KR920, 7:IN865, 8:US915
AT$MODE 0:ABP, 1:OTAA
AT$NWK Network type 0:private, 1:public
AT$ADR Automatic data rate 0:disabled, 1:enabled
AT$DR Data rate 0-15
AT$REPU Repeat of unconfirmed transmissions 1-15
AT$REPC Repeat of confirmed transmissions 1-8
AT$JOIN Send OTAA Join packet
AT$FRMCNT Get frame counters
AT$LNCHECK MAC Link Check
AT$RFQ Get RSSI/SNR of last RX packet
AT$DEBUG Show debug UART communication
AT$REBOOT Firmware reboot
AT$FRESET LoRa Module factory reset
AT$SEND Immediately send packet
AT$STATUS Show status
AT$BLINK LED blink 3 times
AT$LED LED on/off
AT+CLAC List all available AT commands
AT$HELP This help
```

</p>
</details>

### Čtení hodnoty {#read-value}

Pro přečtení hodnoty proměnné stačí na konec **odpovídajícího AT příkazu** připojit otazník `?`

```
AT$APPSKEY?
```

Aktuální hodnota proměnné se zobrazí v terminálu

```
APPSKEY: BF22C15EB89237A65DAABB05B2C91EB4
```

### Změna hodnoty {#update-value}

Pro změnu hodnoty proměnné použijte následující zápis proměnné, za nímž následuje `=` a požadovaná hodnota

```
AT$APPSKEY=BF22C15EB89237A65DAABB05B2C91EB4
```

:::tip

Pro testovací účely můžete použít [**online generátory klíčů**](https://loratools.nl/#/keys).

:::

## OTAA – Over-the-Air Activation {#otaa---over-the-air-activation}

OTAA znamená, že relační klíče (ty s **S** v názvu) se generují v síti LoRa během operace **JOIN**. Klíče jsou pak automaticky přeneseny do vašeho modulu LoRa.

:::info

Pokud vaše síť LoRa nepodporuje aktivační metodu OTAA, **přečtěte si část ABP níže**. Pokud si nejste jisti, který typ aktivace použít, začněte s OTAA.

:::

Pro aktivační metodu OTAA potřebuje síť LoRa znát DevEUI vašeho modulu LoRa. Hodnotu přečtete příkazem `AT$DEVEUI?`, měli byste dostat něco takového

```
$DEVEUI: 009335FF931FEADC
OK
```

Síť LoRa také potřebuje znát hodnoty `APPKEY` a `APPEUI`. Buď můžete hodnoty přečíst z modulu LoRa a přenést je do své sítě LoRa, nebo můžete nechat síť LoRa vygenerovat nové hodnoty, které pak nastavíte v modulu, například:

```
AT$APPEUI=324502A5676BADD7
OK
AT$APPKEY=44D4A5DA7A9507F036C5A2750211F052
OK
```

:::note

Pokaždé, když dostanete `OK`, znamená to, že hodnota byla uložena do interní flash paměti modulu LoRa.

:::

:::info

Některé sítě LoRa podporují také generování `DEVEUI`, ale změnu této hodnoty nedoporučujeme.

:::

Nakonec přepněte modem do režimu **OTAA** a odešlete příkaz **JOIN** pro výměnu relačních klíčů. Ujistěte se, že má váš modem dobrý signál, protože k dokončení operace **JOIN** potřebuje **obousměrnou komunikaci** s bránou.

```
AT$MODE=1  // Set OTAA(1)
OK
AT$NWK=1   // Public(1) or private(0) network config (TTN is public)
OK
AT$JOIN
OK
$JOIN_OK
```

:::info

Všimněte si, že odpověď **OK** na příkaz **JOIN** neznamená, že připojení bylo úspěšné. Počkejte několik sekund, než obdržíte buď `$JOIN_OK` (připojení bylo úspěšné), nebo `$JOIN_ERROR` (připojení selhalo). Pokud bylo připojení úspěšné, modul LoRa je připraven komunikovat.

:::

## ABP – Activation by Personalization {#abp---activation-by-personalization}

**ABP** znamená, že relační klíče nastavujete ručně. `AT$MODE` musí být **nastaveno na 0 (ABP)**, což je výchozí nastavení po resetu napájení modulu LoRa.

Pokud používáte režim ABP, musíte hodnoty `APPSKEY` a `NWKSKEY` nastavit ručně pomocí odpovídajících AT příkazů.

```
AT$APPSKEY=5505CA3E4620843B324502A5676BADD7
OK
AT$NWKSKEY=44D4A5DA7A9507F036C5A2750211F050
OK
```

:::note

Pokaždé, když dostanete `OK`, znamená to, že hodnota byla uložena do interní flash paměti modulu LoRa.

:::

Síť LoRa bude potřebovat znát hodnoty `DEVEUI` a `DEVADDR` z vašeho modulu LoRa.
K přečtení hodnot použijte příkazy `AT$DEVEUI?` a `AT$DEVADDR?`.

```
AT$DEVEUI?
$DEVEUI: 009335FF931FEADC
OK
AT$DEVADDR?
$DEVADDR: 26012C39
OK
```
