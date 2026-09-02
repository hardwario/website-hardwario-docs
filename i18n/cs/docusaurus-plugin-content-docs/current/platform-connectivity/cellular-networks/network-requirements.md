---
slug: network-requirements
title: Požadavky na síť
description: "Než nasadíte zařízení CHESTER do sítě, kterou jste dosud netestovali, porovnejte, co zařízení podporuje, s tím, co místní operátor skutečně poskytuje. Následující dva seznamy je vhodné používat společně — první uvádí možnosti zařízení, druhý je…"
---
import Image from '@theme/IdealImage';

# Požadavky na síť {#network-requirements}

Než nasadíte zařízení **CHESTER** do sítě, kterou jste dosud netestovali, porovnejte, co zařízení podporuje, s tím, co místní operátor skutečně poskytuje. Následující dva seznamy je vhodné používat společně — první uvádí možnosti zařízení, druhý je kontrolní seznam, který můžete předat poskytovateli SIM karet nebo mobilnímu operátorovi.

Pokud používáte SIM kartu **HARDWARIO** Vodafone nebo 1NCE, je vše již vyřešeno za vás — pokračujte přímo na [**Nastavení SIM karty**](sim-card-setup.md).

---

## Co zařízení podporuje {#what-the-device-supports}

| Vlastnost | Podpora v CHESTER |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Radiová technologie**      | **LTE-M** (Cat M1) a **NB-IoT** (Cat NB1). Obě technologie jsou podporovány a jejich prioritu lze nastavit — viz [`mode`](configuration-parameters.md#mode--network-mode-selection).       |
| **Frekvenční pásma**       | 1, 2, 3, 4, 5, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28 a 66. Ve výchozím stavu není použit žádný band lock — modem prohledává všechna podporovaná pásma. Prohledávání lze zúžit pomocí [`bands`](configuration-parameters.md#bands--frequency-band-lock). |
| **Výběr operátora**    | Automatický výběr PLMN nebo ručně vynucené PLMN ID — viz [`network`](configuration-parameters.md#network--plmn-selection).                                                                  |
| **Datový roaming**          | Podporován. Zařízení považuje stav *registered, roaming* za plně platnou registraci.                                                                         |
| **APN**                   | Jak výchozí APN (poskytnuté sítí), tak explicitně nastavené — viz [`apn`](configuration-parameters.md#apn--network-apn-access-point-name).                                         |
| **Autentizace APN**    | `none`, `PAP` nebo `CHAP` — viz [`auth`](configuration-parameters.md#auth--authentication-method).                                                                                                |
| **Formát SIM karty**       | **Nano-SIM (4FF)**. Pro velkoobjemové objednávky je dostupná varianta s pájeným SIM čipem **MFF2**.                                                               |
| **Úspora energie**          | Firmware si vyžádá **PSM** (Power Saving Mode). PSM není striktní podmínkou — zařízení **CHESTER** funguje i v sítích, které jej neposkytnou, pouze za cenu vyšší spotřeby energie. |

---

## Co si potvrdit u operátora {#what-to-confirm-with-your-operator}

Každá z níže uvedených odpovědí odpovídá přímo jednomu z [konfiguračních parametrů](configuration-parameters.md) popsaných v předchozí kapitole.

* **Pásma** — která z podporovaných pásem síť v místě nasazení používá, zvlášť pro LTE-M a NB-IoT?
* **APN** — je vyžadováno explicitní APN, nebo lze použít výchozí APN poskytnuté sítí?
* **Autentizace APN** — je vyžadován `PAP` nebo `CHAP`, a pokud ano, jaké jsou přihlašovací údaje?
* **PLMN** — musí být vynuceno konkrétní PLMN ID, například když SIM karta pracuje v trvalém roamingu?
* **Datový roaming** — je datový roaming na tarifu povolen?
* **PSM** — podporuje a poskytuje síť **PSM**?
* **Další specifické požadavky sítě** — whitelisting IMEI/IMSI, přidělení fixní IP adresy, omezení firewallu nebo portů na straně operátora.

Až budete mít odpovědi, uplatněte je podle postupu v části [**Nastavení SIM karty**](sim-card-setup.md) v sekci *Other SIM cards*.
