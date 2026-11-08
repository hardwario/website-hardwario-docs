---
slug: how-to-kconfig
title: "How to: Kconfig"
description: "Define a custom Kconfig option in a CHESTER application, enable or disable it in prj.conf, and inspect the generated macros in autoconf.h."
---
import Image from '@theme/IdealImage';

# How to: Kconfig

This article will demonstrate how to use **Kconfig** in your project.

:::info

**Kconfig** is a system inherited from the Linux kernel to the Zephyr project. It allows the definition of build-time options (also called symbols), their types, constraints, and relationships.

:::

## Custom Options

You can define your custom **Kconfig** option in your application by creating the `Kconfig` file in the application root directory.

In the `Kconfig` file, you can create a boolean yes/no option using this template:

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

This will create a menu tree called `Application`. The tree will have one option `APP_FOO`, which is enabled by default, and can be disabled in your `prj.conf` file:

```
CONFIG_APP_FOO=n
```

When pre-processing all Kconfig options, this will result in one of these macros:

```c
/* When CONFIG_APP_FOO=y */
#define CONFIG_APP_FOO 1

/* When CONFIG_APP_FOO=n */
#define CONFIG_APP_FOO 0
```

:::tip

You can debug the generated Kconfig options by looking into the file `build/zephyr/include/autoconf.h`. This file is automatically injected into all source/header files.

:::

## References

If you need more details on Kconfig, see the Zephyr Kconfig documentation:
https://docs.zephyrproject.org/latest/build/kconfig/index.html
