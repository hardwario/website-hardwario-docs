---
slug: network
title: Připojení k síti
title_meta: "Připojení brány FIBER k síti (HARDWARIO Manager)"
---

# Připojení brány FIBER k síti {#fiber-network-connection}

Po nastavení můžete změnit, jak se brána FIBER připojuje k síti: připojit ji
k jiné síti Wi-Fi, odpojit ji od Wi-Fi nebo nastavit Ethernet s DHCP či
statickou adresou.

Otevřete **FIBER → Network → Manage Connection**. Změna sítě vyžaduje aktivní
spojení, proto vás aplikace požádá o nové naskenování brány: **podržte ENTER** na
zařízení a zvolte **Scan device QR**.

---

## Wi-Fi {#wi-fi}

Aktuální síť je zvýrazněná nahoře v seznamu.

| Akce | Jak |
|---|---|
| Připojit jinou síť | Klepněte na ni, zadejte heslo a potvrďte. Heslo se uloží, až když ho brána FIBER přijme. |
| Opustit aktuální síť | **Disconnect from Wi-Fi** |
| Hledat znovu | **Rescan** |
| Zkontrolovat aktuální stav | **Refresh status** |

Když se připojení nepovede, aplikace řekne proč a co zkusit:

| Hlášení | Co dělat |
|---|---|
| **Wrong Wi-Fi password.** | Zadejte heslo znovu. |
| **The device cannot see that network.** | Přesuňte bránu FIBER blíž k přístupovému bodu nebo hledejte znovu. Síť jen v pásmu 5 GHz může být mimo dosah. |
| **The device timed out joining the network.** | Zkontrolujte, že přístupový bod běží, a zkuste to znovu. |
| **…the device didn't come online.** | Brána se k síti připojila, ale nedostala adresu. Zkontrolujte heslo a DHCP v síti a zkuste to znovu. |

---

## Ethernet {#ethernet}

Zvolte, jak brána FIBER získá adresu pro Ethernet:

| Režim | Nastavení |
|---|---|
| **DHCP** | Žádné. Brána FIBER dostane adresu automaticky ze sítě. |
| **Static IP** | **IP address**, **Subnet mask**, **Gateway** a volitelně **DNS server**. Brána (gateway) musí být ve stejné podsíti. |

Zvolte **Apply Ethernet config**. Aplikace pak ohlásí výsledek:

| Výsledek | Význam |
|---|---|
| **Ethernet online (…)** | Brána FIBER je v síti na uvedené adrese. |
| **Configuration saved. Plug in the Ethernet cable.** | Kabel zatím není připojený. |
| **No DHCP lease** | Brána FIBER nedostala adresu. Zkontrolujte kabel a server DHCP. |
| **The FIBER did not take … it is on …** | Adresa už může být obsazená. Zkuste jinou. |
| **The FIBER could not bring up Ethernet on …** | Adresa může být v síti obsazená nebo byla odmítnuta. Zkuste jinou. |

Volbou **Skip Ethernet for now** necháte Ethernet nenastavený.
