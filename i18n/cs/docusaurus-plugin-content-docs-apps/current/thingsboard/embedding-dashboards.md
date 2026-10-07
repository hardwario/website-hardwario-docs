---
slug: embedding-dashboards
title: Vkládání dashboardů
---
import Image from '@theme/IdealImage';

# Vkládání dashboardů {#embedding-dashboards}

Tento návod vás provede vložením dashboardů ThingsBoard do externích webových aplikací. Postup je optimalizovaný pro dokumentační frameworky založené na Reactu, jako je Docusaurus (MDX), ale stejné řešení s prvkem `iframe` funguje na jakékoli stránce HTML.

---

## Předpoklad: veřejný přístup {#prerequisites-public-access}

Než začnete cokoli vkládat, musí být dashboard **a jeho zdroje dat** veřejně přístupné. Pokud tento krok vynecháte, návštěvníci uvidí místo grafů přihlašovací obrazovku ThingsBoard.

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

Do souboru dokumentace vložte následující `iframe`.

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
U celých dashboardů doporučujeme výšku `800px`, aby se obsah uvnitř rámu zbytečně neposouval. Díky `width="100%"` se dashboard správně přizpůsobí šířce obrazovky počítače.
:::

---

## Vložení jednoho widgetu {#embedding-a-single-widget}

Někdy chcete zobrazit jen **jeden graf nebo widget**, ne celý dashboard. ThingsBoard zatím pro jednotlivý widget samostatnou veřejnou URL nenabízí, proto doporučujeme:

> **Vytvořte pro každý widget, který chcete vložit, samostatný dashboard.**

V praxi:
1. Vytvořte nový dashboard a přidejte do něj jen **jeden widget**, který chcete zobrazit.
2. Odstraňte veškeré další prvky rozvržení, záhlaví a ovladače stavů, aby zůstal jen graf.
3. Tento dashboard s jedním widgetem zveřejněte a vložte přesně podle postupu v části [Vložení celého dashboardu](#embedding-a-full-dashboard).

Protože dashboard obsahuje jen jeden widget, můžete použít **menší výšku**, aby se do stránky úhledně vešel:

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
Hodnotu `height` přizpůsobte widgetu. U jednoho grafu obvykle dobře funguje `300–450px`. Samostatný dashboard pro každý widget je nejčistší způsob, jak vkládat jednotlivé grafy, dokud ThingsBoard nenabídne veřejné odkazy přímo na jednotlivé widgety.
:::

---

## Pravidla formátování pro Docusaurus (MDX) {#formatting-rules-for-docusaurus-mdx}

Pokud používáte Docusaurus nebo jiný framework založený na MDX, může prosté HTML rozbít sestavení nebo se vykreslit špatně. Vždy se držte těchto dvou pravidel.

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
