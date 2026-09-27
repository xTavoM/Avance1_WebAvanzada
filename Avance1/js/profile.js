window.IHProfile = {
  init({ initiatives }) {
    const profile = window.IHStorage.getDemoProfile();
    const projects = initiatives.filter((item) => item.propietario === profile.nombre || (item.miembros || []).includes(profile.nombre));
    const list = (items) => items.map((item) => `<li>${window.IHUI.escapeHtml(item)}</li>`).join("");
    document.querySelector("#profileContent").innerHTML = `
      <div class="row g-4"><div class="col-lg-4"><section class="card h-100"><div class="card-body p-4"><div class="rounded-circle bg-info d-flex justify-content-center align-items-center fw-bold text-primary mb-3" style="width:5rem;height:5rem" aria-hidden="true">LF</div><h1 class="h3">${window.IHUI.escapeHtml(profile.nombre)}</h1><p>${window.IHUI.escapeHtml(profile.programa)}</p><p class="small text-secondary">${window.IHUI.escapeHtml(profile.correo)}</p></div></section></div>
      <div class="col-lg-8"><section class="card mb-4"><div class="card-body p-4"><h2 class="h5">Competencias</h2><ul>${list(profile.competencias)}</ul><h2 class="h5 mt-4">Intereses</h2><ul>${list(profile.intereses)}</ul></div></section>
      <section class="card"><div class="card-body p-4"><h2 class="h5">Iniciativas relacionadas</h2>${projects.length ? `<ul>${projects.map((item) => `<li><a href="iniciativa.html?id=${encodeURIComponent(item.id)}">${window.IHUI.escapeHtml(item.titulo)}</a> — ${window.IHUI.escapeHtml(item.estado)}</li>`).join("")}</ul>` : `<p>Aún no hay proyectos asociados a este perfil de demostración.</p>`}</div></section></div></div>`;
  }
};
