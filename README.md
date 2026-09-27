# Innovation Hub


Kristhel Badilla Cerdas
Gustavo Morera Quiros

Programación web avanzada SOFT-12

Álvaro Cordero Peña

III cuatrimestre 2026 


## Descripción

Innovation Hub es una aplicación web la cual permite publicar ideas, necesidades y retos, indicar las competencias requeridas y facilitar la conformación de equipos interdisciplinarios dentro de la comunidad universitaria.

## Estructura del repositorio

- `Avance1/` — prototipo con HTML, CSS, JavaScript, Bootstrap y Sass
  - `paginas/` — pantallas del prototipo
  - `datos/` — archivos JSON con datos simulados
  - `js/` — módulos de JavaScript
  - `scss/` — variables y archivos Sass
  - `css/` — estilos compilados
  - `img/` — imágenes utilizadas en el proyecto


## Cómo ejecutar

Desde la carpeta `Avance1`, iniciar un servidor local:

```cmd
py -m http.server 8000
```

Después abrir `http://localhost:8000/` en el navegador. El prototipo no requiere base de datos.

## Decisiones de diseño

- La interfaz utiliza HTML semántico, Bootstrap 5 y estilos propios. Bootstrap se personalizó con Sass y el CSS compilado está en `Avance1/css/bootstrap-custom.css`.
- Las iniciativas y categorías se cargan desde archivos JSON mediante JavaScript. Si se abre el sitio como `file://`, se muestran datos de respaldo.
- Se utiliza `localStorage` para simular la creación y edición de iniciativas y las solicitudes de participación, sin una base de datos.
- La visibilidad restringida se representa en la interfaz como demostración; no sustituye un sistema real de autenticación y permisos.

## Resumen de commits

| Fecha | Commit | Responsable | Cambio |
| --- | --- | --- | --- |
| 2026-09-08 | `1764431` | xTavoM | Commit inicial |
| 2026-09-25 | `7271238` | Kristhel | Estructura inicial |
| 2026-09-26 | `7f8afa0` | Kristhel | Documentación inicial |
| 2026-09-26 | `87989f8` | Kristhel | Página principal |
| 2026-09-26 | `da30e98` | Kristhel | Contenido y diseño de la portada |
| 2026-09-26 | `b2ce527` | Kristhel | Estilos de la portada |
| 2026-09-26 | `b8fd852` | Kristhel | Catálogo inicial |
| 2026-09-27 | `59238b1` | Gustavo | Datos de categorías e iniciativas |
| 2026-09-27 | `1bc9e72` | Gustavo | Carga y almacenamiento local |
| 2026-09-27 | `e458326` | Gustavo | Bootstrap personalizado con Sass |
| 2026-09-27 | `4b60bf8` | Gustavo | Búsqueda y filtros del catálogo |
| 2026-09-27 | `9d0dbe6` | Gustavo | Detalle y visibilidad restringida |
| 2026-09-27 | `e5531b4` | Gustavo | Registro y edición de iniciativas |
| 2026-09-27 | `bab83c3` | Gustavo | Perfil y solicitudes |
| 2026-09-27 | `2b13f15` | Gustavo | Corrección de botones duplicados |
| 2026-09-27 | `3fc4cf3` | Gustavo | Instrucciones para servidor local |

El historial completo se puede consultar con `git log --oneline`.