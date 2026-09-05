---
slug: email-reports
title: Reports
---
import Image from '@theme/IdealImage';

# Setting Up Email Reports

This guide walks you through the complete setup of automated PDF reports using the **Reporting** module. The process consists of three main steps: creating the report layout, preparing the email message, and configuring the scheduler.

## Step 1: Create a Report Template
First, we need to define how the resulting PDF will look and what data it will contain.

1. Navigate to **Reporting** -> **Overview** (or **Templates**) in the left main menu.
2. Click the **+ Add report template** button in the top right corner and select **Create new report template**.
3. Enter a name for the template (e.g., *General Monthly Report*) and leave the format as **PDF**.
4. You are now in the visual Report Builder. Drag and drop components from the left panel:
   * **Text & Content:** For adding headers, titles, and footers (Markdown is supported).
   * **Charts:** To insert graphs. In the chart settings, select the target devices and the time window (e.g., *Previous month*).
   * **Tables:** To insert data tables. *Tip: If you want to merge data from multiple devices into a single row, make sure to enable data aggregation (e.g., 1 Day) in the table settings.*
5. Once you are satisfied with the layout, click **Save** / **Apply** to store the template.

:::info
**Official Documentation:** Learn more about creating and designing report layouts here:
[ThingsBoard Reporting Key Concepts](https://thingsboard.io/docs/pe/user-guide/reporting/reporting-key-concepts/)
:::

## Step 2: Create a Notification Template
To send the report to customers, we must create the email text that will accompany the PDF attachment.

1. Navigate to **Notification center** -> **Templates** in the left menu.
2. Click the **+ Add template** button to create a new notification template.
3. Name the template (e.g., *Monthly Report Email Template*).
4. Select the appropriate **Notification type** (e.g., *Report generated*).
5. In the **Delivery methods** section, check the **Email** option.
6. Fill in the email content:
   * **Subject:** e.g., `Monthly Monitoring Report - %d{MMMM yyyy}`.
   * **Body:** Write the accompanying text the customer will see in the email. You can use plain text or HTML formatting (bullet points, bold text, etc.).
   * *Note:* ThingsBoard will automatically attach the generated PDF file to this email template when triggered by the scheduler.
7. Save the template.

:::info
**Official Documentation:** For advanced email formatting and notification routing, check out:
[ThingsBoard Notification Templates](https://thingsboard.io/docs/pe/user-guide/notifications/#templates)
:::

## Step 3: Schedule the Automated Delivery
Now we need to combine the previous steps and tell the system when and to whom the report should be sent.

1. Go back to the **Reporting** section in the left menu and click on **Scheduling reports**.
2. Click the **+** icon to add a new schedule.
3. Fill in the scheduler configuration:
   * **Report template:** Select the report layout you created in Step 1.
   * **Notification template:** Select the email template you prepared in Step 2.
4. Go to the **Schedule** settings:
   * Select the correct timezone.
   * Set the repeat interval: for monthly reports, schedule it to run on the 1st day of every month at your preferred time (e.g., 01:00 AM).
5. In the **Recipients** / **Targets** section, define who will receive the email. You can select specific Users, Customers, or enter direct email addresses.
6. Save the schedule.

:::info
**Official Documentation:** Read more about scheduling events and report delivery here:
[ThingsBoard Scheduler](https://thingsboard.io/docs/pe/user-guide/scheduler/)
:::

**Done!** The system will now automatically generate the PDF based on your design every month, attach it to the prepared email, and send it to the specified recipients.