# WebMDA

> **Mobile-First, Touch-Optimized UML Diagram Editor**
> Synchronize TypeScript code and PlantUML in real-time with a radical OOP architecture.

---

## 🚀 Features

✅ **Mobile-First & Touch-Optimized**
- Designed for touch devices with Hammer.js gestures (tap, pan, drag).
- Responsive UI with a bottom toolbar for easy access on mobile.

✅ **Radical OOP Architecture**
- **Parameterless constructors** for all classes.
- **`init()` method** for initialization with naked JSON models.
- **Getters/Setters** for all attributes.
- **Mandatory `Item` attributes** (`name`, `description`, `badge`, `icon`, `uuid`) enforced in every class.

✅ **Dual Synchronization**
- **TypeScript Model**: Primary OOP model for programmatic access.
- **PlantUML Code**: Auto-generated for compatibility with PlantUML tools.
- **Real-Time Sync**: Changes in the model reflect instantly in both representations.

✅ **UML Diagram Support**
- **Class Diagrams**: Classes, attributes, methods, visibility modifiers.
- **Relationships**: Inheritance, association, aggregation, composition, dependency.
- **SVG Rendering**: Scalable and crisp diagrams on all devices.

✅ **Undo/Redo Support**
- Command pattern for full history tracking.
- Undo and redo any action (create, move, delete).

✅ **Zero-Config Development**
- **One command to run**: `npm start` (no build step required).
- Powered by Vite for blazing-fast development.

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or later)
- npm (v7 or later)

### How to Run

```bash
# Clone the repository
git clone https://github.com/Cerulean-Circle-GmbH/WebMDA.git

# Navigate to the project directory
cd WebMDA

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open automatically in your browser at:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🎯 Project Overview

### Architecture
WebMDA follows a **strict MVC (Model-View-Controller) pattern** with a **radical OOP** approach:

```
┌───────────────────────────────────────────────────────┐
│                    MODEL (Core)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │  UmlModel    │  │ UmlElement   │  │ UmlClass         │ │
│  │  UmlRelation │  │ UmlAttribute │  │ UmlMethod        │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
└───────────────────────────────────────────────────────┘
                     │
                     ▼
┌───────────────────────────────────────────────────────┐
│                 CONTROLLER                               │
│  ┌─────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ Command     │  │ CommandManager   │  │ SyncManager  │ │
│  │ CreateCmd   │  │ (Undo/Redo)      │  │ (TS ↔ PlantUML)│ │
│  │ MoveCmd     │  └─────────────────┘  └─────────────┘ │
│  └─────────────┘                                          │
└───────────────────────────────────────────────────────┘
                     │
                     ▼
┌───────────────────────────────────────────────────────┐
│                    VIEW (React + SVG)                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │  SvgCanvas   │  │   Toolbar    │  │  TouchHandler    │ │
│  │ (Rendering)  │  │ (UI Controls)│  │ (Hammer.js)      │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
└───────────────────────────────────────────────────────┘
```

### Key Components

| Component               | Responsibility                                                                 |
|-------------------------|-------------------------------------------------------------------------------|
| **`UmlModel`**          | Root container for UML elements and relationships.                          |
| **`UmlClass`**          | Represents a UML class with attributes and methods.                         |
| **`UmlElement`**        | Base class for all UML elements (classes, interfaces, etc.).               |
| **`UmlRelationship`**   | Defines relationships between elements (inheritance, association, etc.).   |
| **`CommandManager`**    | Handles undo/redo using the command pattern.                                |
| **`SyncManager`**       | Synchronizes TypeScript model with PlantUML code.                          |
| **`SvgCanvas`**         | Renders UML diagrams using SVG.                                             |
| **`TouchHandler`**      | Manages touch gestures (tap, pan, drag) via Hammer.js.                      |

---

## 🛠️ Usage

### Adding a Class
1. Click the **"Add Class"** button in the toolbar.
2. A new class will appear at a random position on the canvas.
3. The **PlantUML** and **TypeScript** code will update automatically.

### Moving a Class
1. **Tap** to select a class.
2. **Drag** to move it around the canvas.
3. Use **Undo/Redo** buttons to revert changes.

### Viewing Code
- The **PlantUML** and **TypeScript** code are displayed in the bottom-right panel.
- Changes in the diagram reflect instantly in the code.

---

## 📂 Project Structure

```
WebMDA/
├── public/
│   └── index.html          # Mobile-first HTML with embedded styles
├── src/
│   ├── core/
│   │   ├── base/           # Item.ts, UuidGenerator.ts
│   │   ├── uml/            # UmlElement.ts, UmlClass.ts, UmlAttribute.ts, etc.
│   │   └── serialization/  # PlantUmlSerializer.ts, TypeScriptSerializer.ts, SyncManager.ts
│   ├── controller/
│   │   ├── Command.ts      # Base Command class
│   │   ├── CommandManager.ts
│   │   └── commands/        # CreateElementCommand.ts, MoveElementCommand.ts
│   ├── utils/
│   │   └── geometry/        # Position.ts, Size.ts
│   ├── view/
│   │   ├── components/     # Toolbar.tsx
│   │   ├── svg/            # SvgCanvas.tsx
│   │   └── touch/          # TouchHandler.ts
│   ├── App.tsx             # Main app component
│   └── index.tsx           # Entry point
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

---

## 🔧 Configuration

### Customizing the Server
Edit `vite.config.ts` to change the dev server settings:
```typescript
server: {
  port: 3000,  // Change port here
  open: true,  // Auto-open browser
},
```

### Adding New UML Elements
1. Extend `UmlElement` to create new element types (e.g., `UmlInterface`, `UmlUseCase`).
2. Update `PlantUmlSerializer` to handle the new element type.
3. Add UI controls in `Toolbar.tsx`.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Radical OOP**: All classes must have parameterless constructors and `init()` methods.
2. **Naked JSON Model**: Use `this.model = { ... }` for internal state.
3. **Getters/Setters**: Expose attributes via getters and setters.
4. **Mandatory Attributes**: Ensure all classes implement `name`, `description`, `badge`, `icon`, `uuid`.

---

## 📜 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [Hammer.js](http://hammerjs.github.io/) - Touch Gestures
- [UUID](https://github.com/uuidjs/uuid) - UUID Generation
- [PlantUML](https://plantuml.com/) - UML Diagram Syntax

---

## 📞 Support

For questions or issues, please open a GitHub issue or contact the maintainers.

---

**Made with ❤️ for UML Enthusiasts**
