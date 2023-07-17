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

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": "You will be presented with support tickets and your job is to provide a tag from the following list:\n\n- Refund\n- Exchange\n- Replacement"
      },
      {
        "role": "user",
        "content": ticket.description
      }
    ],
    temperature: 0,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  ticket.category = response.data.choices[0].message.content;

  return ticket
}
