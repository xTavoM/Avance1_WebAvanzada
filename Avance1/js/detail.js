(function () {
  const { escapeHtml } = window.IHUI;
  window.IHDetail = {
    init(initiatives) {
      const target = document.querySelector("#initiativeDetail");
      const id = new URLSearchParams(location.search).get("id");
      const item = initiatives.find((record) => record.id === id);
      if (!item) { target.innerHTML = '<div class="alert alert-warning" role="status">No encontramos la iniciativa. <a href="iniciativas.html">Volvé al catálogo</a>.</div>'; return; }
      const restricted = item.visibilidad === "Restringida";
      const list = (items = []) => items.length ? `<ul>${items.map((value) => `<li>${escapeHtml(value)}</li>`).join("")}</ul>` : "<p>No hay información registrada.</p>";
      target.innerHTML = `<header class="mb-4"><div class="d-flex flex-wrap gap-2 mb-3"><span class="badge text-bg-primary">${escapeHtml(item.tipo)}</span><span class="badge text-bg-light border">${escapeHtml(item.estado)}</span><span class="badge text-bg-light border">Visibilidad: ${escapeHtml(item.visibilidad)}</span></div><h1>${escapeHtml(item.titulo)}</h1><p class="lead">${escapeHtml(item.resumen)}</p></header>
        ${restricted ? '<div class="alert alert-warning" role="status"><strong>Contenido restringido.</strong> Solo se muestra el resumen de esta iniciativa.</div>' : `<section class="mb-4"><h2 class="h4">Descripción</h2><p>${escapeHtml(item.descripcion)}</p></section><section class="row g-3 mb-4"><div class="col-md-6"><div class="card h-100"><div class="card-body"><h2 class="h5">Información</h2><dl><dt>Autor</dt><dd>${escapeHtml(item.propietario)}</dd><dt>Categoría</dt><dd>${escapeHtml(item.categoria)}</dd><dt>Problema</dt><dd>${escapeHtml(item.problema || "No especificado")}</dd><dt>Beneficiarios</dt><dd>${escapeHtml(item.beneficiarios || "No especificados")}</dd><dt>Participantes estimados</dt><dd>${escapeHtml(item.participantesEstimados ?? "No definido")}</dd></dl></div></div></div><div class="col-md-6"><div class="card h-100"><div class="card-body"><h2 class="h5">Competencias requeridas</h2>${list(item.competencias)}<h2 class="h5 mt-4">Miembros del equipo</h2>${list(item.miembros)}</div></div></div></section>`}
        <a class="btn btn-success" href="solicitud.html?id=${encodeURIComponent(item.id)}">Solicitar participar</a>`;
    }
  };
})();
