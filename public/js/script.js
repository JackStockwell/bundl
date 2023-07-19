const handleLogout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/welcome')
    } else {
        alert(response.statusText)
    }
    console.log("Logout!")
}