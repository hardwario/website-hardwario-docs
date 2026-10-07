---
slug: ssh-connection-refused
title: SSH odmítá spojení
---

Pokud `ssh <user>@<ip>` selže s hláškou **„Connection refused“** místo výzvy k zadání hesla, SSH
server se vůbec nespustil, problém tedy zatím není v účtu ani v síti.

Tento obraz Raspberry Pi OS ve výchozím stavu `sshd` nezapne, i když jste SSH povolili v kroku
Customisation v nástroji Imager. Jako záložní mechanismus ale stále obsahuje klasickou službu
`sshswitch.service`. Skript je v `/usr/lib/raspberrypi-sys-mods/sshswitch` (můžete si ověřit,
že ho váš obraz obsahuje): při každém startu hledá na zaváděcím oddílu soubor s názvem
**`ssh` nebo `ssh.txt`**, a pokud ho najde, smaže ho a vynuceně zapne `sshd`. Z jiného počítače
připojte zaváděcí oddíl karty microSD (malý svazek FAT, `bootfs`) a vytvořte na něm prázdný soubor:

```sh
touch /path/to/bootfs/ssh
```

Vložte kartu zpět a zapněte napájení. SSH by mělo naběhnout několik sekund po startu, bez ohledu
na časování cloud-init.

:::tip

Pokud pracujete s několika podobnými kartami microSD najednou, ověřte, že upravujete kartu, která
je skutečně v tomto zařízení; viz upozornění na záměnu karet na stránce **SSH odmítá heslo**
v této sekci.

:::
