/*============== SHOW MENU ==============*/
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close'),
  navOverlay = document.getElementById('nav-overlay');

/*===== MENU SHOW =====*/
/* validate if constats exists */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
    navOverlay.classList.add('show-overlay');
  });
}

/*===== MENU HIDDEN =====*/
/* validate if constats exists */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    navOverlay.classList.remove('show-overlay');
  });
}

/*============== CHANGE BACKGROUND HEADER ==============*/
function scrollHeader() {
  const header = document.getElementById('header');
  // when the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add('scroll-header');
  else header.classList.remove('scroll-header');
}

window.addEventListener('scroll', scrollHeader);

/*============== FILTER SCHOOLS ==============*/
function filterSchools() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase();
  const schoolList = document.getElementById('schoolList');
  const schools = schoolList.getElementsByClassName('school-item');
  
  let found = false;

  // Loop through all schools and hide those that don't match the search query
  for (let i = 0; i < schools.length; i++) {
    const schoolName = schools[i].getElementsByClassName('school-name')[0];
    const txtValue = schoolName.textContent || schoolName.innerText;

    if (txtValue.toLowerCase().indexOf(filter) > -1) {
      schools[i].style.display = '';
      found = true;
    } else {
      schools[i].style.display = 'none';
    }
  }

  // Show or hide the school list based on search results
  schoolList.style.display = found ? 'block' : 'none';

  // Add event listeners to each school item for selection
  addSchoolSelectionListeners();
}

/*============== SELECT SCHOOL FROM LIST ==============*/
function addSchoolSelectionListeners() {
  const schools = document.getElementsByClassName('school-item');
  
  // Add a click event to each school item
  for (let i = 0; i < schools.length; i++) {
    schools[i].addEventListener('click', function() {
      const selectedSchoolName = this.getElementsByClassName('school-name')[0].innerText;
      const input = document.getElementById('searchInput');
      
      // Set the input field value to the selected school's name
      input.value = selectedSchoolName;
      
      // Hide the school list after selection
      document.getElementById('schoolList').style.display = 'none';
    });
  }
}
