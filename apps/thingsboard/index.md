---
slug: index
title: ThingsBoard
---
import Image from '@theme/IdealImage';

# ThingsBoard

[**ThingsBoard**](https://app.hardwario.cloud/) is an open-source IoT platform that helps businesses connect devices, collect data, and turn it into clear, useful insights. With ready-to-use dashboards, alerts, and automation tools, it makes it easy to monitor operations, improve efficiency, and scale IoT projects without deep technical expertise.

:::info
**System Access:** You can log in to the HARDWARIO ThingsBoard platform at **https://app.hardwario.cloud/**.

If you are interested in gaining access to the system to view data visualizations and graphs from your HARDWARIO devices, please contact **ask@hardwario.com**.
:::

---

## Example of an IoT Data Dashboard

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

## Getting Started

Follow these steps to set up ThingsBoard and start monitoring your devices from scratch.

---

### 1. Create a Device in ThingsBoard

Start by logging into [ThingsBoard](https://app.hardwario.cloud/) and creating a new device.
This device will act as the endpoint that receives and stores data sent from HARDWARIO Cloud.

👉 [Adding a New Device](creating-device)

---

### 2. Connect to HARDWARIO Cloud

Go to [HARDWARIO Cloud](https://hardwario.cloud/) and set up a Connector that points to your ThingsBoard device.
This connector will securely transmit your device data from HARDWARIO Cloud to ThingsBoard.

👉 [Connecting to ThingsBoard](cloud-connection)

---

### 3. Create a Dashboard

Once the connection is established and data is flowing, create a dashboard in ThingsBoard.
Add widgets such as cards, charts, and gauges to visualize your data in real time.

👉 [Creating a Dashboard](creating-dashboard)

---

### 4. Set Up User Roles and Groups

ThingsBoard lets you precisely control what each user can see and do.
Define roles with specific permissions and organize users into groups tied to their devices and dashboards.

👉 [User Management](users-managing)

---

### 5. Add Users

Create user accounts, assign them to groups, and send activation links so your customers can log in and access their dashboards.

👉 [Adding Users](users)

---

### 6. Share a Dashboard via Public Link

Generate a read-only public URL for any dashboard and share it with clients or stakeholders, with no login required.

👉 [Public Link](public-link)

---

## Features

ThingsBoard offers a range of advanced features for organizing your data, automating workflows, and delivering reports. See the [Features](features) section for a full overview.

| Feature | Description |
|---------|-------------|
| [Assets](assets) | Organize devices into logical hierarchies (buildings, floors, zones) to simplify access control and dashboard abstraction. |
| [Notification Rules](notifications-manager) | Set up threshold-based email and SMS alerts without writing code, directly from a dashboard widget. |
| [Email Notifications](email-notification) | Build custom Rule Chains to send conditional email alerts with formatted data and configurable rate limiting. |
| [Scheduled Reports](email-reports) | Automatically generate and deliver periodic PDF reports to customers on a defined schedule. |
| [Rule Engine](rule-engine) | Visual programming for data transformation, alarm management, third-party integrations, and device automation. |
