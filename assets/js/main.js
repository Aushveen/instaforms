
// Scroll to Instagram section when 'Next' button is clicked in the school search section
document.querySelector('.search__btn').addEventListener('click', function() {
  const instagramSection = document.getElementById('instagramSection');
  instagramSection.scrollIntoView({ behavior: 'smooth' });
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
