(function () {
  const { escapeHtml, showStatus } = window.IHUI;
  function matches(item, filters) {
    const searchable = [item.titulo, item.resumen, item.propietario, item.categoria, ...(item.competencias || []), ...(item.etiquetas || [])].join(" ").toLocaleLowerCase("es");
    return (!filters.query || searchable.includes(filters.query))
      && (!filters.type || item.tipo === filters.type)
      && (!filters.category || item.categoria === filters.category)
      && (!filters.competency || (item.competencias || []).includes(filters.competency));
  }
  function renderCard(item) {
    const competencies = (item.competencias || []).map((skill) => `<span class="badge text-bg-light border me-1 mb-1">${escapeHtml(skill)}</span>`).join("");
    const localActions = item.local ? `<a class="btn btn-outline-primary btn-sm" href="registro-iniciativa.html?id=${encodeURIComponent(item.id)}">Editar</a><button class="btn btn-outline-danger btn-sm" type="button" data-delete-id="${escapeHtml(item.id)}">Eliminar</button>` : "";
    return `<article class="col-sm-6 col-xl-4"><div class="card initiative-card"><div class="card-body p-4">
      <div class="d-flex justify-content-between align-items-start gap-2 mb-2"><span class="badge text-bg-primary">${escapeHtml(item.tipo)}</span><span class="badge text-bg-light border">${escapeHtml(item.estado)}</span></div>
      <h2 class="h4 card-title">${escapeHtml(item.titulo)}</h2><p class="text-secondary">${escapeHtml(item.resumen)}</p>
      <p class="small mb-2"><strong>Categoría:</strong> ${escapeHtml(item.categoria)}</p><p class="small mb-2"><strong>Propietario:</strong> ${escapeHtml(item.propietario)}</p>
      <p class="small fw-semibold mb-1">Competencias requeridas</p><div class="mb-3">${competencies}</div>
      <div class="card-actions d-flex flex-wrap gap-2"><a class="btn btn-primary btn-sm" href="iniciativa.html?id=${encodeURIComponent(item.id)}">Ver detalle</a>${localActions}<a class="btn btn-outline-success btn-sm" href="solicitud.html?id=${encodeURIComponent(item.id)}">Solicitar participar</a></div>
    </div></div></article>`;
  }
  window.IHCatalog = {
    init({ initiatives, categories }) {
      const grid = document.querySelector("#initiativeGrid");
      const status = document.querySelector("#catalogStatus");
      const search = document.querySelector("#searchText");
      const type = document.querySelector("#filterType");
      const category = document.querySelector("#filterCategory");
      const competency = document.querySelector("#filterCompetency");
      category.insertAdjacentHTML("beforeend", categories.map((item) => `<option value="${escapeHtml(item.nombre)}">${escapeHtml(item.nombre)}</option>`).join(""));
      [...new Set(initiatives.flatMap((item) => item.competencias || []))].sort((a, b) => a.localeCompare(b, "es")).forEach((skill) => competency.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(skill)}">${escapeHtml(skill)}</option>`));
      const render = () => {
        const criteria = { query: search.value.trim().toLocaleLowerCase("es"), type: type.value, category: category.value, competency: competency.value };
        const result = initiatives.filter((item) => matches(item, criteria));
        grid.innerHTML = result.map(renderCard).join("");
        if (!result.length) showStatus(status, "No encontramos iniciativas con esos criterios. Cambiá la búsqueda o los filtros e intentá de nuevo.", "secondary");
        else status.textContent = `${result.length} iniciativa${result.length === 1 ? "" : "s"} encontrada${result.length === 1 ? "" : "s"}.`;
      };
      [search, type, category, competency].forEach((input) => input.addEventListener("input", render));
      document.querySelector("#clearFilters").addEventListener("click", () => { search.value = ""; type.value = ""; category.value = ""; competency.value = ""; render(); search.focus(); });
      grid.addEventListener("click", (event) => {
        const button = event.target.closest("[data-delete-id]");
        if (!button) return;
        const item = initiatives.find((record) => record.id === button.dataset.deleteId);
        if (!item || !window.confirm(`¿Eliminar la iniciativa “${item.titulo}”?`)) return;
        if (!window.IHStorage.deleteLocalInitiative(item.id)) { showStatus(status, "No se pudo guardar el cambio. Probá desde un servidor local.", "danger"); return; }
        initiatives = initiatives.filter((record) => record.id !== item.id);
        render(); showStatus(status, "La iniciativa se eliminó del catálogo.", "success");
      });
      render();
    }
  };
})();
