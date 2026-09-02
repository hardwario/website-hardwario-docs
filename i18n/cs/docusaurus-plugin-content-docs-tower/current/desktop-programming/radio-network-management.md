---
slug: radio-network-management
title: Správa rádiové sítě
description: "V této kapitole si projdeme záložku Devices v aplikaci Playground"
---
import Image from '@theme/IdealImage';
import ReactPlayer from 'react-player'

V této kapitole si projdeme **záložku Devices** v aplikaci Playground
## Záložka Devices {#devices-tab}

Na této záložce se můžete připojit k zařízení **Radio Dongle**

Vyberte z rozbalovacího seznamu zařízení **Radio Dongle** (na řádku by mělo být `twr-usb-dongle` nebo `bc-usb-dongle`) a klikněte na **Connect**.

Pokud jste zařízení **Radio Dongle** právě zakoupili v našem shopu, mělo by být dodáno se správným firmwarem a vše by mělo fungovat.

<Image img={require('../../../../../tower/desktop-programming/images/devices-dongle-selection.png')} alt="Záložka Devices s vybraným COM portem zařízení Radio Dongle v rozbalovacím seznamu, vedle tlačítka Connect" />
<br />

:::tip

Pokud tlačítko Connect vrátí chybu, může mít vaše zařízení **Radio Dongle** nesprávný firmware. Chybu odstraníte tak, že přejdete na **záložku Firmware** a nahrajete do zařízení **Radio Dongle** firmware `twr-gateway-usb-dongle`.

Pokud nevíte, jak se se **záložkou Firmware** pracuje, můžete si projít [**kapitolu Nahrání firmwaru**](./firmware-flashing.md).

:::

Po úspěšném připojení k zařízení **Radio Dongle** by se mělo rozsvítit tlačítko **Start pairing**, a pokud jsou spárována nějaká zařízení, měli byste je vidět v seznamu.

<Image img={require('../../../../../tower/desktop-programming/images/devices-dongle-connected.png')} alt="Záložka Devices po připojení: tlačítka Disconnect a Start pairing a spárované zařízení s možnostmi Rename a Remove" />
<br />

:::caution

**Alias zařízení** můžete změnit tlačítkem **Rename** vedle něj, tím se však změní všechny MQTT zprávy, takže **měňte jej pouze tehdy, pokud víte, co děláte**.

:::

### Párování nových zařízení {#pairing-new-devices}

- Odpojte zařízení od napájení (vyjměte **baterie** nebo [**Battery Module**](../hardware-modules/about-battery-module.md), odpojte USB kabel, vytáhněte DC jack z modulu [**Power Module**](../hardware-modules/about-power-module.md))
- Klikněte na tlačítko **Start pairing** (mělo by **zčervenat**)
- Připojte k zařízení napájení
- Zopakujte se všemi moduly, které chcete spárovat

:::tip

O další záložce se dozvíte v kapitole [**Správa MQTT zpráv**](./mqtt-messages-management.md).

:::

## Video návod {#video-tutorial}

Pokud dáváte přednost video návodu, můžete se podívat na toto video pro starší verzi aplikace Playground, funguje to však stejně.

<ReactPlayer controls src='https://youtu.be/ESrTEdV9PJQ' />
