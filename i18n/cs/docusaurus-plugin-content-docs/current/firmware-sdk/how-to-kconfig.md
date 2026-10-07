---
slug: how-to-kconfig
title: "Jak na: Kconfig"
---
import Image from '@theme/IdealImage';

# Jak na: Kconfig {#how-to-kconfig}

Tento článek ukazuje, jak ve svém projektu používat **Kconfig**.

:::info

**Kconfig** je systém, který projekt Zephyr převzal z jádra Linuxu. Definují se v něm volby pro sestavení (tzv. symboly), jejich typy, omezení a vzájemné vztahy.

:::

## Vlastní volby {#custom-options}

Vlastní volbu **Kconfig** v aplikaci definujete v souboru `Kconfig`, který vytvoříte v kořenovém adresáři aplikace.

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

Vygenerované volby Kconfig můžete zkontrolovat v souboru `build/zephyr/include/autoconf.h`. Tento soubor se automaticky vkládá do všech zdrojových a hlavičkových souborů.

:::

## Odkazy {#references}

Podrobnosti o Kconfig najdete v dokumentaci projektu Zephyr:
https://docs.zephyrproject.org/latest/build/kconfig/index.html
