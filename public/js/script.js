const handleLogout = async () => {
    // Make a POST request to destroy the session on the back end
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // If successfully logged out, redirect to the login page
      document.location.replace('/welcome');
    } else {
      alert(response.statusText);
    }
};

// Modal selectors
const openModal = document.querySelector('[data-open-modal]')
const closeModal = document.querySelector('[data-close-modal]')
const modal = document.querySelector('[data-modal]')

// Opens the modal
openModal.addEventListener('click', () => {
    modal.showModal()
})

// Close the modal
closeModal.addEventListener('click', () => {
    modal.close()
})