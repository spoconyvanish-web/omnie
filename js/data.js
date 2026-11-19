/* ============================================================
   Edytowalne dane strony — bewuka
   Wszystkie produkty, projekty i linki znajdziesz tutaj.
   Karty i sekcje wygenerują się same po edycji.
   ============================================================ */

/* ---------- Zakres prac (sekcja "O mnie") ---------- */
const PROJECTS = [
  {
    title: "discord community",
    desc: "moje własne community na discordzie win sense community tu wlasnie zakupisz wszystkie moje produkty.",
    tag: "project"
  }
];

/* ---------- Produkty (sekcja "Produkty") ----------
   Aby dodać produkt, skopiuj blok i uzupełnij pola:
   - name          : nazwa produktu
   - tagline       : krótki opis (1-2 zdania)
   - price         : cena lub status ("Cena do ustalenia" itp.)
   - status        : tekst plakietki
   - statusTone    : "ready" (dostępny) | "soon" (wkrótce) | "muted" (neutr.)
   - link          : adres do przycisku
   - linkLabel     : tekst przycisku
*/
const PRODUCTS = [
  {
    name: "utrudnianie sprawdzania ",
    tagline: "chcesz utrudnić administratorowi wykrycie twoich cheatow? zakup juz teraz na discordzie",
    price: "10zl/3 invite",
    status: "beta",
    statusTone: "beta",
    link: "https://discord.gg/QKw8bNQH8P",
    linkLabel: "Zapytaj o szczegóły"
  },
  {
    name: "password cracker",
    tagline: "password cracker do serwerow minecraft do kont cracked oczywiscie ",
    price: "30zl/4 invite",
    status: "wypuszcze jeszcze ostatni update",
    statusTone: "muted",
    link: "https://discord.gg/QKw8bNQH8P",
    linkLabel: "Zapytaj o szczegóły"
  }
];

/* ---------- Mody (sekcja "Mody") ----------
   - name    : nazwa moda
   - tagline : krótki opis
   - options : lista wersji po kliknięciu na moda (label + link)
*/
const MODS = [
  {
    name: "winsense client",
    tagline: "kliknij i wybierz wersję: inject albo loader.",
    options: [
      { label: "Wersja inject", link: "https://direct-link.net/10393174/vMsQCLwtwLOb" },
      { label: "Wersja loader", link: "https://direct-link.net/10393174/nq7XgM40faGl" }
    ]
  }
];

/* ---------- Socials / Kontakt ----------
   - copy: jeśli podasz tekst w polu "copy", kliknięcie skopiuje go do schowka
           zamiast otwierać link.
*/
const SOCIALS = [
  {
    label: "Discord",
    value: "bewuka",
    url: "https://discord.com/users/1406355912272248944",
    copy: "bewuka"
  },
  {
    label: "Sklep",
    value: "discord.gg/QKw8bNQH8P",
    url: "https://discord.gg/QKw8bNQH8P"
  },
  {
    label: "Guns.lol",
    value: "guns.lol/panbulka",
    url: "https://guns.lol/panbulka"
  }
];
