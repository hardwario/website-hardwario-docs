---
slug: modbus-registers
title: Registry Modbus
---

# Registry Modbus {#modbus-registers}

Napočítané hodnoty lze ze zařízení vyčíst přes Modbus TCP. K dispozici je celkem dvanáct registrů typu holding. Na každý kanál připadají dva čítače: jeden počítá aktivace, druhý deaktivace. Třetí registr každého kanálu obsahuje aktuální stav vstupu.

| Adresa  | Čtecí funkce     | Popis                                    |
| :------ | :--------------- | :--------------------------------------- |
| 45301   | FC03             | Počet aktivací 1. vstupu                 |
| 45302   | FC03             | Počet aktivací 2. vstupu                 |
| 45303   | FC03             | Počet aktivací 3. vstupu                 |
| 45304   | FC03             | Počet aktivací 4. vstupu                 |
| 45305   | FC03             | Počet deaktivací 1. vstupu               |
| 45306   | FC03             | Počet deaktivací 2. vstupu               |
| 45307   | FC03             | Počet deaktivací 3. vstupu               |
| 45308   | FC03             | Počet deaktivací 4. vstupu               |
| 45309   | FC03             | Stav 1. vstupu                           |
| 45310   | FC03             | Stav 2. vstupu                           |
| 45311   | FC03             | Stav 3. vstupu                           |
| 45312   | FC03             | Stav 4. vstupu                           |
