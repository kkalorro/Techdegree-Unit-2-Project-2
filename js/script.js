//////////
// Init //
//////////

// Select class Page
const selectPage = document.querySelector('.page');
// Select header
const selectPageHeader = document.querySelector('.page-header');
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
   // Create form
   const form = document.createElement('form');
   form.id = 'form-search';

   // Create input search textbox
   const textbox = document.createElement('input');
   textbox.className = 'element-search';
   textbox.type = 'text';
   form.appendChild(textbox);

   // Create search button
   const buttonSearch = document.createElement('input');
   buttonSearch.className = 'element-search';
   buttonSearch.type = 'submit';

   // Execute search when submitted
   buttonSearch.addEventListener('click', (e) => {
      e.preventDefault();
      const selectSearchForm = document.querySelector('#form-search');
      const searchTextbox = selectSearchForm.firstElementChild;

      // Hide all students in non-filtered list
      hideStudents(true);

      // Filtered list of students
      studentsFiltered = [];

      // Go through students list then find what matches the search textbox
      for (let i = 0; i < students.length; i++) {

         // Remove all whitespaces (Source: https://stackoverflow.com/questions/6623231/remove-all-white-spaces-from-text)
         const studentInfo = students[i].textContent.replace(/\s/g, '').toLocaleLowerCase();

         // Search functionality (Source: https://www.w3schools.com/jsref/jsref_search.asp)
         const searchMatch = studentInfo.search(searchTextbox.value.replace(/\s/g, '').toLocaleLowerCase());
   
         // If match found then update filtered students list
         if (searchMatch >= 0) {
            studentsFiltered.push(students[i]);
         }
      }

      // Clear search text box now that we're done with it
      searchTextbox.value = '';

      // Update pagination links based on filtered students list
      appendPageLinks(studentsFiltered);

      // Show first page of the filtered list
      showPage(studentsFiltered, 1);
   });

   // Append search button to form
   form.appendChild(buttonSearch);

   // Create reset button
   const buttonReset = document.createElement('button');
   buttonReset.className = 'button-reset';
   buttonReset.textContent = 'RESET';
   buttonReset.addEventListener('click', (e) => {
      e.preventDefault();
      appendPageLinks(students);
      showFirstPage();
   })
   // Append reset button to form
   form.appendChild(buttonReset);

   // Append form into Page Header
   selectPageHeader.appendChild(form);
}

// Show items from designated list by 10 results at a time
const showPage = (list, page) => {
   // Hide all entries
   hideStudents(true);
   // Starting index
   const startIndex = (page - 1) * maxItemsPerPage;
   // endingIndex subtracted by one to accomodate for computer counting
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
      // Create List Item and a Hyperlink with the text displaying the page number
      const li = document.createElement('li');
      const a = document.createElement('a');
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

      // Append link to list item, then list item into unordered page
      li.appendChild(a);
      ul.appendChild(li);     
   }
   // Append unordered list to new Div, then append new Div to Class page
   div.appendChild(ul);
   selectPage.appendChild(div);
}

function showFirstPage() {
   // Start on Page 1
   showPage(students, 1);
   // Reset all pagination links except for 1
   const selectPagination = document.querySelector('.pagination');
   const children = selectPagination.firstElementChild.childNodes;
   // Go through all pagination links and make only the first one "active"
   for (i = 0; i < children.length; i++) {
      const child = children[i].firstChild;
      if (i === 0) {
         child.className = 'active';
      } else {
         child.className = '';
      }
   } 
}

///////////////////////
// Runtime Functions //
///////////////////////
// Add search bar to webpage
appendSearchBar();
// Add page links to the bottom of the webpage
appendPageLinks(students);
// Default by selecting the first page
showFirstPage();
// showPage(students, 1);