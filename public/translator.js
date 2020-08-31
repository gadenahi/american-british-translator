// https://repl.it/repls/HighlevelWingedCloudcomputing#README.md 
import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

// var americanOnly = require('./american-only.js')
// var britishOnly = require('./british-only.js')
// var americanToBritishSpelling = require('./american-to-british-spelling.js')
// var americanToBritishTitles = require('./american-to-british-titles.js')


const textArea = document.getElementById('text-input');
const trSentence = document.getElementById('translated-sentence');
const trOption = document.getElementById('locale-select');
const errorMsg = document.getElementById('error-msg');
const trBtn = document.getElementById('translate-btn')
const clBtn = document.getElementById('clear-btn')

var americanDict = {}
var britishDict = {}


const checkWord = (input) => {
  var inputList = input.split(" ")
  var ref = americanDict
  var usTime = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/
  var bsTime = /^([01]?[0-9]|2[0-3]).([0-5][0-9])$/
  var refTime
  if (trOption.value == "american-to-british") {
    ref = americanDict
    refTime = usTime
  } else {
    ref = britishDict
    refTime = bsTime
  }
  var ans = ""
  for (var i = 0; i < inputList.length; i++) {
    var word = inputList[i]
    // check if word is time format
    if (word.match(refTime)) {
      if (trOption.value == "american-to-british") {
        ans += " " + word.replace(":", ".")        
      } else {
        ans += " " + word.replace(".", ":")    
      }
    } else if (word.toLowerCase() in ref) {
      if (word.slice(-1) == ".") {
        ans += " " + ref[word.toLowerCase()].charAt(0).toUpperCase() + ref[word.toLowerCase()].slice(1)
      } else {
        if (ref[word.toLowerCase()].slice(-1) == ".") {
          ans += " " + ref[word.toLowerCase()].charAt(0).toUpperCase() + ref[word.toLowerCase()].slice(1)          
        } else {
          ans += " " + ref[word.toLowerCase()]          
        }
      }
    } else {
      if (word.slice(-1) ==  "." || word.slice(-1) == "?") {
        if (word.slice(0, -1).toLowerCase() in ref) {
          ans += " " + ref[word.slice(0, -1).toLowerCase()] + word.slice(-1)
        } else {
          ans += " " + word
        }
      } else {
        var subWord = word
        var consSubWordStatus = false
        var tmpSubConsWords
        for (var j = i + 1; j < inputList.length; j++) {
          var addWordInSub = inputList[j]
          if (j == inputList.length - 1) {
            addWordInSub = inputList[j].slice(0, -1)
            var laswWord = inputList[j].slice(-1)
          }
          subWord += " " + addWordInSub
          if (subWord.toLowerCase() in ref) {
            tmpSubConsWords = " " + ref[subWord.toLowerCase()]
            consSubWordStatus = true
            i = j
            if (j == inputList.length - 1) {
              tmpSubConsWords += laswWord
            } 
          }
        }
        if (consSubWordStatus == true) {
          ans += tmpSubConsWords
        } else{
          ans += " " + word
        }
        consSubWordStatus = false
      }
    }
  }
  return ans.replace(/^\s+/,"");
}


const createDict = () => {
  for (let [key, value] of Object.entries(americanOnly)) {
    americanDict[key] = value
  }
  for (let [key, value] of Object.entries(britishOnly)) {
    britishDict[key] = value
  }
  for (let [key, value] of Object.entries(americanToBritishSpelling)) {
    americanDict[key] = value
    britishDict[value] = key
  }  
  for (let [key, value] of Object.entries(americanToBritishTitles)) {
    americanDict[key] = value
    britishDict[value] = key
  }
}

const checkAndDisplay = () => {
  if (textArea.value == "") {
    trSentence.textContent = ""
    errorMsg.textContent = "Error: No text to translate."
    return true
  }   
  var tmp = checkWord(textArea.value)
    trSentence.textContent = ""
    errorMsg.textContent = ""
  if (tmp == textArea.value) {
    trSentence.textContent = "Everything looks good to me!"
  } else {
    var closeSpan = document.createElement("span");
    closeSpan.setAttribute("class","highlight");
    closeSpan.textContent = tmp;
    trSentence.insertBefore(closeSpan, trSentence.firstChild);
  } 
}

const clearAll = () => {
    trSentence.textContent = ""
    errorMsg.textContent = ""
    textArea.value = ""
    return true  
}

document.addEventListener('DOMContentLoaded', () => {
  // Set text area with a simple puzzle
  
  createDict()
  
  trBtn.addEventListener('click', function (e) {
    checkAndDisplay()
  })

  clBtn.addEventListener('click', function (e) {
    clearAll()
  })
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/

try {
  module.exports = {
    checkWord,
    createDict,
    checkAndDisplay,
    clearAll
  }
} catch (e) {}
