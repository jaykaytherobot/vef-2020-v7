/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 * Byrja forrit.
 */
function start() {
  try {
    asker();
  }
  catch (e) {
    alert(e);
    start();
  }
}

function asker() {
  let action = chooseDeOrEncode();
  let n = translateBy();
  let str = getStringToDecode(action, n);
  let coded_string;
  if (action == 'kóða') {
    coded_string = encode(str, n);
  }
  if (action == 'afkóða') {
    coded_string = decode(str, n);
  }

  alert(`Strengurinn ${str} ${action}ður með hliðrun um ${n} er \n${coded_string}`)
}

function chooseDeOrEncode(){
  let op = prompt(`Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða“`);
  if (op == 'kóða' || op == 'afkóða'){
    return op;
  }
  else{
    throw `Veit ekki hvaða aðgerð „${op}“ er. Reyndu aftur.`;
  }
}

function translateBy(){
  let n = Number.parseInt(prompt(`Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]`), 10);
  if (Number.isInteger(n) && n >= 1 && n <= 31) {
    return n;
  }
  else {
    throw `${n} er ekki heiltala á bilinu [1, 31]. Reyndu aftur.`;
  }
}

function getStringToDecode(action, n){
  let _string = prompt(`Gefðu upp strenginn sem á að ${action} með hliðrun ${n}:`)
  try{
    validateString(_string);
    return _string;
  }
  catch(e){
    throw `Þú gafst upp stafi sem ekki er hægt að ${action}: `+e+` Reyndu aftur`;
  }
}

function validateString(s) {
  if (s == null || s.length == 0) {
    throw `Þú gafst ekki upp streng. Reyndu aftur.`;
  }
  let len = s.length;
  let invalid_characters = [];
  for(let i = 0; i < len; i++){
    if (LETTERS.indexOf(s.charAt(i)) == -1){
      invalid_characters.push(s.charAt(i));
    }
  }
  if (invalid_characters.length != 0) {
    throw `${invalid_characters.join(', ')}.`;
  }
}
// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  str = coder(str, n, function(a,b) {return a+b})
  return str;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  str = coder(str, n, function(a,b) {return a-b});
  return str;
}

/**
 * Coder 
 */
function coder(str, n, op) {
  let len_of_alphabet = LETTERS.length;
  let len = str.length;
  let index_of_char;
  let new_string = [];
  for (let i = 0; i < len; i++){
    index_of_char = LETTERS.indexOf(str.charAt(i));
    encoded_index = (len_of_alphabet + op(index_of_char, n)) % len_of_alphabet;
    new_string.push(LETTERS.charAt(encoded_index));
  }
  str = new_string.join('');
  return str;
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
