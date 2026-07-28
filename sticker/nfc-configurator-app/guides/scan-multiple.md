---
slug: hm-guide-scan-multiple
title: Scan multiple devices
---

# Scan multiple STICKERs (batch export)

Capture the configuration of many devices in one session and export them together — handy for inventory or backups.

## Capture the devices

1. Open **HARDWARIO Manager** and go to **STICKER → Configuration → Scan multiple (batch export)**.
2. Choose which sections to capture (LoRaWAN, Application, Sensors, Alarms), then tap each STICKER in turn — every device's configuration is captured **automatically** as you tap it, and the running count grows.

<img src="/img/hw-manager/hw-manager-batch-config-export.png" alt="Capturing several STICKERs in one batch — sections chosen, two captured" width="320" />

## Export them together

When you have scanned everything, choose **Export all** and pick a format — **Share as JSON** (a `.json` file of every captured config) or **Share as CSV** (a spreadsheet of every captured config).

<img src="/img/hw-manager/hw-manager-batch-config-export-as.png" alt="Export all captured configs as JSON or CSV" width="320" />

This only **reads** the devices — nothing is written. To write the same settings to many devices instead, use a [**template**](./templates.md).
