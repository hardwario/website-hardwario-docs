---
slug: tts-gateways
title: Brány
description: "Tento návod vás provede přidáním a nastavením brány v The Things Stack."
title_meta: "Brány (The Things Stack)"
---
import Image from '@theme/IdealImage';

# Průvodce konfigurací bran {#gateways-configuration-guide}

Tento návod vás provede přidáním a nastavením brány v The Things Stack.

---

## Vytvoření nové brány {#creating-a-new-gateway}

1. Na kartě **Home** klikněte na **Register gateway**.  
   - Pokud jste na jiné kartě, klikněte vpravo nahoře na modré tlačítko **+ Add** a zvolte **Add new gateway**.

![Dashboard Home v The Things Stack s tlačítkem Register gateway v řádku rychlých akcí](../../../../../../apps/the-things-stack/tts-configuration/images/tts-gateways-0.png)

2. Přesměruje vás to na stránku registrace brány.
   - TTS si nejprve vyžádá **Gateway EUI** (použijte **Gateway ID** z RouterOS).
   - Gateway EUI najdete vytištěné na své fyzické bráně.

![Stránka Register gateway s dotazem na Gateway EUI a možností Continue without EUI](../../../../../../apps/the-things-stack/tts-configuration/images/tts-gateways-1.png)

3. Po zadání Gateway EUI vyplňte tato pole:
   - **Gateway ID** ( vámi zvolený identifikátor zařízení → například: **test-geteway-001**)
   - **Gateway Name** (vámi zvolené jméno zařízení → například **Test Geteways-001**)
   - **Frequency Plan** → zvolte **Europe 868.1 MHz**
   - (Volitelně) **Label**

4. Zaškrtněte políčko **Require authenticated connection**.

5. Zapněte tyto volby:
   - **Generate API key for CUPS**
   - **Generate API key for LNS**

6. Klikněte na **Register gateway**.

![Formulář Register gateway s Gateway ID, jménem, evropským frekvenčním plánem, autentizovaným připojením a zaškrtávátky pro API klíče CUPS/LNS](../../../../../../apps/the-things-stack/tts-configuration/images/tts-gateways-2.png)

---

## Stažení API klíčů {#downloading-api-keys}

Objeví se okno s názvem **Download gateway API keys**.

- Stáhněte oba API klíče (CUPS a LNS).
- Uložte je na bezpečné a spolehlivé místo ve svém počítači.
- Nikomu je nesdělujte.

:::info
  **Tyto klíče jsou potřeba při konfiguraci rozhraní brány** (viz dokumentace vaší konkrétní brány v sekci *LNS & CUPS*).
:::

Po stažení:
- Okno se zavře automaticky, nebo
- Klikněte na **I have downloaded the keys**.

![Dialog Download gateway API keys s tlačítky Download LNS key a Download CUPS key a potvrzovacím zaškrtávátkem](../../../../../../apps/the-things-stack/tts-configuration/images/tts-gateways-3.png)

---

## Brána je připravená {#gateway-ready}

Vaše brána je nyní připravená k použití a můžete začít připojovat jednotlivá koncová zařízení.

## Odstranění brány {#removing-gateway}

Když v The Things Stack bránu smažete, její **Gateway ID se ze serveru neodstraní úplně**. I když brána z konzole zmizí, ID zůstane na backendu rezervované.  
Znamená to, že **novou bránu se stejným ID vytvořit nelze**, dokud se ID ručně neuvolní.

Uvolnit nebo vyčistit ID brány ze serveru může jen **systémový administrátor**.  
Pro běžné uživatele je jediným řešením **vytvořit bránu znovu s novým, jiným ID**.

## Videonávod {#video-tutorial}

:::tip
Pokud potřebujete **další pomoc** nebo vizuální ukázku postupu popsaného v tomto návodu, podívejte se na [**videonávod**](https://docs.hardwario.com/apps/videos-apps/tts-gateways).
:::
