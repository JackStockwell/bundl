const openNewPost = document.querySelector('[data-open-post]')
const closeNewPost = document.querySelector('[data-close-post]')
const newPostModal = document.querySelector('[data-modal-post]')

openNewPost.addEventListener('click', () => {
    newPostModal.showModal();
});

closeNewPost.addEventListener('click', () => {
    newPostModal.close();
});

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
        location.reload()
    } else {
        alert(response.statusText)
    }
    } else {
        // Warns user of missing 
        document.querySelector('.post-err').textContent = "Your post must have a title and post content!"
    }
}

const newComment = async (event) => {

    console.log("Click")



    event.preventDefault();

    const comment = document.querySelector('[data-comment]').value.trim();
    const post_id = document.querySelector('[data-postid]').getAttribute('data-postid');
    console.log(comment, post_id)
    if (comment && post_id) {
        const response = await fetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({comment, post_id}),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            location.reload()
        } else {
            alert(response.statusText)
        }
    } else {
        alert("You must have add a comment first!")
    }
}
