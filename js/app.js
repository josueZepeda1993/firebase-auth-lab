//<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
  import{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
  } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js"

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAEqRLJBQwMvNdV6Fqi_WJnULylAIl9FeI",
    authDomain: "lab-auth-firebase-b11ed.firebaseapp.com",
    projectId: "lab-auth-firebase-b11ed",
    storageBucket: "lab-auth-firebase-b11ed.firebasestorage.app",
    messagingSenderId: "777560427701",
    appId: "1:777560427701:web:091e420839810fb93a42fc"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
//</script>
console.log("Firebase conectado correctamente");
console.log(app);

// Form
const formRegistro = document.getElementById("form-registro");

if (formRegistro) {
    formRegistro.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email-registro").value;
        const password = document.getElementById("password-registro").value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            alert("Usuario registrado correctamente");

            console.log("Usuario creado:", userCredential.user);

            window.location.href = "index.html";
        }catch (error) {
            console.error("Error al registrar usuario", error.message);
            alert("Error al registrar usuario: " + error.message);
        }        
    });
}

// Conexion Form
const formLogin = document.getElementById("form-login");

if (formLogin) {
    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const email = document.getElementById("email-login").value;
        const password = document.getElementById("password-login").value;

        try {
            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
            
            console.log(
                "Usuario autenticado:", userCredential.user
            );

            alert("Inicio de sesion exitoso");
            window.location.href = "dashboard.html";
        } catch (error) {
            console.error(error);
            alert(
                "Correo electronico o contraserña incorrectos"
            );
        }
    });
}

// Private
const usuarioInfo = document.getElementById("usuario-info");

if (usuarioInfo) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            usuarioInfo.textContent = 
            "Bienvenido: " + user.email;
        } else {
            window.location.href = "index.html";
        }
    });
}

// Logout
const btnLogout = document.getElementById("btn-logout");

if (btnLogout) {
    btnLogout.addEventListener("click", async () => {
        try {
            await signOut(auth);
            alert("Session cerrada correctamente");
            window.location.href = "index.html";
        } catch (error) {
            console.error(error);
            alert("Error al cerrar sesion");
        }
    });
}