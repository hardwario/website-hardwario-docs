---
slug: device-discovery
title: Vyhledání zařízení
---

# Vyhledání zařízení {#device-discovery}

Pokud jste zařízení nastavili tak, aby získávalo IP adresu přes DHCP, přidělenou adresu pravděpodobně nebudete znát. Zařízení najdete tak, že budete na portu 53914 naslouchat broadcastovým paketům UDP. Zařízení každých několik sekund rozešle paket s tímto obsahem:

```
<device name>
	WiFi: <WiFi IP>
	Eth: <Ethernet IP>
```

Zařízení můžete najít také v administraci routeru nebo jiného síťového prvku. Poznáte ho podle názvu hostitele (hostname), který je vždy stejný jako dříve nastavený název zařízení.
