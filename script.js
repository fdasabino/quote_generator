"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotesData = [];

const showLoadingSpinner = () => {
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  loader.classList.add("hidden");
  quoteContainer.hidden = false;
};

const newQuote = () => {
  showLoadingSpinner();

  const quote = apiQuotesData[Math.floor(Math.random() * apiQuotesData.length)];

  if (quote.author === null || !quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  removeLoadingSpinner();
};

const getQuotes = async () => {
  showLoadingSpinner();
  const apiURL = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiURL);
    apiQuotesData = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
};

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuotes();
