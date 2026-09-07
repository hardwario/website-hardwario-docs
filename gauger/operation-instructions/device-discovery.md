---
slug: device-discovery
title: Device Discovery
---

# Device Discovery

If you set up the device to receive its IP address through DHCP, the assigned address will probably not be known to you. To find the device, you can listen for UDP broadcast packets on the port 53914. Every few seconds, the device will broadcast a packet with the following content:

```
<device name>
	WiFi: <WiFi IP>
	Eth: <Ethernet IP>
```

Alternatively, the device can be discovered through the administration UI of your router or other network device. The device can be recognized by its hostname, which is always identical to the previously set up device name.
