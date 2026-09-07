---
slug: device-discovery
title: Vyhledání zařízení
---

# Vyhledání zařízení {#device-discovery}

Pokud jste zařízení nastavili tak, aby získávalo IP adresu přes DHCP, přidělenou adresu pravděpodobně nebudete znát. Zařízení najdete tak, že budete naslouchat paketům UDP broadcast na portu 53914. Každých několik sekund zařízení odešle broadcast paket s následujícím obsahem:

```
<device name>
	WiFi: <WiFi IP>
	Eth: <Ethernet IP>
```

Zařízení lze případně vyhledat i přes administrační rozhraní vašeho routeru nebo jiného síťového prvku. Zařízení poznáte podle hostname, které je vždy shodné s dříve nastaveným názvem zařízení.
