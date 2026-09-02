---
slug: debug
title: Debug
description: "Většinu kódu je možné debugovat pomocí logovacích funkcí Zephyr jako LOGINF, LOGHEXDUMPINF a dalších."
---
import Image from '@theme/IdealImage';

# Debug {#debug}

Většinu kódu je možné debugovat pomocí logovacích funkcí Zephyr jako `LOG_INF`, `LOG_HEXDUMP_INF` a dalších.

Někdy je však nutné provést skutečné nízkoúrovňové hardwarové debugování s krokováním a náhledem do paměti.

To snadno umožní rozšíření [**nRF Connect for VS Code**](https://marketplace.visualstudio.com/items?itemName=nordic-semiconductor.nrf-connect) ve vašem VSCode.

![Debugovací session ve VS Code zastavená na breakpointu v main.c s proměnnými, call stackem a registry periferií](../../../../../chester/firmware-sdk/images/debugging.png)


## Instalace {#install}

Ve VSCode stiskněte `Ctrl` + `P`, napište `ext install nordic-semiconductor.nrf-connect` a stiskněte enter.

## Debugování {#debugging}

1. Otevřete rozšíření **nRF Connect for VS Code**, klikněte na `Open Existing Application` a vyberte složku aplikace, ve které obvykle spouštíte `west build`.

![Panel nRF Connect ve VS Code se zvýrazněným tlačítkem Open Existing Application](../../../../../chester/firmware-sdk/images/open-existing-application.png)

2. V projektovém souboru `prj.conf` zakomentujte pomocí `#` nebo **odstraňte `CONFIG_CTR_BLE=y`. BLE je citlivé na časování, a pokud je zapnuté, debugování nefunguje správně.**

![prj.conf v editoru se zakomentovanou řádkou CONFIG_CTR_BLE=y](../../../../../chester/firmware-sdk/images/disable-ble.png)

3. V levém panelu v sekci **Applications** klikněte na **+ Add build configuration**

4. V možnosti **Board** vyberte `chester_nrf52840`. Nastavte **Optimization level** na **Optimize for debugging (-Og)**. Poté klikněte dole na tlačítko **Build Configuration**. Projekt se sestaví.

5. V levém panelu v sekci **Actions** klikněte na **Debug** a spusťte debugování svého kódu.

:::warning

Nepoužívejte **Erase board** ani jinou podobnou možnost. Zařízení CHESTER využívá oblast UICR k uložení sériového čísla a komunikačních klíčů. Pokud ji vymažete, budete muset obnovit [**PIB data**](../developer-tools/command-line-tools.md#product-information-block).

Pro vymazání desky použijte příkaz erase v [**HARDWARIO CLI**](../developer-tools/command-line-tools.md), který oblasti UICR zachová.

:::

## Shell přes RTT {#shell-over-rtt}

V levém panelu **Connected devices** můžete otevřít RTT komunikaci se zařízením. Používá kanál 0, což je shell Zephyr. Do terminálu můžete zadávat příkazy. Druhý RTT kanál s logy se zde nezobrazuje.

![Panel Connected devices se zvýrazněnou položkou RTT a seznamem příkazů shellu Zephyr v terminálu](../../../../../chester/firmware-sdk/images/rtt-shell.png)

## Vlákna {#threads}

Na kartě **NRF DEBUG** můžete zkoumat vlákna a paměť.

![Karta NRF DEBUG se zobrazením vláken, využitím stacku a prohlížečem flash paměti](../../../../../chester/firmware-sdk/images/nrf-debug.png)
