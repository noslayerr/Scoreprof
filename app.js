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

// Elementos del DOM
const form = document.getElementById("referenceForm");
const referenceList = document.getElementById("referenceList");
const searchInput = document.getElementById("searchBar");

// Función para cargar referencias desde Firebase
function loadReferences() {
  db.ref("references").on("value", (snapshot) => {
    referenceList.innerHTML = ""; // Limpiar la lista
    const references = [];

    snapshot.forEach((childSnapshot) => {
      const ref = childSnapshot.val();
      references.push(ref);
    });

    displayReferences(references);
  });
}

// Función para mostrar las referencias
function displayReferences(references) {
  referenceList.innerHTML = ""; // Limpiar antes de mostrar

  references.forEach((ref) => {
    const li = document.createElement("li");
    li.className = "reference-item";
    li.textContent = `${ref.professor} - ${ref.subject} - ${ref.career} - Semestre: ${ref.semester} - Puntuación: ${ref.rating} - ${ref.reference}`;
    referenceList.appendChild(li);
  });

  // Vincular la barra de búsqueda
  setupSearch();
}

// Función para buscar profesores
function setupSearch() {
  const referenceItems = document.querySelectorAll(".reference-item");

  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();

    referenceItems.forEach((item) => {
      if (item.textContent.toLowerCase().includes(searchValue)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
}

// Guardar una nueva referencia en Firebase
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const professor = document.getElementById("professor").value;
  const career = document.getElementById("career").value;
  const semester = document.getElementById("semester").value;
  const subject = document.getElementById("subject").value;
  const rating = document.getElementById("rating").value;
  const reference = document.getElementById("reference").value;

  db.ref("references").push({
    professor,
    career,
    semester,
    subject,
    rating,
    reference,
    timestamp: new Date().toISOString()
  }).then(() => {
    alert("Referencia guardada correctamente.");
    form.reset();
  }).catch((error) => {
    console.error("Error: ", error);
    alert("Error al guardar la referencia.");
  });
});

// Cargar referencias al inicio
window.onload = loadReferences;
