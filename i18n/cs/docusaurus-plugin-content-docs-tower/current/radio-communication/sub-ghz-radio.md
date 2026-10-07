---
slug: sub-ghz-radio
title: Sub-GHz rádio
---
import Image from '@theme/IdealImage';

Rádiová komunikace je srdcem sady **TOWER Kit**. Tento dokument popisuje, jak rádio v základu funguje.

S naší sadou IoT Kit si vybudujete vlastní síť v pásmu sub-GHz.

:::info

Frekvence **868 MHz (pro Evropu)** nebo **915 MHz (pro USA)** umožňuje komunikaci na velké vzdálenosti s nízkou spotřebou. Toto pásmo slouží pro krátké signální zprávy, takže vás nebudou rušit streamovací protokoly jako Wi-Fi nebo Bluetooth.

:::

## Dosah komunikace {#communication-range}

Rádiovou komunikaci jsme několikrát testovali a můžeme říct, že z jednoho místa obvykle pokryjete signálem celý dům.

Dosah ale ovlivňuje řada faktorů. Nejdůležitější je materiál, ze kterého je dům postavený, překážky v cestě signálu, rušení od jiných spotřebičů apod.

Jediným objektivním měřítkem dosahu je takzvaný dosah při přímé viditelnosti, měřený venku.

:::tip

Mezi dvěma moduly Core Module jsme při přímé viditelnosti dosáhli dosahu [**více než 500 metrů**](https://www.youtube.com/watch?v=6zdQQdwV3GQ&feature=youtu.be).

Jediný Radio Dongle nebo Core Module také pokryje třípodlažní dům i celou zahradu kolem něj.

:::

:::note

Pokud by dosah rádiové komunikace nestačil, lze síť rozšířit na úrovni IP díky replikaci zpráv MQTT na hlavní server.

:::

## Topologie rádiové sítě {#radio-topology}

TOWER podporuje jen **topologii hvězda**. Ta je vysoce spolehlivá, snadno se v ní hledají chyby a výdrž na baterie je předvídatelná.

V rádiové síti TOWER jsou dva typy zařízení:

- [**Radio Dongle**](../hardware-modules/about-radio-dongle.md): lze s ním spárovat **až 32 zařízení**
- **Radio Node**: každý uzel musí být spárovaný s bránou. Uzlem může být senzor (např. teploty, vlhkosti, CO2) nebo akční člen (výkonové relé, LCD, ovladač LED pásku).

:::info

Více o párování uzlů se dočtete v [**kapitole Správa rádiové sítě**](../desktop-programming/radio-network-management.md).

:::

## Řízení spotřeby rádia {#radio-power-management}

Brána je trvale napájená, takže zprávám naslouchá neustále. Odeslat zprávu z uzlu do brány proto není problém.

Uzly napájené z baterií by naopak měly mít rádio většinu času vypnuté, protože spotřebovává hodně energie.

To nevadí, pokud chcete ze zařízení jen odesílat zprávy: zařízení zapne rádio, odešle zprávu a rádio zase vypne.

Pokud chcete rádiový uzel ovládat z brány, například uzel s modulem [**Relay Module**](../hardware-modules/about-relay-module.md) (relé s nízkou spotřebou), kterému posíláte příkazy z brány, máte dvě možnosti.

### Použití napájecího adaptéru {#using-power-adapter}

Pokud je modul [**Power Module**](../hardware-modules/about-power-module.md) nebo [**Core Module**](../hardware-modules/about-core-module.md) trvale napájený, můžete ve firmwaru zapnout rádiový režim `TWR_RADIO_MODE_NODE_LISTENING`.

:::note

Funguje to jen díky trvalému napájení. Pro zařízení na baterie se tento režim na delší dobu nehodí.

:::

```c
void application_init(void)
{
    twr_radio_init(TWR_RADIO_MODE_NODE_LISTENING);
}
```

### Nastavení časového limitu naslouchání pro spící uzel {#set-listening-timeout-for-sleeping-node}

Při inicializaci rádia můžete nastavit časový limit naslouchání pro spící uzel funkcí `twr_radio_set_rx_timeout_for_sleeping_node(TIME_IN_MILLISECONDS)`.

:::info

V příkladu níže se teplota odesílá každých 10 minut a po odeslání teploty bude uzel naslouchat nastavených 400 milisekund.

Například ve [**flow v Node-RED**](../desktop-programming/node-red-programming.md) tak můžete počkat na zprávu s teplotou a hned na ni odpovědět požadovaným stavem modulu Relay Module. Stav relé si přitom musíte ve flow uložit a poslat ho až po příchodu zprávy s teplotou.

:::

:::caution

Hodí se to jen pro zařízení, u kterých nevadí delší prodleva, než se změna projeví.

:::

<details>
<summary>
<b>
Příklad kódu: naslouchání spícího uzlu
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
| Komunikační frekvence (Evropa)    | 868,0 MHz |
| Komunikační frekvence (USA)       | 915,0 MHz |
| Typ modulace                      | GFSK      |
| Modulační rychlost                | 19,2 kbps |
| Frekvenční zdvih vysílače         | 20 kHz    |
| Vysílací výkon                    | 11,6 dBm  |
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
