---
slug: overview
title: Overview
---
import Image from '@theme/IdealImage';

# CLOUD Overview

[**HARDWARIO Cloud**](https://hardwario.cloud) allows users to manage it's devices.

**HARDWARIO Cloud** has this structure:

- **Organizations** (assigned to users)
- **Groups** (callback configuration)
- **Devices** (display messages)

## User configuration

Here you can set users' login credentials and assign **organizations** and **roles** to them.

![HARDWARIO Cloud user detail form with name, admin flag, email, login, API token, and organization role assignment](images/user-config.png)

## Groups

Here you can see **groups** within the **organization**. Here you can also set the **callbacks** for each group.

![Groups list of an organization in HARDWARIO Cloud with links to each group's Devices and Callbacks](images/groups.png)

## Callbacks

In **callbacks**, you can set URL and HTTP parameters. You can also apply [JSONata](http://docs.jsonata.org/simple) rules and completely change the structure of the JSON. You can also use values from the original JSON in the URL by typing:

```
http://my.callback.cloud/?temperature={{data.hygrometer.temperature.measurements.0.avg}}&humidity={{data.hygrometer.humidity.measurements.0.avg}}
```

![Callback edit form with method, URL, headers, content type, JSONata payload, and original vs transformed message preview](images/callback.png)

## Devices

In the group, you can see all the devices. You can also use a handy visualization that shows how many messages devices sent every day.

![Device list of a group with an expanded calendar heatmap visualizing daily message counts for one device](images/devices.png)

## Messages

In the message section, you see all the received and decoded messages in **JSON** format. For each message, you can also check the callback endpoint response.

![Messages list of a device with one message expanded to show its decoded JSON data](images/messages.png)

