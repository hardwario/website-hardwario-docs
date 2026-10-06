---
slug: first-steps
title: První kroky
description: "Vítejte v HARDWARIO Cloud, platformě pro správu vašich zařízení, kam v reálném čase přicházejí jejich data."
title_meta: "První kroky (HARDWARIO Cloud)"
---

# Rychlý průvodce HARDWARIO Cloud {#hardwario-cloud-quick-start-guide}

Vítejte v **HARDWARIO Cloud**, platformě pro správu vašich zařízení, kam v reálném čase
přicházejí jejich data. Podle následujících kroků si vytvoříte účet, zaregistrujete první zařízení a začnete pracovat
s jeho zprávami.

## Krok 1: Vytvořte si účet HARDWARIO Cloud {#step-1-create-a-hardwario-cloud-account}

1. Přejděte na [**https://hardwario.cloud**](https://hardwario.cloud)
2. Klikněte na **SIGN UP**
3. Vytvořte účet pomocí účtu **Google** nebo **Microsoft**, případně přes **e-mail a heslo** (ověřte svůj e-mail).
4. Po ověření se **přihlaste**.

![Obrazovka HARDWARIO Cloud „Create account“ s poli pro e-mail a heslo a s možnostmi registrace přes Google a Microsoft](../../../../cloud/images/create-account.png)

:::info
Pro vyšší bezpečnost doporučujeme ověření přes **Google** nebo **Microsoft**.
:::

## Krok 2: Vytvořte si prostor {#step-2-create-your-space}

1. V pravém horním rohu klikněte na **SPACES → NEW SPACE**.

   ![Stránka SPACES se zvýrazněným tlačítkem „+ NEW SPACE“ v pravém horním rohu](../../../../cloud/images/spaces-new-space.png)

2. Pojmenujte svůj prostor (například: `my-home`, `office-sensors`, `warehouse`). Řiďte se [**konvencemi pojmenování**](/cloud/#naming-conventions).

   ![Dialog „Create new space“: zadejte název a klikněte na CREATE](../../../../cloud/images/create-space.png)

3. Do tohoto prostoru budete přidávat svá zařízení. Podrobnosti najdete na stránce [**Prostory**](/cloud/spaces).

## Krok 3: Přidejte zařízení {#step-3-add-a-device}

1. Vyberte svůj prostor (**Space**).
2. Přejděte na **DEVICES → +NEW DEVICE**.

   ![Stránka DEVICES se zvýrazněným tlačítkem „+ NEW DEVICE“ v pravém horním rohu](../../../../cloud/images/devices-new-device.png)

3. Zadejte údaje o zařízení: buď **naskenujte QR kód** (`⛶ SCAN DEVICE`) a vše se vyplní automaticky, nebo zadejte **Name**, **HARDWARIO Serial Number (HSN)** a **Claim Token** ručně.

   ![Dialog „Create new device“: naskenujte QR kód, nebo vyplňte Name, Serial Number a Claim Token](../../../../cloud/images/create-new-device.png)

4. Zařízení uložte. Teď je **zaregistrované v cloudu**. Co dalšího s ním můžete dělat, popisuje stránka [**Zařízení**](/cloud/devices).

## Krok 4: Podívejte se na svá data {#step-4-see-your-data}

Jakmile je zařízení napájené a připojené, jeho uplinky se objeví v Cloudu.

- Příchozí payloady najdete na stránce [**Zprávy**](/cloud/messages).
- Související zařízení seskupte a filtrujte pomocí [**tagů**](/cloud/tags).
- Informace typu klíč–hodnota pro jednotlivá zařízení ukládejte do [**proměnných**](/cloud/variables).

![Zobrazení MESSAGES s rozbalenou uplink zprávou zařízení a jejím dekódovaným JSON payloadem](../../../../cloud/images/messages.png)

## Krok 5: Ovládejte svá zařízení {#step-5-act-on-your-devices}

Cloud funguje oběma směry: konfiguraci, data nebo příkazy shellu pošlete do zařízení
[**downlinkem**](/cloud/downlink) a nový [**firmware**](/cloud/firmware) nahrajete bezdrátově.

## Krok 6: Propojte Cloud se svými systémy {#step-6-integrate-with-your-systems}

Data z Cloudu předáte dál pomocí [**konektorů**](/cloud/connectors) (webhooků), nebo se na ně
programově dotazujte přes [**REST API**](/cloud/api).

## Krok 7: Spravujte přístup {#step-7-manage-access}

Na stránce [**Uživatelé**](/cloud/users) pozvete kolegy a určíte, kdo smí váš prostor vidět a měnit.

## Další kroky {#next-steps}

Podrobnosti ke všem funkcím najdete v kompletní [**dokumentaci HARDWARIO Cloud**](/cloud/).
