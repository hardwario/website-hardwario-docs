---
slug: sub-ghz-radio
title: Sub-GHz rádio
description: "Technologie rádiové komunikace je srdcem TOWER Kit. Tento dokument popisuje základní fungování rádia."
---
import Image from '@theme/IdealImage';

Technologie rádiové komunikace je srdcem **TOWER Kit**. Tento dokument popisuje základní fungování rádia.

S naší sadou IoT Kit si můžete vybudovat vlastní síť v pásmu Sub-GHz.

:::info

Rádiová frekvence **868 MHz (pro Evropu)** nebo **915 MHz (pro USA)** umožňuje komunikaci na velké vzdálenosti a nabízí nízkou spotřebu. Protože se toto frekvenční pásmo používá pro signálové zprávy, nesetkáte se s rušením od streamovacích protokolů jako Wi-Fi, Bluetooth apod.

:::

## Dosah komunikace {#communication-range}

Provedli jsme několik testů rádiové komunikace. Tvrdíme, že z jednoho bodu obvykle dokážete pokrýt rádiovým signálem celý dům.

Na druhou stranu komunikační vzdálenost ovlivňuje několik faktorů – nejdůležitější je stavební materiál, ze kterého je dům postaven, překážky v cestě, rušení od jiných spotřebičů apod.

Jediným objektivním měřením dosahu rádiové komunikace je takzvaná vzdálenost na přímou viditelnost měřená venku.

:::tip

Dosáhli jsme [**více než 500 metrů**](https://www.youtube.com/watch?v=6zdQQdwV3GQ&feature=youtu.be) komunikačního dosahu na přímou viditelnost mezi dvěma moduly Core Module.

Také jediný Radio Dongle / Core Module stačí na pokrytí třípodlažního domu a celé zahrady kolem něj.

:::

:::note

Pokud by dosah rádiové komunikace nestačil, lze síť rozšířit na úrovni IP díky replikaci MQTT zpráv na hlavní server.

:::

## Topologie rádiové sítě {#radio-topology}

TOWER podporuje pouze **topologii hvězdy**. Taková konfigurace nabízí vysokou spolehlivost, snadné řešení problémů a deterministickou dobu provozu z baterií.

V rádiové síti TOWER existují dva typy zařízení.

- [**Radio Dongle**](../hardware-modules/about-radio-dongle.md): můžete spárovat **až 32 zařízení**
- **Radio Node**: každý uzel musí být spárován s bránou. Uzlem může být nějaký senzor (např. teploty, vlhkosti, CO2) nebo akční člen (výkonové relé, LCD, ovladač LED pásku).

:::info

Více o párování uzlů se dočtete v [**kapitole Správa rádiové sítě**](../desktop-programming/radio-network-management.md).

:::

## Řízení spotřeby rádia {#radio-power-management}

Protože je brána trvale napájena, neustále naslouchá zprávám. Díky tomu by odeslání zprávy z uzlu do brány nemělo být problém.

Naproti tomu všechny bateriově napájené uzly by měly mít rádio většinu času vypnuté, protože spotřebovává hodně energie.

To není problém, pokud chcete ze zařízení pouze odesílat zprávy – zařízení jednoduše zapne rádio, odešle zprávu a rádio zase vypne.

Pokud chcete rádiový uzel ovládat z brány, například když máte k rádiovému uzlu připojený [**Relay Module**](../hardware-modules/about-relay-module.md) (nízkopříkonové relé) a chcete jej ovládat odesíláním zpráv z brány, existují dva způsoby.

### Použití napájecího adaptéru {#using-power-adapter}

Při použití trvale napájeného modulu [**Power Module**](../hardware-modules/about-power-module.md) nebo [**Core Module**](../hardware-modules/about-core-module.md) můžete ve firmwaru povolit rádiový režim `TWR_RADIO_MODE_NODE_LISTENING`.

:::note

Toto lze využít pouze díky trvalému napájení. Pro bateriově napájená zařízení je to na delší dobu nepoužitelné.

:::

```c
void application_init(void)
{
    twr_radio_init(TWR_RADIO_MODE_NODE_LISTENING);
}
```

### Nastavení časového limitu naslouchání pro spící uzel {#set-listening-timeout-for-sleeping-node}

Při inicializaci rádia můžete nastavit časový limit naslouchání pro spící uzel pomocí `twr_radio_set_rx_timeout_for_sleeping_node(TIME_IN_MILLISECONDS)`.

:::info

V příkladu níže se teplota odesílá každých 10 minut a po odeslání teploty bude uzel naslouchat nastavených 400 milisekund.

Díky tomu můžete čekat na zprávu s teplotou například ve [**flow v Node-RED**](../desktop-programming/node-red-programming.md) a na tuto zprávu okamžitě reagovat odesláním požadovaného stavu modulu Relay Module. Stav relé si samozřejmě musíte ve flow uložit a odeslat jej až poté, co přijde zpráva s teplotou.

:::

:::caution

Toto je použitelné pouze pro zařízení, u kterých může být před provedením změny dlouhá prodleva.

:::

<details>
<summary>
<b>
výstup bcf --help
</b>
</summary>
<p>

```c showLineNumbers
/* Temperature event handler, this will just send the value through the radio *
 * and allow the Core Module to switch to Listening mode for 400ms            */
void tmp112_event_handler(twr_tmp112_t *self, twr_tmp112_event_t event, void *event_param)
{
    float value;
    event_param_t *param = (event_param_t *)event_param;

    if (event == TWR_TMP112_EVENT_UPDATE)
    {
        twr_radio_pub_temperature(param->channel, &value);
        param->value = value;
        values.temperature = value;
    }
}

void application_init(void)
{

    static twr_tmp112_t temperature;
    twr_tmp112_init(&temperature, TWR_I2C_I2C0, 0x49);
    twr_tmp112_set_event_handler(&temperature, tmp112_event_handler, NULL);
    twr_tmp112_set_update_interval(&temperature, 60 * 1000);               // Update every 10 minutes

    twr_radio_init(TWR_RADIO_MODE_NODE_SLEEPING);
    twr_radio_pairing_request("relay", VERSION);
    twr_radio_set_rx_timeout_for_sleeping_node(400);
}
```

</p>
</details>

## Parametry rádia {#radio-parameters}

| Parametr                          | Hodnota   |
| :-------------------------------- | :-------- |
| Komunikační frekvence (Evropa)    | 868.0 MHz |
| Komunikační frekvence (USA)       | 915.0 MHz |
| Typ modulace                      | GFSK      |
| Modulační rychlost                | 19.2 kbps |
| Frekvenční zdvih vysílače         | 20 kHz    |
| Vysílací výkon                    | 11.6 dBm  |
| Šířka pásma přijímacího filtru    | 100 kHz   |


## Struktura paketu {#packet-structure}

| PRE(4) | SYN(4) | LEN(1) | DST(1) | DATA(0..60) | CRC(2) |
| :----- | :----- | :----- | :----- | :---------- | :----- |

#### Vysvětlení jednotlivých částí {#explanation-of-each-part}

- **PRE(4)**: tato část se nazývá preambule a tvoří ji střídavá sekvence nul a jedniček (32 bitů).
- **SYN(4)**: tato část se nazývá synchronizační slovo a má pevnou hodnotu 0x88888888.
- **LEN(1)**: tato část určuje délku pole DATA plus 1 (počítá se i pole DST).
- **DST(1)**: cílová adresa (pro logické adresování v síti).
- **DATA(0..60)**: datové pole payloadu s proměnnou délkou.
- **CRC(2)**: kontrolní součet počítaný přes všechna pole kromě polí PRE a SYN. Polynom CRC je 0x1021.
