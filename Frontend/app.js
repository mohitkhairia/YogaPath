const API_URL = 'http://localhost:3000/api';

// Function to fetch classes from backend
async function getClasses() {
  try {
    const response = await axios.get(`${API_URL}/classes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
}

// Function to render classes to the UI
function renderClasses(classes) {
  const appDiv = document.getElementById('app');
  console.log(classes)
  const classesHTML = classes.map(classItem => `
    <div class="bg-gray-100 rounded p-4 mb-4">
      <h2 class="text-lg font-semibold">${classItem.title}</h2>
      <p class="text-gray-700">${classItem.description}</p>
      <p class="text-gray-600">Teacher: ${classItem.teacher}</p>
      <p class="text-gray-600">Date: ${new Date(classItem.date).toDateString()}</p>
    </div>
  `).join('');
  appDiv.innerHTML = classesHTML;
}

// Function to login user
async function login(emailOrNumber, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, { emailOrNumber, password });
    const userData = response.data;
    // Redirect to profile page or display booked classes
    // For now, let's just log the user data to console
    console.log('User data:', userData);
    // Here you can add code to redirect the user to their profile page
  } catch (error) {
    // Check if the error status code is 401 (Unauthorized)
    if (error.response.status === 401) {
      // Display an error message to the user indicating invalid credentials
      alert('Invalid email/number or password. Please try again.');
    } else {
      console.error('Error logging in:', error);
    }
  }
}

// Function to register user
async function register(email, password) {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    const userData = response.data;
    // Redirect to profile page or display success message
    // For now, let's just log the user data to console
    console.log('User registered:', userData);
  } catch (error) {
    console.error('Error registering user:', error);
  }
}

// Function to switch to registration form
function switchToRegister() {
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('registerForm').classList.remove('hidden');
}

// Function to switch to login form
function switchToLogin() {
  document.getElementById('registerForm').classList.add('hidden');
  document.getElementById('loginForm').classList.remove('hidden');
}
// Function to navigate to Home screen
function goToHome() {
  window.location.href = 'index.html';
}

// Function to navigate to Explore screen
function goToExplore() {
  window.location.href = 'explore.html';
}

// Function to navigate to Login screen
function goToLogin() {
  window.location.href = 'login.html';
}

// Function to initialize the app on each page
async function init() {
  // Check the current page and initialize accordingly
  const adress = window.location.pathname;
  const currentPage = adress.substring(adress.lastIndexOf('/') + 1);
  
  console.log(currentPage)
  if (currentPage === 'index.html' || currentPage === '/') {
    console.log('Initializing app...');
    try {
      const classes = await getClasses();
      renderClasses(classes);
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  } else if (currentPage === 'login.html') {
    // Add event listener to login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const emailOrNumber = document.getElementById('emailOrNumber').value;
        const password = document.getElementById('password').value;
        login(emailOrNumber, password);
      });
    }

    // Add event listener to register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        register(email, password);
      });
    }
  }
}

// Call init function when the page loads
document.addEventListener('DOMContentLoaded', init);
