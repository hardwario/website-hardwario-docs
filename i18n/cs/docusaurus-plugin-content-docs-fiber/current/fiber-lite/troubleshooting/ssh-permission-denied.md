---
slug: ssh-permission-denied
title: SSH odmítá heslo
---

Pokud je SSH dostupné (dostanete výzvu k zadání hesla), ale heslo nastavené v nástroji Imager je vždy
odmítnuto, i hned po novém nahrání systému s novým heslem, uživatelský účet **nejspíš vůbec
nevznikl**, ať je v `user-data` cokoli.

Nejrychleji to ověříte takto: na jiném počítači připojte kořenový souborový systém karty (větší
oddíl `ext4`, `rootfs`), třeba do `/mnt/rootfs`, a zkontrolujte, zda účet vůbec existuje:

```sh
grep fiberlite /mnt/rootfs/etc/passwd
```

Pokud příkaz nic nevypíše, účet opravdu nevznikl a problém není v hesle.

:::tip

Pokud máte poblíž několik podobně vypadajících karet microSD (např. při nahrávání systému do celé
série zařízení), pečlivě zkontrolujte, že připojujete a upravujete kartu, ze které toto zařízení
skutečně běží, a ne jinou kartu, která je náhodou ve čtečce. Záměna karty žádnou chybu nevyvolá;
úpravy se jen tiše nedostanou do zařízení a stejnou „opravu“ budete kontrolovat znovu a znovu,
aniž by se projevila. Předejdete tomu tak, že kartu, se kterou právě pracujete, fyzicky označíte.

:::

## Příčina {#root-cause}

Jde o zvláštnost zdroje dat (datasource) v cloud-init, ne o překlep v hesle. Nastane, pokud soubor
`meta-data` na zaváděcím oddílu (Imager ho sám obvykle zapíše správně, při ruční úpravě se ale snadno
pokazí) používá klíč `instance_id` (s podtržítkem) místo `instance-id` (se spojovníkem). Datasource
NoCloud v cloud-init klíč s podtržítkem tiše ignoruje a použije pevnou vnitřní identitu (doslova
řetězec `nocloud`), která se nezmění, ať `meta-data` a `user-data` upravíte kolikrát chcete.

Ověříte to kontrolou obou těchto souborů (stejné připojení `/mnt/rootfs` jako výše):

```sh
cat /mnt/rootfs/var/lib/cloud/data/instance-id
cat /mnt/rootfs/var/lib/cloud/data/previous-instance-id
```

Pokud některý z nich vypíše `nocloud` místo hodnoty, kterou znáte, je to tato chyba.

**Proč po této chybě nestačí opravit jen `user-data`:** cloud-init si *pro každou instanci* zvlášť
eviduje, které konfigurační moduly už proběhly, a to pomocí semaforových souborů
v `/mnt/rootfs/var/lib/cloud/instances/nocloud/sem/`. Pokud se některý z prvních startů přeruší
uprostřed konfigurace (např. odpojením napájení dřív, než cloud-init doběhne; důkazem je záznam
`Received signal 15 resulting in exit` v `/mnt/rootfs/var/log/cloud-init.log`), mohou být moduly
jako `config_users_groups`, `config_set_passwords` a `config_ssh` označené jako „už proběhlé“,
přestože se nikdy nedokončily. Kvůli vadnému klíči `instance-id` pak cloud-init každý další start
považuje za tutéž, už nakonfigurovanou instanci `nocloud` a tyto moduly trvale přeskakuje, ať je
aktuální obsah `user-data` jakkoli správný.

## Oprava {#fix}

V souboru `meta-data` použijte klíč `instance-id:` (se spojovníkem) s **novou** hodnotou, kterou
systém dosud neviděl, a zařízení znovu nastartujte. Se skutečně novým ID instance bude cloud-init
start považovat za novou instanci a znovu od začátku spustí všechny konfigurační moduly včetně
vytvoření uživatele.

:::tip

Pro bezobslužné zprovoznění celé flotily, kdy `meta-data`/`user-data` píšete ručně místo dialogu
v nástroji Imager, vypadá ověřená minimální dvojice takto:

```yaml title="meta-data"
dsmode: local
instance-id: fiber-lite-001
```

```yaml title="user-data"
#cloud-config
hostname: fiber-lite

users:
- name: fiberlite
  groups: [adm, dialout, cdrom, sudo, dip, plugdev, lxd]
  sudo: ALL=(ALL) NOPASSWD:ALL
  shell: /bin/bash
  lock_passwd: false
  passwd: <sha512-crypt hash of the chosen password>

ssh_pwauth: true
chpasswd:
  expire: false

runcmd:
  - [ systemctl, enable, --now, ssh ]
```

Řádek `runcmd` je dodatečná pojistka, která zapne `sshd` navíc k vlastní volbě `ssh_pwauth`
v cloud-init. Spolehlivější je ale stále příznakový soubor `ssh` na zaváděcím oddílu (viz
**SSH odmítá spojení** v této sekci), protože vůbec nezávisí na časování cloud-init.

:::
