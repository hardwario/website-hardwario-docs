---
slug: radio-network-management
title: Správa rádiové sítě
---
import Image from '@theme/IdealImage';
import ReactPlayer from 'react-player'

V této kapitole si projdeme **záložku Devices** aplikace Playground.
## Záložka Devices {#devices-tab}

Na této záložce se připojíte k zařízení **Radio Dongle**.

Vyberte z rozbalovacího seznamu zařízení **Radio Dongle** (na řádku by mělo být `twr-usb-dongle` nebo `bc-usb-dongle`) a klikněte na **Connect**.

Pokud jste zařízení **Radio Dongle** právě koupili v našem e-shopu, dostanete ho už se správným firmwarem a vše by mělo fungovat.

<Image img={require('../../../../../tower/desktop-programming/images/devices-dongle-selection.png')} alt="Záložka Devices s vybraným COM portem zařízení Radio Dongle v rozbalovacím seznamu, vedle tlačítka Connect" />
<br />

:::tip

Pokud tlačítko **Connect** skončí chybou, má zařízení **Radio Dongle** možná nesprávný firmware. Opravíte to tak, že na **záložce Firmware** nahrajete do zařízení **Radio Dongle** firmware `twr-gateway-usb-dongle`.

Pokud nevíte, jak se se **záložkou Firmware** pracuje, projděte si [**kapitolu Nahrání firmwaru**](./firmware-flashing.md).

:::

Jakmile se k zařízení **Radio Dongle** úspěšně připojíte, tlačítko **Start pairing** by se mělo aktivovat a v seznamu uvidíte případná spárovaná zařízení.

<Image img={require('../../../../../tower/desktop-programming/images/devices-dongle-connected.png')} alt="Záložka Devices po připojení: tlačítka Disconnect a Start pairing a spárované zařízení s možnostmi Rename a Remove" />
<br />

:::caution

**Alias zařízení** můžete změnit tlačítkem **Rename** vedle něj. Změní se tím ale všechny zprávy MQTT, proto **ho měňte, jen pokud víte, co děláte**.

:::

### Párování nových zařízení {#pairing-new-devices}

- Odpojte zařízení od napájení (vyjměte **baterie** nebo [**Battery Module**](../hardware-modules/about-battery-module.md), odpojte kabel USB, vytáhněte konektor DC jack z modulu [**Power Module**](../hardware-modules/about-power-module.md))
- Klikněte na tlačítko **Start pairing** (mělo by **zčervenat**)
- Připojte zařízení k napájení
- Postup zopakujte se všemi moduly, které chcete spárovat

:::tip

O další záložce se dozvíte v kapitole [**Správa zpráv MQTT**](./mqtt-messages-management.md).

:::

## Videonávod {#video-tutorial}

Pokud dáváte přednost videonávodu, podívejte se na toto video. Je natočené ve starší verzi aplikace Playground, postup je ale stejný.

<ReactPlayer controls src='https://youtu.be/ESrTEdV9PJQ' />
