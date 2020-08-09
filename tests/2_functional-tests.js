/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

let Translator;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load translator then run tests
    Translator = require('../public/translator.js');
  });

  suite('Function checkAndDisplay()', () => {
    /* 
      The translated sentence is appended to the `translated-sentence` `div`
      and the translated words or terms are wrapped in 
      `<span class="highlight">...</span>` tags when the "Translate" button is pressed.
    */
    test("Translation appended to the `translated-sentence` `div`", done => {
      const textArea = document.getElementById('text-input');
      const trSentence = document.getElementById('translated-sentence');
      const trOption = document.getElementById('locale-select');
      trOption.value = "american-to-british"    
      const output = '<span class="highlight">Can you toss this in the bin for me?</span>';
      textArea.value = "Can you toss this in the trashcan for me?";
      Translator.checkAndDisplay()
      assert.strictEqual(trSentence.innerHTML, output);
      done();
    });

    /* 
      If there are no words or terms that need to be translated,
      the message 'Everything looks good to me!' is appended to the
      `translated-sentence` `div` when the "Translate" button is pressed.
    */
    test("'Everything looks good to me!' message appended to the `translated-sentence` `div`", done => {
      const textArea = document.getElementById('text-input');
      const trSentence = document.getElementById('translated-sentence');
      const trOption = document.getElementById('locale-select');
      trOption.value = "american-to-british"    
      const output = 'Everything looks good to me!';
      textArea.value = "Mangoes are my fruit.";
      Translator.checkAndDisplay()
      assert.strictEqual(trSentence.textContent, output);
      done();
    });

    /* 
      If the text area is empty when the "Translation" button is
      pressed, append the message 'Error: No text to translate.' to 
      the `error-msg` `div`.
    */
    test("'Error: No text to translate.' message appended to the `translated-sentence` `div`", done => {
      const textArea = document.getElementById('text-input');
      const errorMsg = document.getElementById('error-msg');
      const trOption = document.getElementById('locale-select');
      trOption.value = "american-to-british"    
      const output = 'Error: No text to translate.';
      textArea.value = "";
      Translator.checkAndDisplay()
      assert.strictEqual(errorMsg.textContent, output);
      done();
    });

  });

  suite('Function clearAll()', () => {
    /* 
      The text area and both the `translated-sentence` and `error-msg`
      `divs` are cleared when the "Clear" button is pressed.
    */
    test("Text area, `translated-sentence`, and `error-msg` are cleared", done => {
      const textArea = document.getElementById('text-input');
      const trSentence = document.getElementById('translated-sentence');
      const trOption = document.getElementById('locale-select');
      const errorMsg = document.getElementById('error-msg');
      trOption.value = "american-to-british"          
      textArea.value = "hello"
      trSentence.textContent = "hello"
      errorMsg.textContent = "hello"
      Translator.clearAll()
      assert.strictEqual(textArea.value, '')
      assert.strictEqual(trSentence.textContent, '')
      assert.strictEqual(errorMsg.textContent, '')
      done();
    });

  });

});
