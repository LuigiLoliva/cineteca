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

    const titoloRicerca = typeof req.query.titolo === 'string'
      ? req.query.titolo.trim()
      : '';
    const filmTrovati = titoloRicerca
      ? film.filter(opera => opera.titolo.toLocaleLowerCase().includes(titoloRicerca.toLocaleLowerCase()))
      : film;

    res.render('catalogo', {
      titoloPagina: 'Catalogo Film',
      film: filmTrovati,
      titoloRicerca
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

app.get('/aggiungi', (req, res) => {
  res.render('aggiungi', {
    titoloPagina: 'Aggiungi Film'
  });
});

app.post('/aggiungi', express.urlencoded({ extended: true }), (req, res) => {
    const percorsoArchivio = path.join(__dirname, 'data', 'film.json');
    fs.readFile(percorsoArchivio, 'utf8', (errore, dati) => {
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

      const nuovoFilm = {
        id: film.reduce((idMassimo, opera) => Math.max(idMassimo, Number(opera.id) || 0), 0) + 1,
        titolo: req.body.titolo,
        regista: req.body.regista,
        anno: parseInt(req.body.anno),
        genere: req.body.genere,
        trama: req.body.trama
      };

      fs.writeFile(percorsoArchivio, JSON.stringify([...film, nuovoFilm], null, 2), (erroreScrittura) => {
        if (erroreScrittura) {
          console.error('Errore durante l\'aggiunta del film:', erroreScrittura);
          return res.status(500).send('Impossibile aggiungere il film.');
        }
        res.redirect('/catalogo');
      });
    });
});

app.listen(port, () => {
  console.log(`Cineteca in ascolto su http://localhost:${port}`);
});