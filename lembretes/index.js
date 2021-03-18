//
const express = require('express');//import
const app = express();
app.use(express.json());//faz parse do json
const lembretes = {};
let contador = 0;

//metodo get em /lembretes
app.get('/lembretes', (req, res) =>{
    res.send(lembretes);
});

app.put('/lembretes',(req, res) =>{
    contador++;
    const {texto} = req.body;//ja ta vindo parseado por causa da linha app.use(express.json())
    lembretes[contador]= {
        contador, texto
    }
    res.status(201).send(lembretes[contador]);
});

app.listen(4000, () => console.log("Lembretes:4000."));
