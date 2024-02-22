/**
 * form Toggling and Visibility functions
 */

const navLoginToggle = document.querySelector('.nvlogin');
const navSignupToggle = document.querySelector('.nvsignup');


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
/******** End of forms toggling **********/
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
    loginPage.style.display = 'flex';
    window.location.href = 'form.html?#acountloginpage';
    loginPage.style.display = 'flex';
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

        // Store form data in localStorage
        const formData = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            username: signupUserNameValue,
            email: signupEmailValue,
            phone: signupPhoneValue,
            password: signupPasswordValue
        };

        localStorage.setItem('formData', JSON.stringify(formData));
    }

    const allInputsValid = Array.from(signupForm.querySelectorAll('.form_div')).every(div => div.classList.contains('success'));
    const anyInputsEmpty = Array.from(signupForm.querySelectorAll('.form_div')).some(div => div.querySelector('input').value.trim() === '');

    if (allInputsValid && !anyInputsEmpty) {
        signupForm.submit(); // Submit the form
    } else {
        // Display an error message or handle the empty fields appropriately
        alert('Some fields are empty or invalid.');
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

