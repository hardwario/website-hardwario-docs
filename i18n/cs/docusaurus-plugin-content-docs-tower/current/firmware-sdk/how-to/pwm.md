---
slug: how-to-pwm
title: "Jak na: PWM"
---
import Image from '@theme/IdealImage';

[**Pulzně šířková modulace (PWM)**](https://en.wikipedia.org/wiki/Pulse-width_modulation) je metoda, jak z digitálního výstupu mikrokontroléru vytvořit signál podobný analogovému. Dosahuje toho rychlým přepínáním pinu s různým poměrem logických úrovní **HIGH** a **LOW**. Tento poměr se nazývá **duty cycle** (střída).

V **pinoutu modulu Core Module** si ověřte, které piny **podporují PWM**.

Pro PWM lze použít 9 pinů:
```c showLineNumbers
  TWR_PWM_P0
  TWR_PWM_P1
  TWR_PWM_P2
  TWR_PWM_P3
  TWR_PWM_P6
  TWR_PWM_P7
  TWR_PWM_P8
  TWR_PWM_P12
  TWR_PWM_P14
```

## Odkazy {#references}
- [**Modul SDK pro PWM**](https://sdk.hardwario.com/group__twr__pwm.html)
- Příklad v repozitáři na GitHubu

## Duty cycle {#duty-cycle}

Duty cycle (střída) určuje, jak dlouho má být pin ve stavu HIGH. Změnou této hodnoty získáte různé výstupy podobné analogovým.

Hodnoty jsou v rozsahu `0-255`, kde `0` znamená trvale **LOW** a `255` trvale **HIGH**.

:::info

Jednoduchý příklad, který zapne signál PWM na výstupech **P6, P7 a P8**.
Každý výstup má jiný **duty cycle**: 180, 210 a 255.

:::

<details>
<summary>
<b>
Ukázka kódu pro spuštění PWM na pinech
</b>
</summary>
<p>

  ```c showLineNumbers
  void application_init()
  {
      twr_pwm_init(TWR_PWM_P6);
      twr_pwm_set(TWR_PWM_P6, 180);
      twr_pwm_enable(TWR_PWM_P6);

      twr_pwm_init(TWR_PWM_P7);
      twr_pwm_set(TWR_PWM_P7, 210);
      twr_pwm_enable(TWR_PWM_P7);

      twr_pwm_init(TWR_PWM_P8);
      twr_pwm_set(TWR_PWM_P8, 255);
      twr_pwm_enable(TWR_PWM_P8);
  }
  ```

</p>
</details>
