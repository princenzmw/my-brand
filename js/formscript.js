/**
   * form Toggling and Visibility functions
   */

const navLoginToggle = document.querySelector('.nvlogin');
const navSignupToggle = document.querySelector('.nvsignup');
const navLogOutToggle = document.getElementById('logOut');
const navUpdateToggle = document.getElementById('updateMe');

const signupPage = document.getElementById('acountsignuppage');
const loginPage = document.getElementById('acountloginpage');
const acoountRecoverPage = document.getElementById('acountrecoverypage');
const userUpdateModal = document.getElementById('editUserModal');

const showLoginPage = document.querySelector('.go_to_login');
const showSignupPage = document.querySelector('.go_to_signup');
const showRecoverPage = document.querySelector('.forgot_pass');
const backToLogin = document.querySelector('.back_to_login');
const backToSignup = document.querySelector('.back_to_signup');

navLoginToggle.addEventListener('click', () => {
  loginPage.style.display = 'flex';
  signupPage.style.display = 'none';
});
navSignupToggle.addEventListener('click', () => {
  signupPage.style.display = 'flex';
  loginPage.style.display = 'none';
});

// Close the modal when the user clicks on <span> (x)
document.querySelector('.close').addEventListener('click', () => {
  userUpdateModal.style.display = 'none';
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
  if (event.target === userUpdateModal) {
    userUpdateModal.style.display = 'none';
  }
});

showLoginPage.addEventListener('click', () => {
  loginPage.style.display = 'flex';
  signupPage.style.display = 'none';
  acoountRecoverPage.style.display = 'none';
});
showSignupPage.addEventListener('click', () => {
  signupPage.style.display = 'flex';
  loginPage.style.display = 'none';
});
showRecoverPage.addEventListener('click', () => {
  acoountRecoverPage.style.display = 'flex';
  loginPage.style.display = 'none';
});
backToLogin.addEventListener('click', () => {
  loginPage.style.display = 'flex';
  acoountRecoverPage.style.display = 'none';
});
backToSignup.addEventListener('click', () => {
  signupPage.style.display = 'flex';
  acoountRecoverPage.style.display = 'none';
});

/**
 * Password Visibility toggling buttons
 */
const togglePasswordVisibility = (showIcon, hideIcon, passwordInput) => {
  showIcon.addEventListener('click', () => {
    passwordInput.type = 'text';
    showIcon.style.display = 'none';
    hideIcon.style.display = 'block';
  });

  hideIcon.addEventListener('click', () => {
    passwordInput.type = 'password';
    hideIcon.style.display = 'none';
    showIcon.style.display = 'block';
  });
};

// For signup form
const signupShowPassIcon = document.querySelector('#acountsignuppage .showPass');
const signupHidePassIcon = document.querySelector('#acountsignuppage .hidePass');
const signupPasswordInput = document.getElementById('regpasswd');
togglePasswordVisibility(signupShowPassIcon, signupHidePassIcon, signupPasswordInput);

// For signup form - Repeat Password
const signRptShowPassIcon = document.querySelector('#signupform .form_div:nth-child(7) .showPass');
const signRptHidePassIcon = document.querySelector('#signupform .form_div:nth-child(7) .hidePass');
const signupPassword2 = document.getElementById('regpasswd2');
togglePasswordVisibility(signRptShowPassIcon, signRptHidePassIcon, signupPassword2);

// For login form
const loginShowPassIcon = document.querySelector('#acountloginpage .showPass');
const loginHidePassIcon = document.querySelector('#acountloginpage .hidePass');
const loginPasswordInput = document.getElementById('logpswd');
togglePasswordVisibility(loginShowPassIcon, loginHidePassIcon, loginPasswordInput);

// For recovery form
const recoveryShowPassIcon = document.querySelector('#acountrecoverypage .showPass');
const recoveryHidePassIcon = document.querySelector('#acountrecoverypage .hidePass');
const recoveryPasswordInput = document.getElementById('recpswd');
togglePasswordVisibility(recoveryShowPassIcon, recoveryHidePassIcon, recoveryPasswordInput);

// For recovery form - Repeat Password
const recoveryRptShowPassIcon = document.querySelector('#recoveryform .form_div:nth-child(3) .showPass');
const recoveryRptHidePassIcon = document.querySelector('#recoveryform .form_div:nth-child(3) .hidePass');
const recoveryRptPasswordInput = document.getElementById('recpswdrpt');
togglePasswordVisibility(recoveryRptShowPassIcon, recoveryRptHidePassIcon, recoveryRptPasswordInput);

// Using the red button on the form to close it
document.querySelectorAll('.closeTheForm').forEach(el => {
  el.addEventListener('click', () => {
    signupPage.style.display = 'none';
    loginPage.style.display = 'none';
    acoountRecoverPage.style.display = 'none';
  });
});

/** ****** End of forms toggling and othe usual functionalities **********/
/**
 * Signup form Validation functions
 */
const signupForm = document.getElementById('signupform');
const firstName = document.getElementById('firstnm');
const lastName = document.getElementById('lastnm');
const signupUserName = document.getElementById('usernm');
const signupEmail = document.getElementById('sgnemail');
const signupPhone = document.getElementById('phonenbr');
const signupPassword = document.getElementById('regpasswd');
const signupPass2 = document.getElementById('regpasswd2');

// Function to check user's login status and update UI
function checkLoginStatus() {
  const token = localStorage.getItem('token');

  if (token) {
    // The user appears to be logged in, verify the token with the backend
    fetch('https://prinko-backend.onrender.com/api/user/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        // If the token is valid, the server should return the user details
        if (response.ok) {
          navLoginToggle.style.display = 'none';
          navSignupToggle.style.display = 'none';
          navLogOutToggle.style.display = 'block';
          navUpdateToggle.style.display = 'block';
        } else {
          // If the token is not valid, clear it from localStorage and update UI
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          navLoginToggle.style.display = 'block';
          navSignupToggle.style.display = 'block';
          navLogOutToggle.style.display = 'none';
          navUpdateToggle.style.display = 'none';
        }
      })
      .catch(error => {
        console.error('Error validating token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navLoginToggle.style.display = 'block';
        navSignupToggle.style.display = 'block';
        navLogOutToggle.style.display = 'none';
        navUpdateToggle.style.display = 'none';
      });
  } else {
    // The user is not logged in
    navLoginToggle.style.display = 'block';
    navSignupToggle.style.display = 'block';
    navLogOutToggle.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    checkSignupInputs();
  });

  const addErrorMessage = (elem, message) => {
    const formDiv = elem.parentElement;
    const msgContainer = formDiv.querySelector('small');

    msgContainer.innerText = message;
    formDiv.classList = 'form_div error';
  };

  const addSuccessMessage = (elem) => {
    const formDiv = elem.parentElement;
    formDiv.classList = 'form_div success';
  };

  const checkSignupInputs = () => {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const signupUserNameValue = signupUserName.value.trim();
    const signupEmailValue = signupEmail.value.trim();
    const signupPhoneValue = signupPhone.value.trim();
    const signupPasswordValue = signupPassword.value.trim();
    const signupPass2Value = signupPass2.value.trim();

    const msgDiv = document.getElementById('log_message');

    const nameRegex = /^[a-zA-Z-' ]{2,30}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneNumberRegex = /^(?:[0-9] ?){6,14}[0-9]$/;
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{3,14}$/;

    !nameRegex.test(firstNameValue) ? addErrorMessage(firstName, "Can't be blank!") : addSuccessMessage(firstName);
    !nameRegex.test(lastNameValue) ? addErrorMessage(lastName, "Can't be blank!") : addSuccessMessage(lastName);
    !usernameRegex.test(signupUserNameValue) ? addErrorMessage(signupUserName, 'Enter a Valid Usename!') : addSuccessMessage(signupUserName);
    !emailRegex.test(signupEmailValue) ? addErrorMessage(signupEmail, 'Invalid Email!') : addSuccessMessage(signupEmail);
    !phoneNumberRegex.test(signupPhoneValue) ? addErrorMessage(signupPhone, 'Invalid Phone Number!') : addSuccessMessage(signupPhone);
    !strongPasswordRegex.test(signupPasswordValue) ? addErrorMessage(signupPassword, 'Enter a strong Password!') : addSuccessMessage(signupPassword);

    if (signupPass2Value === '') {
      addErrorMessage(signupPass2, "Can't be blank!");
    } else if (signupPass2Value !== signupPasswordValue) {
      addErrorMessage(signupPass2, 'Passwords do not match');
    } else {
      addSuccessMessage(signupPass2);
    }
    const payload = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      username: signupUserNameValue,
      phone: signupPhoneValue,
      email: signupEmailValue,
      password: signupPasswordValue
    };
    fetch('https://prinko-backend.onrender.com/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            console.error('Registration failed:', data);
            throw new Error(data.message || 'An error occurred while registering');
          });
        }
        return res.json();
      })
      .then(data => {
        signupForm.reset();
        loginPage.style.display = 'flex';
        signupPage.style.display = 'none';
        acoountRecoverPage.style.display = 'none';
        signupForm.querySelectorAll('.form_div .goodInput').forEach(div => {
          div.style.display = 'none';
        });
        signupForm.querySelectorAll('.form_div').forEach(div => div.classList.remove('success'));
      })
      .catch(error => {
        console.error('Registration error:', error);
        if (error.errors && Array.isArray(error.errors)) {
          msgDiv.innerHTML = error.errors.map(err => `${err.msg}`).join('<br>');
        } else {
          msgDiv.innerHTML = error.message;
        }
      });
  };

  // End of sign up
  const loginForm = document.getElementById('loginform');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const messageDiv = document.querySelector('.log_message');

    const email = document.getElementById('logusr').value.trim();
    const password = document.getElementById('logpswd').value.trim();

    const payload = { email, password };
    let token;

    fetch('https://prinko-backend.onrender.com/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'Failed to login');
          });
        }
        return response.json();
      })
      .then(data => {
        token = data.token;

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Fetch the currently logged-in user's details
        return fetch('https://prinko-backend.onrender.com/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        return response.json();
      })
      .then(userData => {
        // Store the userId in localStorage
        localStorage.setItem('userId', userData._id);

        loginForm.reset();
        messageDiv.textContent = 'Logged in successfully!';
        window.location.href = 'index.html';
      })
      .catch(error => {
        console.error('Login error:', error);
        messageDiv.textContent = error.message;
      });
  });

  // Function for logging out the user
  function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    // Update UI elements to reflect that the user has logged out
    navLoginToggle.style.display = 'block';
    navSignupToggle.style.display = 'block';
    navLogOutToggle.style.display = 'none';
    navUpdateToggle.style.display = 'none';

    window.location.href = 'index.html';
  }

  // Event listener for the logout button
  navLogOutToggle.addEventListener('click', () => {
    logoutUser();
  });
});

// ****************************************************************
/**
 * Get data to be filled in the
 * User Update form
 */

// Function to pre-fill the form with user data
function fillFormWithUserData(userData) {
  document.getElementById('editFirstName').value = userData.firstName || '';
  document.getElementById('editLastName').value = userData.lastName || '';
  document.getElementById('editUserName').value = userData.username || '';
  document.getElementById('editEmail').value = userData.email || '';
  document.getElementById('editPhone').value = userData.phone || '';
  document.getElementById('profPicUpdate').src = `https://prinko-backend.onrender.com/api${userData.profilePic}` || '';
  // Continue for other fields...
}

// Function to fetch user data and fill the form
function fetchAndFillUserData() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found, user might not be logged in');
    return;
  }

  fetch('https://prinko-backend.onrender.com/api/user/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      return response.json();
    })
    .then(userData => {
      fillFormWithUserData(userData);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      document.getElementById('upmessage').textContent = error.message;
    });
}

// Call the function when the form is about to be displayed
navUpdateToggle.addEventListener('click', () => {
  fetchAndFillUserData();
  userUpdateModal.style.display = 'block';
});

// ****************************************************************
/**
 * UPDATE FORM
 */
const updateForm = document.getElementById('editUserForm');

updateForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Assuming the user ID is available and stored, for example, in localStorage
  const userId = localStorage.getItem('userId');
  const formData = new FormData(updateForm);

  fetch(`https://prinko-backend.onrender.com/api/user/update/${userId}`, {
    method: 'PUT',
    headers: {
      // Assuming the token is stored in localStorage after login
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: formData
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          console.error('Update failed:', data);
          throw new Error(data.message || 'An error occurred while updating');
        });
      }
      return res.json();
    })
    .then(data => {
      updateForm.reset();
      document.getElementById('upmessage').textContent = 'User Updated successfully!';
      // Optionally, redirect to another page
      // window.location.href = '/success-page.html';
    })
    .catch(error => {
      console.error('Update error:', error);
      document.getElementById('upmessage').textContent = error.message;
    });
});
