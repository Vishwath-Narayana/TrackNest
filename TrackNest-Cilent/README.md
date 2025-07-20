# React Board Style - Task Management Dashboard

## Project Overview

A modern, responsive task management dashboard built with React, TypeScript, and Tailwind CSS. Features a clean glassmorphism design with comprehensive project and task management capabilities.

## Features

- **Dashboard Analytics**: Real-time KPI cards and activity feeds
- **Project Management**: Timeline, resources, and team collaboration
- **Task Management**: List and Kanban views with drag-and-drop
- **Modern UI**: Glassmorphism design with smooth animations
- **Responsive Design**: Works seamlessly across all devices

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Lucide React** - Modern icon library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```sh
# Clone the repository
git clone <YOUR_REPO_URL>

# Navigate to the project directory
cd react-board-style

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── dashboard/      # Dashboard-specific components
│   ├── project-management/  # Project management components
│   ├── task-management/     # Task management components
│   └── ui/            # Base UI components (shadcn/ui)
├── pages/             # Page components
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

This project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automatic deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own applications.
