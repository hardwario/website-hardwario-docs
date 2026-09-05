---
slug: embedding-dashboards
title: Embedding Dashboards
---
import Image from '@theme/IdealImage';

# Embedding Dashboards

This guide walks you through embedding ThingsBoard dashboards into external web applications. It is optimized for React-based documentation frameworks such as Docusaurus (MDX), but the same `iframe` approach works in any HTML page.

---

## Prerequisites: Public Access

Before embedding any content, the dashboard **and its underlying data sources** must be publicly accessible. If this step is skipped, visitors will see a ThingsBoard login screen instead of the charts.

In short, you need to:
1. Make the **Dashboard Group** public.
2. Make the **Device Group** (or Assets) feeding the dashboard public.
3. Copy the generated public link.

For the full step-by-step procedure, including how to handle sub-customers, follow the [**Public Link**](public-link) guide.

---

## Embedding a Full Dashboard

Use this method when you want to display the entire dashboard, including multiple charts, layout structures, and state controllers.

### Step 1: Get the Public Link

Once the dashboard is public, copy the generated public URL. It must contain the `publicId` parameter and will look like this:

```text
https://app.hardwario.cloud/dashboard/<DASHBOARD_ID>?publicId=<PUBLIC_ID>
```

For detailed instructions on how to obtain this link, see the [**Public Link**](public-link) guide.

### Step 2: Insert the Embed Code

Paste the following `iframe` into your documentation file.

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
A height of `800px` is recommended for full dashboards to prevent excessive internal scrolling. Setting `width="100%"` ensures the dashboard scales properly across desktop screens.
:::

---

## Embedding a Single Widget

Sometimes you only want to display a **single chart or widget** instead of an entire dashboard. ThingsBoard does not currently provide a clean public URL for an individual widget, so the recommended approach is:

> **Create a separate dashboard for each widget you want to embed.**

In practice:
1. Create a new dashboard and add only the **one widget** you want to display.
2. Remove any extra layout elements, headers, or state controllers so only the chart remains.
3. Make this single-widget dashboard public and embed it exactly as described in [Embedding a Full Dashboard](#embedding-a-full-dashboard).

Because the dashboard contains only one widget, you can use a **smaller height** to fit it neatly into your page:

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
Adjust `height` to match the widget. Around `300–450px` usually works well for a single chart. This per-widget dashboard pattern is the cleanest way to embed individual charts until ThingsBoard offers native single-widget public links.
:::

---

## Formatting Rules for Docusaurus (MDX)

If you are using Docusaurus or any MDX-based framework, plain HTML can break the build or render incorrectly. Always follow these two rules.

### 1. Use camelCase attributes

React handles `iframe` properties differently than standard HTML. You must use the camelCase form for certain attributes:

| Standard HTML | MDX / JSX |
| --- | --- |
| `frameborder="0"` | `frameBorder="0"` |
| `allowfullscreen` | `allowFullScreen` |

### 2. Keep blank lines around the block

MDX compilers can confuse JSX blocks with surrounding text. Always leave **one empty line** directly above and directly below the `iframe`:

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
Forgetting the camelCase attributes or the surrounding blank lines is the most common cause of a failed Docusaurus build when embedding dashboards.
:::
