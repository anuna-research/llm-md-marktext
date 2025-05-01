### context >>>
system = "You are a helpful assistant."
model = "urn:llm:anthropic:claude-3-7-sonnet-20250219"
parameters = { thinking = { type = "enabled", budget_tokens = 8000 }, max_tokens = 64000 }
root-dir = "../"
context = "llm-md/resources/context.md"

### user >>>

Summarise the architecture of this application based on the following docs;

{{$ @marktext}}

### Assistant >>>

```thinking

Now I can see the documentation files for MarkText. Let me analyze these files to understand the application's architecture. I'll go through the relevant files, especially focusing on the technical architecture, components, and how they interact.

First, let me check the files in `docs/dev/` which are likely to contain architecture information:

The file `/Users/anuna-01/Code/marktext/docs/dev/ARCHITECTURE.md` is the most promising for understanding the overall architecture. Let me analyze this file first.

From ARCHITECTURE.md:
- MarkText is built on Electron, using HTML, JS, and CSS
- The UI is built with Vue/Vuex
- The application is divided into three main parts:
  1. Muya: The core/backend that provides the WYSIWYG editor functionality
  2. Main process: Manages OS features, IO, dialogs, and window control
  3. Renderer process: The view/editor that hosts Muya and handles the UI

Muya (the core) provides:
- Real-time preview
- Markdown editing through multiple modules
- Block structure for data
- Markdown parsing and transformation according to CommonMark and GFM specs
- Event listeners
- Export functionality

The Main process:
- Has full access to Electron and OS features
- Handles IO and user interaction with native dialogs
- Controls editor windows
- Should not be blocked by synchronous operations

The Renderer process:
- Is spawned for each window
- Hosts Muya
- Handles graphical elements and data
- Contains two editors: the real-time preview (Muya) and the source-code editor (CodeMirror)

Application entry points:
- `src/main/index.js` for the main process
- `src/renderer/main.js` for each editor window

The main and renderer processes communicate via inter-process communication (IPC).

Now let me check other relevant documentation to get more details on specific parts:

From `/Users/anuna-01/Code/marktext/docs/dev/code/IPC.md`:
- The IPC (Inter-Process Communication) uses Electron's `ipcMain` and `ipcRenderer`
- Event names/channels must be prefixed with "mt::" when communicating between processes

From `/Users/anuna-01/Code/marktext/docs/dev/code/renderer/editor.md`:
- The editor uses a "MarkdownDocument" interface that represents a file
- There are structures for handling raw markdown, file state, etc.

From `/Users/anuna-01/Code/marktext/docs/dev/code/COMMANDS.md`:
- MarkText uses a command system for executing procedures
- Commands can be shown in the command palette or run from the event bus
- There are static commands (defined at compile time) and dynamic commands (created at runtime)

Let me also check some of the more user-facing documentation to understand the features that might influence the architecture:

From the feature descriptions in various files, MarkText includes:
- Real-time preview (WYSIWYG)
- Support for CommonMark, GitHub Flavored Markdown, and some Pandoc markdown
- Various editing modes (source code, typewriter, focus)
- Export to HTML and PDF
- Multiple themes
- Image handling and uploads
- Table editing tools
- Spell checking
- Various extensions like math formulas, front matter, emoji

Let me also understand the project structure from ARCHITECTURE.md:
- `.`: Configuration files
- `package.json`: Project settings
- `build/`: Contains generated binaries
- `dist/`: Build files for deployment
- `docs/`: Documentation and assets
- `resources/`: Application assets using at build time
- `node_modules/`: Dependencies
- `src`: MarkText source code
  - `common/`: Common source files that only require Node.js APIs
  - `main/`: Main process source files that require Electron main-process APIs
  - `muya/`: MarkText's backend that only allows pure JavaScript, BOM and DOM APIs
  - `renderer`: Frontend that requires Electron renderer-process APIs
- `static/`: Application assets (images, themes, etc)
- `test/`: Contains (unit) tests

Now I have enough information to summarize the architecture of MarkText.
```

# MarkText Application Architecture Summary

## Overview

MarkText is a cross-platform Markdown editor built with Electron that focuses on providing a clean, efficient WYSIWYG (What You See Is What You Get) editing experience. The application follows a typical Electron architecture with main and renderer processes, but adds a custom markdown editing core called Muya.

## Core Architecture Components

### 1. Three-Tier Architecture

MarkText's architecture is divided into three main parts:

- **Muya (Core/Backend)**: The heart of MarkText that handles markdown parsing, editing, and rendering
- **Main Process**: Controls the application lifecycle, file I/O, and OS interactions
- **Renderer Process**: Manages the UI, hosts Muya, and handles user interactions

### 2. Technology Stack

- **Framework**: Electron (enabling cross-platform support for Linux, macOS, and Windows)
- **Frontend**: Vue.js and Vuex for state management
- **Rendering Engine**: Virtual DOM (via Snabbdom) for efficient rendering
- **Code Editor**: CodeMirror for source code mode
- **Markdown Support**: CommonMark and GitHub Flavored Markdown specifications

## Detailed Component Breakdown

### Muya (Core)

- Provides the WYSIWYG markdown editing capabilities
- Uses a block-based data structure for document representation
- Handles markdown transformations and parsing
- Manages document events and state
- Exports to HTML and PDF
- Runs in a single thread with asynchronous functions for performance

### Main Process (`src/main/index.js`)

- Initializes the application
- Manages windows and application lifecycle
- Handles file system operations
- Coordinates native dialogs and OS features
- Communicates with renderer processes via IPC

### Renderer Process (`src/renderer/main.js`)

- Manages the editor UI components
- Hosts Muya for WYSIWYG editing
- Hosts CodeMirror for source code editing
- Maintains application state via Vuex
- Handles user interactions and editing features
- Contains components for sidebar, tabs, and document management

### Inter-Process Communication (IPC)

- Uses Electron's `ipcMain` and `ipcRenderer` to communicate between processes
- Event channels are prefixed with "mt::" for inter-process communication
- Handles file loading, saving, and other operations that require main process capabilities

## File Structure

```
src/
├── common/    # Shared utilities (Node.js APIs only)
├── main/      # Main process code (Electron main process APIs)
├── muya/      # Core markdown editing engine (pure JavaScript, DOM/BOM APIs)
└── renderer/  # Editor UI (Electron renderer process APIs, Vue components)
```

## Feature Architecture

### Document Processing

- Markdown documents are represented as `MarkdownDocument` objects
- Files pass through the main process for loading/saving
- Documents are rendered in real-time using Muya
- Source/WYSIWYG modes are toggled by switching between Muya and CodeMirror

### Command System

- Uses a command pattern with static and dynamic commands
- Commands can be triggered via menus, keyboard shortcuts, or the command palette
- Custom key bindings can be defined via configuration

### Extensions

- Supports markdown extensions like math formulas (KaTeX), diagrams, and code syntax highlighting
- Implements image handling with upload capabilities
- Features a spelling checker system with language detection

## Configuration System

- Uses JSON configuration files for preferences, themes, and key bindings
- Stores application data in platform-specific locations
- Supports portable mode for running without installation

This architecture enables MarkText to provide a performant, feature-rich markdown editing experience while maintaining cross-platform compatibility and extensibility.

### user >>>
