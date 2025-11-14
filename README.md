<h1 align="center">
    <img alt="project" title="#About" src="https://cdn.imgurl.ir/uploads/t72235_790shots_so.png" />
</h1>

<h1 align="center">
  <a target="_blank" href="https://mamad-reza-dev-sabadman.vercel.app/"> SabadMan </a>
</h1>

<p align="center">
 <a href="#about">About</a> |
 <a href="#features">Features</a> |
 <a href="#project-structure">Project Structure</a> |
 <a href="#getting-started">Getting Started</a> | 
 <a href="#tech-stack">Tech Stack</a>
</p>

## About

**SabadMan** is a simple and modular **Shopping Cart application** built as a learning project to better understand and practice **MVC architecture** in front-end development.
The goal of this project is to explore how to structure applications into clear layers — **Model**, **View**, and **Controller** — while keeping the logic clean, maintainable, and scalable.

This project is fully implemented using **TypeScript** to ensure type-safe logic and predictable data flow.
For styling, a minimal **SCSS-based design system** has been created, including reusable variables, mixins, and component styles to achieve a consistent and organized UI foundation.

SabadMan focuses on:

* Practicing clean architecture with the MVC pattern
* Managing state inside the Model layer
* Rendering and updating the UI through dedicated View components
* Handling user interactions in the Controller
* Building a lightweight design system using SCSS
* Creating modular, readable, and maintainable front-end code

This project is primarily educational and serves as a foundation to deepen my understanding of architecture, TypeScript structure, and scalable UI styling.

---

## Project Structure

```
src/
├── icons/            # SVG icons used for sprite generation
│
├── scripts/           # Main application logic (MVC)
│   ├── config/        # App constants & formatters
│   ├── helpers/       # UI helper functions
│   ├── types/         # TypeScript types & interfaces
│   ├── utils/         # Utility modules (DOM, HTTP, errors)
│   ├── views/         # All View components (MVC View layer)
│   ├── model.ts       # Application state manager
│   └── controller.ts  # Main Controller layer
│
└── scss/              # SCSS design system
    ├── abstracts/     # Variables, mixins, functions
    ├── base/          # Reset, base styles, fonts
    ├── layout/        # Layout modules (header, grid, container)
    ├── components/    # UI components (buttons, cards, etc.)
    ├── sections/      # Page-level sections (products, cart)
    ├── utils/         # Flex, grid utilities
    └── main.scss      # Root stylesheet

```

---

## Getting Started

```bash
# Clone this repository
$ git clone https://github.com/mamad-reza-dev/SabadMan.git

# Access the project folder in your terminal
$ cd SabadMan

# Install the dependencies
$ npm install

# Run the application in development mode
$ npm run dev

# The application will open on the port: 5173 - go to http://localhost:5173
```

---

## Tech Stack

The following technologies and tools were used to build this project:

### **Core Platform**

* [TypeScript](https://www.typescriptlang.org/) – Strongly typed language for safer and more maintainable JavaScript
* [Vite](https://vite.dev/) – Next-generation frontend tooling for fast builds and development
* [SCSS](https://sass-lang.com/) – CSS preprocessor for modular and maintainable styling

### **UI & Styling**

* [Vazirmatn](https://fonts.google.com/specimen/Vazirmatn) – Main font used for typography

### **Utilities & Plugins**

* [vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons) – Generates SVG sprite from `src/icons` for reusable inline icons
