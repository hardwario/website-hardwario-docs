---
slug: nfc-configurator-setup
title: Setup
---
import Image from '@theme/IdealImage';

# NFC Configurator Setup

The **HARDWARIO STICKER NFC Configurator** is a desktop application for wirelessly configuring STICKER devices. The configuration is prepared on your computer and an Android phone transfers it to the STICKER over NFC. **No cables or programmers are required.**

This page describes how to install the application and prepare your computer for the first run. For day-to-day usage and the list of all configurable parameters, see [**Configuration →**](./config.md).

---

## Requirements

| Item | Notes |
|---|---|
| **Computer** | Windows 10 / 11 or Ubuntu Linux |
| **Python** | 3.10 or newer |
| **OpenSSH client** | Included in Windows 10/11 and all recent Linux distributions |
| **Internet connection** | Required for the HTTPS tunnel that links the desktop and the phone |
| **Android phone** | With **Google Chrome**. Web NFC works **only** in Chrome on Android. iPhone, iPad, Safari and Firefox are **not** supported |
| **STICKER device(s)** | Any variant: Clime, Input, Motion |
| **`STICKER Inventory.csv`** | Provided by us |

:::caution
Web NFC is supported **only on Chrome for Android**. iPhones, iPads, Safari, Firefox or any other browser will not work.
:::

---

## 1) Download the application

Pick whichever option is easier for you.

### Option A ZIP archive

1. Open `https://github.com/hardwario/sticker-configuration` in your browser.
2. Click the green **Code** button, then **Download ZIP**.
3. Extract the ZIP into a folder of your choice (for example your *Documents* folder). You can rename the extracted folder to `sticker-configuration`.
4. Open a terminal (Linux) or Command Prompt (Windows) and change into that folder.

### Option B Clone with Git 

**Windows:**
```
cd %USERPROFILE%\Documents
git clone https://github.com/hardwario/sticker-configuration.git
cd sticker-configuration
```

**Linux:**
```bash
cd ~/Documents
git clone https://github.com/hardwario/sticker-configuration.git
cd sticker-configuration
```

---

## 2) Installation on Windows

### Step 1 Install Python

1. Go to https://www.python.org/downloads/ and click **Download Python 3.x.x** (any version 3.10 or newer).
2. Open the installer. On the first screen, tick **"Add python.exe to PATH"**/ **Add Python to environment variables**.
3. Click **Install Now** and wait for it to finish.
4. Open the Command Prompt (press the Windows key, type `cmd`, press Enter) and verify:

```
python --version
```

You should see something like `Python 3.12.2`.

:::caution
Without **Add python.exe to PATH**, the `python` command will not work from the Command Prompt.
:::

### Step 2 Check OpenSSH

OpenSSH is included in Windows 10 and 11. Verify by typing:

```
ssh
```

If a usage message appears, you are ready. If you see an error, install it: open **Settings → Apps → Optional Features → Add a feature**, and install **OpenSSH Client**.

### Step 3 Create an SSH key

The tunnel that connects your phone to the desktop needs a dedicated SSH key **without a passphrase**. The application uses its own key file (`hardwario_sticker_ed25519`), so any existing keys you have for GitHub or other services are untouched.

Check whether the key already exists:

```
dir %USERPROFILE%\.ssh\hardwario_sticker_ed25519
```

- If the file is listed, you are done, skip to **Step 4**.
- If you see *File Not Found* (or the `.ssh` folder does not exist), create the key with:

```
ssh-keygen -t ed25519 -N "" -f %USERPROFILE%\.ssh\hardwario_sticker_ed25519
```

:::caution
The `-N ""` part is important, it creates the key **without a passphrase**. A key with a passphrase will make the tunnel hang silently (the QR code never appears), because the application cannot type the password for you.
:::

### Step 4 Install Python dependencies

From inside the project folder, run:

```
pip install -r requirements.txt
```

If you see *pip is not recognized*, try `python -m pip install -r requirements.txt` instead.

---

## 3) Installation on Linux (Ubuntu)

### Step 1 Install Python, Git and OpenSSH

Open a terminal (Ctrl + Alt + T) and run:

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv git openssh-client
```

Verify:

```bash
python3 --version
```

You should see something like `Python 3.12.3`.

### Step 2 Create a virtual environment

A virtual environment keeps the application's Python packages separate from your system packages. From inside the project folder:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

When the virtual environment is active, the prompt shows `(.venv)` at the beginning. Run `source .venv/bin/activate` every time you open a new terminal before starting the application.

### Step 3 Create an SSH key

The tunnel that connects your phone to the desktop needs a dedicated SSH key **without a passphrase**. The application uses its own key file (`hardwario_sticker_ed25519`).

Check whether the key already exists:

```bash
ls ~/.ssh/hardwario_sticker_ed25519
```

- If the file is listed, you are done, skip to **Step 4**.
- If you see *No such file or directory*, create the key with:

```bash
ssh-keygen -t ed25519 -N "" -f ~/.ssh/hardwario_sticker_ed25519
```

:::caution
The `-N ""` part is important, it creates the key **without a passphrase**. A key with a passphrase will make the tunnel hang silently (the QR code never appears).
:::

### Step 4 Install Python dependencies

```bashg
pip install -r requirements.txt
```

If **PyQt5** fails to install, add the required Qt libraries and try again:

```bash
sudo apt install libxcb-xinerama0 libxcb-cursor0
```

:::caution
Do not install the Debian `python3-pyqt5` package. The virtual environment will not see system-wide packages, so it would not help.
:::

---

## 4) Device inventory (STICKER Inventory.csv)

The application needs a CSV file called **`STICKER Inventory.csv`** to look up each device and its encryption key. You receive this file from us.

Place the file in the **root folder** of the application. The file name must be exactly `STICKER Inventory.csv` (capital "S" and a space).

### CSV columns

| Column | Description | Format |
|---|---|---|
| **Serial number** | The 10-digit number from the barcode on the STICKER | 10 digits |
| **Product type** | Product variant name | Text (for example `STICKER_Clime`) |
| **Date Time** | Registration timestamp | `YYYY-MM-DD HH:MM:SS` |
| **DevEUI** | LoRaWAN device identifier | 16 hex characters, lowercase |
| **AppKey** | LoRaWAN application key | 32 hex characters, lowercase |
| **JoinEui** | LoRaWAN join server identifier | 16 hex characters, lowercase |
| **Secret key** | Encryption key used for NFC communication | 32 hex characters, lowercase |
| **Nonce counter** | Security counter that prevents replay attacks | Integer, starts at 1 |

### Example

```csv
Serial number,Product type,Date Time,DevEUI,AppKey,JoinEui,Secret key,Nonce counter
1234567890,STICKER_Clime,2024-01-01 00:00:00,a1b2c3d4e5f60718,9f3e7a2b1c8d4e5f6071829304a5b6c7,0000000000000000,7c4e9b2a8f1d6053e9a47b28c3f15d6b,1
```

:::caution
**Do not edit the `Nonce counter` column by hand.** The application updates it automatically after every successful write. If the nonce in the CSV does not match the nonce on the device, the device will reject future configurations.
:::

---

## 5) Run the application

Open a terminal (or Command Prompt on Windows) in the project folder and start the desktop app.

### Windows

```
python main.py
```

If `python` is not recognized, close and reopen the Command Prompt so the PATH refreshes after installing Python, or try `python3 main.py` or `py main.py`.

### Linux

```bash
source .venv/bin/activate
python3 main.py
```

The virtual environment must be active, the prompt should start with `(.venv)`.

The PyQt desktop window opens. To stop the app, close the window or press `Ctrl + C` in the terminal.

---

## Quick start checklist

Before configuring your first device, make sure:

1. The application is installed and `python main.py` (or `python3 main.py`) opens the window without errors.
2. `STICKER Inventory.csv` is in the project folder and contains your device(s).
3. The dedicated SSH key `hardwario_sticker_ed25519` exists **without a passphrase**.
4. Your Android phone is connected to the internet, NFC is turned on and you are using **Chrome**.

You are now ready to write configuration to a device, continue with [**Configuration →**](./config.md).

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `python is not recognized` (Windows) or `command not found` (Linux) | Reinstall Python and tick **Add to PATH** (Windows). On Linux use `python3` instead of `python`. |
| `pip is not recognized` | Use `python -m pip` (Windows) or `pip3` (Linux). |
| `ModuleNotFoundError` when starting the app | Dependencies are not installed. Run `pip install -r requirements.txt` in the project folder. |
| **PyQt5** fails to install on Linux | Missing system Qt libraries. Run `sudo apt install libxcb-xinerama0 libxcb-cursor0` and try again. Do **not** install the Debian `python3-pyqt5` package, the virtual environment will not see it. |
| Tunnel fails to start | OpenSSH client is not installed. Windows: enable via **Settings → Optional Features**. Linux: `sudo apt install openssh-client`. |
| QR code never appears / tunnel hangs silently | The dedicated SSH key for the tunnel is missing or has a passphrase. Recreate it with the `-N ""` flag. |
| QR code or tunnel URL does not appear | Wait a few more seconds. Check your internet connection and firewall (the tunnel uses port 443). |
| NFC server does not start | Port 5555 is already in use. Close the other application. <br/> Linux: `lsof -i :5555` <br/> Windows: `netstat -ano \| findstr :5555` |
