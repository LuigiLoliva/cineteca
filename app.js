const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'film.json'), 'utf8', (errore, dati) => {
    if (errore) {
      console.error('Errore durante la lettura dell\'archivio:', errore);
      return res.status(500).send('Impossibile leggere l\'archivio dei film.');
    }

    let film;
    try {
      film = JSON.parse(dati);
    } catch (erroreJSON) {
      console.error('Errore durante l\'analisi dell\'archivio:', erroreJSON);
      return res.status(500).send('Archivio dei film non valido.');
    }

    res.render('index', {
      titoloPagina: 'Cineteca',
      numeroFilm: film.length
    });
  });
});

app.get('/catalogo', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'film.json'), 'utf8', (errore, dati) => {
    if (errore) {
      console.error('Errore durante la lettura dell\'archivio:', errore);
      return res.status(500).send('Impossibile leggere l\'archivio dei film.');
    }

    let film;
    try {
      film = JSON.parse(dati);
    } catch (erroreJSON) {
      console.error('Errore durante l\'analisi dell\'archivio:', erroreJSON);
      return res.status(500).send('Archivio dei film non valido.');
    }

    res.render('catalogo', {
      titoloPagina: 'Catalogo Film',
      film: film
    });
  });
});

app.get('/film/:id', (req, res) => {
    const filmId = parseInt(req.params.id); //convertre l'ID del film da stringa a numero
    console.log(`Richiesta dettagli per il film con ID: ${filmId}`);
    fs.readFile(path.join(__dirname, 'data', 'film.json'), 'utf8', (errore, dati) => {
        if (errore) {
            console.error('Errore durante la lettura dell\'archivio:', errore);
            return res.status(500).send('Impossibile leggere l\'archivio dei film.');
        }

        let film;
        try {
            film = JSON.parse(dati);
        } catch (erroreJSON) {
            console.error('Errore durante l\'analisi dell\'archivio:', erroreJSON);
            return res.status(500).send('Archivio dei film non valido.');
        }

        const opera = film.find(f => f.id == filmId);
        if (!opera) {
            return res.status(404).render('dettagli', {
                titoloPagina: 'Film non trovato',
                film: null,
                opera: null
            });
        }

        res.render('dettagli', {
            titoloPagina: opera.titolo,
            film: opera,
            opera: opera
        });
    });
});

app.listen(port, () => {
  console.log(`Cineteca in ascolto su http://localhost:${port}`);
});