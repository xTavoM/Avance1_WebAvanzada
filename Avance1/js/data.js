(function () {
  async function readJson(path, fallback, label) {
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const value = await response.json();
      if (!Array.isArray(value)) throw new Error("El JSON debe contener una lista.");
      return { value, warning: "" };
    } catch (error) {
      const message = location.protocol === "file:"
        ? "El navegador bloquea fetch de JSON desde file://. Se usan datos de respaldo; para conservar cambios entre pantallas, ejecutá el sitio con un servidor local."
        : `No se pudo cargar ${label}; se usan datos de respaldo.`;
      console.warn(`Innovation Hub: ${label} no disponible`, error);
      return { value: fallback, warning: message };
    }
  }
  window.IHData = {
    async load() {
      const root = location.pathname.toLocaleLowerCase("es").includes("/paginas/") ? "../datos/" : "datos/";
      const [categories, initiatives] = await Promise.all([
        readJson(`${root}categorias.json`, window.IHFallback.categorias, "las categorías"),
        readJson(`${root}iniciativas.json`, window.IHFallback.iniciativas, "las iniciativas")
      ]);
      return {
        categories: categories.value,
        initiatives: window.IHStorage.mergeLocalInitiatives(initiatives.value),
        warnings: [...new Set([categories.warning, initiatives.warning].filter(Boolean))]
      };
    }
  };
})();
