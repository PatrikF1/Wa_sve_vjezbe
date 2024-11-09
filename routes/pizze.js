import express from 'express';

const pizzeRouter = express.Router();

const pizze = [
    { id: 1, naziv: "Margerita", cijena: 6.5 },
    { id: 2, naziv: "Salami", cijena: 8.5 },
    { id: 3, naziv: "Capriciossa", cijena: 9.5 }
];

pizzeRouter.get('/', (req, res) => {
    res.json(pizze);
});

pizzeRouter.get('/:id', (req, res) => {
    const id_pizza = parseInt(req.params.id);

    if (isNaN(id_pizza)) {
        return res.status(400).json({ message: 'Neispravan ID pizze!' });
    }

    const pizza = pizze.find(pizza => pizza.id === id_pizza);

    if (!pizza) {
        return res.status(404).json({ message: 'Pizza s tim ID-em ne postoji!' });
    }

    res.json(pizza);
});

export default pizzeRouter;
