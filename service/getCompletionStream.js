const OpenAI = require('openai')
const config = require('./dbConfig.json')

const openai = new OpenAI({ apiKey: config.chatKey })

const getCompletionStream = async (prompt) => {
  return openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 1.5,
    max_tokens: 50,
    n: 1,
    stream: true,
  })
}

module.exports = {
  getCompletionStream,
}
