function addToUserDashboard(fnm, lnm, unm, uml, ufne) {
    const addedUsers = JSON.parse(localStorage.getItem('userProfile')) || [];
    const uRole = uml.endsWith('admin.io') ? 'admin' : 'user';

    const information = {
        picture: "../../images/ProfileIcon.webp",
        employeeName: fnm,
        employeeAge: lnm,
        employeeCity: unm,
        employeeEmail: uml,
        employeePhone: ufne,
        employeePost: uRole,
        startDate: new Date().toISOString().split('T')[0]
    }
    addedUsers.push(information)
    localStorage.setItem('userProfile', JSON.stringify(addedUsers));
}

addToUserDashboard(firstNameValue, lastNameValue, signupUserNameValue, signupEmailValue, signupPhoneValue);

