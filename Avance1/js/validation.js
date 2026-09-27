(function () {
  const setError = window.IHUI.setFieldError;
  const textError = window.IHUI.validateText;
  window.IHValidation = {
    validateInitiative(form, competencies) {
      const errors = {
        titulo: textError(form.elements.titulo.value, { label: "Título", min: 5, max: 90 }),
        tipo: form.elements.tipo.value ? "" : "Elegí si es una idea, una necesidad o un reto.",
        resumen: textError(form.elements.resumen.value, { label: "Resumen", min: 20, max: 240 }),
        descripcion: textError(form.elements.descripcion.value, { label: "Descripción", min: 30, max: 2000 }),
        problema: textError(form.elements.problema.value, { label: "Problema identificado", min: 10, max: 500 }),
        beneficiarios: textError(form.elements.beneficiarios.value, { label: "Beneficiarios", min: 5, max: 300 }),
        categoria: form.elements.categoria.value ? "" : "Elegí una categoría.",
        participantes: Number(form.elements.participantes.value) >= 2 && Number(form.elements.participantes.value) <= 30 ? "" : "La cantidad debe estar entre 2 y 30 personas.",
        visibilidad: form.elements.visibilidad.value ? "" : "Elegí el nivel de visibilidad."
      };
      Object.entries(errors).forEach(([name, message]) => setError(form, name, message));
      const competencyError = form.querySelector('[data-error-for="competencias"]');
      if (competencyError) competencyError.textContent = competencies.length ? "" : "Agregá al menos una competencia requerida.";
      return Object.values(errors).every((message) => !message) && competencies.length > 0;
    },
    validateParticipation(form) {
      const errors = {
        mensaje: textError(form.elements.mensaje.value, { label: "Mensaje de presentación", min: 20, max: 600 }),
        competencia: form.elements.competencia.value ? "" : "Elegí la competencia principal que aportarías.",
        rol: textError(form.elements.rol.value, { label: "Rol deseado", min: 2, max: 80 }),
        disponibilidad: textError(form.elements.disponibilidad.value, { label: "Disponibilidad", min: 3, max: 120 })
      };
      Object.entries(errors).forEach(([name, message]) => setError(form, name, message));
      return Object.values(errors).every((message) => !message);
    }
  };
})();
