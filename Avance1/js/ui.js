(function () {
  function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  }
  function showStatus(element, message, kind = "info") {
    if (!element) return;
    element.className = `alert alert-${kind} status-message`;
    element.setAttribute("role", kind === "danger" ? "alert" : "status");
    element.textContent = message;
  }
  window.IHUI = {
    escapeHtml,
    showStatus,
    renderWarnings(warnings) {
      const region = document.querySelector("#globalStatus");
      if (warnings.length) showStatus(region, warnings.join(" "), "warning");
    },
    optionList(items, selected = "") {
      return items.map((item) => {
        const value = typeof item === "string" ? item : item.nombre;
        return `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(value)}</option>`;
      }).join("");
    },
    setFieldError(form, name, message = "") {
      const input = form.elements.namedItem(name);
      const error = form.querySelector(`[data-error-for="${name}"]`);
      if (input instanceof HTMLElement && input.type !== "hidden") {
        input.setAttribute("aria-invalid", message ? "true" : "false");
        if (error?.id) input.setAttribute("aria-describedby", error.id);
      }
      if (error) error.textContent = message;
    },
    validateText(value, { label, min = 1, max = 500, required = true }) {
      const normalized = value.trim();
      if (!normalized && required) return `${label}: este campo es obligatorio.`;
      if (normalized.length < min && normalized.length > 0) return `${label}: escribí al menos ${min} caracteres.`;
      if (normalized.length > max) return `${label}: no puede superar ${max} caracteres.`;
      return "";
    }
  };
})();
