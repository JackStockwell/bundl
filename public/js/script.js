// Handles logout, with a post request to the DB.
const handleLogoutEvent = async () => {
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

// Allows the user to follow.
const followForum = async (event) => {
    event.preventDefault();

    const forum_id = document.querySelector('[data-forum_id]').getAttribute('data-forum_id');

    const response = await fetch('/api/subs/follow/', {
        method: 'POST',
        body: JSON.stringify({forum_id}),
        headers: { 'Content-Type': 'application/json' },
        });

    if (response.ok) {
        document.location.reload();
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

const newPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const content = document.querySelector('#postContent').value.trim();
    const forum_id = document.querySelector('[data-forum_id]').getAttribute('data-forum_id');
    
    if (title && content) {
        const response = await fetch('/api/post/', {
            method: 'POST',
            body: JSON.stringify({title, content, forum_id}),
            headers: { 'Content-Type': 'application/json' },
        });
    
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText)
    }
    } else {
        // Warns user of missing 
        document.querySelector('.post-err').textContent = "Your post must have a title and post content!"
    }
}

const newComment = async (event) => {

    event.preventDefault();

    const comment = document.querySelector('[data-comment]').value.trim();
    const post_id = document.querySelector('[data-postid]').getAttribute('data-postid');

    if (comment && post_id) {
        const response = await fetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({comment, post_id}),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            document.location.reload()
        } else {
            alert(response.statusText)
        }
    } else {
        alert("You must have add a comment first!")
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

const newPostModal = async (event) => {
    event.preventDefault();
    const newPostModal = document.querySelector('[data-modal-post]')
    newPostModal.showModal()
}

const closePostModal = async (event) => {
    event.preventDefault();
    const newPostModal = document.querySelector('[data-modal-post]')
    newPostModal.close()
}