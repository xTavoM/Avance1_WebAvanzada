(function () {
  const STORAGE_KEY = "innovation-hub-avance1-v1";
  function readState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { added: [], deleted: [], requests: [] }; }
    catch { return { added: [], deleted: [], requests: [] }; }
  }
  function writeState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); return true; }
    catch { return false; }
  }
  window.IHStorage = {
    mergeLocalInitiatives(initial) {
      const state = readState();
      const hidden = new Set(state.deleted);
      const changed = new Map(state.added.map((item) => [item.id, item]));
      const merged = initial.filter((item) => !hidden.has(item.id)).map((item) => changed.get(item.id) || item);
      const known = new Set(merged.map((item) => item.id));
      return [...merged, ...state.added.filter((item) => !known.has(item.id) && !hidden.has(item.id))];
    },
    saveLocalInitiative(initiative) {
      const state = readState();
      state.deleted = state.deleted.filter((id) => id !== initiative.id);
      state.added = [...state.added.filter((item) => item.id !== initiative.id), initiative];
      return writeState(state);
    },
    deleteLocalInitiative(id) {
      const state = readState();
      state.deleted = [...new Set([...state.deleted, id])];
      state.added = state.added.filter((item) => item.id !== id);
      return writeState(state);
    },
    findLocalInitiative(id) { return readState().added.find((item) => item.id === id) || null; },
    saveParticipationRequest(request) {
      const state = readState(); state.requests.push(request); return writeState(state);
    },
    getDemoProfile() {
      return {
        nombre: "Lucía Fernández", programa: "Desarrollo de Software",
        correo: "lucia.fernandez@estudiante.cenfotec.ac.cr",
        competencias: ["Diseño UX", "HTML y CSS", "Accesibilidad"],
        intereses: ["Tecnología cívica", "Inclusión", "Sostenibilidad"]
      };
    }
  };
})();
