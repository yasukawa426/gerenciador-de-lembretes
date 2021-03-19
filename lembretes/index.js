//
const express = require('express');//import
const axios = require('axios');
const app = express();
app.use(express.json());//faz parse do json
const lembretes = {};
let contador = 0;

//metodo get em /lembretes
app.get('/lembretes', (req, res) =>{
    res.send(lembretes);
});

app.put('/lembretes', async(req, res) =>{
    contador++;
    const {texto} = req.body;//ja ta vindo parseado por causa da linha app.use(express.json())
    lembretes[contador]= {
        contador, texto
    }
    await axios.post("http://localhost:10000/eventos",  {
        tipo: "Lembrete criado",
        dados: {
            contador,
            texto,
        },
    })
    res.status(201).send(lembretes[contador]);
});

app.post('/eventos', (req, res) => {
    console.log(req.body);
    res.status(200).send({msg: "ok"});
});


app.listen(4000, () => console.log("Lembretes:4000."));
