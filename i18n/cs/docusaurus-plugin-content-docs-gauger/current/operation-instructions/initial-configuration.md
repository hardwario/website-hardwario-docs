---
slug: initial-configuration
title: Počáteční konfigurace
---

# Počáteční konfigurace {#initial-configuration}

Po prvním zapnutí se k zařízení připojte.

Přes Ethernet se připojíte tak, že zapojíte kabel a nastavíte počítač do sítě `192.168.255.0/24` (adresu `192.168.255.1` nepoužívejte). Webové rozhraní pak otevřete v prohlížeči na adrese `192.168.255.1`.

Přes Wi-Fi se připojíte k přístupovému bodu zařízení. Jeho SSID má tvar `hardwario-gauger-IDIDIDIDIDID`, výchozí heslo je `12345678`. Po připojení k síti Wi-Fi dostanete IP adresu automaticky. Zařízení pak najdete na adrese `192.168.254.1`.

## Možnosti konfigurace {#configuration-options}

| Název                        | Klíč JSON                     | Typ     | Výchozí hodnota | Popis                                              |
| :--------------------------- | :---------------------------- | :------ | :-------------- | :------------------------------------------------- |
| Název zařízení               | `device_name`                 | String  |                 | Název hostitele (hostname) zařízení                |
| Heslo                        | `password`                    | String  |                 | Heslo k webovému rozhraní                          |
| Stav webového serveru        | `enable_server`               | Bool    | true            | Při false je HTTP server vypnutý                   |
| Stav Ethernetu               | `eth.enabled`                 | Bool    | true            | Při false je Ethernet vypnutý                      |
| Klient DHCP na Ethernetu     | `eth.net.dhcp`                | Bool    | false           | Při true je klient DHCP zapnutý                    |
| IP adresa Ethernetu          | `eth.net.ip`                  | IP      | 192.168.255.1   | IP adresa rozhraní Ethernet                        |
| Maska sítě Ethernetu         | `eth.net.netmask`             | IP      | 255.255.255.0   | Maska rozhraní Ethernet                            |
| Režim Wi-Fi                   | `wifi.enabled`                | Bool    | true            | Při true je Wi-Fi zapnutá                           |
| Režim Wi-Fi                   | `wifi.station`                | Bool    | false           | Při true pracuje Wi-Fi v režimu station, jinak AP   |
| Stav serveru DHCP na Wi-Fi    | `wifi.net.dhcp`               | Bool    | true            | Při true je DHCP na Wi-Fi zapnuté                   |
| IP adresa Wi-Fi               | `wifi.net.ip`                 | IP      | 192.168.254.1   | IP adresa rozhraní Wi-Fi                            |
| Maska sítě Wi-Fi              | `wifi.net.netmask`            | IP      | 255.255.255.0   | Maska rozhraní Wi-Fi                                |
| Filtr aktivního stavu vstupu #N | `inputs[n].active_duration`   | Integer | 20            | Délka filtru aktivního stavu                       |
| Filtr neaktivního stavu vstupu #N | `inputs[n].inactive_duration` | Integer | 20          | Délka filtru neaktivního stavu                     |
| Port Modbus                  | `modbus.port`                 | Integer | 502             | Port serveru Modbus                                |
| Stav Modbus                  | `modbus.enabled`              | Bool    | true            | Při true je Modbus zapnutý                         |
