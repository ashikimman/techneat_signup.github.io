window.addEventListener('load', function () {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        window.location.href = '/dashboard.html';  // Redirect to dashboard if already logged in
    }
});
document.getElementById("logoutButton").addEventListener("click", function () {
    // Clear sessionStorage when logging out
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');  // Optional: Remove stored user data
    window.location.href = '/login.html';  // Redirect to login page after logout
}); 