---
slug: mqtt-messages-management
title: Správa MQTT zpráv
description: "V této kapitole si projdeme záložku Messages v Playgroundu"
---
import Image from '@theme/IdealImage';


V této kapitole si projdeme **záložku Messages** v Playgroundu

:::info

**Záložka Messages** je opravdu užitečná až po připojení k vašemu **Radio Dongle**, o tom, jak to udělat, si můžete přečíst v [**kapitole Správa rádiové sítě**](./radio-network-management.md).

:::

## Záložka Messages {#messages-tab}

V této záložce si můžete zobrazit všechny zprávy z vašich spárovaných zařízení nebo jakoukoli jinou MQTT zprávu, pokud chcete.

:::note

Pokud o protokolu MQTT a MQTT zprávách moc nevíte, můžete navštívit [**sekci Protokol MQTT**](../mqtt-protocol/index.md).

:::

Ve výchozím nastavení se budou zobrazovat pouze zprávy ze **zařízení HARDWARIO TOWER**.

<Image img={require('../../../../../tower/desktop-programming/images/messages-tab.png')} alt="Záložka Messages s výpisem přicházejících MQTT zpráv z teploměru a sekcemi Publish a Subscribed topics níže" />

### Zprávy {#messages}
Hlavní část této záložky je nahoře, kde jsou zobrazeny všechny zprávy.

Zprávy budete dostávat z [**odebíraných témat**](#subscribed-topics), tato témata můžete změnit v dolní části záložky.

Pokud chcete zkopírovat téma zprávy, můžete použít **tlačítko Clipboard** nebo jen kliknout na řádek s tématem, které chcete. To je užitečné pro [**programování v Node-RED**](./node-red-programming.md). V pravém horním rohu by se měl objevit zelený čtvereček.

Na pravé straně je **tlačítko Pin**, pokud je pro vás nějaká zpráva důležitá, můžete si ji připnout nahoru.

Můžete také **smazat všechny zprávy** (Clear all messages), což jednoduše vymaže celou historii.
:::caution

Toto je **nevratné**, takže buďte opatrní.

:::

### Publikování zprávy {#publish-message}
V této části záložky můžete **publikovat MQTT zprávy**
- Do levého vstupního pole zadáte **téma zprávy**, například `node/test`
- Do pravého vstupního pole zadáte zprávu, kterou chcete poslat pod vybraným tématem, například `test message`

Po kliknutí na tlačítko **Publish** byste měli vidět zprávu v horní části (pokud odebíráte téma, které jste vybrali)

<Image img={require('../../../../../tower/desktop-programming/images/messages-publish.png')} alt="Pole pro publikování zprávy s tématem node/test, payloadem test message a tlačítkem Publish" />

### Odebíraná témata {#subscribed-topics}
V dolní části záložky můžete vybrat, **jaká témata chcete odebírat**.

:::note

Tím určíte, jaké zprávy se budou zobrazovat v horní části záložky. Ve výchozím nastavení se toho nemusíte dotýkat, protože každá zpráva ze zařízení HARDWARIO TOWER začíná na `node/` nebo `bridge/`, které již odebíráte.

:::

<Image img={require('../../../../../tower/desktop-programming/images/messages-subscribe.png')} alt="Seznam odebíraných témat s výchozími odběry node/# a bridge/#" />

Pokud chcete přidat nové téma, jednoduše ho napište do pole a stiskněte **tlačítko Subscribe**. Nové téma se objeví v seznamu.

Pokud chcete téma ze **seznamu odebíraných** odstranit, stiskněte **tlačítko s křížkem** vedle tématu.

:::note

Tento seznam se **resetuje při každém** spuštění Playgroundu.

:::

:::tip

Chcete-li se dozvědět o další záložce, navštivte [**Programování v Node-RED**](./node-red-programming.md).

:::
