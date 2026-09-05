---
slug: spaces
title: Prostory
description: "Typické případy použití:"
---

# Prostory {#spaces}

**Prostor (Space)** je nejvyšší organizační jednotka v HARDWARIO Cloud. Všechno (zařízení, tagy, konektory, proměnné i uživatelé) se nachází uvnitř prostoru.

Typické případy použití:
- Jeden prostor pro nasazení u jednoho **zákazníka**
- Jeden prostor pro **projekt** nebo prostředí (např. `myproject-dev`, `myproject-prod`)
- Osobní prostor pro vývoj a testování

## Typy prostorů {#space-types}

| Typ | Popis |
|---|---|
| **personal** | Automaticky vytvořen pro každý uživatelský účet. Váš soukromý pracovní prostor |
| **team** | Sdílený pracovní prostor pro skupinu uživatelů |
| **default** | Standardní typ prostoru pro zákaznická nasazení |
| **premium** | Prostor s rozšířenými limity nebo funkcemi |

## Vytvoření prostoru {#creating-a-space}

1. V pravém horním rohu otevřete **SPACES** a klikněte na **+ NEW SPACE**.

   ![Stránka SPACES se zvýrazněným tlačítkem „+ NEW SPACE"](../../../../cloud/images/spaces-new-space.png)

2. Zadejte název podle [konvencí pojmenování](/cloud/#naming-conventions) a klikněte na **CREATE**.

   ![Dialog „Create new space": zadejte název a klikněte na CREATE](../../../../cloud/images/create-space.png)

Nový prostor se okamžitě objeví v přepínači prostorů.

## Přehled prostoru {#space-overview}

Po otevření prostoru zobrazuje levý postranní panel všechny dostupné sekce:

- **Devices**: všechna zařízení registrovaná v tomto prostoru
- **Messages**: uplink a downlink zprávy napříč všemi zařízeními
- **Tags**: správa tagů
- **Connectors**: webhookové konektory
- **Variables**: dešifrovací klíče a další proměnné na úrovni prostoru
- **Users**: členové prostoru a jejich role
- **FOTA**: správa aktualizací firmwaru

## Členové {#members}

Do svého prostoru můžete pozvat další uživatele ke spolupráci. Každý člen má roli:

| Role | Oprávnění |
|---|---|
| **Admin** | Plný přístup. Může přidávat/odebírat zařízení, spravovat konektory, zvát uživatele, měnit nastavení |
| **User** | Přístup pouze pro čtení. Může prohlížet zařízení a zprávy, ale nemůže provádět změny |

Pro pozvání členů a správu jejich rolí viz [**Users**](/cloud/users) v sekci **Administration**.

:::info

Uživatel může být členem více prostorů, v každém s jinou rolí.

:::

## API klíče {#api-keys}

Každý prostor má vlastní API klíče pro programový přístup. API klíče jsou omezeny na daný prostor a lze je použít k výpisu zařízení, získávání zpráv a odesílání downlinků přes [REST API](/cloud/api).

Pro vytvoření API klíče přejděte ve svém prostoru do **Settings → API Keys**.
