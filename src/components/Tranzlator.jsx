import { useState } from 'react';
import './Tranzlator.css';

const MARQUEE_TEXT = 'TRANSLATE  ·  TRANZLATOR  ·  LANGUAGE  ·  WORDS  ·  MEANING  ·  ';
const REPEAT_COUNT = 12;
const rowText = MARQUEE_TEXT.repeat(REPEAT_COUNT);
const ROW_COUNT = 20;

const Tranzlator = () => {
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'Hindi' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'zh', name: 'Chinese' },
        { code: 'ar', name: 'Arabic' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'ja', name: 'Japanese' },
    ];

    const [inputLang, setInputLang] = useState('en');
    const [outputLang, setOutputLang] = useState('hi');
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTranslate = async () => {
        if (!inputText.trim()) {
            setError('Please enter some text to translate.');
            return;
        }

        if (inputLang === outputLang) {
            setError('Input and output languages cannot be the same.');
            return;
        }

        setError('');
        setLoading(true);
        setOutputText('');

        try {
            const langPair = `${inputLang}|${outputLang}`;
            const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${langPair}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.responseStatus === 200) {
                setOutputText(data.responseData.translatedText);
            } else {
                setError('Translation failed. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleSwap = () => {
        setInputLang(outputLang);
        setOutputLang(inputLang);
        setInputText(outputText);
        setOutputText(inputText);
    };

    const handleCopy = () => {
        if (outputText) {
            navigator.clipboard.writeText(outputText);
        }
    };

    const handleClear = () => {
        setInputText('');
        setOutputText('');
        setError('');
    };

    return (
        <>
            {/* Scrolling background */}
            <div className="marquee-bg" aria-hidden="true">
                {Array.from({ length: ROW_COUNT }, (_, i) => (
                    <div key={i} className="marquee-row">
                        <span className="marquee-text">{rowText}</span>
                        <span className="marquee-text">{rowText}</span>
                    </div>
                ))}
            </div>

            <div className="tranzlator-container">
                <div className="tranzlator-header">
                    <h1 className="tranzlator-heading">Tranzlator</h1>
                    <p className="tranzlator-subtext">Translate Text Easily and Smoothly</p>
                </div>

                <div className="tranzlator-body">
                    {/* Cards row (Now just containing the two text boxes side-by-side) */}
                    <div className="tranzlator-cards">
                        <div className="input-card">
                            <label className="card-label" htmlFor="input-language">From</label>
                            <select
                                className="language-select"
                                id="input-language"
                                name="input-language"
                                value={inputLang}
                                onChange={(e) => setInputLang(e.target.value)}
                            >
                                {languages.map((lang) => (
                                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                                ))}
                            </select>
                            <textarea
                                className="text-area"
                                placeholder="Enter text to translate..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button className="clear-button" onClick={handleClear}>Clear</button>
                        </div>

                        <div className="output-card">
                            <label className="card-label" htmlFor="output-language">To</label>
                            <select
                                className="language-select"
                                id="output-language"
                                name="output-language"
                                value={outputLang}
                                onChange={(e) => setOutputLang(e.target.value)}
                            >
                                {languages.map((lang) => (
                                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                                ))}
                            </select>
                            <textarea
                                className="text-area"
                                placeholder="Translation will appear here..."
                                value={loading ? 'Translating...' : outputText}
                                readOnly
                            />
                            <button className="copy-button" onClick={handleCopy} disabled={!outputText}>Copy</button>
                        </div>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    {/* NEW: Controls wrapper containing both the swap and solid translate button inline */}
                    <div className="controls-wrapper">
                        <div className="swap-wrapper">
                            <button className="swap-button" onClick={handleSwap} title="Swap languages">⇄</button>
                        </div>

                        <button
                            className="translate-button"
                            onClick={handleTranslate}
                            disabled={loading}
                        >
                            {loading ? 'Translating...' : 'Translate'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tranzlator;