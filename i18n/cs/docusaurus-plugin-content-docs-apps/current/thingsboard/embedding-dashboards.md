---
slug: embedding-dashboards
title: Vkládání dashboardů
description: "Tento návod vás provede vložením dashboardů ThingsBoard do externích webových aplikací. Je optimalizovaný pro dokumentační frameworky založené na Reactu, jako je Docusaurus (MDX), ale stejný přístup s iframe funguje na jakékoli HTML stránce."
---
import Image from '@theme/IdealImage';

# Vkládání dashboardů {#embedding-dashboards}

Tento návod vás provede vložením dashboardů ThingsBoard do externích webových aplikací. Je optimalizovaný pro dokumentační frameworky založené na Reactu, jako je Docusaurus (MDX), ale stejný přístup s `iframe` funguje na jakékoli HTML stránce.

---

## Předpoklad: veřejný přístup {#prerequisites-public-access}

Než začnete cokoli vkládat, musí být dashboard **a jeho zdroje dat** veřejně přístupné. Pokud tento krok vynecháte, návštěvníci uvidí místo grafů přihlašovací obrazovku ThingsBoardu.

Ve zkratce potřebujete:
1. Zveřejnit **grupu dashboardů**.
2. Zveřejnit **grupu zařízení** (nebo assetů), která dashboard plní daty.
3. Zkopírovat vygenerovaný veřejný odkaz.

Kompletní postup krok za krokem — včetně toho, jak řešit podřízené zákazníky — najdete v návodu [**Veřejný odkaz**](public-link).

---

## Vložení celého dashboardu {#embedding-a-full-dashboard}

Tento způsob použijte, když chcete zobrazit celý dashboard včetně více grafů, struktury rozvržení a ovladačů stavů.

### Krok 1: Získejte veřejný odkaz {#step-1-get-the-public-link}

Jakmile je dashboard veřejný, zkopírujte vygenerovanou veřejnou URL. Musí obsahovat parametr `publicId` a vypadá takto:

```text
https://app.hardwario.cloud/dashboard/<DASHBOARD_ID>?publicId=<PUBLIC_ID>
```

Podrobné pokyny, jak takový odkaz získat, najdete v návodu [**Veřejný odkaz**](public-link).

### Krok 2: Vložte kód pro vložení {#step-2-insert-the-embed-code}

Do svého dokumentačního souboru vložte následující `iframe`.

```jsx
<iframe
  src="https://app.hardwario.cloud/dashboard/<DASHBOARD_ID>?publicId=<PUBLIC_ID>"
  width="100%"
  height="800px"
  frameBorder="0"
  allowFullScreen
/>
```

:::tip
U celých dashboardů doporučujeme výšku `800px`, aby se zbytečně nescrollovalo uvnitř rámu. Nastavení `width="100%"` zajistí, že se dashboard správně přizpůsobí desktopovým obrazovkám.
:::

---

## Vložení jednoho widgetu {#embedding-a-single-widget}

Někdy chcete zobrazit jen **jeden graf nebo widget**, ne celý dashboard. ThingsBoard v současnosti pro jednotlivý widget čistou veřejnou URL nenabízí, takže doporučený postup je:

> **Vytvořte pro každý widget, který chcete vložit, samostatný dashboard.**

V praxi:
1. Vytvořte nový dashboard a přidejte do něj jen **jeden widget**, který chcete zobrazit.
2. Odstraňte veškeré další prvky rozvržení, záhlaví a ovladače stavů, aby zůstal jen graf.
3. Tento dashboard s jedním widgetem zveřejněte a vložte přesně podle popisu v [Vložení celého dashboardu](#embedding-a-full-dashboard).

Protože dashboard obsahuje jen jeden widget, můžete použít **menší výšku**, aby se do stránky vešel úhledně:

```jsx
<iframe
  src="https://app.hardwario.cloud/dashboard/<DASHBOARD_ID>?publicId=<PUBLIC_ID>"
  width="100%"
  height="400px"
  frameBorder="0"
  allowFullScreen
/>
```

:::tip
Hodnotu `height` přizpůsobte widgetu — u jednoho grafu obvykle dobře funguje `300–450px`. Tenhle vzor s dashboardem na jeden widget je nejčistší způsob, jak vkládat jednotlivé grafy, dokud ThingsBoard nenabídne nativní veřejné odkazy na jednotlivé widgety.
:::

---

## Pravidla formátování pro Docusaurus (MDX) {#formatting-rules-for-docusaurus-mdx}

Pokud používáte Docusaurus nebo jiný framework založený na MDX, může čisté HTML shodit build nebo se vykreslit špatně. Vždy se držte těchto dvou pravidel.

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
Zapomenuté atributy v camelCase nebo chybějící prázdné řádky kolem bloku jsou nejčastější příčinou selhání buildu Docusaurusu při vkládání dashboardů.
:::
