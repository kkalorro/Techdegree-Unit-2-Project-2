//////////
// Init //
//////////

// Select class Page
const selectPage = document.querySelector('.page');
// Select header
const selectPageHeader = document.querySelector('.page-header');
// Select container holding list students
const selectUnorderedList = document.querySelector('.student-list');
// Select listed students
const selectListItem = selectUnorderedList.children;
// Select input text box
const selectInputTextName = document.querySelector('#inputTextName');
// Select submit entry button
const selectButtonAddName = document.querySelector('#buttonAddName');

// Total number of entries to show
const maxItemsPerPage = 10;

///////////////
// Functions //
///////////////

// Create search form
function appendSearchBar() {
// Create div to hold search contents
const div = document.createElement('div');
div.className = 'search-form';

// Create input search textbox
const searchBar = document.createElement('input');
searchBar.className = 'search-element';
searchBar.type = 'text';
div.appendChild(searchBar);

// Create execute search button
const searchButton = document.createElement('button');
searchButton.className = 'search-element';
searchButton.textContent = 'Search for student';
div.appendChild(searchButton);

// Add a reset button

// Append div into Page Header
selectPageHeader.appendChild(div);
}

// Search student functionality
function searchStudent() {
   // Get string in textbox
   // Hide all students
   // Using search method, go through student list
   // If search is true make hidden false
}

// Hide all students
function hideAllListItems(bool) {
   for (let i = 0; i < selectListItem.length; i++) {
      selectListItem[i].hidden = bool;
   }
}

// Show filtered students on page
const showPage = (list, page) => {
   // Hide all entries
   hideAllListItems(true);
   // startingIndex
   let startIndex = (page - 1) * maxItemsPerPage;
   // endingIndex subtracted by one to accomodate for computer counting
   const endIndex = (page * maxItemsPerPage) - 1;
   // loop over items in list
   for (let i = 0; i < list.length; i++) {
      // if index >= firstItem && index <= lastItem
      if (i >= startIndex && i <= endIndex) {
         // showItems
         list[i].hidden = false;
      }
   }
}

// Create bottom pagination links
const appendPageLinks = (list) => {
   // Pages needed by divinding total list items by max items per page
   const pages = Math.trunc(list.length / maxItemsPerPage) + 1;
   
   // Create a div and give it the 'pagination' class, embed an unordered list in it
   const div = document.createElement('div');
   div.className = 'pagination';
   const ul = document.createElement('ul');

   // For every page, add li and a tags with the page number text
   for (let i = 1; i <= pages; i++) {
      // Create List Item and a Hyperlink with the text displaying the page number
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = i;
      a.addEventListener('click', (e) => {
         showPage(selectListItem, a.textContent);
         // Loop over pagination links
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
      li.appendChild(a);
      ul.appendChild(li);     
   }
   div.appendChild(ul);
   selectPage.appendChild(div);
}

appendSearchBar();
appendPageLinks(selectListItem);

/////////////////////////
// Debugging functions //
/////////////////////////

/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

// Random number generator for random gender and avatar
function randNum(num) {
   return Math.floor(Math.random() * num);
}

document.addEventListener('click', (event) => {
   if (event.target.id == 'buttonReset') {
      hideAllListItems(false);
   }
   if (event.target.id == 'buttonAddName') {
      let newLi = document.createElement('li');
      newLi.className = 'student-item cf';
      const customName = selectInputTextName.value;
      // Replace spaces with a space (Source: https://stackoverflow.com/questions/3794919/replace-all-spaces-in-a-string-with)
      let customEmail = customName.replace(/ /g, '.').toLocaleLowerCase();
      
      // Vanity function that converts single digit numbers into double digits
      function makeDoubleDigit(val) {
         if (val < 10) { return newVal = '0' + val; } else { return val; }   
      }
      // Auto generate details like Date, gender, and portrait
      const customDate = new Date();
      const mm = makeDoubleDigit(customDate.getMonth() + 1);
      const dd = makeDoubleDigit(customDate.getDate());
      const yy = customDate.getFullYear().toString().substr(-2);
      let gender = '';
      // I learned this If-then tecnique from: https://stackoverflow.com/questions/8860654/javascript-single-line-if-statement-best-syntax-this-alternative
      (randNum(2)) ? gender = 'women' : gender = 'men';
      let customerPortrait = `https://randomuser.me/api/portraits/thumb/${gender}/${randNum(99)}.jpg`;
      newLi.innerHTML = 
      `
         <div class="student-details">
         <img class="avatar" src="${customerPortrait}">
         <h3>${customName.toLocaleLowerCase()}</h3>
         <span class="email">${customEmail}@example.com</span>
         </div>
         <div class="joined-details">
         <span class="date">Joined ${mm}/${dd}/${yy}</span>
         </div>
      `;
      selectUnorderedList.appendChild(newLi);
   }

   // Remove first list item listener
   if (event.target.id == 'buttonPopTop') { selectUnorderedList.removeChild(selectUnorderedList.firstElementChild); }

   // Remove last list item listener
      if (event.target.id == 'buttonPopBottom') { selectUnorderedList.removeChild(selectUnorderedList.lastElementChild); }
});