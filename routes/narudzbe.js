import express from 'express';
const narudzbeRouter = express.Router();


let narudzbe = [];


narudzbeRouter.post('/', (req, res) => {
    const { narudzba, klijent } = req.body;
    let ukupna_cijena = 0;

    if (!(klijent && klijent.prezime && klijent.adresa && klijent.broj_telefona)) {
        return res.status(400).json({ message: 'Niste poslali sve podatke o klijentu.' });
    }

    let narucenePizze = [];
    
    for (let nar of narudzba) {
        if (!(nar.pizza && nar.velicina && nar.kolicina)) {
            return res.status(400).json({ message: 'Niste poslali sve podatke za pizzu.' });
        }

        const pizza = pizzeRouter.pizze.find(pizza => pizza.naziv === nar.pizza);
        if (!pizza) {
            return res.status(400).json({ message: `Pizza "${nar.pizza}" ne postoji u jelovniku.` });
        }

        ukupna_cijena += pizza.cijena * nar.kolicina;
        narucenePizze.push(nar);
    }

    const novaNarudzba = { id: narudzbe.length + 1, narudzba, klijent };
    narudzbe.push(novaNarudzba);

    res.status(201).json({
        message: `Vaša narudžba za ${narudzba.map(nar => `${nar.pizza} (${nar.velicina})`).join(' i ')} je uspješno zaprimljena!`,
        prezime: klijent.prezime,
        adresa: klijent.adresa,
        ukupna_cijena: ukupna_cijena
    });
});

narudzbeRouter.get('/', (req, res) => {
    res.status(200).json(narudzbe);
});

narudzbeRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const narudzba = narudzbe.find(n => n.id === id);

    if (!narudzba) {
        return res.status(404).json({ message: 'Narudžba s tim ID-em ne postoji!' });
    }

    res.status(200).json(narudzba);
});

narudzbeRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = narudzbe.findIndex(n => n.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Narudžba s tim ID-em ne postoji!' });
    }

    narudzbe.splice(index, 1);
    res.status(200).json({ message: 'Narudžba uspješno obrisana!' });
});

export default narudzbeRouter;