---
slug: ssh-permission-denied
title: SSH accepts connections, but every password is "Permission denied"
---

If SSH is reachable (you get a password prompt) but the password you set in Imager is always
rejected — even right after re-flashing with a fresh password — the user account most likely was
**never actually created**, regardless of what `user-data` says.

The fastest confirmation: mount the card's root filesystem (the larger `ext4` partition,
`rootfs`) on another computer — say at `/mnt/rootfs` — and check whether the account exists at
all:

```sh
grep fiberlite /mnt/rootfs/etc/passwd
```

If this returns nothing, the account genuinely was never created — the password isn't the
problem.

:::tip

If more than one similar-looking microSD card is nearby (e.g. re-flashing a batch of units),
double-check you're mounting/editing the card that's actually running in this device — not a
different card that happens to be in the reader. Swapping in the wrong card by mistake gives no
error; the edits just silently never reach the device, and you'll re-check the same "fix" several
times without it ever taking effect. Physically labeling the card you're actively working on
avoids this.

:::

## Root cause

This is a cloud-init datasource quirk, not a typo in your password. It occurs if `meta-data` on
the boot partition (normally written correctly by Imager itself, but easy to get wrong if you
ever hand-edit it) uses the key `instance_id` (underscore) instead of `instance-id` (hyphen). The
underscored key is silently ignored by cloud-init's NoCloud datasource, which then falls back to
a fixed internal identity — the literal string `nocloud` — that never changes no matter how many
times `meta-data`/`user-data` are edited afterwards.

Confirm this by checking both of the following (same `/mnt/rootfs` mount as above):

```sh
cat /mnt/rootfs/var/lib/cloud/data/instance-id
cat /mnt/rootfs/var/lib/cloud/data/previous-instance-id
```

If either prints `nocloud` instead of a value you recognize, that's the bug.

**Why fixing `user-data` alone doesn't help once this has happened:** cloud-init tracks which
setup modules already ran *per instance*, as semaphore files under
`/mnt/rootfs/var/lib/cloud/instances/nocloud/sem/`. If an early boot gets interrupted mid-setup
(e.g. a power-cycle before cloud-init finishes — check
`/mnt/rootfs/var/log/cloud-init.log` for a `Received signal 15 resulting in exit` entry as
evidence this happened), modules like `config_users_groups`, `config_set_passwords`, and
`config_ssh` can be marked "already ran" even though they never actually completed. Because the
broken `instance-id` key means cloud-init keeps recognizing every later boot as that same
already-configured `nocloud` instance, it keeps skipping those modules forever — regardless of
how correct the current `user-data` content is.

## Fix

Change `meta-data` to use `instance-id:` (hyphen) with a **new** value it hasn't seen before,
then boot again. A genuinely new instance ID forces cloud-init to treat the boot as a fresh
instance and re-run every setup module from scratch, including user creation.

:::tip

For unattended/fleet provisioning where you're hand-writing `meta-data`/`user-data` instead of
using Imager's dialog, a known-working minimal pair looks like:

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

The `runcmd` line is a belt-and-suspenders backup for enabling `sshd` on top of cloud-init's own
`ssh_pwauth` — the boot-partition `ssh` flag file (see **SSH connection is refused outright** in
this section) is still the more reliable mechanism, since it doesn't depend on cloud-init timing
at all.

:::
