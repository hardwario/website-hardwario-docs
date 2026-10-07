---
slug: tts-end-devices
title: Koncová zařízení
title_meta: "Koncová zařízení (The Things Stack)"
---
import Image from '@theme/IdealImage';

# Průvodce konfigurací koncových zařízení {#end-devices-configuration-guide}

Tento návod vás provede vytvořením profilů zařízení a přidáním koncových zařízení v The Things Stack.

---

## Vytvoření aplikace {#creating-an-application}

1. Na záložce **Home** klikněte na **Create application**.  
   - Pokud jste na jiné záložce, klikněte vpravo nahoře na modré tlačítko **+ Add** a zvolte **Add application**.

![Dashboard Home v The Things Stack s tlačítkem Create application v řádku rychlých akcí](../../../../../../apps/the-things-stack/tts-configuration/images/tts-end-device-0.png)

2. Přejdete na stránku vytvoření aplikace. Vyplňte tato pole:
   - **Application ID (app id)**
   - **Application Name (app name)**
   - (Volitelně) **Description**
   - (Volitelně) **Label**: doporučujeme použít stejný label pro aplikaci, koncová zařízení i brány.

3. Klikněte na modré tlačítko **Create application**.

![Formulář Create application s Application ID, jménem, popisem, labely a tlačítkem Create application](../../../../../../apps/the-things-stack/tts-configuration/images/tts-end-device-1.png)

---

## Registrace koncových zařízení {#registering-end-devices}

V The Things Stack lze koncová zařízení zaregistrovat dvěma způsoby:
- Pomocí předdefinovaného zařízení z LoRaWAN Device Repository
- Ručně, zadáním všech parametrů zařízení

---

### Předdefinovaná zařízení {#predefined-devices}

1. V aplikaci klikněte na modré tlačítko **+ Register end device**.  
   - Případně klikněte na **+ Add** a zvolte **Register end device in an application**.

![Přehledová stránka prázdné aplikace s tlačítkem Register end device](../../../../../../apps/the-things-stack/tts-configuration/images/tts-end-device-2.png)

2. Zvolte **Select the end device in the LoRaWAN Device Repository**.

3. Vyhledejte výrobce a model svého zařízení a vyberte ho.  
   - U předdefinovaného zařízení se většina technických parametrů vyplní automaticky.

:::info
Tento způsob doporučujeme vždy, když je zařízení v LoRaWAN Device Repository dostupné, protože snižuje riziko chyb v konfiguraci.
:::

4. Vyplňte potřebné identifikátory:
   - **JoinEUI (AppEUI)**  
     - Najdete ho v naší dokumentaci nebo v dokumentech výrobce.
   - **DevEUI**  
     - Liší se u každého zařízení a je vytištěné přímo na něm.
   - **AppKey**  
     - Najdete ho v naší dokumentaci nebo v dokumentech výrobce.
   - **Device ID**  
     - Identifikátor zařízení podle vaší volby.

5. (Volitelně) Přidejte stejný **label**, jaký jste použili u aplikace a brány.

6. Klikněte na modré tlačítko **Register end device**.

![Formulář Provisioning information s poli JoinEUI, DevEUI, AppKey a End device ID a tlačítkem Register end device](../../../../../../apps/the-things-stack/tts-configuration/images/tts-end-device-4.png)

---

### Ruční konfigurace {#manual-configuration}

Tento způsob použijte, když zařízení v LoRaWAN Device Repository **není dostupné** nebo když chcete mít parametry zařízení **plně pod ruční kontrolou**.

1. V aplikaci klikněte na **+ Register end device**.

2. Zvolte **Enter end device specifics manually**.

---

#### Typ koncového zařízení {#end-device-type}

3. Nastavte základní parametry LoRaWAN:

   - **Frequency plan**  
     - Zvolte regionální frekvenční plán (například **Europe 863–870 MHz**).
   - **LoRaWAN version**  
     - Zvolte specifikaci LoRaWAN, kterou zařízení podporuje  
       (obvykle **LoRaWAN Specification 1.0.4**).
   - **Regional Parameters version**  
     - Zvolte odpovídající verzi regionálních parametrů  
       (například **RP002 Regional Parameters 1.0.4**).

![Ruční registrace koncového zařízení s volbou frekvenčního plánu, verze LoRaWAN a verze regionálních parametrů](../../../../../../apps/the-things-stack/tts-configuration/images/tts-end-device-5.png)

---

#### Informace pro zprovoznění {#provisioning-information}

4. Zadejte **JoinEUI (AppEUI)** zařízení.

5. Klikněte na **Confirm**.  


---

#### Identifikátory zařízení {#device-identifiers}

6. Vyplňte zbývající potřebné identifikátory:

   - **DevEUI**  
     - Jedinečný identifikátor zařízení (je vytištěný na zařízení nebo na obalu).
   - **AppKey**  
     - Aplikační klíč od výrobce.
   - **Device ID**  
     - Identifikátor zařízení v rámci aplikace podle vaší volby.

7. (Volitelně) Přidejte stejný **label** jako u aplikace a brány.

8. Klikněte na modré tlačítko **Register end device**.

![Vyplněný formulář zprovoznění s DevEUI, AppKey a End device ID, připravený k registraci koncového zařízení](../../../../../../apps/the-things-stack/tts-configuration/images/tts-end-device-6.png)

---

## Koncové zařízení je připravené {#end-device-ready}

Koncové zařízení je teď zaregistrované a připravené komunikovat s The Things Stack.

## Videonávod {#video-tutorial}

:::tip
Pokud potřebujete **další pomoc** nebo vizuální ukázku, podívejte se na  
[**videonávod**](/apps/videos-apps/tts-end-devices).
:::
