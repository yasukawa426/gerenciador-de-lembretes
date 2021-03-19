const express = require('express');
const app  =  express();
const { v4: uuidv4 } = require("uuid"); //import
app.use(express.json());
const obsercavoesPorLembreteId = {};

//                        |
//:id é um placeholder   \/
//exemplo: /lembretes/123456/observacoes
app.put('/lembretes/:id/observacoes', (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    //req.params da acesso  a lista de parametros da URL
    const observacoesDoLembrete = 
        obsercavoesPorLembreteId[req.params.id] || []; //retorna para observa... essa coleção, ou caso n existir, vazio.
    observacoesDoLembrete.push({id: idObs, texto});
    obsercavoesPorLembreteId[req.params.id] = observacoesDoLembrete;
    res.status(201).send(observacoesDoLembrete);
});

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(obsercavoesPorLembreteId[req.params.id] || []);
});

app.listen(5000, (() => {
    console.log('Observacoes. Porta 5000')
}));