---
slug: chirpstack-gateways
title: Gateways
---
import Image from '@theme/IdealImage';

# Gateways Configuration Guide

This tutorial guides you through the process of adding and configuring a gateways in ChirpStack v4.

---

From the left navigation menu, under tenant, select **Gateways** and then click the **Add Gateway** button in the top right.  

A form will appear where you can enter gateway information such as:  
- **Name**  
- **Gateway ID**  
- **Stats Interval**  

Once completed, click **Submit**.  

![ChirStack v4 - Gateways](images/chirpstack-tutorial-1.png)

:::info
If you are using our **EMBER gateway**, the **Gateway ID** can be found in the **MikroTik software** under **LoRa → Devices**.  
:::

---

## EMBER Gateways – MikroTik Software  

If you are using our **EMBER** as the gateway, all of its configuration must be done directly in the **MikroTik system**.
Once configured, the gateway should become visible and ready to connect with the ChirpStack system.


Here is the link to the **step-by-step guide** for **updating the gateway via MikroTik**:
https://docs.hardwario.com/ember/mikrotik/gateway-update



## Video Tutorial

:::tip
If you need further assistance or a visual demonstration of the process described in this guide, consult the [**Video Guide**](https://docs.hardwario.com/apps/videos-apps/chirpstack-ember).
:::