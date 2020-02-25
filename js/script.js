/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/




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




/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/





// Remember to delete the comments that came with this file, and replace them with your own code comments.

//<ul class="student-list"></ul>
const selectUnorderedList = document.querySelector('.student-list');
let selectListItem = document.querySelectorAll('li');
const selectButtonToggleList = document.querySelector('#buttonToggleList');
const selectInputTextName = document.querySelector('#inputTextName');
const selectButtonAddName = document.querySelector('#buttonAddName');

document.addEventListener('click', (event) => {
   console.log(event.target);
   console.log(event.target.id);
   if (event.target.id == 'buttonToggleList') {
      if (!selectUnorderedList.hidden) {
         selectButtonToggleList.textContent = 'Show List';
         selectUnorderedList.hidden = true;
      } else {
         selectButtonToggleList.textContent = 'Hide List';
         selectUnorderedList.hidden = false;
      }
   }
   if (event.target.id == 'buttonTop10') {
      for (let i = 10; i < selectListItem.length; i +=1) {
         selectListItem[i].hidden = true;
      }
   }
   if (event.target.id == 'buttonReset') {
      selectButtonToggleList.textContent = 'Hide List';
      selectUnorderedList.hidden = false;
      hideListItems(false);
   }
   if (event.target.id == 'buttonAddName') {
      const customName = selectInputTextName.value;
      let customEmail = customName.replace(/ /g, '.').toLocaleLowerCase();  //Source: https://stackoverflow.com/questions/3794919/replace-all-spaces-in-a-string-with
      let customDate = new Date();
      let gender = '';
      if (randNum(1)) { gender = 'women'; } else { gender = 'men'; }
      let customerPortrait = `https://randomuser.me/api/portraits/thumb/${gender}/${randNum(99)}.jpg`;
      let newLi = document.createElement('li');
      newLi.className = 'student-item cf';
      newLi.innerHTML = 
      `
      <div class="student-details">
      <img class="avatar" src="${customerPortrait}">
      <h3>${customName.toLocaleLowerCase()}</h3>
      <span class="email">${customEmail}@example.com</span>
      </div>
      <div class="joined-details">
      <span class="date">Joined ${customDate.getMonth()+1}/${customDate.getDate()}/${customDate.getFullYear()}</span>
      </div>
      `;
      selectUnorderedList.appendChild(newLi);
   }
   if (event.target.id == 'buttonPopTop') { selectUnorderedList.removeChild(selectUnorderedList.firstElementChild); }
   if (event.target.id == 'buttonPopBottom') { selectUnorderedList.removeChild(selectUnorderedList.lastElementChild); }
   //Update List of Students
   selectListItem = document.querySelectorAll('li');
});

function randNum(num) {
   return Math.round(Math.random() * num);
}

function hideListItems(bool) {
   for (let i = 0; i < selectListItem.length; i++) {
      selectListItem[i].hidden = bool;
   }
}