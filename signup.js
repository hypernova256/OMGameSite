const defaultUsers = [
    {username: "tetriscat", password: "meow", email: "cat@meow.com"},
    {username: "admin", password: "admin123", email: "admin@admin.com"}
];
const users = JSON.parse(localStorage.getItem("users")) || defaultUsers;

function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function checkPasswordStrength() {
    const strengthDiv = document.getElementById("passwordStrength");
    const pwd = document.getElementById("newPassword").value;
    let strength = 0;

    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[\W_]/.test(pwd)) strength++;

    if (pwd.length === 0) {
        strengthDiv.textContent = "";
        return;
    }

    if (strength <= 1) {
        strengthDiv.textContent = "Weak";
        strengthDiv.className = "strength weak";
    } else if (strength === 2 || strength === 3) {
        strengthDiv.textContent = "Medium";
        strengthDiv.className = "strength medium";
    } else {
        strengthDiv.textContent = "Strong";
        strengthDiv.className = "strength strong";
    }
}

const eyeIcon = `
<svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
</svg>`;

const eyeOffIcon = `
<svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.04 10.04 0 012.873-4.568M6.18 6.18a10.05 10.05 0 015.82-1.18c4.478 0 8.268 2.943 9.542 7a10.051 10.051 0 01-4.623 5.592M3 3l18 18"/>
</svg>`;

function togglePassword(id, iconSpan) {
  const input = document.getElementById(id);
  const isHidden = input.type === "password";

  input.type = isHidden ? "text" : "password";
  iconSpan.innerHTML = isHidden ? eyeIcon : eyeOffIcon;
}

function signup() {
    const user = document.getElementById("newUsername").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("newPassword").value;
    const confirm = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("termsCheckbox").checked;
    const message = document.getElementById("signupMessage");

    if (!user || !email || !pass || !confirm) {
        message.textContent = "Please fill out all fields.";
        message.className = "message error";
        return;
    }

    if (!validateEmail(email)) {
        message.textContent = "Invalid email address.";
        message.className = "message error";
        return;
    }

    if (pass !== confirm) {
        message.textContent = "Passwords do not match.";
        message.className = "message error";
        return;
    }

    if (!terms) {
        message.textContent = "You must agree to the terms and conditions.";
        message.className = "message error";
        return;
    }

    const exists = users.find(u => u.username.toLowerCase() === user.toLowerCase());
    if (exists) {
        message.textContent = "Username already taken.";
        message.className = "message error";
        return;
    }

    users.push({username: user, password: pass, email: email});
    saveUsers();
    localStorage.setItem("loggedInUser", user);
    message.textContent = "Account created! Logging you in...";
    message.className = "message success";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
}

const alreadyLoggedIn = localStorage.getItem("loggedInUser");
if (alreadyLoggedIn) {
    document.querySelector(".login-card").innerHTML = `
      <h2>Welcome back, ${alreadyLoggedIn}!</h2>
      <p>You are already logged in.</p>
      <button onclick="logout()">Logout</button>
    `;
}

function logout() {
    localStorage.removeItem("loggedInUser");
    location.reload();
}

["newUsername", "email", "newPassword", "confirmPassword"].forEach(id => {
    document.getElementById(id).addEventListener("keydown", function (event) {
        if (event.key === "Enter") signup();
    });
});