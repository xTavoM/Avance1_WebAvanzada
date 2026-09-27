(function () {
  const page = document.body.dataset.page;
  // Menú móvil accesible incluso cuando se abre el prototipo como archivo local.
  document.addEventListener("click", (event) => {
    const button = event.target.closest('[data-bs-toggle="collapse"]');
    if (!button) return;
    const panel = document.querySelector(button.dataset.bsTarget);
    if (!panel) return;
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    panel.classList.toggle("show", !expanded);
  });
  // La portada existente aún no declara data-page; en ella no se cargan datos.
  if (!page || page === "home") return;
  const status = document.querySelector("#globalStatus");
  window.IHUI.showStatus(status, "Cargando datos del prototipo…", "info");
  window.IHData.load().then((data) => {
    if (data.warnings.length) window.IHUI.renderWarnings(data.warnings);
    else if (status) status.textContent = "";
    if (page === "catalog") window.IHCatalog.init(data);
    if (page === "detail") window.IHDetail.init(data.initiatives);
    if (page === "initiative-form") window.IHInitiativeForm.init(data);
    if (page === "profile") window.IHProfile.init(data);
    if (page === "participation") window.IHParticipation.init(data);
  }).catch((error) => {
    console.error("No se pudo iniciar Innovation Hub", error);
    window.IHUI.showStatus(status, "Ocurrió un error al iniciar el prototipo. Recargá la página e intentá de nuevo.", "danger");
  });

})();
