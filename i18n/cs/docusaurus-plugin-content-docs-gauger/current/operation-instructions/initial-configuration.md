---
slug: initial-configuration
title: Počáteční konfigurace
description: "Po prvním zapnutí zařízení se k zařízení připojte."
---

# Počáteční konfigurace {#initial-configuration}

Po prvním zapnutí zařízení se k zařízení připojte.

Připojení přes Ethernet provedete zapojením kabelu a nastavením počítače do sítě `192.168.255.0/24` (adresu `192.168.255.1` nelze použít). Poté můžete ve webovém prohlížeči přejít na adresu `192.168.255.1` a otevřít webové rozhraní.

Připojení přes WiFi provedete připojením k přístupovému bodu zařízení. SSID má následující formát: `hardwario-gauger-IDIDIDIDIDID`. Výchozí heslo je `12345678`. Po připojení k WiFi síti vám bude automaticky přidělena IP adresa. Poté je zařízení dostupné na adrese `192.168.254.1`.

## Možnosti konfigurace {#configuration-options}

| Název                        | JSON klíč                     | Typ     | Výchozí hodnota | Popis                                              |
| :--------------------------- | :---------------------------- | :------ | :-------------- | :------------------------------------------------- |
| Název zařízení               | `device_name`                 | String  |                 | Hostname zařízení                                  |
| Heslo                        | `password`                    | String  |                 | Heslo pro webové rozhraní                          |
| Stav webového serveru        | `enable_server`               | Bool    | true            | Pokud false, HTTP server je vypnutý                |
| Stav Ethernetu               | `eth.enabled`                 | Bool    | true            | Pokud false, Ethernet je vypnutý                   |
| DHCP klient Ethernetu        | `eth.net.dhcp`                | Bool    | false           | Pokud true, DHCP klient je zapnutý                 |
| IP adresa Ethernetu          | `eth.net.ip`                  | IP      | 192.168.255.1   | IP adresa rozhraní Ethernet                        |
| Maska sítě Ethernetu         | `eth.net.netmask`             | IP      | 255.255.255.0   | Maska rozhraní Ethernet                            |
| Režim WiFi                   | `wifi.enabled`                | Bool    | true            | Pokud true, WiFi je zapnutá                        |
| Režim WiFi                   | `wifi.station`                | Bool    | false           | Pokud true, WiFi je v režimu station, jinak AP     |
| Stav DHCP serveru WiFi       | `wifi.net.dhcp`               | Bool    | true            | Pokud true, DHCP WiFi je zapnuté                   |
| IP adresa WiFi               | `wifi.net.ip`                 | IP      | 192.168.254.1   | IP adresa rozhraní WiFi                            |
| Maska sítě WiFi              | `wifi.net.netmask`            | IP      | 255.255.255.0   | Maska rozhraní WiFi                                |
| Filtr aktivního stavu vstupu #N | `inputs[n].active_duration`   | Integer | 20            | Doba filtru aktivního stavu                        |
| Filtr neaktivního stavu vstupu #N | `inputs[n].inactive_duration` | Integer | 20          | Doba filtru neaktivního stavu                      |
| Port Modbus                  | `modbus.port`                 | Integer | 502             | Port serveru Modbus                                |
| Stav Modbus                  | `modbus.enabled`              | Bool    | true            | Pokud true, Modbus je zapnutý                      |
