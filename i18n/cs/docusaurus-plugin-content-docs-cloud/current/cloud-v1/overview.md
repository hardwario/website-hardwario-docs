---
slug: overview
title: Přehled
description: "HARDWARIO Cloud umožňuje uživatelům spravovat jejich zařízení."
---
import Image from '@theme/IdealImage';

# Přehled CLOUD {#cloud-overview}

[**HARDWARIO Cloud**](https://hardwario.cloud) umožňuje uživatelům spravovat jejich zařízení.

**HARDWARIO Cloud** má tuto strukturu:

- **Organizace** (přiřazené uživatelům)
- **Skupiny** (konfigurace callbacků)
- **Zařízení** (zobrazení zpráv)

## Konfigurace uživatele {#user-configuration}

Zde nastavíte přihlašovací údaje uživatelů a přiřadíte jim **organizace** a **role**.

![Formulář detailu uživatele v HARDWARIO Cloud se jménem, příznakem admin, e-mailem, přihlašovacím jménem, API tokenem a přiřazením role v organizaci](../../../../../cloud/cloud-v1/images/user-config.png)

## Skupiny {#groups}

Zde vidíte **skupiny** v rámci **organizace**. Můžete zde také nastavit **callbacky** pro každou skupinu.

![Seznam skupin organizace v HARDWARIO Cloud s odkazy na zařízení a callbacky každé skupiny](../../../../../cloud/cloud-v1/images/groups.png)

## Callbacky {#callbacks}

V **callbacích** můžete nastavit URL a HTTP parametry. Můžete také použít pravidla [JSONata](http://docs.jsonata.org/simple) a zcela změnit strukturu JSON. Hodnoty z původního JSON lze použít i v URL zápisem:

```
http://my.callback.cloud/?temperature={{data.hygrometer.temperature.measurements.0.avg}}&humidity={{data.hygrometer.humidity.measurements.0.avg}}
```

![Formulář úpravy callbacku s metodou, URL, hlavičkami, typem obsahu, payloadem JSONata a náhledem původní a transformované zprávy](../../../../../cloud/cloud-v1/images/callback.png)

## Zařízení {#devices}

Ve skupině vidíte všechna zařízení. K dispozici je také praktická vizualizace, která ukazuje, kolik zpráv zařízení každý den odeslala.

![Seznam zařízení ve skupině s rozbaleným kalendářem znázorňujícím denní počty zpráv jednoho zařízení](../../../../../cloud/cloud-v1/images/devices.png)

## Zprávy {#messages}

V sekci zpráv vidíte všechny přijaté a dekódované zprávy ve formátu **JSON**. U každé zprávy si můžete také zkontrolovat odpověď callback endpointu.

![Seznam zpráv zařízení s jednou rozbalenou zprávou zobrazující dekódovaná data JSON](../../../../../cloud/cloud-v1/images/messages.png)
