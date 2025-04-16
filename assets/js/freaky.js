const textInput = document.getElementById('textInput');
const textOutput = document.getElementById('textOutput');
const copyButton = document.getElementById('copyButton');

const freakyDecorations = {
  shyness: ['~', '~~', '...', '..', '👉👈', '>///<', '>_<'],
  emphasis: ['!', '!!', '!?', '?!', '..'],
  kawaii: ['✨', '💕', '🌸', '🎀', '💫', '✿', '💖', '🌟']
};

function convertText(text) {
  if (!text.trim()) return '';
  
  const words = text.split(' ');
  const convertedWords = [];
  let totalTransformations = 0;
  const maxTransformations = Math.ceil(words.length * 0.7); //max 70% of the words are changed
  
  for (let word of words) {
    if (word.length === 0) {
      convertedWords.push('');
      continue;
    }
    
    let wordModified = false;
    
    if (totalTransformations < maxTransformations) {
      //for long words, 20% changes to add a stutter
      if (!wordModified && word.length > 2 && Math.random() < 0.2) {
        word = `${word[0]}-${word}`;
        wordModified = true;
        totalTransformations++;
      }
      
      //15% chances to add a 'kawaii' ending
      if (!wordModified && Math.random() < 0.15) {
        const shyMark = freakyDecorations.shyness[Math.floor(Math.random() * freakyDecorations.shyness.length)];
        word += shyMark;
        wordModified = true;
        totalTransformations++;
      }
      
      //10% chances to add things like -> ?!
      if (!wordModified && word.length > 3 && Math.random() < 0.1) {
        const emphasis = freakyDecorations.emphasis[Math.floor(Math.random() * freakyDecorations.emphasis.length)];
        word += emphasis;
        wordModified = true;
        totalTransformations++;
      }
      
      //5% to do some random shit with uppercase cuz why not
      if (!wordModified && word.length > 4 && Math.random() < 0.05) {
        const letters = word.split('');
        let lastUppercased = false;
        word = letters.map((char, index) => {
          if (index > 0 && index < letters.length - 1 && !lastUppercased && Math.random() < 0.3) {
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
      
      const isEndOfSentence = word.endsWith('.') || word.endsWith('!') || word.endsWith('?');
      const isLastWord = words.indexOf(word) === words.length - 1;
      
      if ((isEndOfSentence || isLastWord) && Math.random() < 0.25) {
        const kawaii = freakyDecorations.kawaii[Math.floor(Math.random() * freakyDecorations.kawaii.length)];
        word += ' ' + kawaii;
        wordModified = true;
        totalTransformations++;
      }
    }
    
    convertedWords.push(word);
  }
  
  if (words.length > 3 && Math.random() < 0.3 && !convertedWords[convertedWords.length - 1].match(/[✨💕🌸🎀💫✿💖🌟]/)) {
    const kawaii = freakyDecorations.kawaii[Math.floor(Math.random() * freakyDecorations.kawaii.length)];
    convertedWords.push(kawaii);
  }
  
  return convertedWords.join(' ');
}

textInput.addEventListener('input', function() {
  textOutput.value = convertText(this.value);
});

copyButton.addEventListener('click', function() {
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

window.addEventListener('DOMContentLoaded', function() {
  if (textInput.value) {
    textOutput.value = convertText(textInput.value);
  }
});