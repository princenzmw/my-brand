/**
 * form Toggling and Visibility functions
 */

const navLoginToggle = document.querySelector('.nvlogin');
const navSignupToggle = document.querySelector('.nvsignup');
const navLogOutToggle = document.getElementById('logOut');


const signupPage = document.getElementById('acountsignuppage');
const loginPage = document.getElementById('acountloginpage');
const acoountRecoverPage = document.getElementById('acountrecoverypage');

const showLoginPage = document.querySelector('.go_to_login');
const showSignupPage = document.querySelector('.go_to_signup');
const showRecoverPage = document.querySelector('.forgot_pass');
const backToLogin = document.querySelector('.back_to_login');
const backToSignup = document.querySelector('.back_to_signup');

navLoginToggle.addEventListener('click', () => {
    loginPage.style.display = 'flex';
    signupPage.style.display = 'none';
})
navSignupToggle.addEventListener('click', () => {
    signupPage.style.display = 'flex';
    loginPage.style.display = 'none';
})

showLoginPage.addEventListener('click', () => {
    loginPage.style.display = 'flex';
    signupPage.style.display = 'none';
    acoountRecoverPage.style.display = 'none';
})
showSignupPage.addEventListener('click', () => {
    signupPage.style.display = 'flex';
    loginPage.style.display = 'none';
})
showRecoverPage.addEventListener('click', () => {
    acoountRecoverPage.style.display = 'flex';
    loginPage.style.display = 'none';
})
backToLogin.addEventListener('click', () => {
    loginPage.style.display = 'flex';
    acoountRecoverPage.style.display = 'none';
})
backToSignup.addEventListener('click', () => {
    signupPage.style.display = 'flex';
    acoountRecoverPage.style.display = 'none';
})

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
    })
});


/******** End of forms toggling and othe usual functionalities **********/
/**
 * Users form Validation functions
 */

const users = [];

// Function to hash a password
function hashPassword(password) {
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hashedPassword;
}

// Function to add a new user to the system
function addUser(firstname, lastname, username, email, phone, password, role = 'user') {
    const hashedPassword = hashPassword(password);
    const newUser = { firstname, lastname, username, email, phone, password: hashedPassword, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to edit an existing user in the system
function editUser(firstname, lastname, username, email, phone, password, role) {
    const existingUserIndex = users.findIndex(user => user.username === username);

    if (existingUserIndex !== -1) {
        const hashedPassword = hashPassword(password);
        users[existingUserIndex].password = hashedPassword;
        users[existingUserIndex].firstname = firstname;
        users[existingUserIndex].lastname = lastname;
        users[existingUserIndex].email = email;
        users[existingUserIndex].phone = phone;
        users[existingUserIndex].role = role;
        localStorage.setItem('users', JSON.stringify(users));
        console.log('User edited successfully');
    } else {
        console.error('User not found');
    }
}

// Function to check if a username already exists
function isUsernameExists(username) {
    return users.some(user => user.username === username);
}

// Function to authenticate user
function authenticateUser(username, password) {
    const hashedPassword = hashPassword(password); // Hash the provided password
    const user = users.find(u => u.username === username && u.password === hashedPassword);
    return user ? user : null;
}

// Function to set user session
function setUserSession(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Function to get current user from session
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Function to check if user is authenticated
function isAuthenticated() {
    return !!getCurrentUser();
}

// Function to log out user
function logoutUser() {
    localStorage.removeItem('currentUser');
}

// Function to redirect to the login page
function redirectToLoginPage() {
    loginPage.style.display = 'flex';
    signupPage.style.display = 'none';
    acoountRecoverPage.style.display = 'none';
}


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

signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    checkSignupInputs();
})

const checkSignupInputs = () => {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const signupUserNameValue = signupUserName.value.trim();
    const signupEmailValue = signupEmail.value.trim();
    const signupPhoneValue = signupPhone.value.trim();
    const signupPasswordValue = signupPassword.value.trim();
    const signupPass2Value = signupPass2.value.trim();

    const nameRegex = /^[a-zA-Z-' ]{2,30}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{3,14}$/;

    !nameRegex.test(firstNameValue) ? addErrorMessage(firstName, "Can't be blank!") : addSuccessMessage(firstName);
    !nameRegex.test(lastNameValue) ? addErrorMessage(lastName, "Can't be blank!") : addSuccessMessage(lastName);
    !usernameRegex.test(signupUserNameValue) ? addErrorMessage(signupUserName, "Enter a Valid Usename!") : addSuccessMessage(signupUserName);
    !emailRegex.test(signupEmailValue) ? addErrorMessage(signupEmail, "Invalid Email!") : addSuccessMessage(signupEmail);
    !phoneNumberRegex.test(signupPhoneValue) ? addErrorMessage(signupPhone, "Invalid Phone Number!") : addSuccessMessage(signupPhone);
    !strongPasswordRegex.test(signupPasswordValue) ? addErrorMessage(signupPassword, "Enter a strong Password!") : addSuccessMessage(signupPassword);

    if (signupPass2Value === '') {
        addErrorMessage(signupPass2, "Can't be blank!");
    } else if (signupPass2Value !== signupPasswordValue) {
        addErrorMessage(signupPass2, 'Passwords do not match');
    } else {
        addSuccessMessage(signupPass2);
    }

    const allInputsValid = Array.from(signupForm.querySelectorAll('.form_div')).every(div => div.classList.contains('success'));
    const anyInputsEmpty = Array.from(signupForm.querySelectorAll('.form_div')).some(div => div.querySelector('input').value.trim() === '');

    if (allInputsValid && !anyInputsEmpty) {
        if (isUsernameExists(signupUserNameValue)) {
            console.error('Username already exists');
        } else {
            addUser(firstNameValue, lastNameValue, signupUserNameValue, signupEmailValue, signupPhoneValue, signupPasswordValue);
            console.log('User registered successfully');
            signupForm.reset();
            redirectToLoginPage();
            signupForm.querySelectorAll('.form_div .goodInput').forEach(div => div.style.display = 'none');
            signupForm.querySelectorAll('.form_div').forEach(div => div.classList.remove('success'));
        }
    }
};

const addErrorMessage = (elem, message) => {
    const formDiv = elem.parentElement;
    const msgContainer = formDiv.querySelector('small');

    msgContainer.innerText = message;
    formDiv.classList = 'form_div error';
}

const addSuccessMessage = (elem) => {
    const formDiv = elem.parentElement;
    formDiv.classList = 'form_div success';
}

if (localStorage.getItem('currentUser') !== null) {
    navLogOutToggle.style.display = 'block';
    navLoginToggle.style.display = 'none';
    navSignupToggle.style.display = 'none';
}

loginPage.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('logusr').value;
    const password = document.getElementById('logpswd').value;

    const user = authenticateUser(username, password);

    if (user) {
        setUserSession(user);
        console.log('Login successful', user.username);

        // Extract domain from email
        const domain = user.email.split('@')[1];

        // Check if the domain ends with 'admin.io'
        if (domain.endsWith('admin.io')) {
            window.location.href = 'pages/Admin/dashboard.html'; // Redirect to admin dashboard
        }
        loginPage.style.display = 'none';
    } else {
        console.error('Invalid username or password');
    }
});

// Function for logging out the user
navLogOutToggle.addEventListener('click', () => {
    logoutUser();
    navLoginToggle.style.display = 'block';
    navSignupToggle.style.display = 'block';
    navLogOutToggle.style.display = 'none';
})
