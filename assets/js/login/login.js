
document.addEventListener("DOMContentLoaded", function() {


    const loginForm = document.getElementById("login-form-element");
    const registerForm = document.getElementById("register-form-element");


    loginForm.addEventListener("submit", function(event) {


        event.preventDefault();


        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const userType = document.querySelector('input[name="user-type"]:checked').id;


        console.log("Tentativa de login:", { email, userType });

        if (userType === "user-type-admin" && email === "teste@teste" && password === "teste123") {
            alert("Login de Administrador bem-sucedido!");

            window.location.href = "./product.html";

        } else if (userType === "user-type-user" && email === "teste@teste" && password === "teste123") {
            alert("Login de Usuário bem-sucedido!");

            window.location.href = "./product.html";
        } else {
            alert("Email, senha ou tipo de usuário incorretos!");
        }
    });


    registerForm.addEventListener("submit", function(event) {


        event.preventDefault();


        const name = document.getElementById("registerName").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("registerConfirmPassword").value;


        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        if (password.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
            return;
        }


        console.log("Novo cadastro realizado:", { name, email });

        alert("Cadastro realizado com sucesso!");


        window.location.href = "login-success.html";


    });

});