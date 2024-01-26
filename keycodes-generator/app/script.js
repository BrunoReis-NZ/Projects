//function to show keycodes when a key is pressed. takes in the event object as a parameter
function showKeyCodes(e) {
  //select the element with the id of insert
  const insert = document.getElementById('insert');
  //set the innerHTML of the insert element to an empty string
  insert.innerHTML = '';
  //create an object with the keycodes.
    const keyCodes = {
    'e.key': e.key === ' ' ? 'Space' : e.key,
    'e.keyCode': e.keyCode,
    'e.code': e.code,
  };
  // loop through the keycodes object
  for (let key in keyCodes) {
    //create a div element
    const div = document.createElement('div');
    //add the key class to the div
    div.classList.add('key');
    //create a small element
    const small = document.createElement('small');
    // create a variable named keyText to store the text node of the key
    const keyText = document.createTextNode(key);
    // create a variable named valueText to store the text node of the value
    const valueText = document.createTextNode(keyCodes[key]);
    //append the keyText to the small element
    small.appendChild(keyText);
    //append the valueText to the div element
    div.appendChild(valueText);
    //append the small element to the div element
    div.appendChild(small);
    //append the div element to the insert element
    insert.appendChild(div);
  }
}

//event listener to show keycodes when a key is pressed
window.addEventListener('keydown', showKeyCodes);
