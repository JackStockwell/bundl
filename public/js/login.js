// Function to handle login form submission
const handleLogin = async (event) => {
  event.preventDefault();
  // Retrieve input values
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();


  if (email && password) {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {'Content-Type': 'application/json'},
    });

    console.log(response)

    if (response.ok) {
        document.location.replace('/')
    } else {
        alert("Incorrect Email or Password!")
        console.log(response)
    }
  } 
  console.log("Login Submitted")
}

// Function to handle sign-up form submission
const handleSignup = async (event) => {
  event.preventDefault();
  // Retrieve input values
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const passwordConfirm = document.querySelector('#confirm-signup').value.trim();

  // Ensures all fields are inserted and password confirmation matches.
  if (username && email && password === passwordConfirm) {
  
    const response = await fetch('/api/users/create', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      document.location.replace('/');
    } else {
      const PWerror= document.getElementById("error-span")
       PWerror.innerHTML='Password CANNOT be less than 8 or bigger than 32!'
    }
  }

}

