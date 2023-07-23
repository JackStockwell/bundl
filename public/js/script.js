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


const followForum = async (event) => {
    event.preventDefault();

    const forum_id = document.querySelector('[data-forum_id]').getAttribute('data-forum_id');

    const response = await fetch('/api/subs/follow/', {
        method: 'POST',
        body: JSON.stringify({forum_id}),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {

      } else {
        alert(response.statusText);
      }
}

const newForum = async (event) => {
    event.preventDefault();

    const name = document.querySelector('[data-bundl-name]').value.toLowerCase().trim();
    const description = document.querySelector('[data-bundl-desc]').value.trim();
    
    if (name && description) {
        const response = await fetch('/api/subs/new', {
            method: 'POST',
            body: JSON.stringify({name, description}),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace(`/b/${name}`)
        } else {
            alert(response.statusText)
        }
    } else {
        document.querySelector('.post-err').textContent = "Your bundl must have a title and description!"
        setTimeout(() => {
            document.querySelector('.post-err').textContent = ""
        }, 3000)
    }

}



// Logout modal
// Modal selectors
const openLogoutModal = document.querySelector('[data-open-modal-logout]')
const closeLogoutModal = document.querySelector('[data-close-modal-logout]')
const logoutModal = document.querySelector('[data-modal-logout]')

// Opens the modal
openLogoutModal.addEventListener('click', () => {
    logoutModal.showModal()
})

// Close the modal
closeLogoutModal.addEventListener('click', () => {
    logoutModal.close()
})

// New Forum modal
// Modal selectors
const openForumModal = document.querySelector('[data-open-modal-forum]')
const closeForumModal = document.querySelector('[data-close-modal-forum]')
const forumModal = document.querySelector('[data-modal-newforum]')

// Opens the modal

openForumModal.addEventListener('click', () => {
    forumModal.showModal()
})

// Close the modal
closeForumModal.addEventListener('click', () => {
    forumModal.close()
})
