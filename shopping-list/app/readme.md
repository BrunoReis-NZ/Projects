Simple Todo List App

Description
This is a simple Todo List web application that allows users to add, edit, and remove items from their to-do list. The application features a user-friendly interface with options to filter, clear all items, and search for specific tasks. It leverages HTML for structure, CSS for styling, and JavaScript for dynamic functionality.

Features
Add/Edit Items: Users can add new tasks to the list or edit existing ones.
Remove Items: Users can remove tasks from the list individually.
Clear All: Users can clear all tasks from the list.
Filter: Users can filter tasks by typing in the filter input.
Local Storage: Tasks are stored in the local storage, persisting across page reloads.

How to Use
Add Item: Enter a task in the input field and click "Add Item."
Edit Item: Click on a task to edit its content and click "Update Item."
Remove Item: Click the "X" button next to a task to remove it.
Clear All: Click the "Clear All" button to remove all tasks.
Filter: Use the filter input to search and filter tasks.

Technologies Used
HTML: Defines the structure of the web page.
CSS: Styles the visual presentation of the page.
JavaScript: Provides dynamic functionality and interactivity.
LocalStorage: Stores tasks locally for persistence.

Project Structure
index.html: Contains the structure of the web page.
style.css: Defines the styles for the visual presentation.
script.js: Implements the dynamic functionality and logic.

How it Works
Initialization: The init function sets up event listeners and displays existing tasks on page load.
Adding/Editing: The onAddItemSubmit function handles adding and editing tasks.
Removing: The removeItem function removes a task and updates the UI and local storage.
Filtering: The filterItems function filters tasks based on user input.
LocalStorage: Functions like addItemToStorage and getItemsFromStorage manage local storage interactions.

Dependencies
FontAwesome: For icons used in the project.

Acknowledgments
The project utilizes FontAwesome for icons.
Note: This project is a simple demonstration and can be extended with additional features and improvements.