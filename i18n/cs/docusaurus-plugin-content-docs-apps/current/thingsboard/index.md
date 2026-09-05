---
slug: index
title: ThingsBoard
description: "ThingsBoard je open-source IoT platforma, která firmám pomáhá připojovat zařízení, sbírat data a přeměňovat je na přehledné a užitečné informace. Díky připraveným dashboardům, upozorněním a nástrojům pro automatizaci umožňuje snadno sledovat provoz,…"
---
import Image from '@theme/IdealImage';

# ThingsBoard {#thingsboard}

[**ThingsBoard**](https://app.hardwario.cloud/) je open-source IoT platforma, která firmám pomáhá připojovat zařízení, sbírat data a přeměňovat je na přehledné a užitečné informace. Díky připraveným dashboardům, upozorněním a nástrojům pro automatizaci umožňuje snadno sledovat provoz, zvyšovat efektivitu a rozšiřovat IoT projekty bez potřeby hlubokých technických znalostí.

:::info
**Přístup do systému:** Do platformy HARDWARIO ThingsBoard se můžete přihlásit na **https://app.hardwario.cloud/**.

Pokud máte zájem o přístup do systému pro zobrazení vizualizací a grafů dat ze svých zařízení HARDWARIO, kontaktujte prosím **support@hardwario.com**.
:::

---

## Ukázka dashboardu s IoT daty {#example-of-an-iot-data-dashboard}

import React, { useRef, useState, useEffect } from 'react';

export const DashboardContainer = () => {
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(0.6); // Výchozí měřítko

  // Sledování zapnutí/vypnutí fullscreenu
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Sledování šířky kontejneru pro plynulý responzivní design (zoom/menší okna)
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Zjistíme, kolik pixelů nám Docusaurus aktuálně dovolí využít
        const availableWidth = entry.contentRect.width;
        // Přepočítáme měřítko (1600 je originální šířka iframe)
        setScale(availableWidth / 1600);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Chyba při spouštění fullscreenu: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
      {/* Tlačítko */}
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button 
          onClick={toggleFullscreen}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#666',
            fontSize: '14px',
            textDecoration: 'underline'
          }}
        >
          ⛶ Fullscreen
        </button>
      </div>

      {/* Kontejner s dynamickou velikostí */}
      <div 
        ref={containerRef} 
        style={{ 
          width: '100%', // Nyní zabere vždy přesně tolik místa, kolik může
          height: isFullscreen ? '100vh' : `${880 * scale}px`, // Dynamická výška podle měřítka
          overflow: 'hidden', 
          position: 'relative',
          backgroundColor: '#fff',
          border: isFullscreen ? 'none' : '1px solid #e0e0e0',
          borderRadius: isFullscreen ? '0' : '8px'
        }}
      >
        <iframe 
          src="https://app.hardwario.cloud/dashboard/15bcc940-5504-11f1-b26d-7f43ae666fcf?publicId=b11cbfe0-55bc-11f1-b26d-7f43ae666fcf" 
          width={isFullscreen ? "100%" : "1600px"} 
          height={isFullscreen ? "100%" : "900px"} 
          frameBorder="0" 
          allowFullScreen
          style={{ 
            transform: isFullscreen ? 'none' : `scale(${scale})`, // Aplikace vypočítaného měřítka
            transformOrigin: '0 0', 
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
      </div>
    </div>
  );
};

<DashboardContainer />

---

## První kroky {#getting-started}

Podle následujících kroků nastavíte ThingsBoard a začnete svá zařízení sledovat od nuly.

---

### 1. Vytvoření zařízení v ThingsBoard {#1-create-a-device-in-thingsboard}

Začněte přihlášením do [ThingsBoard](https://app.hardwario.cloud/) a vytvořením nového zařízení.
Toto zařízení bude fungovat jako koncový bod, který přijímá a ukládá data odesílaná z HARDWARIO Cloud.

👉 [Přidání nového zařízení](/apps/thingsboard/creating-device)

---

### 2. Připojení k HARDWARIO Cloud {#2-connect-to-hardwario-cloud}

Přejděte do [HARDWARIO Cloud](https://hardwario.cloud/) a nastavte konektor, který bude směřovat na vaše zařízení v ThingsBoard.
Tento konektor bezpečně přenese data vašeho zařízení z HARDWARIO Cloud do ThingsBoard.

👉 [Připojení k ThingsBoard](/apps/thingsboard/cloud-connection)

---

### 3. Vytvoření dashboardu {#3-create-a-dashboard}

Jakmile je spojení navázáno a data proudí, vytvořte v ThingsBoard dashboard.
Přidejte widgety, jako jsou karty, grafy a ukazatele, a vizualizujte svá data v reálném čase.

👉 [Vytvoření dashboardu](/apps/thingsboard/creating-dashboard)

---

### 4. Nastavení uživatelských rolí a skupin {#4-set-up-user-roles-and-groups}

ThingsBoard umožňuje přesně řídit, co může každý uživatel vidět a dělat.
Definujte role s konkrétními oprávněními a rozdělte uživatele do skupin propojených s jejich zařízeními a dashboardy.

👉 [Správa uživatelů](/apps/thingsboard/users-managing)

---

### 5. Přidání uživatelů {#5-add-users}

Vytvořte uživatelské účty, přiřaďte je do skupin a odešlete aktivační odkazy, aby se vaši zákazníci mohli přihlásit a přistupovat ke svým dashboardům.

👉 [Přidání uživatelů](/apps/thingsboard/users)

---

### 6. Sdílení dashboardu přes veřejný odkaz {#6-share-a-dashboard-via-public-link}

Vygenerujte pro jakýkoli dashboard veřejnou URL adresu pouze pro čtení a nasdílejte ji klientům nebo partnerům, bez nutnosti přihlášení.

👉 [Veřejný odkaz](/apps/thingsboard/public-link)

---

## Funkce {#features}

ThingsBoard nabízí řadu pokročilých funkcí pro organizaci dat, automatizaci procesů a doručování reportů. Kompletní přehled najdete v sekci [Funkce](/apps/thingsboard/features).

| Funkce | Popis |
|---------|-------------|
| [Assety](/apps/thingsboard/assets) | Uspořádejte zařízení do logických hierarchií (budovy, podlaží, zóny) pro snazší řízení přístupu a abstrakci dashboardů. |
| [Pravidla notifikací](/apps/thingsboard/notifications-manager) | Nastavte e-mailová a SMS upozornění na základě mezních hodnot bez programování, přímo z widgetu na dashboardu. |
| [E-mailové notifikace](/apps/thingsboard/email-notification) | Vytvářejte vlastní Rule Chains pro odesílání podmíněných e-mailových upozornění s formátovanými daty a nastavitelným omezením frekvence. |
| [Plánované reporty](/apps/thingsboard/email-reports) | Automaticky generujte a doručujte zákazníkům pravidelné PDF reporty podle definovaného rozvrhu. |
| [Rule Engine](/apps/thingsboard/rule-engine) | Vizuální programování pro transformaci dat, správu alarmů, integrace třetích stran a automatizaci zařízení. |
