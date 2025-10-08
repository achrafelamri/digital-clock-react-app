# 🕐 ElvmriPulse - Professional Digital Clock

<div align="center">

![ElvmriPulse Banner](https://img.shields.io/badge/ElvmriPulse-Digital%20Clock-blue?style=for-the-badge&logo=clock)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

*A beautiful, modern digital clock application built with cutting-edge web technologies*

[🚀 Live Demo](https://your-demo-link.com) • [📖 Documentation](#features) • [🐛 Report Bug](https://github.com/achrafelamri/digital-clock-react-app/issues) • [💡 Request Feature](https://github.com/achrafelamri/digital-clock-react-app/issues)

</div>

---

## ✨ Features

### 🕒 **Real-Time Clock Display**
- **Precise Time Updates**: Updates every second with millisecond accuracy
- **Large, Clear Display**: Responsive typography that scales beautifully on all devices
- **Monospace Font**: Ensures consistent digit spacing and professional appearance

### 🎛️ **Customizable Time Formats**
- **12-Hour Format**: Traditional AM/PM display with elegant indicators
- **24-Hour Format**: Military time for professional use
- **One-Click Toggle**: Seamlessly switch between formats with a single button

### 📅 **Smart Date Display**
- **Full Date Information**: Shows day of week, month, date, and year
- **Toggle Visibility**: Hide/show date display as needed
- **Beautiful Formatting**: Clean, readable date presentation

### 🎨 **Modern UI/UX Design**
- **Dark/Light Themes**: Toggle between beautiful dark and light modes
- **Smooth Animations**: Elegant fade-in effects and smooth transitions
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Glass Morphism**: Modern card-based design with subtle shadows

### 🔊 **Audio Feedback**
- **Tick Sounds**: Optional gentle tick sounds for each second
- **Custom Audio Engine**: Web Audio API for crisp, professional sound
- **Volume Control**: Easy toggle for sound on/off

### 🚀 **Performance Optimized**
- **Memory Efficient**: Proper cleanup to prevent memory leaks
- **Smooth Rendering**: Optimized re-renders for 60fps performance
- **Fast Loading**: Minimal bundle size with modern optimization

---

## 🛠️ Technology Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | [React 19](https://react.dev/) | Modern UI library with latest features |
| **Meta-Framework** | [Next.js 15](https://nextjs.org/) | Full-stack React framework |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Type-safe JavaScript |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) | Accessible component primitives |
| **Icons** | [Lucide React](https://lucide.dev/) | Beautiful, customizable icons |
| **Theme** | [next-themes](https://github.com/pacocoursey/next-themes) | Dark/light mode support |
| **Audio** | Web Audio API | High-quality sound generation |
| **Package Manager** | [pnpm](https://pnpm.io/) | Fast, efficient package management |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0 or higher
- **pnpm** (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/achrafelamri/digital-clock-react-app.git
   cd digital-clock-react-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

---

## 🎯 Usage

### Basic Controls

| Feature | Action | Description |
|---------|--------|-------------|
| **🕐 Time Format** | Click "12-Hour" / "24-Hour" button | Toggle between 12-hour and 24-hour time formats |
| **📅 Date Display** | Click "Show Date" / "Hide Date" button | Toggle date visibility on/off |
| **🌙 Theme** | Click sun/moon icon | Switch between dark and light themes |
| **🔊 Sound** | Click volume icon | Enable/disable tick sounds |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `T` | Toggle time format |
| `D` | Toggle date display |
| `M` | Toggle theme |
| `S` | Toggle sound |

---

## 📱 Responsive Design

ElvmriPulse is fully responsive and optimized for all screen sizes:

- **📱 Mobile**: Optimized touch interface with large buttons
- **📟 Tablet**: Perfect balance of size and functionality
- **🖥️ Desktop**: Full-featured experience with hover effects
- **🖥️ Large Screens**: Scales beautifully on 4K displays

---

## 🎨 Customization

### Theme Customization

The app supports both light and dark themes with automatic system preference detection:

```typescript
// Theme switching is handled automatically
const { theme, setTheme } = useTheme()
```

### Color Scheme

The app uses a carefully crafted color palette that works beautifully in both themes:

- **Primary Colors**: Blue accent for highlights and separators
- **Background**: Subtle gradients and card-based layout
- **Text**: High contrast for excellent readability
- **Borders**: Subtle transparency for modern glass effect

---

## 🔧 Development

### Project Structure

```
elvmri-pulse-digital-clock/
├── 📁 app/                    # Next.js app directory
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── 📁 components/             # React components
│   ├── digital-clock.tsx     # Main clock component
│   ├── theme-provider.tsx    # Theme context provider
│   └── 📁 ui/                # Reusable UI components
├── 📁 hooks/                  # Custom React hooks
├── 📁 lib/                    # Utility functions
├── 📁 public/                 # Static assets
├── 📁 styles/                 # Additional styles
├── next.config.mjs           # Next.js configuration
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

### Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

---

## 🌟 Key Features Explained

### ⚡ Real-Time Updates
The clock uses `setInterval` with proper cleanup to ensure smooth, accurate time updates without memory leaks.

### 🎵 Audio Engine
Custom Web Audio API implementation creates gentle, professional tick sounds that alternate in pitch for a pleasant listening experience.

### 🎨 Modern Design
Glass morphism design with subtle shadows, smooth transitions, and responsive typography creates a premium feel.

### 🔄 Theme System
Built-in theme switching with system preference detection and smooth transitions between light and dark modes.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Test on multiple screen sizes
- Ensure accessibility compliance
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Achraf Elamri**
- GitHub: [@achrafelamri](https://github.com/achrafelamri)
- Email: [your-email@example.com]

---

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Vercel** - For Next.js and deployment platform
- **Tailwind CSS** - For the utility-first CSS framework
- **Radix UI** - For accessible component primitives
- **Lucide** - For beautiful icons

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/achrafelamri/digital-clock-react-app?style=social)
![GitHub forks](https://img.shields.io/github/forks/achrafelamri/digital-clock-react-app?style=social)
![GitHub issues](https://img.shields.io/github/issues/achrafelamri/digital-clock-react-app)
![GitHub last commit](https://img.shields.io/github/last-commit/achrafelamri/digital-clock-react-app)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Achraf Elamri](https://github.com/achrafelamri)

</div>
