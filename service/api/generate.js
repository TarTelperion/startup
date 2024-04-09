const { pipeline } = require('node:stream/promises')
const config = require('../dbConfig.json')

const generatePrompt = async (req, res) => {
  const { genre } = req.body

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.chatKey}`,
      },
      // We need to send the body as a string, so we use JSON.stringify.
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Generate a one-sentence short-story prompt that is both creative and thought-provoking, tailored to the genre of "${genre}". The prompt should encourage deep reflection or a unique twist.`,
          },
        ],
        temperature: 1.5,
        max_tokens: 50,
        n: 1,
        stream: true,
      }),
    })

    await pipeline(response.body, res)
  } catch (err) {
    console.log(err)
  }
}

module.exports = { generatePrompt }
