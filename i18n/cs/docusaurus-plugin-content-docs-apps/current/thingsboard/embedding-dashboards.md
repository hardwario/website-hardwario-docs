---
slug: embedding-dashboards
title: Vkládání dashboardů
description: "Vložení veřejného dashboardu HARDWARIO Dashboards nebo jednoho grafu na váš web prvkem iframe: čisté HTML, WordPress a Docusaurus (MDX)."
title_meta: "Vložení dashboardu do webu (HARDWARIO Dashboards)"
---
import Image from '@theme/IdealImage';

# Vkládání dashboardů {#embedding-dashboards}

Živý dashboard, nebo jen jeden graf, můžete vložit přímo do svého webu. Stačí krátký kód, prvek `iframe`, s [veřejným odkazem](/apps/thingsboard/public-link) dashboardu. Funguje to na jakémkoli webu: čisté HTML, WordPress, Docusaurus a další.

---

## Předpoklad: veřejný přístup {#prerequisites-public-access}

Než začnete cokoli vkládat, musí být dashboard **a jeho zdroje dat** veřejně přístupné. Pokud tento krok vynecháte, návštěvníci uvidí místo grafů přihlašovací obrazovku.

Ve zkratce potřebujete:
1. Zveřejnit **skupinu dashboardů**.
2. Zveřejnit **skupinu zařízení** (nebo assetů), která dashboard plní daty.
3. Zkopírovat vygenerovaný veřejný odkaz.

Kompletní postup krok za krokem, včetně toho, jak řešit podřízené zákazníky, najdete v návodu [**Veřejný odkaz**](/apps/thingsboard/public-link).

---

## Vložení celého dashboardu {#embedding-a-full-dashboard}

Tento způsob použijte, když chcete zobrazit celý dashboard včetně všech grafů, rozvržení a ovladačů stavů.

### Krok 1: Získejte veřejný odkaz {#step-1-get-the-public-link}

Jakmile je dashboard veřejný, zkopírujte vygenerovanou veřejnou URL. Musí obsahovat parametr `publicId` a vypadá takto:

```text
https://app.hardwario.cloud/dashboard/<DASHBOARD_ID>?publicId=<PUBLIC_ID>
```

Podrobné pokyny, jak takový odkaz získat, najdete v návodu [**Veřejný odkaz**](/apps/thingsboard/public-link).

### Krok 2: Přidejte kód iframe {#step-2-insert-the-embed-code}

Do své stránky vložte následující kód, jako `src` použijte svůj veřejný odkaz:

```html
<iframe
  src="https://app.hardwario.cloud/dashboard/<DASHBOARD_ID>?publicId=<PUBLIC_ID>"
  width="100%"
  height="800"
  frameborder="0"
  allowfullscreen
></iframe>
```

Uložte stránku a otevřete ji: živý dashboard je teď součástí vašeho webu.

**WordPress:** v editoru stránky přidejte blok **Vlastní HTML** (Custom HTML) a vložte do něj stejný kód.

**Docusaurus nebo jiný web s MDX:** použijte zápis kódu v JSX, viz [Docusaurus (MDX)](#formatting-rules-for-docusaurus-mdx) níže.

:::tip
U celých dashboardů doporučujeme výšku `800px`, aby se obsah uvnitř rámu zbytečně neposouval. Díky `width="100%"` se dashboard správně přizpůsobí šířce obrazovky počítače.
:::

---

## Vložení jednoho widgetu {#embedding-a-single-widget}

Někdy chcete zobrazit jen **jeden graf nebo widget**, ne celý dashboard. Pro jednotlivý widget samostatný veřejný odkaz neexistuje, proto doporučujeme:

> **Vytvořte pro každý widget, který chcete vložit, samostatný dashboard.**

V praxi:
1. Vytvořte nový dashboard a přidejte do něj jen **jeden widget**, který chcete zobrazit.
2. Odstraňte veškeré další prvky rozvržení, záhlaví a ovladače stavů, aby zůstal jen graf.
3. Tento dashboard s jedním widgetem zveřejněte a vložte přesně podle postupu v části [Vložení celého dashboardu](#embedding-a-full-dashboard).

Protože dashboard obsahuje jen jeden widget, můžete použít **menší výšku**, aby se do stránky úhledně vešel:

```html
<iframe
  src="https://app.hardwario.cloud/dashboard/<DASHBOARD_ID>?publicId=<PUBLIC_ID>"
  width="100%"
  height="400"
  frameborder="0"
  allowfullscreen
></iframe>
```

:::tip
Hodnotu `height` přizpůsobte widgetu. U jednoho grafu obvykle dobře funguje `300–450px`. Samostatný dashboard pro každý widget je nejčistší způsob, jak vkládat jednotlivé grafy.
:::

---

## Pravidla formátování pro Docusaurus (MDX) {#formatting-rules-for-docusaurus-mdx}

Pokud používáte Docusaurus nebo jiný framework založený na MDX, může prosté HTML rozbít sestavení nebo se vykreslit špatně. Použijte tento zápis kódu a držte se těchto dvou pravidel:

```jsx
<iframe
  src="https://app.hardwario.cloud/dashboard/<DASHBOARD_ID>?publicId=<PUBLIC_ID>"
  width="100%"
  height="800px"
  frameBorder="0"
  allowFullScreen
/>
```

### 1. Používejte atributy v camelCase {#1-use-camelcase-attributes}

React zachází s vlastnostmi `iframe` jinak než standardní HTML. U některých atributů musíte použít podobu v camelCase:

| Standardní HTML | MDX / JSX |
| --- | --- |
| `frameborder="0"` | `frameBorder="0"` |
| `allowfullscreen` | `allowFullScreen` |

### 2. Nechte kolem bloku prázdné řádky {#2-keep-blank-lines-around-the-block}

Kompilátory MDX si mohou bloky JSX splést s okolním textem. Vždy nechte **jeden prázdný řádek** přímo nad a přímo pod `iframe`:

```mdx
Here is the description text of the farm dataset.

<iframe
  src="https://app.hardwario.cloud/dashboard/<DASHBOARD_ID>?publicId=<PUBLIC_ID>"
  width="100%"
  height="800px"
  frameBorder="0"
  allowFullScreen
/>

The following text starts here, after an empty line.
```

:::caution
Zapomenuté atributy v camelCase nebo chybějící prázdné řádky kolem bloku jsou nejčastější příčinou, proč sestavení v Docusaurus při vkládání dashboardů selže.
:::

:::tip Výchozí časové okno
Návštěvníci uvidí **výchozí časové okno** dashboardu. Jak ho změnit, popisuje [Časové okno](/apps/thingsboard/time-window#save-the-default-time-window).
:::

:::info Dokumentace ThingsBoard
HARDWARIO Dashboards jsou postavené na platformě ThingsBoard. Podrobnosti najdete v oficiální dokumentaci ThingsBoard (anglicky): [Make dashboard public](https://thingsboard.io/docs/pe/user-guide/dashboards/#make-dashboard-public).
:::
