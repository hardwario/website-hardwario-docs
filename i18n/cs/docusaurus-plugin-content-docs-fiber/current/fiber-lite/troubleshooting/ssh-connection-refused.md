---
slug: ssh-connection-refused
title: SSH – spojení odmítnuto
description: "Pokud ssh @ selže s hláškou „Connection refused\" místo výzvy k zadání hesla, SSH"
---

Pokud `ssh <user>@<ip>` selže s hláškou **„Connection refused"** místo výzvy k zadání hesla, SSH
server se vůbec nespustil, problém tedy zatím není v účtu ani v síti.

Tento konkrétní obraz Raspberry Pi OS ve výchozím stavu `sshd` nezapíná, i když bylo SSH
povoleno v kroku Customisation v aplikaci Imager. Jako záloha v něm ale stále zůstává klasický
mechanismus `sshswitch.service`. Samotný skript najdete v
`/usr/lib/raspberrypi-sys-mods/sshswitch`, pokud si chcete ověřit, že je ve vašem obrazu
přítomný: při každém startu zkontroluje boot oddíl, jestli neobsahuje soubor s názvem
**`ssh` nebo `ssh.txt`**, a pokud ho najde, smaže ho a natvrdo zapne `sshd`. Z jiného počítače
připojte boot oddíl microSD karty (malý FAT svazek, `bootfs`) a vytvořte tam prázdný soubor:

```sh
touch /path/to/bootfs/ssh
```

Vraťte kartu zpět a zapněte napájení. SSH by mělo naběhnout během několika sekund od startu,
nezávisle na časování cloud-init.

:::tip

Pokud pracujete s více podobnými microSD kartami najednou, ujistěte se, že upravujete tu kartu,
která je skutečně v tomto zařízení, viz varování o záměně karet v části
**SSH – přístup odepřen** v této sekci.

:::
