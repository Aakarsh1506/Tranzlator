const express = require('express');
const router = express.Router();

router.post('/translate', async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;

  if (!text || !targetLang) {
    return res.status(400).json({ error: 'text and targetLang are required' });
  }

  try {
    const langPair = sourceLang === 'auto' 
      ? `en|${targetLang}`  // defaults to english if auto
      : `${sourceLang}|${targetLang}`;

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`
    );

    const data = await response.json();
    res.json({
      translatedText: data.responseData.translatedText,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Translation failed' });
  }
});

module.exports = router;