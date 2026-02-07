const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000;

// cliente redis usando variável de ambiente
const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.on('error', (err) => console.log('Erro no Redis:', err));

async function startServer() {
  await client.connect();
  console.log('Conectado ao Redis!');

  app.get('/', async (req, res) => {
    const visitas = await client.incr('contador_visitas');
    res.send(`Olá! Esta página foi visitada ${visitas} vezes.`);
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}

startServer();

