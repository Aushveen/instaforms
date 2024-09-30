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

/*============== SLIDE TO INSTAGRAM SECTION ==============*/
document.querySelector('.search__btn').addEventListener('click', function() {
  const homeSection = document.querySelector('.home');
  const instagramSection = document.getElementById('instagramSection');

  // Slide the home section out of view and show the Instagram section
  homeSection.style.transform = 'translateX(-100%)';
  homeSection.style.transition = 'transform 0.5s ease';

  // Show the Instagram section
  setTimeout(function() {
    instagramSection.classList.add('active');
  }, 500);
});

/*============== BACK TO SCHOOL SEARCH SECTION ==============*/
document.getElementById('backBtn').addEventListener('click', function() {
  const homeSection = document.querySelector('.home');
  const instagramSection = document.getElementById('instagramSection');

  // Slide the Instagram section out of view and show the home section
  instagramSection.classList.remove('active');
  
  // Slide the home section back into view
  setTimeout(function() {
    homeSection.style.transform = 'translateX(0)';
  }, 300); // Ensure it slides smoothly back
});

/*============== HANDLE NEXT BUTTON ==============*/
document.getElementById('nextBtn').addEventListener('click', function() {
  const instagramUsername = document.getElementById('instagramUsername').value;
  
  if (instagramUsername) {
    // You can add logic here to slide to the next section or process the username.
  } else {
    alert('Please enter your Instagram username before proceeding.');
  }
});

// Move from Instagram username section to the caption section
document.getElementById('nextBtn').addEventListener('click', function() {
  const instagramUsername = document.getElementById('instagramUsername').value;
  
  if (instagramUsername) {
    // Slide Instagram username section out of view and show caption section
    document.getElementById('instagramSection').style.transform = 'translateX(-100%)';
    document.getElementById('instagramSection').style.transition = 'transform 0.5s ease';
    
    // Show the caption section
    setTimeout(function() {
      document.getElementById('captionSection').classList.add('active');
    }, 500);
  } else {
    alert('Please enter your Instagram username before proceeding.');
  }
});

// Move from caption section back to Instagram username section
document.getElementById('backCaptionBtn').addEventListener('click', function() {
  const captionSection = document.getElementById('captionSection');
  const instagramSection = document.getElementById('instagramSection');

  // Slide the caption section out of view and show Instagram username section
  captionSection.classList.remove('active');
  
  setTimeout(function() {
    instagramSection.style.transform = 'translateX(0)';
  }, 300); 
});

// Handle next button for Instagram caption section
document.getElementById('nextCaptionBtn').addEventListener('click', function() {
  const instagramCaption = document.getElementById('instagramCaption').value;
  
  if (instagramCaption) {
    // Add logic here to proceed to the next section
  } else {
    alert('Please enter a caption before proceeding.');
  }
});