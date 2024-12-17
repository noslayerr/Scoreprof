// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD2E_JzHJMNZKDFNLcAClrFeyW-Hnk7fDw",
  authDomain: "scoreprof-868fa.firebaseapp.com",
  projectId: "scoreprof-868fa",
  storageBucket: "scoreprof-868fa.firebasestorage.app",
  messagingSenderId: "358086157332",
  appId: "1:358086157332:web:2b87e54ab3352389033301",
  measurementId: "G-LNM7XNSZXT"
};


// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Cargar referencias al inicio
window.onload = loadReferences;

// Función para cargar todas las referencias
function loadReferences() {
  const referenceList = document.getElementById("referenceList");
  referenceList.innerHTML = ""; // Limpiar la lista

  db.ref("references").on("value", (snapshot) => {
    referenceList.innerHTML = ""; // Limpiar cada vez que se actualicen los datos
    snapshot.forEach((childSnapshot) => {
      const ref = childSnapshot.val();
      const li = document.createElement("li");
      li.className = "reference-item";
      li.textContent = `${ref.professor} - ${ref.subject} - ${ref.career} - Semestre: ${ref.semester} - Puntuación: ${ref.rating} - ${ref.reference}`;
      referenceList.appendChild(li);
    });
  });
}

// Función para buscar referencias en tiempo real
const searchInput = document.getElementById("searchBar");
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const referenceItems = document.querySelectorAll(".reference-item");

  referenceItems.forEach((item) => {
    if (item.textContent.toLowerCase().includes(searchValue)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

// Referencia al formulario
const form = document.getElementById("referenceForm");

// Función para guardar referencia
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const professor = document.getElementById("professor").value;
  const career = document.getElementById("career").value;
  const semester = document.getElementById("semester").value;
  const subject = document.getElementById("subject").value;
  const rating = document.getElementById("rating").value;
  const reference = document.getElementById("reference").value;

  // Guardar en Firebase
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
