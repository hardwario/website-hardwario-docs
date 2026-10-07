---
slug: debug
title: Ladění
---
import Image from '@theme/IdealImage';

# Ladění {#debug}

Většinu kódu odladíte pomocí logovacích funkcí systému Zephyr, například `LOG_INF`, `LOG_HEXDUMP_INF` a dalších.

Někdy je ale potřeba skutečné nízkoúrovňové ladění hardwaru s krokováním a náhledem do paměti.

Snadno ho zvládnete s rozšířením [**nRF Connect for VS Code**](https://marketplace.visualstudio.com/items?itemName=nordic-semiconductor.nrf-connect) pro VS Code.

![Relace ladění ve VS Code zastavená na breakpointu v main.c s proměnnými, zásobníkem volání a registry periferií](../../../../../chester/firmware-sdk/images/debugging.png)


## Instalace {#install}

Ve VSCode stiskněte `Ctrl` + `P`, napište `ext install nordic-semiconductor.nrf-connect` a stiskněte Enter.

## Postup ladění {#debugging}

1. Otevřete rozšíření **nRF Connect for VS Code**, klikněte na `Open Existing Application` a vyberte složku aplikace, ve které obvykle spouštíte `west build`.

![Panel nRF Connect ve VS Code se zvýrazněným tlačítkem Open Existing Application](../../../../../chester/firmware-sdk/images/open-existing-application.png)

2. V souboru projektu `prj.conf` řádek zakomentujte znakem `#` nebo **odstraňte `CONFIG_CTR_BLE=y`. BLE je citlivé na časování, a když je zapnuté, ladění nefunguje správně.**

![prj.conf v editoru se zakomentovaným řádkem CONFIG_CTR_BLE=y](../../../../../chester/firmware-sdk/images/disable-ble.png)

3. V levém panelu v sekci **Applications** klikněte na **+ Add build configuration**

4. V možnosti **Board** vyberte `chester_nrf52840`. Nastavte **Optimization level** na **Optimize for debugging (-Og)**. Poté klikněte dole na tlačítko **Build Configuration**. Projekt se sestaví.

5. V levém panelu v sekci **Actions** klikněte na **Debug** a začněte kód ladit.

:::warning

Nepoužívejte **Erase board** ani jinou podobnou možnost. Zařízení CHESTER ukládá do oblasti UICR sériové číslo a komunikační klíče. Pokud ji vymažete, budete muset obnovit [**data PIB**](../developer-tools/command-line-tools.md#product-information-block).

Chcete-li vymazat desku, použijte příkaz erase v [**HARDWARIO CLI**](../developer-tools/command-line-tools.md), který oblasti UICR zachová.

:::

## Shell přes RTT {#shell-over-rtt}

V levém panelu **Connected devices** můžete se zařízením otevřít komunikaci přes RTT. Používá kanál 0 se shellem Zephyr, takže do terminálu můžete zadávat příkazy. Druhý kanál RTT s logy se tu nezobrazuje.

![Panel Connected devices se zvýrazněnou položkou RTT a seznamem příkazů shellu Zephyr v terminálu](../../../../../chester/firmware-sdk/images/rtt-shell.png)

## Vlákna {#threads}

Na záložce **NRF DEBUG** můžete zkoumat vlákna a paměť.

![Záložka NRF DEBUG s přehledem vláken, využitím zásobníku a prohlížečem paměti flash](../../../../../chester/firmware-sdk/images/nrf-debug.png)
