const textInput = document.getElementById('textInput');
const textOutput = document.getElementById('textOutput');
const copyButton = document.getElementById('copyButton');

const freakyDecorations = {
  shyness: ['~', '~~', '...', '..', '👉👈', '>///<', '>_<'],
  emphasis: ['!?', '?!', '!!'],
  kawaii: ['✨', '💕', '🌸', '🎀', '💫', '✿', '💖', '🌟']
};

function convertText(text) {
  if (!text.trim()) return '';

  const words = text.split(' ');
  const convertedWords = [];
  let totalTransformations = 0;
  const maxTransformations = Math.ceil(words.length * 0.85);

  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    if (word.length === 0) {
      convertedWords.push('');
      continue;
    }

    let wordModified = false;

    if (totalTransformations < maxTransformations) {
      if (!wordModified && word.length > 2 && Math.random() < 0.4) {
        word = `${word[0]}-${word}`;
        wordModified = true;
        totalTransformations++;
      }

      //40%
      if (!wordModified && Math.random() < 0.4) {
        const shy = freakyDecorations.shyness[Math.floor(Math.random() * freakyDecorations.shyness.length)];
        word += shy;
        wordModified = true;
        totalTransformations++;
      }

      //emphathis thingy
      const isEnd = word.match(/[.!?]$/) || i === words.length - 1;
      if (!wordModified && isEnd && Math.random() < 0.25) {
        const emph = freakyDecorations.emphasis[Math.floor(Math.random() * freakyDecorations.emphasis.length)];
        word += emph;
        wordModified = true;
        totalTransformations++;
      }

      if (!wordModified && word.length > 4 && Math.random() < 0.2) {
        const letters = word.split('');
        let lastUppercased = false;
        word = letters.map((char, idx) => {
          if (idx > 0 && idx < letters.length - 1 && !lastUppercased && Math.random() < 0.3) {
            lastUppercased = true;
            return char.toUpperCase();
          } else {
            lastUppercased = false;
            return char;
          }
        }).join('');
        wordModified = true;
        totalTransformations++;
      }

      if (isEnd && Math.random() < 0.4) {
        const kawaii = freakyDecorations.kawaii[Math.floor(Math.random() * freakyDecorations.kawaii.length)];
        word += ' ' + kawaii;
        wordModified = true;
        totalTransformations++;
      }
    }

    convertedWords.push(word);
  }

  if (words.length > 3 && Math.random() < 0.2) {
    const kawaii = freakyDecorations.kawaii[Math.floor(Math.random() * freakyDecorations.kawaii.length)];
    convertedWords.push(kawaii);
  }

  return convertedWords.join(' ');
}

textInput.addEventListener('input', function () {
  textOutput.value = convertText(this.value);
});

copyButton.addEventListener('click', function () {
  textOutput.select();
  document.execCommand('copy');

  this.classList.add('copy-success');

  const icon = this.querySelector('i');
  icon.classList.remove('fa-copy');
  icon.classList.add('fa-check');

  setTimeout(() => {
    this.classList.remove('copy-success');
    icon.classList.remove('fa-check');
    icon.classList.add('fa-copy');
  }, 1000);
});

window.addEventListener('DOMContentLoaded', function () {
  if (textInput.value) {
    textOutput.value = convertText(textInput.value);
  }
});
