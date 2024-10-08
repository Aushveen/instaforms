// Function to filter schools based on the user's input
function filterSchools() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase(); // Convert input to lowercase for case-insensitive search
  const schoolList = document.getElementById('schoolList');
  const schools = schoolList.getElementsByClassName('school-item');
  
  let found = false;

  // Loop through all schools and hide those that don't match the search query
  for (let i = 0; i < schools.length; i++) {
    const schoolName = schools[i].getElementsByClassName('school-name')[0];
    const txtValue = schoolName.textContent || schoolName.innerText;

    if (txtValue.toLowerCase().indexOf(filter) > -1) {
      schools[i].style.display = ''; // Show the matching school
      found = true;

      // Add click event to each school item to allow selection
      schools[i].addEventListener('click', function() {
        input.value = schoolName.textContent; // Set the input value to the selected school
        schoolList.style.display = 'none'; // Hide the list after selection
      });
    } else {
      schools[i].style.display = 'none'; // Hide the school that doesn't match
    }
  }

  // Show or hide the school list based on whether there are matching results
  schoolList.style.display = found ? 'block' : 'none';
}

// Scroll to Instagram section when 'Next' button is clicked in the school search section
document.querySelector('.search__btn').addEventListener('click', function() {
  const instagramSection = document.getElementById('instagramSection');
  instagramSection.scrollIntoView({ behavior: 'smooth' });
});

// Scroll to back section when 'back' button is clicked in the Instagram username section
document.getElementById('backBtn').addEventListener('click', function() {  
    const captionSection = document.getElementById('home');
    captionSection.scrollIntoView({ behavior: 'smooth' });
});

// Scroll to Caption section when 'Next' button is clicked in the Instagram username section
document.getElementById('nextBtn').addEventListener('click', function() {
  const instagramUsername = document.getElementById('instagramUsername').value;
  
  if (instagramUsername) {
    const captionSection = document.getElementById('captionSection');
    captionSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    alert('Please enter your Instagram username before proceeding.');
  }
});

// Scroll back to the Instagram section when 'Back' is clicked in the caption section
document.getElementById('backCaptionBtn').addEventListener('click', function() {
  const instagramSection = document.getElementById('instagramSection');
  instagramSection.scrollIntoView({ behavior: 'smooth' });
});

// Scroll to the Photo Upload section when 'Next' button is clicked in the caption section
document.getElementById('nextCaptionBtn').addEventListener('click', function() {
  const instagramCaption = document.getElementById('instagramCaption').value;
  
  if (instagramCaption) {
    const photoUploadSection = document.getElementById('photoUploadSection');
    photoUploadSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    alert('Please enter a caption before proceeding.');
  }
});

// Scroll back to the caption section when 'Back' is clicked in the photo upload section
document.getElementById('backPhotoBtn').addEventListener('click', function() {
  const captionSection = document.getElementById('captionSection');
  captionSection.scrollIntoView({ behavior: 'smooth' });
});

// Initialize a fixed-size array for storing uploaded files (6 slots)
const uploadedFiles = new Array(6).fill(null);

// Handle photo upload by triggering the input file click event
const photoBoxes = document.querySelectorAll('.photo-upload__box');
const photoInputs = document.querySelectorAll('.photo-input');

photoBoxes.forEach((box, index) => {
  // Ensure the correct input is triggered when the user clicks the box
  box.addEventListener('click', () => {
    const input = photoInputs[index];
    input.click(); // Trigger the file input click event
  });

  // Handle the file upload when a file is selected
  photoInputs[index].addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      // Store the file in the corresponding index of the array
      uploadedFiles[index] = file;
      
      // Preview the image using FileReader
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = 'Uploaded Photo';
        box.innerHTML = ''; // Clear the box content
        box.appendChild(img); // Display the uploaded image in the box
      };
      reader.readAsDataURL(file); // Read the file as a data URL for preview

      console.log(`File stored at index ${index}:`, file);
    }
  });
});

// Handle form submission and append files from the array to FormData
document.getElementById('submitPhotoBtn').addEventListener('click', function () {
  const submissionStatus = document.getElementById('submissionStatus'); // Get the status element
  submissionStatus.classList.remove('success', 'error'); // Reset status classes
  submissionStatus.classList.add('processing');
  submissionStatus.innerText = 'Processing submit request...';

  const schoolSearch = document.getElementById('searchInput').value;
  const instagramUsername = document.getElementById('instagramUsername').value;
  const caption = document.getElementById('instagramCaption').value;

  if (!schoolSearch) {
    submissionStatus.classList.remove('processing');
    submissionStatus.classList.add('error');
    submissionStatus.innerText = 'Please select a school.';
    return;
  }
  if (!instagramUsername) {
    submissionStatus.classList.remove('processing');
    submissionStatus.classList.add('error');
    submissionStatus.innerText = 'Please enter your Instagram username.';
    return;
  }
  if (!caption) {
    submissionStatus.classList.remove('processing');
    submissionStatus.classList.add('error');
    submissionStatus.innerText = 'Please enter a caption.';
    return;
  }

  // Proceed with submitting form if all checks pass
  const formData = new FormData();
  formData.append('schoolSearch', schoolSearch);
  formData.append('instagramUsername', instagramUsername);
  formData.append('caption', caption);

  uploadedFiles.forEach((file) => {
    if (file) {
      formData.append('photos', file);
    }
  });

  fetch('https://jguides.onrender.com/instagram', {
    method: 'POST',
    body: formData
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status >= 500) {
          throw new Error('Server error');
        } else {
          return response.text().then((errorText) => {
            throw new Error(errorText);
          });
        }
      }
      return response.text();
    })
    .then((data) => {
      submissionStatus.classList.remove('processing');
      submissionStatus.classList.add('success');
      submissionStatus.innerText = 'Success! Please remember to pay, redirecting you to the checkout...';
      // Redirect to Stripe checkout after 3 seconds
      setTimeout(() => {
        window.location.href = 'https://buy.stripe.com/00g8xA1c59dSdOgdQU';
      }, 2000); // 3 second delay before redirect
    })
    .catch((error) => {
      submissionStatus.classList.remove('processing');
      submissionStatus.classList.add('error');
      if (error.message === 'Server error') {
        submissionStatus.innerText = 'Error submitting the form. Please contact josh@jguides.com.';
      } else {
        submissionStatus.innerText = `Error submitting the form, please make sure you upload at least 1 photo`;
      }
    });
});
