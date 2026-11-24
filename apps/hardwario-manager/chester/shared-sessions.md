---
slug: shared-sessions
title: Share a terminal session
description: "Share a CHESTER terminal session from HARDWARIO Manager by link and Session ID, or join one, so a colleague can watch and run commands remotely."
---

# Share a terminal session

A shared session puts the CHESTER console you are connected to onto a link, so a
colleague (HARDWARIO support, for example) can see the output and run commands
from their own browser or phone while you hold the device. The session runs
through the HARDWARIO Terminal relay at `terminal.hardwario.com`, so both sides
need an internet connection.

:::danger Anyone with the link controls the device
A shared session has **no password**. Anyone who opens the link, or types the
Session ID, can view **and control** the connected CHESTER. Share it only with
people you trust, and stop sharing as soon as you are done.
:::

---

## Share your session

1. Connect to the CHESTER and open [**Terminal**](./terminal.md).
2. Tap the button in the top bar, **Share this session**.
3. A sheet opens with the warning above, the **Session ID** (a number of up to
   six digits) and the link, along with a live status: **Connecting…**,
   **Waiting for viewers**, or the number of viewers, for example **1 viewer**.
4. Send the link with **Copy link** or **Share**, or read out the Session ID.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-share-session.png" alt="The share sheet over the Terminal: the warning that anyone with the link can view and control the CHESTER, the Session ID with Waiting for viewers, the link, and the Copy link and Share buttons" width="320" />

While the session is live, the top-bar button shows a different icon and its
label changes to **Session shared. Tap for the link**, which opens the sheet
again. A line above the console repeats the status, for example
**Shared · Waiting for viewers**, so you can see that someone may be watching.

**Stop sharing** at the bottom of the sheet ends it. Leaving the Terminal screen
also ends the session.

---

## Join someone else's session

You do not need a device of your own to join.

1. Open **HARDWARIO Manager → CHESTER**.
2. On **Connect to CHESTER**, choose **Join a shared session**.
3. Enter the numeric **Session ID** the host gave you and choose **Join**.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-join-session.png" alt="The Join session screen with its instructions, a Session ID field, the Join button and the relay address beneath" width="320" />

The screen names the relay the session runs through, **Relay:**
`https://terminal.hardwario.com`, so you can see where the console
traffic is going before you join. A session shared from the HARDWARIO Terminal
in a browser can be joined here too.

Once you have joined, the screen shows the host's console output and an input
for running commands on their device, **Run a command on the host**. A status
line tells you what the host is doing: **Host connected**, **Host is connecting
a device…** or **Waiting for the host to connect a device…**, with the Session
ID beside it.

<img className="app-screenshot" src="/img/hw-manager/hw-manager-chester-session-viewer.png" alt="A joined session: Host connected with the Session ID, the host's console output and the Run a command on the host input at the bottom, with Leave in the top bar" width="320" />

**Leave** in the top bar ends your side. If the host stops sharing, the status
line changes to **Session ended**, a notice says **The host stopped sharing this
session.** and the input is disabled.

---

## What travels over the link

The session carries the console: the commands sent and the output returned.
Anything you would see in the terminal, a viewer sees too, including values
printed by `config show`. Bear that in mind before sharing a session on a device
holding production keys.
