const { getCompletionStream } = require('./getCompletionStream')

const getPrompt = (genre) => {
  const prompts = [
    `Within 50 tokens, craft a whimsical and creative one-sentence short-story prompt, tailored to the genre of '${genre}'. It should be engaging, thought-provoking, and slightly unconventional, inspiring deep reflection or an unexpected twist.`,
    `Within 50 tokens, generate a one-sentence short-story prompt that is both creative and thought-provoking, tailored to the genre of "${genre}". The prompt should encourage deep reflection or a unique twist.`,
    `In 50 tokens or less, conjure an utterly offbeat and wildly imaginative one-sentence short-story prompt for the genre of '${genre}'. Aim for the unexpected, blending whimsy with wonder, and dare to defy the ordinary, sparking curiosity and bewildering delight.`,
  ]

  return prompts[Math.floor(Math.random() * prompts.length)]
}

const generatePrompt = async (req, res) => {
  const { genre } = req.body

  const stream = await getCompletionStream(getPrompt(genre))

  for await (const chunk of stream) {
    res.write(chunk.choices[0]?.delta.content || '')
  }

  res.end()
}

module.exports = { generatePrompt }
