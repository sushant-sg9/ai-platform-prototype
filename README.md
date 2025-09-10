# AI Platform Prototype

A polished, frontend-only prototype of an AI interface that combines the best features from leading AI platforms. Built with Next.js, TypeScript, and Tailwind CSS.

🚀 **[Live Demo](#)** | 📖 **[Storybook](#)**

## 🎯 Project Overview

This project surveys several leading AI platforms and creates a prototype combining their most compelling features into a single, cohesive interface. The application demonstrates modern frontend development practices with a focus on user experience, accessibility, and component-driven architecture.

## 🔬 Research

### Platforms Reviewed

#### 1. OpenAI Playground
**Key Features**: Interactive parameter tuning (temperature, max tokens, top-p), multiple model selection (GPT-3.5, GPT-4), system/user message distinction, response regeneration, and export functionality.
**Standout**: Real-time parameter adjustment with immediate visual feedback and comprehensive model comparison.

#### 2. Anthropic Claude UI
**Key Features**: Clean conversation interface, message editing/regeneration, conversation branching, file upload support, and contextual conversation management.
**Standout**: Excellent conversation flow with intuitive editing and branching capabilities for exploring different conversation paths.

#### 3. Hugging Face Spaces
**Key Features**: Model exploration hub, live demos, parameter configuration panels, community-driven content, and seamless model switching.
**Standout**: Extensive model library with easy experimentation and community feedback integration.

#### 4. Microsoft Copilot Lab
**Key Features**: Code-focused interface, syntax highlighting, multi-language support, contextual suggestions, and integrated development environment feel.
**Standout**: Specialized for development workflows with intelligent code completion and context awareness.

#### 5. Perplexity AI
**Key Features**: Source citation system, real-time web search integration, follow-up question suggestions, and research-focused interface.
**Standout**: Combines AI responses with live web data and provides transparent source attribution.

### Selected Core Features

Based on our research, we implemented these 8 core features:

1. **🤖 Model Selector** - Dropdown interface to choose between different AI models
2. **✏️ Interactive Prompt Editor** - Rich text area with template save/load functionality
3. **⚙️ Parameter Panel** - Sliders and inputs for temperature, max tokens, top-p, etc.
4. **💬 Chat/Conversation Area** - Message display with copy, regenerate, and export options
5. **📄 Template Management** - Save, load, and organize prompt templates
6. **🌙 Theme Toggle** - Light/dark mode with system preference detection
7. **🔄 Response Actions** - Copy, download JSON, regenerate, and share functionality
8. **📱 Responsive Design** - Mobile-first approach with desktop enhancements

## 🎨 Design

### Design Principles

- **Clean & Modern**: Inspired by Claude's clean interface and OpenAI's parameter controls
- **Accessible**: High contrast ratios, keyboard navigation, and screen reader support
- **Responsive**: Mobile-first design that scales beautifully to desktop
- **Dark Mode**: Full dark mode support with automatic system preference detection

### Tailwind CSS Mapping

| Design Element | Tailwind Classes | Purpose |
|---------------|------------------|----------|
| **Primary Colors** | `bg-blue-600`, `text-blue-600` | Brand identity and primary actions |
| **Gray Scale** | `gray-50` to `gray-900` | Backgrounds, text hierarchy |
| **Dark Mode** | `dark:bg-gray-900`, `dark:text-white` | Consistent dark theme |
| **Spacing** | `space-y-4`, `p-4`, `gap-3` | Consistent spacing system |
| **Typography** | `text-lg`, `font-semibold` | Clear text hierarchy |
| **Animations** | `transition-colors`, `hover:bg-gray-50` | Smooth interactions |

## 🛠 Development

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React for consistent iconography
- **Animation**: CSS transitions and Framer Motion
- **Documentation**: Storybook for component development
- **Deployment**: Vercel (recommended) or Netlify

### Core Components Implementation

#### Model Selector
- **Location**: `src/components/ModelSelector.tsx`
- **Features**: Dropdown interface, model metadata display, loading states
- **API Integration**: Fetches from `/api/models` mock endpoint
- **Accessibility**: ARIA labels, keyboard navigation, focus management

#### Prompt Editor
- **Location**: `src/components/PromptEditor.tsx`
- **Features**: Template loading, character counter, keyboard shortcuts (Ctrl+Enter)
- **UX**: Auto-resize textarea, template suggestions, save functionality
- **Integration**: Connects to `/api/templates` for prompt templates

#### Parameter Panel
- **Location**: Integrated into main interface
- **Controls**: Temperature (0-2), Max Tokens (1-4000), Top P (0-1)
- **Visual Feedback**: Real-time value display, slider styling
- **State Management**: Controlled components with React state

#### Chat/Output Area
- **Location**: Main interface chat section
- **Features**: Message bubbles, copy functionality, JSON export
- **UX**: Smooth scrolling, loading animations, message actions
- **Component**: `ChatBubble.tsx` for individual messages

## 📚 Component Library (Storybook)

Storybook documentation for all UI components:

### Available Stories

1. **Button** - Variants, sizes, states
2. **Slider** - Parameter controls with descriptions
3. **Modal** - Dialog interfaces in multiple sizes
4. **ChatBubble** - Message display with actions

### Running Storybook

```bash
npm run storybook
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

```bash
# Clone and install
git clone [repository-url]
cd ai-platform-prototype
npm install

# Start development
npm run dev

# Run Storybook
npm run storybook
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run storybook` - Start Storybook

## 🎯 Features Implemented

### ✅ Core Requirements

- [x] **Model Selector**: 5 AI models with metadata
- [x] **Prompt Editor**: Template support, character counter
- [x] **Parameters Panel**: Temperature, Max Tokens, Top P
- [x] **Chat Area**: Message display with actions
- [x] **Theme Toggle**: Light/dark mode with persistence
- [x] **Responsive Layout**: Mobile to desktop
- [x] **Mock API**: Next.js API routes
- [x] **State Management**: React Context
- [x] **Accessibility**: ARIA labels, keyboard navigation
- [x] **Storybook**: 4+ component stories
- [x] **TypeScript**: Strict mode throughout

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload .next folder
```

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
