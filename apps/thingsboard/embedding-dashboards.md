---
slug: embedding-dashboards
title: Embedding dashboards
description: "Put a public HARDWARIO Dashboards dashboard or a single chart on your website with an iframe: plain HTML, WordPress and Docusaurus (MDX)."
title_meta: "Embedding dashboards (HARDWARIO Dashboards)"
---
import Image from '@theme/IdealImage';

# Embedding dashboards

You can put a live dashboard, or a single chart, right into your own website. All it takes is a short piece of code, an `iframe`, with the dashboard's [public link](/apps/thingsboard/public-link). It works on any website: plain HTML, WordPress, Docusaurus and others.

---

## Prerequisites: Public access

Before embedding any content, the dashboard **and its underlying data sources** must be publicly accessible. If this step is skipped, visitors will see a login screen instead of the charts.

In short, you need to:
1. Make the **Dashboard Group** public.
2. Make the **Device Group** (or Assets) feeding the dashboard public.
3. Copy the generated public link.

For the full step-by-step procedure, including how to handle sub-customers, follow the [**Public link**](/apps/thingsboard/public-link) guide.

---

## Embedding a full dashboard

Use this method when you want to display the entire dashboard, including multiple charts, layout structures and state controllers.

### Step 1: Get the public link

Once the dashboard is public, copy the generated public URL. It must contain the `publicId` parameter and will look like this:

```text
https://app.hardwario.cloud/dashboard/<DASHBOARD_ID>?publicId=<PUBLIC_ID>
```

For detailed instructions on how to obtain this link, see the [**Public link**](/apps/thingsboard/public-link) guide.

### Step 2: Insert the embed code

Paste the following code into your page, with your public link as `src`:

```html
<iframe
  src="https://app.hardwario.cloud/dashboard/<DASHBOARD_ID>?publicId=<PUBLIC_ID>"
  width="100%"
  height="800"
  frameborder="0"
  allowfullscreen
></iframe>
```

Save the page and open it: the live dashboard is now part of your website.

**WordPress:** in the page editor, add a **Custom HTML** block and paste the same code.

**Docusaurus or another MDX site:** use the JSX form of the code, see [Docusaurus (MDX)](#formatting-rules-for-docusaurus-mdx) below.

:::tip
A height of `800px` is recommended for full dashboards to prevent excessive internal scrolling. Setting `width="100%"` ensures the dashboard scales properly across desktop screens.
:::

---

## Embedding a single widget

Sometimes you only want to display a **single chart or widget** instead of an entire dashboard. There is no separate public link for a single widget, so the recommended approach is:

> **Create a separate dashboard for each widget you want to embed.**

In practice:
1. Create a new dashboard and add only the **one widget** you want to display.
2. Remove any extra layout elements, headers or state controllers so only the chart remains.
3. Make this single-widget dashboard public and embed it exactly as described in [Embedding a Full Dashboard](#embedding-a-full-dashboard).

Because the dashboard contains only one widget, you can use a **smaller height** to fit it neatly into your page:

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
Adjust `height` to match the widget. Around `300–450px` usually works well for a single chart. This per-widget dashboard is the cleanest way to embed individual charts.
:::

---

## Formatting rules for Docusaurus (MDX) {#formatting-rules-for-docusaurus-mdx}

If you are using Docusaurus or any MDX-based framework, plain HTML can break the build or render incorrectly. Use this form of the code and follow these two rules:

```jsx
<iframe
  src="https://app.hardwario.cloud/dashboard/<DASHBOARD_ID>?publicId=<PUBLIC_ID>"
  width="100%"
  height="800px"
  frameBorder="0"
  allowFullScreen
/>
```

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

:::tip Default time window
Visitors see the dashboard's **default time window**. To change it, see [Time window](/apps/thingsboard/time-window#save-the-default-time-window).
:::

:::info ThingsBoard documentation
HARDWARIO Dashboards is built on ThingsBoard. More details in the official ThingsBoard documentation: [Make dashboard public](https://thingsboard.io/docs/pe/user-guide/dashboards/#make-dashboard-public).
:::
