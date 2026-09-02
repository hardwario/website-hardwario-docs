---
slug: how-to-kconfig
title: "How to: Kconfig"
description: "Tento článek ukazuje, jak ve svém projektu používat Kconfig."
---
import Image from '@theme/IdealImage';

# How to: Kconfig {#how-to-kconfig}

Tento článek ukazuje, jak ve svém projektu používat **Kconfig**.

:::info

**Kconfig** je systém převzatý z jádra Linuxu do projektu Zephyr. Umožňuje definovat volby (též nazývané symboly) použité při sestavení, jejich typy, omezení a vzájemné vztahy.

:::

## Vlastní volby {#custom-options}

Vlastní volbu **Kconfig** můžete ve své aplikaci definovat vytvořením souboru `Kconfig` v kořenovém adresáři aplikace.

V souboru `Kconfig` můžete pomocí této šablony vytvořit booleovskou volbu ano/ne:

```
menu "Application"

config APP_FOO
	bool "Enable bar"
	default y

endmenu

menu "Zephyr Kernel"
source "Kconfig.zephyr"
endmenu
```

Tím vznikne strom nabídky s názvem `Application`. Strom bude obsahovat jednu volbu `APP_FOO`, která je ve výchozím stavu zapnutá a lze ji vypnout v souboru `prj.conf`:

```
CONFIG_APP_FOO=n
```

Při předzpracování všech voleb Kconfig vznikne jedno z těchto maker:

```c
/* When CONFIG_APP_FOO=y */
#define CONFIG_APP_FOO 1

/* When CONFIG_APP_FOO=n */
#define CONFIG_APP_FOO 0
```

:::tip

Vygenerované volby Kconfig můžete ladit pohledem do souboru `build/zephyr/include/autoconf.h`. Tento soubor se automaticky vkládá do všech zdrojových a hlavičkových souborů.

:::

## Odkazy {#references}

Pokud potřebujete více podrobností o Kconfigu, podívejte se do dokumentace Zephyr Kconfig:
https://docs.zephyrproject.org/latest/build/kconfig/index.html
