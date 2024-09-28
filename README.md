# Proyecto de Reserva de Turno de Cancha

Este proyecto fue desarrollado para gestionar la reserva de turnos de canchas, proporcionando una plataforma que permite a los usuarios reservar, gestionar y visualizar sus turnos. El sistema se divide en dos partes: un front-end desarrollado en React y un back-end construido con Java Spring Boot.

## Tecnologías Utilizadas

### Front-End
- **React:** Utilizado para construir la interfaz de usuario de la aplicación, proporcionando una experiencia interactiva y dinámica.
- **React Router Dom:** Gestión de rutas dentro de la aplicación, permitiendo la navegación entre diferentes vistas.
- **React Datepicker:** Componente utilizado para la selección de fechas en la reserva de turnos.
- **JWT Decode:** Manejo de tokens de autenticación JWT para gestionar sesiones de usuario.
- **Sonner:** Biblioteca de notificaciones para proporcionar alertas y mensajes al usuario.
- **Vite:** Herramienta de construcción rápida utilizada para el desarrollo y la optimización del front-end.

### Back-End
- **Java Spring Boot:** Framework utilizado para desarrollar la lógica del servidor y gestionar las solicitudes desde el front-end.
- **Spring Data JPA:** Manejo de la capa de persistencia y acceso a la base de datos.
- **Spring Security:** Proporciona seguridad y autenticación en la aplicación.
- **JWT (JSON Web Tokens):** Implementación de autenticación basada en tokens para proteger las rutas del servidor.
- **MySQL:** Base de datos utilizada para almacenar la información de los usuarios y las reservas de turnos.
- **Lombok:** Biblioteca para reducir el código boilerplate en las clases Java.
- **Log4j:** Sistema de registro de logs utilizado para la gestión y seguimiento de eventos en el servidor.
- **Java Mail Sender:** Biblioteca utilizada para el envío de correos electrónicos desde la aplicación.
- **Swagger (Springfox):** Integración de Swagger para la documentación de la API.

## Detalle de Dependencias

### Dependencias del Back-End
- **Spring Boot Starter Data JPA:** Gestión de la persistencia de datos y la interacción con la base de datos.
- **Spring Boot Starter Web:** Para construir APIs REST y manejar solicitudes HTTP.
- **Spring Boot DevTools:** Herramientas de desarrollo para agilizar el proceso de codificación.
- **MySQL Connector:** Conector para la integración de la base de datos MySQL.
- **Spring Security Web y Config:** Proporcionan seguridad a la aplicación, gestionando autenticación y autorizaciones.
- **JSON Web Token (JWT):** Para la gestión de autenticaciones mediante tokens.
- **Log4j:** Utilizado para la gestión de logs del sistema.
- **Spring Boot Starter Mail:** Para el envío de correos electrónicos desde el servidor.
- **Swagger (Springfox Boot Starter):** Para documentar la API del back-end de forma interactiva.

### Dependencias del Front-End
- **React y React DOM:** Para la creación de componentes interactivos y la renderización en el navegador.
- **React Router Dom:** Para la gestión de la navegación entre las diferentes rutas de la aplicación.
- **React Datepicker:** Componente de selección de fechas para facilitar la reserva de turnos.
- **JWT Decode:** Manejo de decodificación de tokens JWT para la gestión de autenticación en el cliente.
- **Sonner:** Biblioteca de notificaciones para brindar feedback al usuario.
- **Vite:** Herramienta de desarrollo y build para una configuración rápida y eficiente del proyecto.

## Proceso de Desarrollo

El proyecto se desarrolló a lo largo de 6 semanas, con la participación de:
- **Brian Godoy:** Responsable del desarrollo del front-end utilizando React.
- **Usuario de GitHub (`mauroR5Helvecia`):** Encargado del desarrollo del back-end en Java Spring Boot.

### Desafíos
- **Coordinación de Horarios:** La sincronización de tiempos entre los desarrolladores fue uno de los desafíos más grandes, lo cual se gestionó a través de herramientas de colaboración y comunicación.
- **Implementación de Funcionalidades:** Cada funcionalidad fue implementada progresivamente, asegurando que cada avance estuviera bien integrado con el trabajo anterior y que se cumplieran los requisitos del proyecto.

### Herramientas Utilizadas
- **Trello:** Utilizado para gestionar las tareas, asignar responsabilidades y seguir el progreso del proyecto.
- **Discord:** Empleado para las reuniones diarias y la comunicación instantánea, permitiendo una colaboración efectiva y continua.

## Conclusión

Este proyecto es un ejemplo de la integración de tecnologías modernas para crear una solución eficiente y funcional para la reserva de turnos. A pesar de los desafíos de la coordinación y la integración de distintas funcionalidades, logramos desarrollar una aplicación completa que cumple con los objetivos planteados al inicio del proyecto.

