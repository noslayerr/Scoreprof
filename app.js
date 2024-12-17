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
    loadReferences(); // Actualizar las últimas referencias
  }).catch((error) => {
    console.error("Error: ", error);
    alert("Error al guardar la referencia.");
  });
});

// Función para cargar referencias
function loadReferences() {
  const referenceList = document.getElementById("referenceList");
  referenceList.innerHTML = ""; // Limpiar la lista

  db.ref("references").limitToLast(5).on("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const ref = childSnapshot.val();
      const li = document.createElement("li");
      li.textContent = `${ref.professor} - ${ref.subject} - Puntuación: ${ref.rating}`;
      referenceList.appendChild(li);
    });
  });
}

// Cargar referencias al inicio
window.onload = loadReferences;
