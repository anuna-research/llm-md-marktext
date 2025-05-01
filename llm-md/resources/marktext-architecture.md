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
