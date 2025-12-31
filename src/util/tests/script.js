const axios = require('axios');

async function sendRequests() {
  for (let i = 0; i < 100; i++) {
    axios.post('http://localhost:8000/api/sentencas/texto', {"id_tribunal":31,"id_sentenca":"711597664663020359077728842784"})
      .then(response => console.log(response.status))
      .catch(error => console.error(error));
  }
}

sendRequests();
