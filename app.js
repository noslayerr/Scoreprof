// Configuración de Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyA8bo5qHaeIEU00B5gYl4b_JFYgc34kqYc",
    authDomain: "scoreprof-5522f.firebaseapp.com",
    projectId: "scoreprof-5522f",
    storageBucket: "scoreprof-5522f.firebasestorage.app",
    messagingSenderId: "316677905542",
    appId: "1:316677905542:web:0e4fa80099289beaf38507",
    measurementId: "G-ZJ5XWJWL1L"
  };

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Elementos del DOM
const form = document.getElementById("referenceForm");
const searchInput = document.getElementById("search");
const referencesContainer = document.getElementById("references");

// Guardar referencia en Firebase
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const professor = document.getElementById("professor").value.trim();
  const career = document.getElementById("career").value.trim();
  const semester = document.getElementById("semester").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const referenceText = document.getElementById("reference").value.trim();

  db.ref("references").push({
    professor,
    career,
    semester,
    subject,
    referenceText,
    timestamp: new Date().toISOString(),
  })
    .then(() => {
      alert("Referencia guardada correctamente.");
      form.reset();
    })
    .catch((error) => {
      console.error("Error al guardar la referencia: ", error);
    });
});

// Cargar referencias desde Firebase
function loadReferences() {
  db.ref("references").on("value", (snapshot) => {
    referencesContainer.innerHTML = "<h2>Referencias</h2>";
    snapshot.forEach((childSnapshot) => {
      const ref = childSnapshot.val();
      const div = document.createElement("div");
      div.className = "reference";
      div.innerHTML = `
        <p><strong>Profesor:</strong> ${ref.professor}</p>
        <p><strong>Carrera:</strong> ${ref.career}</p>
        <p><strong>Semestre:</strong> ${ref.semester}</p>
        <p><strong>Materia:</strong> ${ref.subject}</p>
        <p><strong>Referencia:</strong> ${ref.referenceText}</p>
      `;
      referencesContainer.appendChild(div);
    });
  });
}

// Filtrar referencias por nombre
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  db.ref("references").once("value", (snapshot) => {
    referencesContainer.innerHTML = "<h2>Referencias</h2>";
    snapshot.forEach((childSnapshot) => {
      const ref = childSnapshot.val();
      if (ref.professor.toLowerCase().includes(query)) {
        const div = document.createElement("div");
        div.className = "reference";
        div.innerHTML = `
          <p><strong>Profesor:</strong> ${ref.professor}</p>
          <p><strong>Carrera:</strong> ${ref.career}</p>
          <p><strong>Semestre:</strong> ${ref.semester}</p>
          <p><strong>Materia:</strong> ${ref.subject}</p>
          <p><strong>Referencia:</strong> ${ref.referenceText}</p>
        `;
        referencesContainer.appendChild(div);
      }
    });
  });
});

// Cargar referencias al inicio
window.onload = loadReferences;






// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA8bo5qHaeIEU00B5gYl4b_JFYgc34kqYc",
    authDomain: "scoreprof-5522f.firebaseapp.com",
    projectId: "scoreprof-5522f",
    storageBucket: "scoreprof-5522f.firebasestorage.app",
    messagingSenderId: "316677905542",
    appId: "1:316677905542:web:0e4fa80099289beaf38507",
    measurementId: "G-ZJ5XWJWL1L"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Lista de malas palabras
const badWords = ["maldicion", "groseria", "otraPalabra"];

// Elementos del DOM
const form = document.getElementById("referenceForm");
const searchInput = document.getElementById("search");
const referencesContainer = document.getElementById("references");

// Guardar referencia en Firebase
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const professor = document.getElementById("professor").value.trim();
  const career = document.getElementById("career").value.trim();
  const semester = document.getElementById("semester").value.trim();
  const subject = document.getElementById("subject").value.trim();
  let referenceText = document.getElementById("reference").value.trim();

  // Filtro de malas palabras
  for (const word of badWords) {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    if (regex.test(referenceText)) {
      alert("Tu comentario contiene palabras no permitidas.");
      return;
    }
  }

  const reference = {
    professor,
    career,
    semester,
    subject,
    referenceText,
    timestamp: new Date().toISOString(),
  };

  db.ref("references").push(reference)
    .then(() => {
      alert("Referencia guardada correctamente.");
      form.reset();
    })
    .catch((error) => {
      console.error("Error al guardar la referencia: ", error);
    });
});

// Cargar y mostrar referencias desde Firebase
function loadReferences() {
  db.ref("references").on("value", (snapshot) => {
    const references = [];
    snapshot.forEach((childSnapshot) => {
      references.push(childSnapshot.val());
    });
    displayReferences(references);
  });
}

// Mostrar referencias en la página
function displayReferences(references) {
  referencesContainer.innerHTML = "<h2>Referencias</h2>";
  references.forEach((ref) => {
    const div = document.createElement("div");
    div.className = "reference";
    div.innerHTML = `
      <p><strong>Profesor:</strong> ${ref.professor}</p>
      <p><strong>Carrera:</strong> ${ref.career}</p>
      <p><strong>Semestre:</strong> ${ref.semester}</p>
      <p><strong>Materia:</strong> ${ref.subject}</p>
      <p><strong>Referencia:</strong> ${ref.referenceText}</p>
    `;
    referencesContainer.appendChild(div);
  });
}

// Filtrar referencias con la barra de búsqueda
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  db.ref("references").once("value", (snapshot) => {
    const filteredReferences = [];
    snapshot.forEach((childSnapshot) => {
      const ref = childSnapshot.val();
      if (ref.professor.toLowerCase().includes(query)) {
        filteredReferences.push(ref);
      }
    });
    displayReferences(filteredReferences);
  });
});

// Cargar referencias al iniciar
window.onload = loadReferences;
