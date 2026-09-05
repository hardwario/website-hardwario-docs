---
slug: rule-engine
title: Rule Engine
---

import Image from '@theme/IdealImage';

# Rule Engine

The Rule Engine is ThingsBoard's visual programming system for processing incoming device messages. A **Rule Chain** is a graph or flowchart that defines the logic of how messages (telemetry, attributes, events) should be processed. It consists of **Nodes**, building blocks that perform a specific action (e.g., saving to a database, sending an email), and **Relations**, connections between nodes that determine the data flow direction based on the outcome (*Success*, *Failure*, *True*, *False*).

---

## Use Cases

The Rule Engine intercepts all communication between devices and the server, allowing you to build automation on top of this data. The most common use cases include:

- **Data Transformation and Math Calculations:** Using a *Script* node (JavaScript), you can convert temperatures from Fahrenheit to Celsius, sum up power consumption from multiple phases into a single variable, or filter out erroneous values (e.g., ignoring temperature readings above 1000 °C).
- **Triggering and Managing Alarms:** You can continuously monitor incoming telemetry. If a value exceeds a defined threshold, the system can automatically create an alarm (using the *Create Alarm* node). Once values return to normal, the alarm can be cleared automatically (*Clear Alarm*).
- **Custom Events and Notifications:** Sending system alerts (push notifications to a mobile app) or dispatching emails and SMS messages to administrators when a device disconnects.
- **Third-Party Integrations (External APIs):** The *REST API Call* node allows you to push sensor data to your own external systems (ERP, CRM) or fetch supplementary data, such as weather forecasts.
- **RPC (Remote Procedure Call) Processing:** Reacting to commands sent from a dashboard (e.g., a user clicks an "Open Valve" button, and the Rule Chain ensures this command is securely routed and delivered to the hardware).

---

## How to Create a Custom Rule Chain

1. **Navigate** to the **Rule Chains** section in the left-hand menu.
2. **Click the "+" icon** in the top right corner and select **Create new rule chain**.
3. **Name it** (e.g., *Crane Temperature Processing*) and save it.
4. Click on its name to open the **Rule Engine editor** (the visual canvas).
5. In the left panel, you will find the node library. **Drag and drop** the desired node (e.g., *Filter -> Script*) onto the canvas.
6. Double-click the node to configure its logic (e.g., write a JavaScript snippet: `return msg.temperature > 50;`).
7. **Connect the nodes:** Click the gray dot on the edge of the first node and drag a line to the second node. The system will prompt you to select the relation type (e.g., *True* if the temperature exceeded 50).
8. After finishing your edits, **always click the checkmark icon (Apply changes)** in the bottom right corner to save and deploy the chain.

---

## ⚠️ Working with the Root Rule Chain

When a ThingsBoard instance or tenant is created, a **Root Rule Chain** is automatically generated. This acts as the main entry gateway: **every single message from every device passes through this rule chain first**.

### What to Be Careful About

1. **Never delete the "Save Timeseries" and "Save Client Attributes" nodes:** These nodes are responsible for actually writing your sensor data into the ThingsBoard database. If you accidentally delete them or break the routing path to them, your devices will appear online, but **no data will show up on your dashboards** because it is not being saved!
2. **Do not overload the Root Rule Chain with complex scripts:** If you make a mistake in a JavaScript node within the Root Rule Chain (e.g., creating an infinite loop or a syntax error), you risk blocking data storage for absolutely all devices in your system.

### Best Practice: Safe Editing

To avoid breaking core data storage, follow this procedure (Encapsulation):

1. Do not edit your custom logic directly inside the *Root Rule Chain*.
2. Create a new, separate Rule Chain (e.g., *Crane Alarms*), as described above. Build and test all your calculations, emails, and alarms safely inside this isolated chain.
3. Then, go to the *Root Rule Chain*, take a **Rule Chain** node (from the *Flow* category), and connect it right after the `Save Timeseries` node using a **Success** relation.
4. In the configuration of this new node, select your newly created *Crane Alarms* rule chain.

This way, data is safely saved to the database first, and only then is a copy forwarded to your custom chain where you can experiment without risking the stability of the entire system.
