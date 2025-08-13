# Challenge App

Esta es una aplicación de React desarrollada con TypeScript como solución al reto propuesto. La app incluye un login falso, una home que consume la API de Jikan para mostrar una lista de animes con lazy-loading, y un sistema de autenticación fake basado en contexto.

## Características

- **Framework**: React con TypeScript
- **Estilos**: Tailwind CSS
- **Llamadas a API**: Axios con interceptores
- **Gestión de Estado**: React Context API + sessionStorage
- **Enrutamiento**: React Router DOM (rutas públicas y privadas)
- **Lista**: Carga de 2000 elementos con Lazy Loading (Intersection Observer API)

## Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn

## Instalación y Ejecución

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/frankdrr/tekton-challenge.git
    cd tekton-challenge
    ```

2.  **Instala las dependencias:**

    ```bash
    yarn install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    yarn start
    ```
    La aplicación estará disponible en `http://localhost:3000`.

## Documentación y Decisiones de Arquitectura

- **Estructura de Carpetas**: Se utilizó una arquitectura limpia por capas para separar la UI, la lógica de la aplicación y la infraestructura, permitiendo una mayor escalabilidad.
- **Manejo de Sesión**: Se usa `sessionStorage` para persistir el token durante la sesión del navegador, y el Context API de React para propagar el estado de autenticación de manera eficiente por toda la aplicación.
- **Lazy Loading**: Se implementó con la `Intersection Observer API` para un rendimiento óptimo al mostrar listas largas, evitando la sobrecarga de eventos de scroll.

## Puntos importantes

- Debido a las reglas de cors del api pública jikan se ha configurado como proxy en el packaga.json.
- No se ha considerado el uso de variables de entorno para las url de consulta para que sea mas fácil de levantar el proyeco (esto solo como medida de revisión del challenge).
- Para el login se está haciendo uso de otra api pública la cual nos permite enviar cualquier dato, para fines del ejercicio propuesto nos ayuda a simular una petición con los datos de login.

## Algunas propuesta de mejora

- Aunque la api pública utilizada usa REST, una mejora teórica para una aplicación real sería que el backend ofreciera una API con GraphQL, esto nos ayudaría a prevenir el over-fetching ya que solo solicitaríamos los campos necesarios reduciendo así el tamaño de la respuesta y el tiempo de carga.
- Podríamos aplicar el patron de diseño adapter y generar hooks personalizados para formatear la respuesta del backend antes de entregar los datos a la ui, de esta forma ante cualquier modificación en la respuesta del backend bastará con modificar el adaptador correspondiente y la aplicación no se verá afectada.
- En cuestiones de diseño podríamos utilizar framer motion para crear animaciones para los componentes, es una buena opción debido a su compatibilidad con React además que daría una mejor experiencia de carga de los componentes.