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

// Move from caption section to photo upload section
document.getElementById('nextCaptionBtn').addEventListener('click', function() {
  const instagramCaption = document.getElementById('instagramCaption').value;
  
  if (instagramCaption) {
    // Slide caption section out of view and show photo upload section
    document.getElementById('captionSection').style.transform = 'translateX(-100%)';
    document.getElementById('captionSection').style.transition = 'transform 0.5s ease';
    
    // Show the photo upload section
    setTimeout(function() {
      document.getElementById('photoUploadSection').classList.add('active');
    }, 500);
  } else {
    alert('Please enter a caption before proceeding.');
  }
});

// Move from photo upload section back to caption section
document.getElementById('backPhotoBtn').addEventListener('click', function() {
  const photoUploadSection = document.getElementById('photoUploadSection');
  const captionSection = document.getElementById('captionSection');

  // Slide the photo upload section out of view and show caption section
  photoUploadSection.classList.remove('active');
  
  setTimeout(function() {
    captionSection.style.transform = 'translateX(0)';
  }, 300); 
});

// Handle photo upload
const photoBoxes = document.querySelectorAll('.photo-upload__box');
const photoInputs = document.querySelectorAll('.photo-input');

photoBoxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    photoInputs[index].click();
  });

  photoInputs[index].addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        box.innerHTML = '';
        box.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });
});

// Handle submit button for photo upload section
document.getElementById('submitPhotoBtn').addEventListener('click', function() {
  const uploadedPhotos = document.querySelectorAll('.photo-upload__box img');
  
  if (uploadedPhotos.length > 0) {
    // Add logic here to process the uploaded photos
    alert('Photos submitted successfully!');
    // You can add more logic here to move to the next section or finalize the process
  } else {
    alert('Please upload at least one photo before submitting.');
  }
});