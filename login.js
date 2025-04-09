    const defaultUsers = [
              { username: "tetriscat", password: "meow" },
              { username: "admin", password: "admin123" }
            ];
            const users = JSON.parse(localStorage.getItem("users")) || defaultUsers;

            function login() {
                const user = document.getElementById("username").value.trim();
                const pass = document.getElementById("password").value.trim();
                const message = document.getElementById("message");

                const matchedUser = users.find(u => u.username === user && u.password === pass);

                if (!user || !pass) {
                    message.textContent = "Please enter both fields.";
                    message.className = "message error";
                    return;
                }

                if (matchedUser) {
                    localStorage.setItem("loggedInUser", user);
                    message.textContent = "Login successful!";
                    message.className = "message success";

                    setTimeout(() => {
                        message.textContent = `Welcome, ${user}! Redirecting...`;
                        setTimeout(() => {
                            window.location.href = "index.html";
                        }, 2000);
                    }, 1500);
                } else {
                    message.textContent = "Invalid username or password.";
                    message.className = "message error";
                }
            }

            const alreadyLoggedIn = localStorage.getItem("loggedInUser");
            if (alreadyLoggedIn) {
                document.querySelector(".login-card").innerHTML = `
                  <h2>Welcome back, ${alreadyLoggedIn}!</h2>
                  <p>You are already logged in.</p>
                  <button onclick="logout()">Logout</button>
                `;
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

            function logout() {
                localStorage.removeItem("loggedInUser");
                location.reload();
            }

            document.getElementById("username").addEventListener("keydown", function(event) {
                if (event.key === "Enter") {
                    login();
                }
            });

            document.getElementById("password").addEventListener("keydown", function(event) {
                if (event.key === "Enter") {
                    login();
                }
            });