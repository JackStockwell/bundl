// Get references to the login and signup forms
const loginForm = document.querySelector('.login-form');
const signupForm = document.querySelector('.signup-form');
const loginButton = document.querySelector('#login-button');
const signupButton = document.querySelector('#signup-button');

const usernameLoginInput = document.querySelector('#username-login');
const emailLoginInput = document.querySelector('#email-login');
const passwordLoginInput = document.querySelector('#password-login');

const usernameSignupInput = document.querySelector('#username-signup');
const emailSignupInput = document.querySelector('#email-signup');
const passwordSignupInput = document.querySelector('#password-signup');

// Add event listeners for form submissions
loginForm.addEventListener('submit', handleLogin);
signupForm.addEventListener('submit', handleSignup);

// Add event listeners for button clicks
loginButton.addEventListener('click', showLoginForm);
signupButton.addEventListener('click', showSignupForm);

// Function to handle login form submission
function handleLogin(event) {
  event.preventDefault();
  // Retrieve input values
  const username = usernameLoginInput.value;
  const email = emailLoginInput.value;
  const password = passwordLoginInput.value;

  console.log('Login form submitted');
}

// Function to handle signup form submission
function handleSignup(event) {
  event.preventDefault();
  // Retrieve input values
  const username = usernameSignupInput.value;
  const email = emailSignupInput.value;
  const password = passwordSignupInput.value;

  console.log('Signup form submitted');
}

// Function to show the login form
function showLoginForm(event) {
  event.preventDefault();
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
}

// Function to show the signup form
function showSignupForm(event) {
  event.preventDefault();
  signupForm.style.display = 'block';
  loginForm.style.display = 'none';
}
