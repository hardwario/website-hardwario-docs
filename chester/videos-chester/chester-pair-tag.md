---
slug: chester-pair-tag
title: How to pair Bluetooth tag with CHESTER
---

import Image from '@theme/IdealImage';

## Tutorial Overview

In this guide, you’ll learn how to pair and manage up to eight tags with your CHESTER device. We’ll show you how to enroll, verify, and read data from tags directly in the HARDWARIO Manager console.

---

<div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
  <iframe
    src="https://www.youtube.com/embed/7ita74JSj98?rel=0"
    title="HOW TO PAIR BLUETOOTH TAG WITH CHESTER"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }}
  ></iframe>
</div>


## Step-by-Step Text Guide

1. Take CHESTER and connect using the HARDWARIO Manager app.

2. If this is your first time, watch the video in the card where the whole procedure is shown.

3. Once connected, go to Terminal.

4. Type the command config show to check that your settings are correct.

5. In the output, find the tag config enabled.

6. If it is set to true, you can skip the following steps.

7. If it is set to false, type tag config enabled true and then config save.

8. CHESTER will restart and disconnect you, so reconnect again.

9. Scan the QR code, click on the device, and go to Console.

10. You can pair up to 8 tags with CHESTER.

11. To see the paired tags, type tag config devices list.

12. You will see the list of all eight slots, which will be empty 0000000000 at first.

13. Take the tag you want to pair and place it next to CHESTER.

14. In the console, type tag enroll. CHESTER will start auto-discovery for 10 seconds.

15. If it finds the tag, it will display its MAC address, make sure it matches (you can find it on the tag).

16. If pairing was successful, you can skip the next steps.

17. If CHESTER does not find the tag, try tag enroll twice.

18. If pairing still does not work, you must manually save the MAC address.

19. Do this using the command tag config device add MAC_address, which you can find on the tag or in the QR code.

20. After entering it, the tag will automatically be added to the first free slot.

21. You can add more tags this way (up to 8).

22. If you enter a wrong address, you can remove it using tag config devices remove (slot number).

23. Save the final configuration using config save.

24. To check, reconnect to CHESTER and in the console type tag devices list.

25. It should show the list of your paired tags.

26. To test reading, type tag read. CHESTER will read the current values from the tags.

27. That’s it. Now you can install the tags where you need them.