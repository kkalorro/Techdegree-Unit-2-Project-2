//////////
// Init //
//////////

// Select class Page
const selectPage = document.querySelector('.page');
// Select container holding list students
const selectUnorderedList = document.querySelector('.student-list');

// The default list of students taken from the HTML source
const students = selectUnorderedList.children;
// Total number of entries to show
const maxItemsPerPage = 10;

///////////////
// Functions //
///////////////

// Bool toggle to hide or show all students
function hideStudents(bool) {
   for (let i = 0; i < students.length; i++) {
      students[i].hidden = bool;
   }
}

// Create search form elements and functionality
function appendSearchBar() {
   // Search function
   function searchStudents(e) {
      // Select search textbox
      const selectSearchTextbox = document.querySelector('#input-search');

      // Hide all students in non-filtered list
      hideStudents(true);

      // Filtered list of students
      studentsFiltered = [];

      // Go through students list then find what matches the search textbox
      for (let i = 0; i < students.length; i++) {

         // Remove all whitespaces (Source: https://stackoverflow.com/questions/6623231/remove-all-white-spaces-from-text)
         const studentInfo = students[i].textContent.replace(/\s/g, '').toLocaleLowerCase();

         // Search functionality (Source: https://www.w3schools.com/jsref/jsref_search.asp)
         const searchMatch = studentInfo.search(selectSearchTextbox.value.replace(/\s/g, '').toLocaleLowerCase());
   
         // If match found then update filtered students list
         if (searchMatch >= 0) {
            studentsFiltered.push(students[i]);
         }
      }

      // If no matches found show no results message
      const selectResults = document.querySelector('#div-results');
      if (studentsFiltered.length === 0) {
         selectResults.hidden = false;
      } else {
         selectResults.hidden = true;
      }

      // Update pagination links based on filtered students list
      appendPageLinks(studentsFiltered);

      // Show first page of the filtered list
      showPage(studentsFiltered, 1);
   }

   // Create form
   const form = document.createElement('form');
   form.id = 'form-search';

   // Create label
   const label = document.createElement('label');
   label.className = 'element-search';
   label.textContent = 'Search:';
   form.appendChild(label);

   // Create input search textbox
   const textbox = document.createElement('input');
   textbox.id = 'input-search';
   textbox.className = 'element-search';
   textbox.type = 'text';

   // Perform a search everytime a key is released
   textbox.addEventListener('keyup', (e) => {
      searchStudents(e);
   });

   // Append search textbox into form
   form.appendChild(textbox);

   // Create reset button
   const buttonReset = document.createElement('button');
   buttonReset.className = 'element-search';
   buttonReset.textContent = 'RESET';

   // When reset page when button is clicked
   buttonReset.addEventListener('click', (e) => {
      // Don't reload page when button is pressed
      e.preventDefault();
      // Hide the no results message
      const selectResults = document.querySelector('#div-results');
      selectResults.hidden = true;
      // Clear search text box value
      const selectSearchTextbox = document.querySelector('#input-search');
      selectSearchTextbox.value = '';
      // Revert pagination links back to default
      appendPageLinks(students);
      // Revert page load back to default
      showPage(students, 1);
   })

   // Append reset button to form
   form.appendChild(buttonReset);

   // Insert form before student list
   selectPage.insertBefore(form, selectUnorderedList);
}

// Create no results message box
function appendMessageBox() {
   // Create div to house message box
   const div = document.createElement('div');
   div.id = 'div-results';
   div.hidden = true;

   // Create message area
   const p = document.createElement('p');
   p.id = 'p-results';
   p.textContent = 'No results found.';
   div.appendChild(p);
   
   // Insert message box before students list
   selectPage.insertBefore(div, selectUnorderedList);
}

// Show items from designated list by units of maxItemsPerPage
const showPage = (list, page) => {
   // Hide all entries
   hideStudents(true);
   // Starting index
   const startIndex = (page - 1) * maxItemsPerPage;
   // Ending index
   const endIndex = (page * maxItemsPerPage);
   // Loop over items in list
   for (let i = 0; i < list.length; i++) {
      // if index >= firstItem && index <= lastItem
      if (i >= startIndex && i < endIndex) {
         // showItems
         list[i].hidden = false;
      }
   }
}

// Create bottom pagination links
const appendPageLinks = (list) => {

   // Remove any preexisting pagination divs
   if (selectPage.lastElementChild.className ==='pagination') {
      selectPage.removeChild(selectPage.lastElementChild);
   } 

   // Determine pages needed by divinding total list items by max items per page rounded up
   const pages = Math.ceil(list.length / maxItemsPerPage);
   
   // Create a div for pagination with an unordered list embedded
   const div = document.createElement('div');
   div.className = 'pagination';
   const ul = document.createElement('ul');

   // For every page, add li and a tags with the page number text
   for (let i = 1; i <= pages; i++) {
      // Create list item and a hyperlink with text displaying the page number
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = i;
      // Make first "active" by default
      // Abbrv. If-statement, source: https://www.thoughtco.com/create-a-shorter-if-statement-in-javascript-2037428
      (i === 1) ? a.className = 'active' : a.className = '';

      a.addEventListener('click', (e) => {
         showPage(list, a.textContent);
         // Select pagination div
         const selectPagination = document.querySelector('.pagination');
         const children = selectPagination.firstElementChild.childNodes;
         // Go through all pagination links and make only the selected "active" class
         for (i = 0; i < children.length; i++) {
            const child = children[i].firstChild;
            child.className = '';
            if (e.target.textContent === child.textContent) {
               e.target.className = 'active';
            }
         } 
      })

      // Append link to list item, then list item into unordered list
      li.appendChild(a);
      ul.appendChild(li);     
   }
   // Append unordered list to new div, then append new div to class page
   div.appendChild(ul);
   selectPage.appendChild(div);
}
   
///////////////////////
// Runtime Functions //
///////////////////////
// Add search bar to webpage
appendSearchBar();
// Add no results message box
appendMessageBox();
// Add page links to the bottom of the webpage
appendPageLinks(students);
// Default by selecting the first page
showPage(students, 1);