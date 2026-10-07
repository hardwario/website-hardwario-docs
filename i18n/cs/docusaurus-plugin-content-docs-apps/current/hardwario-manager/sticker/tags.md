---
slug: tags
title: Organizace zařízení tagy
---

# Organizace uložených zařízení tagy {#organise-saved-devices-with-tags}

Pomocí tagů zařízení v seznamu uložených zařízení označíte a vyfiltrujete,
například podle lokality, zákazníka, podlaží nebo stavu nasazení. Zařízení může
mít libovolný počet tagů a každý tag má vlastní barvu.

---

## Označení zařízení tagem {#tag-a-device}

1. Otevřete **HARDWARIO Manager** a přejděte na **STICKER → Saved STICKERs**.
2. Na řádku zařízení nebo v jeho detailu (**Detail**) zvolte **Edit tags**.
3. Vyberte existující tagy nebo vytvořte nový a potvrďte.

<img src="/img/hw-manager/hw-manager-sticker-tags.png" alt="Úprava tagů jednoho uloženého zařízení" width="320" />

---

## Správa registru tagů {#manage-the-tag-registry}

Otevřete **menu ⋮** v seznamu Saved STICKERs a zvolte **Tags**.

<img src="/img/hw-manager/hw-manager-tags.png" alt="Nabídka ⋮ seznamu Saved STICKERs s volbami Tags, Import, Export, Export logs, Delete all logs a Delete" width="320" />

Registr platí pro celý seznam: tagy můžete **přidávat**, **přejmenovávat**,
**přebarvovat** a **mazat** a u každého vidíte, kolik zařízení ho používá.
Přejmenování nebo změna barvy tagu se projeví na všech zařízeních najednou.

<img src="/img/hw-manager/hw-manager-tags-color.png" alt="Volba nové barvy tagu v registru tagů" width="320" />

---

## Filtrování podle tagu {#filter-by-tag}

V seznamu **Saved STICKERs** klepněte na **ikonu tagu** a vyberte jeden nebo více
tagů; zobrazí se jen zařízení, která je mají. Odznak na ikoně ukazuje počet
aktivních filtrů, volbou **Clear** je všechny zrušíte.

<img src="/img/hw-manager/hw-manager-tag-filter.png" alt="Filtrování seznamu Saved STICKERs podle tagu s jedním aktivním filtrem a akcí Clear" width="320" />

Filtr lze kombinovat s vyhledávacím polem **Serial or name**: seznam nejdřív
zúžíte podle tagu a pak hledáte ve výsledku.

:::info Tagy jsou součástí exportu
Tagy nejsou tajné, takže je exporty mohou obsahovat. Při exportu zaškrtněte
**Include tags** a do CSV se přidá sloupec s tagy; při importu se tyto tagy přidají
k odpovídajícím sériovým číslům a tagy, které ještě neexistují, se vytvoří. Viz
[**Saved STICKERs**](./saved-stickers.md).
:::
