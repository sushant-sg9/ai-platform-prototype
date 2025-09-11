# AI Platform Prototype

This is my take on building a modern AI chat interface by studying what works well in existing platforms and combining those ideas into something clean and functional. I built this as a frontend-only prototype to explore different UI patterns and responsive design approaches.

🚀 **[Live Demo](https://ai-platform-prototype.vercel.app)** | 📖 **[Storybook](#)**

## 🎯 What I Built

I wanted to understand what makes different AI platforms work well, so I spent time using ChatGPT, Claude, Perplexity, and others. Then I picked the features I found most useful and built my own interface around them. 

The whole thing is just a frontend prototype - no real AI integration - but it shows off the UI patterns and responsive design I've been learning about.

## 🔬 Research

I checked out a bunch of AI platforms to see what worked well. Here's what I found:

**OpenAI Playground** - I loved how you could adjust temperature and other settings in real-time and immediately see how it affected the responses. The parameter controls are really well done.

**Claude's Interface** - Super clean conversation flow. The way you can edit messages and branch conversations felt really natural to use.

**Hugging Face Spaces** - Great for trying out different models quickly. The variety and easy switching between models was impressive.

**Microsoft Copilot** - Obviously focused on code, but the syntax highlighting and development-focused features gave me ideas for how to present technical content.

**Perplexity AI** - I really liked how it shows sources and integrates web search. The transparency about where information comes from is something more platforms should do.

### What I Built

After trying all these platforms, I decided to focus on these key features:

1. **Model Selector** - Easy switching between GPT-4, Claude, etc.
2. **Prompt Templates** - Save and reuse common prompts (super helpful!)
3. **Parameter Controls** - Temperature, max tokens - stuff that actually affects responses
4. **Clean Chat Interface** - Focus on the conversation without clutter
5. **Mobile-First Design** - Works great on phone, even better on desktop
6. **Dark/Light Mode** - Because everyone has preferences
7. **Copy/Export** - Get your responses in the format you need
8. **Responsive Layout** - Looks good everywhere

## 🎨 Design

I wanted something that felt modern but not overwhelming. Took inspiration from Claude's clean look and OpenAI's parameter controls.

**Key design choices:**
- Mobile-first (most people use their phones)
- Dark mode that actually looks good
- High contrast so it's easy to read
- Keyboard shortcuts for power users

### Tailwind CSS Mapping

| Design Element | Tailwind Classes | Purpose |
|---------------|------------------|----------|
| **Primary Colors** | `bg-blue-600`, `text-blue-600` | Brand identity and primary actions |
| **Gray Scale** | `gray-50` to `gray-900` | Backgrounds, text hierarchy |
| **Dark Mode** | `dark:bg-gray-900`, `dark:text-white` | Consistent dark theme |
| **Spacing** | `space-y-4`, `p-4`, `gap-3` | Consistent spacing system |
| **Typography** | `text-lg`, `font-semibold` | Clear text hierarchy |
| **Animations** | `transition-colors`, `hover:bg-gray-50` | Smooth interactions |

## 🛠 Tech Stack

I used tools I'm comfortable with and wanted to learn more about:

- **Next.js 14** - App router is really nice to work with
- **TypeScript** - Strict mode because I like catching errors early
- **Tailwind CSS** - So much faster than writing custom CSS
- **Lucide Icons** - Clean, consistent icon set
- **Storybook** - Great for building components in isolation
- **Deployed on Vercel** - Zero-config deployment

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

## 🚀 Running Locally

If you want to run this yourself:

```bash
git clone https://github.com/your-username/ai-platform-prototype.git
cd ai-platform-prototype
npm install
npm run dev
```

Then open http://localhost:3000

For Storybook: `npm run storybook`

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

## What I Learned

This project helped me understand:
- How different AI platforms approach UX
- Mobile-first responsive design patterns
- Building reusable component systems with Storybook
- TypeScript in a real project (strict mode is your friend)
- The new Next.js App Router

Feel free to check out the code, use it as inspiration, or let me know what you think!

---

*Built with Next.js, TypeScript, and way too much coffee ☕*
