# GameBench WorkFlow Editor

A modern desktop application for workflow editing with a bold neo-brutalism design style. Built with React, TypeScript, and Tauri for cross-platform desktop deployment.

![GameBench WorkFlow Editor](./public/images/logo_1.png)

## 🚀 What is this?

GameBench WorkFlow Editor is a desktop application that allows you to upload and edit workflow images with an intuitive, modern interface. The app features a unique neo-brutalism design with bright colors, thick borders, and bold typography.

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your computer:

### Required Software

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Choose the "LTS" (Long Term Support) version
   - This includes npm (Node Package Manager) automatically

2. **Rust** (for desktop app compilation)
   - Download from: https://rustup.rs/
   - Follow the installation instructions for your operating system
   - After installation, restart your terminal/command prompt

3. **Git** (for cloning the repository)
   - Download from: https://git-scm.com/
   - Follow the installation instructions for your operating system

### System Requirements

- **Windows**: Windows 10 or later
- **macOS**: macOS 10.15 or later
- **Linux**: Most modern distributions (Ubuntu 18.04+, etc.)

## 📥 Installation

### Step 1: Clone the Repository

Open your terminal (Command Prompt on Windows, Terminal on Mac/Linux) and run:

```bash
git clone https://github.com/ShreyX24/GB-Workflow-Editor.git GB-WF-Editor
cd GB-WF-Editor
```

*Note: Replace `yourusername` with the actual GitHub username/organization*

### Step 2: Install Dependencies

In the project folder, run:

```bash
npm install
```

This will download and install all the required packages. It may take a few minutes.

### Step 3: Verify Installation

Check if everything is installed correctly by running:

```bash
npm run dev
```

If successful, you should see output similar to:
```
VITE v7.0.5  ready in 123 ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## 🏃‍♂️ Running the Application

### Development Mode (Web Version)

To run the application in your web browser for development:

```bash
npm run dev
```

Then open your browser and go to: `http://localhost:5173`

### Desktop Application Mode

To run as a desktop application:

```bash
npx tauri dev
```

This will compile and launch the desktop version of the app.

*Note: The first run may take several minutes as Tauri compiles the Rust backend*

## 🔨 Building for Production

### Web Build

To create a production web build:

```bash
npm run build
```

The built files will be in the `dist` folder.

### Desktop Build

To create a desktop application installer:

```bash
npm run tauri build
```

The installer will be created in `src-tauri/target/release/bundle/`

## 🛠 Technologies Used

- **React 19** - User interface framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tauri** - Desktop app framework (Rust + Web)
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Neo-Brutalism Design** - Bold, high-contrast UI style

## 🎨 Design Features

- **Neo-Brutalism Style**: Bold colors, thick borders, dramatic shadows
- **Dark/Light Theme Support**: Automatic theme switching
- **Custom Typography**: Unique font combinations
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: High contrast and semantic markup

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (web) |
| `npm run build` | Build for production (web) |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code for errors |
| `npm run tauri dev` | Start development (desktop) |
| `npm run tauri build` | Build desktop application |

## 🐛 Troubleshooting

### Common Issues

**1. "Command not found" errors**
- Make sure Node.js and npm are properly installed
- Restart your terminal after installation
- Check versions: `node --version` and `npm --version`

**2. "Rust not found" when running Tauri commands**
- Install Rust from https://rustup.rs/
- Restart your terminal
- Run: `rustc --version` to verify installation

**3. Port 5173 already in use**
- Another application is using the port
- Kill the process or use a different port:
  ```bash
  npm run dev -- --port 3000
  ```

**4. Build fails with memory issues**
- Increase Node.js memory limit:
  ```bash
  export NODE_OPTIONS="--max-old-space-size=4096"
  npm run build
  ```

**5. Tauri build fails on first run**
- This is normal - let it complete (can take 10-15 minutes)
- Subsequent builds will be much faster

### Getting Help

If you encounter issues:

1. Check if your Node.js version is 18 or higher: `node --version`
2. Make sure all dependencies are installed: `npm install`
3. Clear node modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm run lint`
5. Commit your changes: `git commit -m "Add feature"`
6. Push to your fork: `git push origin feature-name`
7. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE fi