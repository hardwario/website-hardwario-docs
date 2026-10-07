---
slug: lora-at-commands
title: Konfigurace LoRa pomocí příkazů AT
---
import Image from '@theme/IdealImage';

Tento dokument popisuje, jak zařízení HARDWARIO TOWER s LoRa nakonfigurovat příkazy AT přes virtuální sériový port USB.

:::info

Tento dokument nevysvětluje příkazy a funkce specifické pro firmware konkrétního projektu. Ty jsou popsané přímo u daného projektu.

Příkazy platí pro všechny firmwary s prefixem `twr-lora-` v aplikaci [**HARDWARIO Playground**](../desktop-programming/about-playground.md).

:::

## Konfigurace LoRa {#lora-configuration}

Modul LoRa Module se konfiguruje **příkazy AT**, které posíláte do modulu [**Core Module**](../hardware-modules/about-core-module.md) přes virtuální sériový port USB.

:::tip

Modul LoRa Module nejsnáze nakonfigurujete v naší konzoli [**HARDWARIO Console**](../firmware-development/hardwario-tower-console.md), která je součástí aplikace [**HARDWARIO Code**](../firmware-development/about-hardwario-code.md).

:::

Můžete také použít emulátor terminálu, například [**Hterm**](http://der-hammer.info/pages/terminal.html), [**Putty**](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html), [**Picocom**](https://pkgs.org/download/picocom).

Parametry připojení:
- Rychlost **115200**
- **8 datových bitů, 1 stop bit, bez parity** (8N1)
- `CR+LF` jako sekvence **konce řádku** pro vysílání i příjem

## O příkazech AT {#about-at-commands}

Všechny dostupné příkazy vypíšete příkazem `AT$HELP`. Které příkazy jsou podporované, závisí na verzi firmwaru.

<details>
<summary>
<b>
Příklad výstupu AT$HELP
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

Hodnotu proměnné přečtete tak, že na konec **odpovídajícího příkazu AT** připojíte otazník `?`:

```
AT$APPSKEY?
```

Aktuální hodnota proměnné se zobrazí v terminálu:

```
APPSKEY: BF22C15EB89237A65DAABB05B2C91EB4
```

### Změna hodnoty {#update-value}

Hodnotu proměnné změníte tak, že za název proměnné napíšete `=` a požadovanou hodnotu:

```
AT$APPSKEY=BF22C15EB89237A65DAABB05B2C91EB4
```

:::tip

Pro testovací účely můžete použít [**online generátory klíčů**](https://loratools.nl/#/keys).

:::

## OTAA – Over-the-Air Activation {#otaa---over-the-air-activation}

OTAA znamená, že relační klíče (ty s **S** v názvu) se generují v síti LoRa během operace **JOIN**. Klíče se pak automaticky přenesou do modulu LoRa.

:::info

Pokud vaše síť LoRa nepodporuje aktivační metodu OTAA, **přečtěte si část ABP níže**. Pokud si nejste jisti, který typ aktivace použít, začněte s OTAA.

:::

Při aktivaci OTAA musí síť LoRa znát DevEUI vašeho modulu LoRa. Hodnotu přečtete příkazem `AT$DEVEUI?`; odpověď by měla vypadat nějak takto:

```
$DEVEUI: 009335FF931FEADC
OK
```

Síť LoRa také potřebuje znát hodnoty `APPKEY` a `APPEUI`. Hodnoty můžete buď přečíst z modulu LoRa a zadat je do sítě LoRa, nebo si nechat od sítě LoRa vygenerovat nové a nastavit je v modulu, například:

```
AT$APPEUI=324502A5676BADD7
OK
AT$APPKEY=44D4A5DA7A9507F036C5A2750211F052
OK
```

:::note

Odpověď `OK` znamená, že se hodnota uložila do interní paměti flash modulu LoRa.

:::

:::info

Některé sítě LoRa podporují také generování `DEVEUI`, ale změnu této hodnoty nedoporučujeme.

:::

Nakonec přepněte modem do režimu **OTAA** a odešlete příkaz **JOIN**, kterým se vymění relační klíče. Ujistěte se, že má váš modem dobrý signál, protože k dokončení operace **JOIN** potřebuje **obousměrnou komunikaci** s bránou.

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

Pozor: odpověď **OK** na příkaz **JOIN** ještě neznamená, že se připojení podařilo. Počkejte několik sekund na `$JOIN_OK` (připojení se podařilo), nebo `$JOIN_ERROR` (připojení selhalo). Po úspěšném připojení je modul LoRa připravený komunikovat.

:::

## ABP – Activation by Personalization {#abp---activation-by-personalization}

**ABP** znamená, že relační klíče nastavujete ručně. `AT$MODE` musí být **nastaveno na 0 (ABP)**, což je výchozí nastavení po resetu napájení modulu LoRa.

Pokud používáte režim ABP, musíte hodnoty `APPSKEY` a `NWKSKEY` nastavit ručně odpovídajícími příkazy AT.

```
AT$APPSKEY=5505CA3E4620843B324502A5676BADD7
OK
AT$NWKSKEY=44D4A5DA7A9507F036C5A2750211F050
OK
```

:::note

Odpověď `OK` znamená, že se hodnota uložila do interní paměti flash modulu LoRa.

:::

Síť LoRa musí znát hodnoty `DEVEUI` a `DEVADDR` vašeho modulu LoRa.
K přečtení hodnot použijte příkazy `AT$DEVEUI?` a `AT$DEVADDR?`.

```
AT$DEVEUI?
$DEVEUI: 009335FF931FEADC
OK
AT$DEVADDR?
$DEVADDR: 26012C39
OK
```
