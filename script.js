const STORAGE_KEY = "keep-clone-notes-v1";

const state = {
  notes: loadNotes(),
  editingId: null,
};

const noteModal = document.getElementById("noteModal");
const noteForm = document.getElementById("noteForm");
const noteTitleInput = document.getElementById("noteTitle");
const noteTextInput = document.getElementById("noteText");
const notesList = document.getElementById("notesList");
const modalTitle = document.getElementById("modalTitle");
const composerInput = document.getElementById("composerInput");

function loadNotes() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Unable to load notes", error);
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.notes));
}

function openModal(note = null) {
  if (note) {
    state.editingId = note.id;
    modalTitle.textContent = "Edit note";
    noteTitleInput.value = note.title;
    noteTextInput.value = note.text;
  } else {
    state.editingId = null;
    modalTitle.textContent = "Take a note";
    noteForm.reset();
  }

  noteModal.classList.remove("hidden");
  noteTitleInput.focus();
}

function closeModal() {
  noteModal.classList.add("hidden");
  noteForm.reset();
  state.editingId = null;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function createNoteCard(note) {
  const text = escapeHtml(note.text || "");
  const title = escapeHtml(note.title || "");

  let displayText = title;
  if (title && text) {
    displayText = `${title}\n${text}`;
  } else if (text) {
    displayText = text;
  }

  return `
    <div class="note-card" data-id="${note.id}" role="button" tabindex="0">
      ${title ? `<h3 class="note-title">${title}</h3>` : ""}
      ${text ? `<p class="note-text">${text}</p>` : ""}
      <div class="note-actions">
        <button class="note-action-btn" data-action="edit" type="button" title="Edit">
          <img src="assets/edit labels icon.png" alt="" />
        </button>
        <button class="note-action-btn" data-action="delete" type="button" title="Delete">
          <img src="assets/bin icon.png" alt="" />
        </button>
        <button class="note-action-btn" data-action="archive" type="button" title="Archive">
          <img src="assets/Archive icon.png" alt="" />
        </button>
      </div>
    </div>
  `;
}

function renderNotes() {
  const activeNotes = state.notes.filter((note) => !note.archived);

  if (activeNotes.length === 0) {
    notesList.innerHTML =
      '<div style="padding: 2rem; text-align: center; color: #999;">No notes yet</div>';
  } else {
    notesList.innerHTML = activeNotes.map(createNoteCard).join("");
  }
}

function handleNoteSubmit(event) {
  event.preventDefault();

  const title = noteTitleInput.value.trim();
  const text = noteTextInput.value.trim();

  if (!title && !text) {
    closeModal();
    return;
  }

  if (state.editingId) {
    state.notes = state.notes.map((note) =>
      note.id === state.editingId ? { ...note, title, text } : note,
    );
  } else {
    state.notes.unshift({
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      title,
      text,
      archived: false,
      createdAt: new Date().toISOString(),
    });
  }

  saveNotes();
  renderNotes();
  closeModal();
}

function handleNoteActions(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const card = button.closest(".note-card");
  if (!card) {
    return;
  }

  const noteId = card.dataset.id;
  const action = button.dataset.action;

  if (action === "edit") {
    const note = state.notes.find((item) => item.id === noteId);
    if (note) {
      openModal(note);
    }
    return;
  }

  if (action === "delete") {
    state.notes = state.notes.filter((note) => note.id !== noteId);
  }

  if (action === "archive") {
    state.notes = state.notes.map((note) =>
      note.id === noteId ? { ...note, archived: !note.archived } : note,
    );
  }

  saveNotes();
  renderNotes();
}

function handleNoteCardClick(event) {
  const card = event.currentTarget;
  const action = event.target.closest("button[data-action]");

  if (!action && !event.target.closest(".note-actions")) {
    const noteId = card.dataset.id;
    const note = state.notes.find((item) => item.id === noteId);
    if (note) {
      openModal(note);
    }
  }
}

// Event Listeners
composerInput.addEventListener("click", () => openModal());
document.getElementById("cancelNote").addEventListener("click", closeModal);

document.addEventListener("click", (event) => {
  if (event.target === noteModal) {
    closeModal();
  }
});

noteForm.addEventListener("submit", handleNoteSubmit);

notesList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (button) {
    handleNoteActions(event);
  } else {
    // Click on note card to edit
    const card = event.target.closest(".note-card");
    if (card && !event.target.closest(".note-actions")) {
      const noteId = card.dataset.id;
      const note = state.notes.find((item) => item.id === noteId);
      if (note) {
        openModal(note);
      }
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Navigation
document.querySelectorAll(".nav-item").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.dataset.section === "notes") {
      event.preventDefault();
    } else {
      event.preventDefault();
      // Handle other sections if needed
    }
  });
});

renderNotes();
