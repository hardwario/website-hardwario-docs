---
slug: terminal
title: Terminal
description: "Use the CHESTER shell from your phone over Bluetooth in HARDWARIO Manager, with command suggestions learned from the device and scrollback kept per device."
---

# CHESTER terminal

The terminal gives you the device's shell over Bluetooth, the same console you
would reach over a cable, from the phone.

Open **CHESTER → Terminal**. An empty terminal suggests where to start:
*Type a command below, for example "help" or "config show".*

---

## Running commands

Type a command into **Enter a shell command** and send it. The command is echoed
into the log as `$ command`, and the device's output follows verbatim in a
monospace block. Output can be selected and copied.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-terminal.png" alt="The CHESTER terminal showing a command and the device's output, with the Enter a shell command input at the bottom" width="320" />

If a command cannot be sent, the failure is written into the log itself: an
`[error]` line saying what happened, followed by a `[detail]` line with the raw
error. The transcript keeps a complete record of what happened.

---

## Command suggestions

The terminal learns the device's own command set rather than guessing:

- when you open it, the app quietly asks the device for its command list;
- once you type past the first word, it asks that command for its subcommands.

Neither query shows in the log. Matching suggestions appear as chips above the
input. Tapping one **fills the input**. It never runs the command, so you always
send it yourself.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-terminal-help.png" alt="The terminal with a partly typed command and suggestion chips above the input" width="320" />

Running `help` yourself prints the same list the suggestions are drawn from: the
command groups this firmware exposes, each with a one-line description.

Suggestions come from the connected device, so they match its firmware. They are
cleared when you disconnect.

---

## Scrollback

The log is kept **per device**, so reconnecting to a CHESTER brings back what you
did with it last time. The terminal opens at the newest output. A
**Scroll to bottom** button appears when you scroll up, and sending a command
jumps back to the newest output.

If the device clears the screen itself, the log clears with it.

---

## Sharing the session

The button in the top bar (**Share this session**) shares this terminal with
someone else, who can then watch and drive the device from a browser or from
the app. See [**Share a terminal session**](./shared-sessions.md).

---

:::tip Persisting what you change
Settings changed from the shell live in the device's working memory until you
run `config save`. That command stores them so they survive a reboot, and it
restarts the device, which drops the Bluetooth connection. Changes made in
[**Configuration**](./configuration.md) are saved the same way.
:::
