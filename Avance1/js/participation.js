window.IHParticipation = {
  init({ initiatives }) {
    const form = document.querySelector("#participationForm");
    const id = new URLSearchParams(location.search).get("id");
    const initiative = initiatives.find((item) => item.id === id);
    const select = form.elements.competencia;
    if (!initiative) {
      window.IHUI.showStatus(document.querySelector("#requestStatus"), "No encontramos esa iniciativa. Volvé al catálogo y elegí otra.", "warning");
      form.hidden = true;
      return;
    }
    document.querySelector("#requestInitiative").textContent = initiative.titulo;
    select.insertAdjacentHTML("beforeend", window.IHUI.optionList(initiative.competencias || []));
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!window.IHValidation.validateParticipation(form)) {
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      const saved = window.IHStorage.saveParticipationRequest({
        id: `sol-${Date.now()}`, iniciativaId: initiative.id, iniciativa: initiative.titulo,
        mensaje: form.elements.mensaje.value.trim(), competencia: select.value,
        rol: form.elements.rol.value.trim(), disponibilidad: form.elements.disponibilidad.value.trim(),
        fecha: new Date().toISOString()
      });
      if (!saved) {
        window.IHUI.showStatus(document.querySelector("#requestStatus"), "No se pudo guardar la solicitud en este navegador.", "danger");
        return;
      }
      form.reset();
      window.IHUI.showStatus(document.querySelector("#requestStatus"), "Tu solicitud de demostración se guardó en este navegador.", "success");
    });
  }
};
