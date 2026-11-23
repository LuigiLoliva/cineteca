# Cineteca

Una semplice applicazione web per consultare e gestire una collezione di film. Il progetto usa Node.js, Express ed EJS; i dati del catalogo sono salvati in un file JSON.

## Funzionalità

- Pagina iniziale con il numero di film in archivio.
- Catalogo con ricerca per titolo.
- Pagina con i dettagli di ciascun film.
- Modulo per aggiungere un film. L'ID viene assegnato automaticamente in sequenza.
- Interfaccia responsive con grafica a tema cinema.

## Requisiti

- [Node.js](https://nodejs.org/) e npm.

## Avvio

Dalla cartella del progetto, installa le dipendenze:

```bash
npm install
```

Avvia il server:

```bash
npm start
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

Per lo sviluppo, puoi usare `npm run dev`, che riavvia l'applicazione quando cambiano i file.

## Pagine

| Percorso | Descrizione |
| --- | --- |
| `/` | Home e conteggio dei film |
| `/catalogo` | Elenco dei film |
| `/catalogo?titolo=interstellar` | Ricerca nel catalogo per titolo |
| `/film/:id` | Dettagli del film con l'ID indicato |
| `/aggiungi` | Modulo per inserire un film |

## Archivio dati

Il catalogo si trova in `data/film.json` ed è un array di oggetti. Ogni film può avere questi campi:

```json
{
  "id": 1,
  "titolo": "Interstellar",
  "regista": "Christopher Nolan",
  "anno": 2014,
  "genere": "Fantascienza",
  "durata": 169,
  "paese": "USA",
  "casaCinematografica": "Paramount Pictures",
  "trama": "Un gruppo di astronauti intraprende un viaggio attraverso un wormhole."
}
```

Il modulo di inserimento raccoglie titolo, regista, anno, genere e trama. I campi facoltativi non presenti nel modulo, come durata e paese, possono essere aggiunti modificando il file JSON.

## Struttura del progetto

```text
.
├── app.js                 # Server Express e route
├── data/
│   └── film.json          # Archivio del catalogo
├── public/
│   └── css/
│       └── style.css      # Stili dell'interfaccia
└── views/                 # Template EJS
```

## Comandi disponibili

| Comando | Descrizione |
| --- | --- |
| `npm start` | Avvia il server |
| `npm run dev` | Avvia il server con riavvio automatico |
| `npm test` | Non ancora configurato |
