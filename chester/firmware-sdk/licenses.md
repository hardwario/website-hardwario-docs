---
slug: licenses
title: Licenses
description: "CHESTER SDK license terms (LicenseRef-HARDWARIO-5-Clause, use with HARDWARIO hardware only), SPDX identifiers and license reports made with ncs-sbom."
---
import Image from '@theme/IdealImage';

# Licenses

In this article, you will find useful information about the **CHESTER SDK** license.

:::caution

The following text is modified content from the **nRF Connect SDK** and fully applies to the **CHESTER SDK**.

:::

Licenses are located close to the source files. You can find a `LICENSE` file containing the license details at the top of every **CHESTER SDK** repository. Each file included in the repositories also has an [**SPDX identifier**](https://spdx.dev/ids/) that mentions this license.

If a folder or set of files is open source and included in the **nRF Connect SDK** under its own license (for example, any of the **Apache** or **MIT** licenses), it will have either its own `LICENSE` file included in the folder or the license information embedded inside the source files themselves.

You can use the **West** utility `ncs-sbom` (provided by the **nRF Connect SDK**) to generate a license report. It allows you to generate a report for the **CHESTER SDK**, built application, or specific files. The tool is highly configurable. It uses several detection methods, such as:

* Search based on **SPDX** tags.

* Search license information in files.

* The [**Scancode-Toolkit**](https://scancode-toolkit.readthedocs.io/en/stable/).

Depending on your configuration, the report is generated in **HTML** or **SPDX**, or in both formats. See the [**Software Bill of Materials**](https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/scripts/west_commands/sbom/README.html#west-sbom) documentation for more information.

## License Statement

This is the content of the `LICENSE` file found in the **CHESTER SDK** directory:

```
LicenseID: LicenseRef-HARDWARIO-5-Clause

ExtractedText: <text>
Copyright (c) 2023, HARDWARIO a.s.

All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form, except as embedded into a HARDWARIO a.s.
   hardware product, or a software update for such product, must reproduce
   the above copyright notice, this list of conditions and the following
   disclaimer in the documentation and/or other materials provided with
   the distribution.

3. Neither the name of HARDWARIO a.s. nor the names of its contributors
   may be used to endorse or promote products derived from this software
   without specific prior written permission.

4. This software, with or without modification, must only be used with a
   HARDWARIO a.s. hardware product.

5. Any software provided in binary form under this license must not be reverse
   engineered, decompiled, modified and/or disassembled.

THIS SOFTWARE IS PROVIDED BY HARDWARIO A.S. "AS IS" AND ANY EXPRESS
OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
OF MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL HARDWARIO A.S. OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
</text>
```
