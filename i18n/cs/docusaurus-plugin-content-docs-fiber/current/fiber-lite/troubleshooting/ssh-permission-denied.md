---
slug: ssh-permission-denied
title: SSH Permission Denied
description: "Pokud je SSH dostupné (dostanete výzvu k zadání hesla), ale heslo nastavené v Imageru je vždy"
---

Pokud je SSH dostupné (dostanete výzvu k zadání hesla), ale heslo nastavené v Imageru je vždy
odmítnuto, i hned po novém nahrání image s nově zadaným heslem, uživatelský účet
**nebyl nikdy skutečně vytvořen**, bez ohledu na to, co je v `user-data`.

Nejrychlejší potvrzení: připojte kořenový souborový systém karty (větší oddíl `ext4`,
`rootfs`) na jiném počítači (třeba do `/mnt/rootfs`) a zkontrolujte, zda účet vůbec
existuje:

```sh
grep fiberlite /mnt/rootfs/etc/passwd
```

Pokud příkaz nic nevypíše, účet skutečně nikdy nebyl vytvořen, problém není v hesle.

:::tip

Pokud máte poblíž více podobně vypadajících microSD karet (např. při nahrávání image do celé
série zařízení), pečlivě zkontrolujte, že připojujete a upravujete tu kartu, která opravdu běží
v tomto zařízení, a ne jinou kartu, která zůstala ve čtečce. Záměna karty nevyvolá žádnou chybu;
úpravy se prostě tiše nikdy nedostanou do zařízení a tu samou „opravu" budete kontrolovat
několikrát, aniž by se kdy projevila. Fyzické označení karty, na které právě pracujete, tomu
předejde.

:::

## Hlavní příčina {#root-cause}

Jde o zvláštnost datasource cloud-init, ne o překlep v hesle. Nastane, pokud `meta-data` na
boot oddílu (které Imager sám obvykle zapisuje správně, ale je snadné je pokazit ruční úpravou)
používá klíč `instance_id` (podtržítko) místo `instance-id` (spojovník). Klíč s podtržítkem
NoCloud datasource cloud-init tiše ignoruje a použije pevnou vnitřní identitu (doslovný řetězec
`nocloud`), která se nikdy nezmění, ať už `meta-data`/`user-data` upravíte kolikrát chcete.

Potvrďte to kontrolou obou následujících hodnot (stejné připojení `/mnt/rootfs` jako výše):

```sh
cat /mnt/rootfs/var/lib/cloud/data/instance-id
cat /mnt/rootfs/var/lib/cloud/data/previous-instance-id
```

Pokud některý z nich vypíše `nocloud` místo hodnoty, kterou znáte, je to tato chyba.

**Proč samotná oprava `user-data` už nepomůže, když k tomu jednou dojde:** cloud-init sleduje,
které konfigurační moduly už proběhly *pro danou instanci*, pomocí semaforových souborů v
`/mnt/rootfs/var/lib/cloud/instances/nocloud/sem/`. Pokud je některý z prvních startů přerušen
v průběhu konfigurace (např. odpojení napájení předtím, než cloud-init dokončí práci; jako
důkaz hledejte v `/mnt/rootfs/var/log/cloud-init.log` záznam `Received signal 15 resulting in exit`),
mohou být moduly jako `config_users_groups`, `config_set_passwords` a
`config_ssh` označeny jako „již proběhlé", i když se nikdy skutečně nedokončily. Protože vadný
klíč `instance-id` znamená, že cloud-init každý další start rozpoznává jako tu samou už
nakonfigurovanou instanci `nocloud`, tyto moduly navždy přeskakuje, bez ohledu na to, jak
správný je aktuální obsah `user-data`.

## Oprava {#fix}

Změňte `meta-data` tak, aby používaly `instance-id:` (se spojovníkem) s **novou** hodnotou,
kterou systém dosud neviděl, a znovu nastartujte. Skutečně nové ID instance přinutí cloud-init
považovat start za novou instanci a znovu od začátku spustit všechny konfigurační moduly,
včetně vytvoření uživatele.

:::tip

Pro bezobslužné zprovoznění větších sérií, kde `meta-data`/`user-data` píšete ručně místo
použití dialogu v Imageru, vypadá funkční minimální dvojice takto:

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

Řádek `runcmd` je pojistka pro zapnutí `sshd` navíc k vlastnímu `ssh_pwauth` cloud-init.
Příznakový soubor `ssh` na boot oddílu (viz **SSH Connection Refused** v této sekci) je stále
spolehlivější mechanismus, protože vůbec nezávisí na časování cloud-init.

:::
