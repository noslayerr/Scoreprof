// Configuración de Firebase
const firebaseConfig = {

  apiKey: "AIzaSyD2E_JzHJMNZKDFNLcAClrFeyW-Hnk7fDw",

  authDomain: "scoreprof-868fa.firebaseapp.com",

  databaseURL: "https://scoreprof-868fa-default-rtdb.firebaseio.com",

  projectId: "scoreprof-868fa",

  storageBucket: "scoreprof-868fa.firebasestorage.app",

  messagingSenderId: "358086157332",

  appId: "1:358086157332:web:2b87e54ab3352389033301",

  measurementId: "G-LNM7XNSZXT"

};

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
