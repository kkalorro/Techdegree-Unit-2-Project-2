/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

// Remember to delete the comments that came with this file, and replace them with your own code comments.

//////////
// Init //
//////////

// Select class Page
const selectPage = document.getElementsByClassName('page')[0];
// Select container holding list students
const selectUnorderedList = document.querySelector('.student-list');
// Select listed students
let selectListItem = selectUnorderedList.children;
// Select input text box
const selectInputTextName = document.querySelector('#inputTextName');
// Select submit entry button
const selectButtonAddName = document.querySelector('#buttonAddName');

// Total number of entries to show
const maxItemsPerPage = 10;

///////////////
// Functions //
///////////////

// Random number generator for random gender and avatar
function randNum(num) {
   return Math.floor(Math.random() * num);
}

function hideAllListItems(bool) {
   for (let i = 0; i < selectListItem.length; i++) {
      selectListItem[i].hidden = bool;
   }
}

// Functionality to show specific results on page
/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
const showPage = (list, page) => {
   // Hide all entries
   hideAllListItems(true);
   // Current active page.  Always 1.
   const currentPage = 1;
   // startingIndex
   let startIndex = (page - currentPage) * maxItemsPerPage;
   console.log(startIndex);
   // endingIndex subtracted by one to accomodate for computer counting
   const endIndex = (page * maxItemsPerPage) - 1;
   console.log(endIndex);
   // loop over items in list parameter
   for (let i = 0; i < list.length; i++) {
      // if index >= firstItem && index <= lastItem
      if (i >= startIndex && i <= endIndex) {
         //showItems
         console.log(`showing: [${i}]`);
         list[i].hidden = false;
      }
   }
}

// Functionality for bottom page links
/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (list) => {
   // Pages needed by divinding total list items by max items per page
   const pages = Math.trunc(list.length / maxItemsPerPage) + 1;
   
   // Create a div and give it the 'pagination' class, append it to the .page div
   // Possibly needs DIV or 'DIV'
   const div = document.createElement('div');
   div.className = 'pagination';

   // Unordered List Div
   const ul = document.createElement('ul');

   // for every page, add li and a tags with the page number text
   for (let i = 0; i < pages; i++) {
      // Possibly needs LI or 'LI'
      const li = document.createElement('li');
      // li.textContent = i;   
      
      // Create hyperlink
      const a = document.createElement('a');
      a.textContent = i;
      // a.href = showPage(selectListItem, i);

      li.appendChild(a);
      ul.appendChild(li);
      div.appendChild(ul);
   }

   // add an event listener to each a tag.  when clicked call showPage()

   // loop over pagination links to remove active class from all links

   // add active class to the link that was just clicked.  you can identifiy that clicked link using event.target.
   selectPage.appendChild(div);
}

appendPageLinks(selectListItem);

///////////////
// Listeners //
///////////////

document.addEventListener('click', (event) => {
   if (event.target.id == 'buttonTop10') {
      for (let i = 10; i < selectListItem.length; i +=1) {
         selectListItem[i].hidden = true;
      }
   }
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
         if (val < 10) { 
            return newVal = '0' + val;
         } else { 
            return val;
         }   
      }
      // Auto generate details like Date, gender, and portrait
      const customDate = new Date();
      const mm = makeDoubleDigit(customDate.getMonth() + 1);
      const dd = makeDoubleDigit(customDate.getDate());
      const yy = customDate.getFullYear().toString().substr(-2);
      let gender = '';
      // New if-then method I'm practicing
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
   
   //Update List of Students
   selectListItem = document.querySelectorAll('li');
});