const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;

app.use(express.json());

app.post('/categorize', async (req, res) => {
  const data = req.body;

  let classifiedTickets = await Promise.all(data['tickets'].map((ticket) => categorize(ticket))).then(values => {
    return values;
  }).catch(error => {
    console.log(error); 
  });

  const response = {
    data: classifiedTickets
  };
  
  res.status(200).json(response);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

async function categorize(ticket) {
  const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_KEY,
    });
  const openai = new OpenAIApi(configuration);

  prompt = "Classify the following ticket into one of the following categories: \n\n1. Refund\n2. Exchange\n3. Replacement\n" + ticket.description + "\nCategory:"
      
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: '\n'
  }).then(response => { return response.data });

  ticket.category = response.choices[0].text;
  
  return ticket
}
