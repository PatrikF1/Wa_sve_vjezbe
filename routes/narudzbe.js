import express from 'express';
const narudzbeRouter = express.Router();


let narudzbe = [];


narudzbeRouter.post('/', (req, res) => {
    const { narudzba, klijent } = req.body;
    let ukupna_cijena = 0;

  
    if (!(klijent && klijent.prezime && klijent.adresa && klijent.broj_telefona)) {
        res.json({ message: 'Niste poslali sve podatke o klijentu.' });
    }

    let narucenePizze = [];
    
 
    for (let nar of narudzba) {
        if (!(nar.pizza && nar.velicina && nar.kolicina)) {
            res.json({ message: 'Niste poslali sve podatke za pizzu.' });
        }

       
        const pizza = pizze.find(pizza => pizza.naziv === nar.pizza);
        if (!pizza) {
            res.json({ message: `pizza "${nar.pizza}" ne postoji u jelovniku.` });
        }

        ukupna_cijena += pizza.cijena * nar.kolicina;
        narucenePizze.push(nar); 
    }

    
    const novaNarudzba = { id: narudzbe.length + 1, narudzba, klijent };
    narudzbe.push(novaNarudzba);

    
    res.json({
        message: `Vasa narudzba za ${narudzba.map(nar => `${nar.pizza} (${nar.velicina})`).join(' i ')} je uspjesno zaprimljena!`,
        prezime: klijent.prezime,
        adresa: klijent.adresa,
        ukupna_cijena: ukupna_cijena
    });
});


narudzbeRouter.get('/', (req, res) => {
    res.json(narudzbe);
});


narudzbeRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const narudzba = narudzbe.find(n => n.id === id);

    if (!narudzba) {
        res.json({ message: 'Nrudzba ne postoji' });
    }

    res.json(narudzba);
});

export default narudzbeRouter;
