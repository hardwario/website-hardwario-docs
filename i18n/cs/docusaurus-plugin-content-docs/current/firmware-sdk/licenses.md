---
slug: licenses
title: Licence
description: "V tomto článku najdete užitečné informace o licenci CHESTER SDK."
---
import Image from '@theme/IdealImage';

# Licence {#licenses}

V tomto článku najdete užitečné informace o licenci **CHESTER SDK**.

:::caution

Následující text je upravený obsah z **nRF Connect SDK** a plně se vztahuje na **CHESTER SDK**.

:::

Licence jsou umístěny blízko zdrojových souborů. Soubor `LICENSE` s podrobnostmi o licenci najdete v nejvyšší úrovni každého repozitáře **CHESTER SDK**. Každý soubor obsažený v repozitářích má také [**SPDX identifikátor**](https://spdx.dev/ids/), který tuto licenci zmiňuje.

Pokud je složka nebo sada souborů open source a je součástí **nRF Connect SDK** pod vlastní licencí (například některou z licencí **Apache** nebo **MIT**), bude mít ve složce buď vlastní soubor `LICENSE`, nebo budou licenční informace vloženy přímo ve zdrojových souborech.

Pro vygenerování licenční zprávy můžete použít nástroj **West** `ncs-sbom` (poskytovaný **nRF Connect SDK**). Umožňuje vygenerovat zprávu pro **CHESTER SDK**, sestavenou aplikaci nebo konkrétní soubory. Nástroj je vysoce konfigurovatelný. Používá několik metod detekce, například:

* Vyhledávání na základě značek **SPDX**.

* Vyhledávání licenčních informací v souborech.

* [**Scancode-Toolkit**](https://scancode-toolkit.readthedocs.io/en/stable/).

Podle vaší konfigurace se zpráva generuje ve formátu **HTML** nebo **SPDX**, případně v oboufch formátech. Více informací najdete v dokumentaci [**Software Bill of Materials**](https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/scripts/west_commands/sbom/README.html#west-sbom).

## Licenční ujednání {#license-statement}

Toto je obsah souboru `LICENSE` nalezeného ve složce **CHESTER SDK**:

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
