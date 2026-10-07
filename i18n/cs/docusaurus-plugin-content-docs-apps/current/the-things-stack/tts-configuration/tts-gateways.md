---
slug: tts-gateways
title: Brány
title_meta: "Brány (The Things Stack)"
---
import Image from '@theme/IdealImage';

# Průvodce konfigurací bran {#gateways-configuration-guide}

Tento návod vás provede přidáním a nastavením brány v The Things Stack.

---

## Vytvoření nové brány {#creating-a-new-gateway}

1. Na záložce **Home** klikněte na **Register gateway**.  
   - Pokud jste na jiné záložce, klikněte vpravo nahoře na modré tlačítko **+ Add** a zvolte **Add new gateway**.

![Dashboard Home v The Things Stack s tlačítkem Register gateway v řádku rychlých akcí](../../../../../../apps/the-things-stack/tts-configuration/images/tts-gateways-0.png)

2. Budete přesměrováni na stránku registrace brány.
   - TTS si nejprve vyžádá **Gateway EUI** (použijte **Gateway ID** z RouterOS).
   - Gateway EUI je vytištěné přímo na bráně.

![Stránka Register gateway s dotazem na Gateway EUI a možností Continue without EUI](../../../../../../apps/the-things-stack/tts-configuration/images/tts-gateways-1.png)

3. Po zadání Gateway EUI vyplňte tato pole:
   - **Gateway ID** (identifikátor zařízení podle vaší volby → například **test-gateway-001**)
   - **Gateway Name** (název zařízení podle vaší volby → například **Test Gateway-001**)
   - **Frequency Plan** → zvolte **Europe 868.1 MHz**
   - (Volitelně) **Label**

4. Zaškrtněte políčko **Require authenticated connection**.

5. Zapněte tyto volby:
   - **Generate API key for CUPS**
   - **Generate API key for LNS**

6. Klikněte na **Register gateway**.

![Formulář Register gateway s Gateway ID, jménem, evropským frekvenčním plánem, autentizovaným připojením a zaškrtávacími políčky pro API klíče CUPS/LNS](../../../../../../apps/the-things-stack/tts-configuration/images/tts-gateways-2.png)

---

## Stažení API klíčů {#downloading-api-keys}

Objeví se okno s názvem **Download gateway API keys**.

- Stáhněte oba API klíče (CUPS a LNS).
- Uložte je na bezpečné a spolehlivé místo ve svém počítači.
- Nikomu je nesdělujte.

:::info
  **Tyto klíče jsou potřeba při konfiguraci rozhraní brány** (viz dokumentace příslušné brány, část *LNS & CUPS*).
:::

Po stažení:
- Okno se zavře automaticky, nebo
- Klikněte na **I have downloaded the keys**.

![Dialog Download gateway API keys s tlačítky Download LNS key a Download CUPS key a potvrzovacím zaškrtávacím políčkem](../../../../../../apps/the-things-stack/tts-configuration/images/tts-gateways-3.png)

---

## Brána je připravená {#gateway-ready}

Brána je teď připravená k použití a můžete k ní začít připojovat jednotlivá koncová zařízení.

## Odstranění brány {#removing-gateway}

Když v The Things Stack bránu smažete, její **Gateway ID se ze serveru neodstraní úplně**. I když brána z konzole zmizí, ID zůstane na backendu rezervované.  
Znamená to, že **novou bránu se stejným ID vytvořit nelze**, dokud se ID ručně neuvolní.

Uvolnit nebo vyčistit ID brány ze serveru může jen **systémový administrátor**.  
Běžnému uživateli nezbývá než **vytvořit bránu znovu s novým, jiným ID**.

## Videonávod {#video-tutorial}

:::tip
Pokud potřebujete **další pomoc** nebo vizuální ukázku postupu popsaného v tomto návodu, podívejte se na [**videonávod**](/apps/videos-apps/tts-gateways).
:::
