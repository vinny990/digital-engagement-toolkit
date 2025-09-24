const board = document.getElementById("board");
const addNoteBtn = document.getElementById("addNote");

if (addNoteBtn) {
  addNoteBtn.addEventListener("click", () => {
    const note = document.createElement("div");
    note.className = "note";
    note.contentEditable = true;
    note.innerText = "New Note";
    note.style.top = "50px";
    note.style.left = "50px";
    makeDraggable(note);
    board.appendChild(note);
    saveNotes();
  });
  loadNotes();
}

function makeDraggable(note) {
  let offsetX, offsetY, isDragging = false;

  note.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - note.offsetLeft;
    offsetY = e.clientY - note.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    note.style.left = `${e.clientX - offsetX}px`;
    note.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      saveNotes();
    }
  });

  note.addEventListener("input", saveNotes);
}

function saveNotes() {
  const notes = [...document.querySelectorAll(".note")].map(note => ({
    text: note.innerText,
    top: note.style.top,
    left: note.style.left
  }));
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  const saved = JSON.parse(localStorage.getItem("notes") || "[]");
  saved.forEach(data => {
    const note = document.createElement("div");
    note.className = "note";
    note.contentEditable = true;
    note.innerText = data.text;
    note.style.top = data.top;
    note.style.left = data.left;
    makeDraggable(note);
    board.appendChild(note);
  });
}