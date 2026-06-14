// Default Login

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// Login

function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {

        sessionStorage.setItem(
            "loggedIn",
            "true"
        );

        window.location.href =
            "dashboard.html";

    } else {

        document.getElementById(
            "error"
        ).innerText =
            "Invalid Username or Password";
    }
}

// Logout

function logout() {

    sessionStorage.removeItem(
        "loggedIn"
    );

    window.location.href =
        "login.html";
}

// Protect Pages

if (
    window.location.pathname.includes(
        "dashboard.html"
    ) ||
    window.location.pathname.includes(
        "index.html"
    )
) {

    if (
        sessionStorage.getItem(
            "loggedIn"
        ) !== "true"
    ) {

        window.location.href =
            "login.html";
    }
}

// Dark Mode

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );

    const mode =
        document.body.classList.contains(
            "dark-mode"
        );

    localStorage.setItem(
        "darkMode",
        mode
    );
}

// Load Saved Theme

window.onload = function () {

    if (
        localStorage.getItem(
            "darkMode"
        ) === "true"
    ) {

        document.body.classList.add(
            "dark-mode"
        );
    }
};