// select the element or group of elements
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const formBtn = itemForm.querySelector('button');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
let isEditMode = false;

//functions

//function to check UI state and display or hide elements
//This function is called after every action that changes the UI
//It checks if there are items in the list and display or hide elements
//It also changes the button to add item mode and change background color
//It also changes edit mode to false
function checkUI() {
  //clear input
  itemInput.value = ''; 
  //get all items
  const items = itemList.querySelectorAll('li'); 
  //check if there are items in the list and display or hide elements 
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
  //change button to add item mode and change background color
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';
  //change edit mode to false 
  isEditMode = false;
}

//function to display items
//This function is called when the page is loaded
//It gets all items from local storage and display them
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach(item => addItemToDOM(item));
  checkUI();
}

//function to add item
//This function is called when the form is submitted
//It gets the item from the input and check if it is empty
//If it is empty it shows an alert and return
//If it is not empty it checks if it is in edit mode
//If it is in edit mode it removes the item from the list and from local storage
//If it is not in edit mode it checks if the item already exists
//If it exists it shows an alert and return
//If it does not exist it adds the item to the list and to local storage
//It also calls checkUI function to check UI state
//It also clears the input
function onAddItemSubmit(e) {
  //prevent default form submit
  e.preventDefault();
  //get item value and set to variable called newItem
  const newItem = itemInput.value;
  //check if item is empty and show alert and return if it is empty
  if (newItem === '') {
    alert('Enter item');
    return;
  }
  //check if item is in edit mode
  //if it is in edit mode remove item from list and from local storage
  //and remove edit mode
  //if it is not in edit mode check if item already exists
  //if it exists show alert and return
  //if it does not exist add item to list and to local storage
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert('Duplicated Item');
      return;
    }
  }
  //add item to list and to local storage
  addItemToDOM(newItem);
  addItemToStorage(newItem);
  //call checkUI function to check UI state
  checkUI();

  itemInput.value = '';
}

//function to add item to DOM
//This function is called when an item is added
//It creates a li element and append the item text to it
//It creates a button element and append it to the li element
//It appends the li element to the itemList
function addItemToDOM(item) {
  //create li element
  const li = document.createElement('li');
  //append item text to li
  li.appendChild(document.createTextNode(item));
  //creatw button element
  const button = createbutton('remove-item btn-link text-red');
  //append button to li
  li.appendChild(button);
  //append li on itemList
  itemList.appendChild(li);
}

//function to create button
//This function is called when a button is needed
//It creates a button element and append the classes to it
//It creates an icon element and append the classes to it
//It appends the icon element to the button element
//It returns the button element
function createbutton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

//function to create icon
//This function is called when an icon is needed
//It creates an icon element and append the classes to it
//It returns the icon element
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

//function to add item to local storage
//This function is called when an item is added
//It gets all items from local storage and add the new item to it
//It sets the items to local storage
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//function to get items from local storage
//This function is called when items are needed
//It gets all items from local storage and return them
//If there are no items it returns an empty array
//It returns the items
function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

//function to handle click on item
//This function is called when an item is clicked
//It checks if the click is on the remove button
//If it is on the remove button it calls removeItem function
//If it is not on the remove button it calls setItemToEdit function
function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

//function to check if item exists
//This function is called when an item is added
//It gets all items from local storage and check if the new item is in it
//It returns true if the item exists and false if it does not exist
function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

//function to set item to edit
//This function is called when an item is clicked
//It gets all items from the list and remove edit mode from them
//It adds edit mode to the clicked item
//It changes the button to update item mode and change background color
//It sets the input value to the clicked item text
function setItemToEdit(item) {
  isEditMode = true;

  itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));
  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}

//function to remove item
//This function is called when an item is removed
//It removes the item from the list and from local storage
//It calls checkUI function to check UI state 
//It returns the item
function removeItem(item) {
  if (confirm('Are you sure?')) {
    item.remove();
    removeItemFromStorage(item.textContent);
    checkUI();
  }
}

//function to remove item from local storage
//This function is called when an item is removed
//It gets all items from local storage and remove the item from it
//It sets the items to local storage
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter(i => i !== item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//function to clear all items
//This function is called when the clear button is clicked
//It removes all items from the list and from local storage
//It calls checkUI function to check UI state
function clearAll() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  localStorage.removeItem('items');
  checkUI();
}

// function to filter items
// This function is called when the filter input is changed
// It gets all items from the list and filter them
// It shows the items that match the filter and hide the items that do not match the filter
// It returns the items
function filterItems(e) {
  //get all items
  const items = itemList.querySelectorAll('li');
  //convert textof  to lowercase
  const text = e.target.value.toLowerCase();
  //`
  items.forEach(item => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

//function to initialize the app
//This function is called when the page is loaded
//It adds event listeners to the form, the list, the clear button and the filter input
//It calls checkUI function to check UI state
function init() {
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearAll);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);
  checkUI();
}

init();
