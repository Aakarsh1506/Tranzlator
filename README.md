# 🌐 Tranzlator

A full-stack language translation application built with React and Express that uses the MyMemory Translation API to translate text between multiple languages in real time.

---

## 🚀 Features

- 🌍 Translate text between 10 major global languages:
  - English
  - Hindi
  - Spanish
  - French
  - German
  - Chinese
  - Arabic
  - Portuguese
  - Russian
  - Japanese
- 🔄 One-click language swap (including translated text)
- 📋 Copy translated text to clipboard
- 🗑️ Clear input and output instantly
- 🎨 Modern dark-themed user interface
- 📱 Fully responsive design for desktop and mobile

---

## 🛠️ Tech Stack

### Frontend
- React
- CSS
- Vite

### Backend
- Node.js
- Express

###  Translation API
- MyMemory Translation API

---

## ▶️ Running the Project

### Start the Backend

```bash
cd server
node index.js
```

### Start the Frontend

Open another terminal and run:

```bash
npm run dev
```

---

## 📂 Project Structure

```text
TRANZLATOR/
│
├── server/
│   ├── routes/
│   │   └── translate.js
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── src/
│   ├── components/
│   │   ├── Tranzlator.jsx
│   │   └── Tranzlator.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 📖 How It Works

1. Enter the text you want to translate.
2. Select the source language.
3. Select the target language.
4. Click **Translate** to receive the translated text using the MyMemory Translation API.
5. Use the **Swap** button to interchange the source and target languages along with their respective text.
6. Copy the translated text or clear both fields whenever required.