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
    const id_pizza = req.params.id;
    const pizza = pizze.find(pizza => pizza.id == id_pizza);

    if (pizza) {
        res.json(pizza);
    } else {
        res.json({ message: 'ID ne postoji!' });
    }
});



export default pizzeRouter;
