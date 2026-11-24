---
slug: tags
title: Organizace zařízení štítky
description: "Uložená zařízení STICKER označíte v aplikaci HARDWARIO Manager barevnými štítky podle lokality, zákazníka či patra a podle štítků je filtrujete."
---

# Organizace uložených zařízení štítky {#organize-saved-devices-with-tags}

Štítky označují a filtrují zařízení v seznamu uložených zařízení, například podle
lokality, zákazníka, patra nebo fáze nasazení. Zařízení může mít libovolný počet
štítků a každý štítek má vlastní barvu.

---

## Označení zařízení štítkem {#tag-a-device}

1. Otevřete **HARDWARIO Manager** a přejděte na **STICKER → Uložená zařízení STICKER**.
2. V nabídce řádku zařízení zvolte **Upravit štítky**, nebo na řádek klepněte
   a na obrazovce zařízení rozbalte **Štítky**.
3. Vyberte existující štítky nebo napište nový a zvolte **Vytvořit „…“**, pak
   potvrďte tlačítkem **Hotovo**.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-sticker-tags.png" alt="Úprava štítků jednoho uloženého zařízení s vybranými štítky jako barevnými čipy a polem Přidat štítek" width="320" />

---

## Správa registru štítků {#manage-the-tag-registry}

V **nabídce ⋮** seznamu Uložená zařízení STICKER zvolte **Štítky**.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-tags.png" alt="Registr Štítky s barvou každého štítku a počtem zařízení, která ho nesou, a tlačítkem Přidat štítek" width="320" />

Registr platí pro celý seznam: štítky můžete **přidávat**, **přejmenovávat**,
**přebarvovat** a **mazat** a u každého vidíte, kolik zařízení ho používá.
Přejmenování nebo nová barva se projeví na všech zařízeních najednou. Smazaný
štítek zmizí ze zařízení, jinak se zařízení nezmění.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-tags-color.png" alt="Volba nové barvy štítku v registru štítků" width="320" />

---

## Filtrování podle štítku {#filter-by-tag}

Zpět v seznamu **Uložená zařízení STICKER** klepněte na **ikonu štítku**
(**Filtrovat podle štítku**) a vyberte jeden nebo více štítků; zobrazí se jen
odpovídající zařízení. Odznak na ikoně ukazuje počet aktivních filtrů a volba
**Vymazat** je všechny zruší.

<img className="app-screenshot" src="/img/hw-manager/cs/hw-manager-tag-filter.png" alt="Filtrování seznamu Uložená zařízení STICKER podle štítku s jedním aktivním filtrem a volbou Vymazat" width="320" />

Filtr funguje společně s vyhledávacím polem **Sériové číslo nebo název**, takže
můžete zúžit seznam podle štítku a pak hledat ve výsledku.

:::info Štítky se exportují se zařízeními
Štítky nejsou tajné, takže se exportují spolu se zařízeními. Když při exportu
zaškrtnete **Zahrnout štítky**, přibude v CSV sloupec se štítky; import je pak
k odpovídajícím sériovým číslům přidá a chybějící štítky založí. Viz
[**Uložená zařízení STICKER**](./saved-stickers.md).
:::
