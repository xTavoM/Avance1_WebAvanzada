window.IHInitiativeForm = {
  init({ categories, initiatives }) {
    const form = document.querySelector("#initiativeForm");
    if (!form) return;
    const params = new URLSearchParams(location.search);
    const editId = params.get("id");
    const existing = editId ? window.IHStorage.findLocalInitiative(editId) : null;
    if (editId && !existing) {
      window.IHUI.showStatus(document.querySelector("#formStatus"), "Solo podés editar iniciativas que publicaste en este navegador.", "warning");
      form.hidden = true;
      return;
    }
    const selectedCompetencies = [...(existing?.competencias || [])];
    const categorySelect = form.elements.categoria;
    categorySelect.insertAdjacentHTML("beforeend", window.IHUI.optionList(categories));
    if (existing) {
      ["titulo", "tipo", "resumen", "descripcion", "problema", "beneficiarios", "categoria", "participantes", "visibilidad", "etiquetas"].forEach((name) => {
        const itemKey = name === "participantes" ? "participantesEstimados" : name;
        if (existing[itemKey] !== undefined) form.elements[name].value = Array.isArray(existing[itemKey]) ? existing[itemKey].join(", ") : existing[itemKey];
      });
      document.querySelector("#formTitle").textContent = "Modificar iniciativa";
      document.querySelector("#submitLabel").textContent = "Guardar cambios";
      document.querySelector("#cancelEdit").hidden = false;
    }

    const renderCompetencies = () => {
      document.querySelector("#competencyList").innerHTML = selectedCompetencies.map((skill, index) =>
        `<li class="list-inline-item mb-2" data-competency-chip><span class="badge text-bg-primary p-2">${window.IHUI.escapeHtml(skill)} <button type="button" class="btn-close btn-close-white ms-1" aria-label="Quitar ${window.IHUI.escapeHtml(skill)}" data-remove-competency="${index}"></button></span></li>`
      ).join("");
      const error = form.querySelector('[data-error-for="competencias"]');
      if (error && selectedCompetencies.length) error.textContent = "";
    };
    renderCompetencies();
    document.querySelector("#addCompetency").addEventListener("click", () => {
      const typed = form.elements.competenciaPersonalizada.value.trim();
      const selected = form.elements.competencia.value;
      const skill = typed || selected;
      if (!skill) {
        window.IHUI.setFieldError(form, "competencia", "Elegí una competencia o escribí una propia.");
        return;
      }
      if (selectedCompetencies.some((item) => item.toLocaleLowerCase("es") === skill.toLocaleLowerCase("es"))) {
        window.IHUI.setFieldError(form, "competencia", "Esa competencia ya está en la lista.");
        return;
      }
      selectedCompetencies.push(skill);
      form.elements.competenciaPersonalizada.value = "";
      form.elements.competencia.value = "";
      window.IHUI.setFieldError(form, "competencia", "");
      renderCompetencies();
    });
    document.querySelector("#competencyList").addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove-competency]");
      if (!button) return;
      selectedCompetencies.splice(Number(button.dataset.removeCompetency), 1);
      renderCompetencies();
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!window.IHValidation.validateInitiative(form, selectedCompetencies)) {
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      const initiative = {
        ...(existing || {}),
        id: existing?.id || (crypto.randomUUID ? crypto.randomUUID() : `local-${Date.now()}`),
        titulo: form.elements.titulo.value.trim(),
        tipo: form.elements.tipo.value,
        resumen: form.elements.resumen.value.trim(),
        descripcion: form.elements.descripcion.value.trim(),
        problema: form.elements.problema.value.trim(),
        beneficiarios: form.elements.beneficiarios.value.trim(),
        categoria: form.elements.categoria.value,
        propietario: existing?.propietario || "Usuario local",
        competencias: [...selectedCompetencies],
        estado: existing?.estado || "En búsqueda de equipo",
        visibilidad: form.elements.visibilidad.value,
        miembros: existing?.miembros || ["Usuario local"],
        participantesEstimados: Number(form.elements.participantes.value),
        etiquetas: form.elements.etiquetas.value.split(",").map((tag) => tag.trim()).filter(Boolean),
        local: true
      };
      if (!window.IHStorage.saveLocalInitiative(initiative)) {
        window.IHUI.showStatus(document.querySelector("#formStatus"), "El navegador no permitió guardar el cambio. Probá ejecutar el sitio desde un servidor local.", "danger");
        return;
      }
      location.href = "iniciativas.html";
    });
  }
};
