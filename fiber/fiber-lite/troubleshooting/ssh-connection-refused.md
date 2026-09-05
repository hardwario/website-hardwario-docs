---
slug: ssh-connection-refused
title: SSH Connection Refused
---

If `ssh <user>@<ip>` fails with **"Connection refused"** rather than a password prompt, the SSH
server itself never started, so the account/network are not the problem yet.

This particular Raspberry Pi OS image does not enable `sshd` by default even though SSH was
turned on in Imager's Customisation step. It still ships the classic `sshswitch.service`
mechanism as a fallback. The script itself lives at
`/usr/lib/raspberrypi-sys-mods/sshswitch` if you want to confirm it's present on your image: on
every boot it checks the boot partition for a file named **`ssh` or `ssh.txt`** and, if found,
deletes it and force-enables `sshd`. From another computer, mount the microSD card's boot
partition (the small FAT volume, `bootfs`) and create an empty file there:

```sh
touch /path/to/bootfs/ssh
```

Reinsert the card and power on. SSH should come up within seconds of boot, independent of any
cloud-init timing.

:::tip

If you're working with more than one similar microSD card at a time, make sure you're editing
the card that's actually in this device, see the card mix-up warning in
**SSH Permission Denied** in this section.

:::
