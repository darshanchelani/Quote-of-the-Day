// API endpoint
const API_URL = "https://api.freeapi.app/api/v1/public/quotes/quote/random";

const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote");
const copyQuoteBtn = document.getElementById("copy-quote");
const shareTwitterBtn = document.getElementById("share-twitter");
const exportQuoteBtn = document.getElementById("export-quote");
const quoteContainer = document.getElementById("quote-container");

const backgrounds = [
  "https://source.unsplash.com/1600x900/?nature",
  "https://source.unsplash.com/1600x900/?space",
  "https://source.unsplash.com/1600x900/?abstract",
  "https://source.unsplash.com/1600x900/?city",
  "https://source.unsplash.com/1600x900/?mountains",
];

async function fetchQuote() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const quote = data.data;
    quoteText.textContent = `"${quote.content}"`;
    quoteAuthor.textContent = `— ${quote.author || "Unknown"}`;
    setRandomBackground();
  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteText.textContent = "Failed to load quote.";
    quoteAuthor.textContent = "— Unknown";
  }
}

function setRandomBackground() {
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  document.body.style.backgroundImage = `url(${backgrounds[randomIndex]})`;
}

function copyToClipboard() {
  const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(text).then(() => {
    alert("Quote copied to clipboard!");
  });
}

function shareOnTwitter() {
  const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}`;
  window.open(twitterUrl, "_blank");
}

function exportQuote() {
  html2canvas(document.getElementById("quote-box")).then((canvas) => {
    const link = document.createElement("a");
    link.download = "quote-of-the-day.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

newQuoteBtn.addEventListener("click", fetchQuote);
copyQuoteBtn.addEventListener("click", copyToClipboard);
shareTwitterBtn.addEventListener("click", shareOnTwitter);
exportQuoteBtn.addEventListener("click", exportQuote);

fetchQuote();
