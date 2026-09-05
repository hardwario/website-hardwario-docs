---
slug: hardwario-monitor
title: HARDWARIO Monitor
---
import Image from '@theme/IdealImage';

# HARDWARIO Monitor

**HARDWARIO Monitor** is a graphical multiplatform computer program to **configure** and **manage** CHESTER devices.

 [**Download HARDWARIO Monitor**](https://github.com/hardwario/hio-monitor/releases) on GitHub project page.

<div class="container">
  <div class="row">
    <div class="col col--8">
      <div><Image img={require('./images/hardwario-monitor.png')} alt="HARDWARIO Monitor window with Interactive shell and Device Log panes and Console, Bluetooth, Flash options on the left" /></div>
    </div>
    <div class="col col--12">
    </div>
  </div>
</div>

After you start the application, you have connection options on **the left side** of the application to connect to the CHESTER using:

## Console

You need **J-Link** programmer to use this option. We use **J-Link RTT** (Real Time Transfer) to transfer logs and shell to the **CHESTER**.

Connect **J-Link** to the **CHESTER** using J-Link connected to the [**APP/BLE SWD connector**](/chester/developer-tools/segger-j-link/#segger-j-link-to-app-port-connection).

Then click on the **Attach** button on the right side of the window.

You can import a batch of console commands with the 📄 **Batch** button on the right side of the window and select a text file with commands that will be sent to the CHESTER line by line. It can be for example used to deploy configuration on multiple units.

### Console functions and shortcuts

* ꜛ up and ꜜ down arrows: go through the command history
* `Ctrl` + `R`: Open list of last used commands. By typing parts of the commands, you can search this list.
* Search: in the bottom right corner 🔍 click and enter text to search, hit enter. Key `n` searches forward, `Shift` + `n` searches backward, F5 or clicking on the `Undo` button in the right column disables search mode.

## Bluetooth

You can connect to the **CHESTER Shell** over Bluetooth. This is useful to use `info show` command to get firmware version or show/change device configuration using `app config show` commands.

If you cannot pair the device from the **HARDWARIO Monitor** application, you have to pair it with the system Bluetooth dialog first. Then go back to the **HARDWARIO Monitor** application
and connect to the device again.

## Flash

You can flash firmware via the **APP** connector on the **CHESTER** mainboard with the **J-Link** USB device. Just copy the **unique ID** from the released firmware and it will be downloaded and flashed.

## Logs

**HARDWARIO Monitor** logs all the communication on your drive. This is useful if you would like to share complete logs with HARDWARIO in case of some troubleshooting.

It depends on your OS type and OS version where the logs are saved:

### Windows
```
C:/Users/<USER>/AppData/Roaming/HARDWARIO/HARDWARIO Monitor/hardwario-monitor-console.log
C:/ProgramData/HARDWARIO/HARDWARIO Monitor/hardwario-monitor-console.log
```

### Linux

```
~/.local/share/HARDWARIO/AppRun.wrapped/hardwario-monitor-console.log
~/.local/share/HARDWARIO/HARDWARIO Monitor/hardwario-monitor-console.log
/usr/local/share/HARDWARIO/HARDWARIO Monitor/hardwario-monitor-console.log
/usr/share/HARDWARIO/HARDWARIO Monitor/hardwario-monitor-console.log
```

### macOS

```
~/Library/Application Support/HARDWARIO/HARDWARIO Monitor/hardwario-monitor-console.log
/Library/Application Support/HARDWARIO/HARDWARIO Monitor/hardwario-monitor-console.log
```
