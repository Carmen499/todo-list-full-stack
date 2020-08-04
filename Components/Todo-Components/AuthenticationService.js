
//js file to check for user login auth
class AuthenticationService {
    registerSuccessfulLogin(username, password) {
        console.log('registering successful login')
        sessionStorage.setItem('authenticatedUser', username)

    }
//to remove authenticated user from session storage on logout
    logout() {
        console.log('logout successful')
        sessionStorage.removeItem('authenticatedUser')
    }
//to check if user has successfully logged in or not
    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null)  return false

        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null)  return ""

        return user
    }
}

export default new AuthenticationService();