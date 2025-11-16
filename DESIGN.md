# WYSIWYG Editor Application Architecture Guide

**TipTap emerges as the definitive choice for rapid WYSIWYG editor development in 2025**, combining 100+ ready-made extensions with production-grade stability used by GitLab and Nextcloud. Paired with Vite's instant hot reload and shadcn/ui's copy-paste components, this stack enables building a complete multi-page editor application in days rather than weeks.

The recommended architecture leverages exclusively open-source, actively maintained libraries that minimize custom code: TipTap handles all rich text complexity, React Router v7 provides battle-tested routing, TanStack Query manages data fetching with automatic caching, and Zustand coordinates lightweight UI state. For a frontend-only application with mock data, Vite's development server eliminates backend setup entirely while providing production-ready builds. This guide provides step-by-step implementation details to transform these technologies into a working editor application with landing page, authentication, document management, and real-time editing capabilities.

## Technology stack recommendations

### Core technologies

**TipTap v3** powers the editor component with the richest ecosystem and fastest setup time among React WYSIWYG solutions. With 3.1M weekly npm downloads and stable v3 release, TipTap provides 100+ extensions including tables, code blocks, mentions, and collaborative editing support through Yjs. The ProseMirror foundation ensures battle-tested performance while the intuitive API reduces custom code by 60-70% compared to lower-level alternatives like Lexical or Slate. Official React integration via `@tiptap/react` delivers hooks-based patterns familiar to React developers.

**Vite 5** replaces Create React App as the unanimous build tool choice, offering instant server startup and hot module replacement that doesn't degrade with project size. Vite's native ES modules during development and Rollup-optimized production builds provide 10-100x faster iteration compared to webpack-based tools. Zero-configuration TypeScript support and sub-second rebuild times make Vite essential for maintaining development velocity.

**React Router v7** handles navigation with proven stability from powering millions of SPAs since 2014. The November 2024 release merging with Remix brings modern features while maintaining the simple declarative API perfect for straightforward routing needs. At just 20KB, React Router delivers protected routes, navigation guards, and loader patterns without the complexity or bundle size overhead of newer alternatives.

**shadcn/ui** provides production-ready React components that copy directly into your codebase rather than installing as dependencies. Built on Radix UI primitives and Tailwind CSS, shadcn/ui offers 50+ accessible components with complete customization freedom. The 50% smaller bundle size compared to Material-UI (150KB vs 300KB) and full ownership of component code eliminates third-party upgrade friction while maintaining professional polish.

### State management architecture

**TanStack Query v5** manages all server state including document fetching, user authentication, and auto-save operations. Automatic caching, background refetching, and optimistic updates eliminate custom data fetching logic while providing instant UI updates. The industry-standard solution with millions of weekly downloads handles loading states, error recovery, and request deduplication automatically.

**Zustand** coordinates shared UI state like toolbar visibility and panel toggles with minimal boilerplate. The 1-2KB bundle and hook-based API without providers makes Zustand the simplest state solution for 2025, requiring just 3-5 lines to create a store. Use exclusively for UI state that must be shared across multiple components while keeping local state in `useState`.

**nuqs** synchronizes editor state with URL parameters for shareable links and browser history integration. This specialized library provides type-safe query parameter management, automatically syncing state between URL and React components bidirectionally.

### Development tooling

**TypeScript 5** provides compile-time safety essential for medium-to-large React applications, with 70%+ adoption in new 2025 projects. Vite's zero-config TypeScript support eliminates setup friction while IDE autocomplete and refactoring capabilities reduce debugging time by catching errors before runtime.

**pnpm** as package manager delivers 65% faster installs and 70% disk space savings compared to npm through hard-linked global storage. For single projects, npm remains a solid choice with universal compatibility, but pnpm's performance benefits compound across development team machines and CI/CD pipelines.

**ESLint + Prettier** enforce code consistency automatically, with the recommended configuration covering React hooks rules, TypeScript parsing, and formatting that integrates seamlessly with Vite's fast refresh.

## Project structure

```
/wysiwyg-editor-app
├── /public/
│   └── logo.svg                    # App logo for landing page
├── /src/
│   ├── /assets/
│   │   └── /images/                # Marketing images for landing
│   ├── /components/
│   │   ├── /ui/                    # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── Header.tsx              # Navigation header
│   │   ├── Footer.tsx              # Site footer
│   │   └── ProtectedRoute.tsx      # Auth guard component
│   ├── /features/
│   │   ├── /auth/
│   │   │   ├── /components/
│   │   │   │   └── LoginForm.tsx
│   │   │   ├── /hooks/
│   │   │   │   └── useAuth.ts
│   │   │   └── /services/
│   │   │       └── authService.ts   # Mock auth logic
│   │   ├── /documents/
│   │   │   ├── /components/
│   │   │   │   ├── DocumentCard.tsx
│   │   │   │   ├── DocumentGrid.tsx
│   │   │   │   └── NewDocumentDialog.tsx
│   │   │   ├── /hooks/
│   │   │   │   └── useDocuments.ts  # TanStack Query hooks
│   │   │   └── /services/
│   │   │       └── documentService.ts # Mock API
│   │   └── /editor/
│   │       ├── /components/
│   │       │   ├── EditorToolbar.tsx
│   │       │   ├── EditorContent.tsx
│   │       │   ├── EditorSidebar.tsx
│   │       │   └── TipTapEditor.tsx  # Main editor wrapper
│   │       ├── /hooks/
│   │       │   ├── useEditor.ts
│   │       │   └── useAutoSave.ts
│   │       ├── /extensions/         # Custom TipTap extensions
│   │       │   └── index.ts
│   │       └── /services/
│   │           └── editorService.ts  # Document save/load
│   ├── /hooks/
│   │   └── useLocalStorage.ts       # Shared utility hooks
│   ├── /layouts/
│   │   ├── MainLayout.tsx           # Layout with header/footer
│   │   └── EditorLayout.tsx         # Full-screen editor layout
│   ├── /lib/
│   │   └── utils.ts                 # shadcn/ui utilities
│   ├── /pages/
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── DocumentListPage.tsx
│   │   └── EditorPage.tsx
│   ├── /services/
│   │   └── mockData.ts              # Lorem ipsum documents
│   ├── /store/
│   │   └── editorStore.ts           # Zustand store
│   ├── /styles/
│   │   └── globals.css              # Tailwind + custom styles
│   ├── /types/
│   │   ├── document.ts
│   │   └── user.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx                   # Route definitions
├── .env
├── .eslintrc.json
├── .prettierrc
├── components.json                  # shadcn/ui config
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

This feature-based structure groups related components, hooks, and services together while maintaining a clear separation between reusable UI components and feature-specific logic. The `/features` directory contains self-contained modules that can be developed and tested independently, while `/components/ui` houses the shadcn/ui component library. Pages act as thin containers that compose features together, and layouts provide consistent structure across routes.

## Dependencies to install

### Initial project creation

```bash
# Create Vite project with React + TypeScript template
pnpm create vite wysiwyg-editor-app -- --template react-ts

cd wysiwyg-editor-app
pnpm install
```

### Core dependencies

```bash
# Editor foundation
pnpm add @tiptap/react @tiptap/pm @tiptap/starter-kit

# Additional TipTap extensions
pnpm add @tiptap/extension-text-align @tiptap/extension-underline @tiptap/extension-link @tiptap/extension-image @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-header @tiptap/extension-table-cell @tiptap/extension-highlight @tiptap/extension-code-block-lowlight

# Syntax highlighting for code blocks
pnpm add lowlight

# Routing
pnpm add react-router-dom

# State management
pnpm add @tanstack/react-query zustand

# URL state management
pnpm add nuqs

# UI components (Tailwind CSS required for shadcn/ui)
pnpm add tailwindcss postcss autoprefixer
pnpm add class-variance-authority clsx tailwind-merge
pnpm add @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-avatar

# Icons
pnpm add lucide-react

# Form handling
pnpm add react-hook-form @hookform/resolvers zod

# Date utilities
pnpm add date-fns
```

### Dev dependencies

```bash
pnpm add -D @types/react @types/react-dom
pnpm add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
pnpm add -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
pnpm add -D prettier eslint-config-prettier
pnpm add -D @tailwindcss/typography
```

### Configure shadcn/ui

```bash
# Initialize shadcn/ui configuration
pnpm dlx shadcn-ui@latest init

# Add required components
pnpm dlx shadcn-ui@latest add button
pnpm dlx shadcn-ui@latest add input
pnpm dlx shadcn-ui@latest add card
pnpm dlx shadcn-ui@latest add dialog
pnpm dlx shadcn-ui@latest add dropdown-menu
pnpm dlx shadcn-ui@latest add avatar
pnpm dlx shadcn-ui@latest add separator
pnpm dlx shadcn-ui@latest add badge
pnpm dlx shadcn-ui@latest add tooltip
```

### Essential configuration files

**vite.config.ts** with path aliases:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
```

**tailwind.config.js** with shadcn/ui configuration:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // shadcn/ui theme configuration will be auto-generated
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
```

**tsconfig.json** with path mapping:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Component breakdown for each page

### Landing page components

**LandingPage.tsx** serves as the marketing entry point with hero section, feature highlights, and call-to-action buttons linking to login. This page uses no authentication and renders in MainLayout with header and footer.

**Hero section** features large heading, subtitle describing the editor's capabilities, and prominent "Get Started" button routing to `/login`. Background gradient or image establishes visual appeal.

**Feature cards** showcase three key benefits: "Rich Text Editing" with formatting capabilities, "Cloud Storage" for document persistence (mock concept), and "Collaborative Editing" as future capability. Each card uses shadcn/ui Card component with icon from lucide-react.

**Footer** includes placeholder links for About, Contact, Privacy Policy, and Terms of Service. Social media icons provide visual completion without requiring actual links.

### Login page components

**LoginPage.tsx** renders centered LoginForm within minimal layout, optionally with blurred editor background for visual continuity. No header/footer to maintain focus on authentication.

**LoginForm.tsx** accepts any username/password combination through mock authentication. Built with react-hook-form and zod validation, the form includes:

- Username/email input with basic validation
- Password input with type toggle (show/hide)
- "Remember me" checkbox (non-functional mock)
- Submit button that calls mock auth service
- Error message display for validation feedback

Mock authentication stores user object in localStorage and TanStack Query cache, then redirects to `/documents` route. The form provides immediate feedback and loading states during mock async validation (artificial 500ms delay for realism).

**Implementation pattern**:

```typescript
const loginMutation = useMutation({
  mutationFn: mockAuthService.login,
  onSuccess: (user) => {
    queryClient.setQueryData(['currentUser'], user)
    navigate('/documents')
  },
})
```

### Document list page components

**DocumentListPage.tsx** displays grid or list of mock documents with create, search, and sort functionality. Protected route requiring authentication redirects unauthenticated users to `/login`.

**DocumentGrid.tsx** renders responsive grid (1-4 columns based on viewport) of DocumentCard components. Uses TanStack Query to fetch mock documents with loading skeleton states.

**DocumentCard.tsx** displays individual document preview with:

- Title and excerpt (first 150 characters of content)
- Last modified date using date-fns formatting
- Word count badge
- Thumbnail preview (simplified rich text render or placeholder)
- Hover actions: Edit (navigate to editor), Duplicate, Delete
- Click handler navigating to `/editor/:documentId`

**NewDocumentDialog.tsx** modal form for creating documents, triggered by floating action button. Accepts title input and creates new document with lorem ipsum template, immediately navigating to editor.

**Search and filter bar** above grid includes:

- Search input filtering by title/content (client-side)
- Sort dropdown: Last Modified, Created Date, Title (A-Z)
- View toggle: Grid vs List layout
- Filter by tag/category (mock categories)

**Empty state** when no documents exist displays illustration with "Create your first document" message and create button.

### Editor page components

**EditorPage.tsx** uses full-screen EditorLayout without traditional header/footer, instead rendering EditorToolbar at top and optional EditorSidebar.

**TipTapEditor.tsx** wraps TipTap editor instance with extensions configuration:

```typescript
const editor = useEditor({
  extensions: [
    StarterKit.configure({
      history: {
        depth: 100,
      },
    }),
    Underline,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Link.configure({
      openOnClick: false,
    }),
    Image,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    Highlight,
    CodeBlockLowlight.configure({
      lowlight,
    }),
  ],
  content: documentContent,
  onUpdate: ({ editor }) => {
    handleAutoSave(editor.getHTML())
  },
})
```

**EditorToolbar.tsx** renders formatting controls with active state indicators:

- Text formatting: Bold, Italic, Underline, Strike
- Headings dropdown: H1-H6, Paragraph
- Alignment buttons: Left, Center, Right, Justify  
- List buttons: Bullet list, Numbered list
- Insert menu: Link, Image, Table, Code block
- Text color/highlight pickers
- Undo/Redo buttons
- Document title input (editable inline)
- Save status indicator (Auto-saved, Saving..., Error)
- Back to documents button

Toolbar uses sticky positioning and shadcn/ui Button components with Tooltip wrappers. Active formatting states read from `editor.isActive()` method to highlight pressed buttons.

**EditorContent.tsx** renders the editable content area with TipTap's `<EditorContent>` component. Applies prose styling from @tailwindcss/typography for beautiful default formatting. Configures focus outline and comfortable reading width (max-w-4xl).

**useAutoSave.ts** custom hook debounces editor changes and calls mock save API after 2 seconds of inactivity:

```typescript
export const useAutoSave = (documentId: string, editor: Editor | null) => {
  const debouncedContent = useDebounce(editor?.getHTML() ?? '', 2000)
  
  const saveMutation = useMutation({
    mutationFn: (content: string) => 
      documentService.updateDocument(documentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries(['document', documentId])
    },
  })

  useEffect(() => {
    if (debouncedContent) {
      saveMutation.mutate(debouncedContent)
    }
  }, [debouncedContent])

  return {
    isSaving: saveMutation.isPending,
    lastSaved: saveMutation.data?.updatedAt,
    error: saveMutation.error,
  }
}
```

**EditorSidebar.tsx** (optional enhancement) provides:

- Document outline/table of contents from headings
- Character/word count statistics
- Revision history (mock timestamps)
- Export options (HTML, Markdown, PDF mock buttons)
- Share settings (mock collaborative features)

Toggle sidebar visibility via button in toolbar, storing state in Zustand store.

## Key implementation notes

### Mock data architecture

Create realistic lorem ipsum documents in `services/mockData.ts` with variety of formatting to showcase editor capabilities. Include tables, code blocks, lists, images (via Unsplash URLs), and links. Structure mock documents as:

```typescript
export interface Document {
  id: string
  title: string
  content: string // HTML from TipTap
  excerpt: string
  createdAt: Date
  updatedAt: Date
  wordCount: number
  tags: string[]
}

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Getting Started with Rich Text Editing',
    content: '<h1>Welcome</h1><p>Lorem ipsum...</p>',
    // ... additional fields
  },
  // 8-10 mock documents total
]
```

Mock authentication service validates any non-empty username/password and returns mock user object:

```typescript
export const mockAuthService = {
  login: async (username: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network
    if (username && password) {
      const user = { id: '1', username, email: `${username}@example.com` }
      localStorage.setItem('currentUser', JSON.stringify(user))
      return user
    }
    throw new Error('Invalid credentials')
  },
  
  logout: () => {
    localStorage.removeItem('currentUser')
  },
  
  getCurrentUser: () => {
    const stored = localStorage.getItem('currentUser')
    return stored ? JSON.parse(stored) : null
  },
}
```

Store documents in localStorage for persistence across browser sessions. Implement CRUD operations in `documentService.ts` that read/write from localStorage with artificial delays to simulate API latency.

### TipTap configuration best practices

Initialize editor with StarterKit for common formatting, then add extensions incrementally based on needed features. StarterKit includes Bold, Italic, Strike, Code, Paragraph, Text, Heading, Blockquote, BulletList, OrderedList, ListItem, HorizontalRule, HardBreak, and History.

Configure extensions with sensible defaults while exposing customization options:

```typescript
Link.configure({
  openOnClick: false, // Prevent navigation in edit mode
  HTMLAttributes: {
    class: 'text-blue-600 underline',
  },
})

Image.configure({
  inline: true,
  allowBase64: true,
  HTMLAttributes: {
    class: 'max-w-full h-auto',
  },
})
```

Implement custom keyboard shortcuts for power users through editor configuration. Command/Ctrl+K for link insertion, Command/Ctrl+Shift+V for paste without formatting.

Handle focus management to ensure editor captures keyboard input on page load. Add escape key handler to exit fullscreen or close modals without losing editor state.

### Performance optimization techniques

Debounce auto-save operations to prevent excessive API calls during active typing. Use 2-second delay as sweet spot between responsiveness and efficiency.

Lazy load TipTap extensions to reduce initial bundle size. Import only required extensions dynamically when specific features activate:

```typescript
const loadTable = async () => {
  const { Table, TableRow, TableHeader, TableCell } = await import('@tiptap/extension-table')
  return [Table, TableRow, TableHeader, TableCell]
}
```

Implement virtual scrolling for document list if exceeding 50 items. Use react-window or react-virtual for smooth rendering of large document collections.

Memoize expensive computations like word counts and character counts to prevent recalculation on every render. Use React.useMemo with editor content hash as dependency.

Code-split routes to load only necessary code for current page. React Router v7 supports lazy route loading:

```typescript
const EditorPage = lazy(() => import('@/pages/EditorPage'))

<Route path="/editor/:id" element={
  <Suspense fallback={<LoadingSpinner />}>
    <EditorPage />
  </Suspense>
} />
```

### Accessibility considerations

Ensure all toolbar buttons have accessible labels via aria-label attributes. Use Tooltip components from shadcn/ui to provide visual hints that also improve accessibility.

Implement keyboard navigation for editor toolbar. Tab through buttons, Enter to activate, arrow keys to navigate within dropdowns.

Add ARIA landmarks to editor page structure: `role="toolbar"` for toolbar, `role="main"` for editor content, `role="complementary"` for sidebar.

Provide skip links for keyboard users to jump directly to editor content bypassing toolbar navigation.

Test color contrast ratios for all interactive elements ensuring WCAG AA compliance minimum. shadcn/ui components provide accessible defaults.

### State management patterns

Use TanStack Query for all mock API operations with optimistic updates:

```typescript
const updateDocumentMutation = useMutation({
  mutationFn: documentService.updateDocument,
  onMutate: async (newDocument) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(['document', newDocument.id])
    
    // Snapshot previous value
    const previousDocument = queryClient.getQueryData(['document', newDocument.id])
    
    // Optimistically update
    queryClient.setQueryData(['document', newDocument.id], newDocument)
    
    return { previousDocument }
  },
  onError: (err, newDocument, context) => {
    // Rollback on error
    queryClient.setQueryData(
      ['document', newDocument.id], 
      context?.previousDocument
    )
  },
})
```

Create Zustand store for editor UI state only:

```typescript
interface EditorStore {
  isSidebarOpen: boolean
  activePanel: 'outline' | 'history' | 'export' | null
  toolbarCollapsed: boolean
  toggleSidebar: () => void
  setActivePanel: (panel: EditorStore['activePanel']) => void
}

export const useEditorStore = create<EditorStore>((set) => ({
  isSidebarOpen: true,
  activePanel: null,
  toolbarCollapsed: false,
  toggleSidebar: () => set((state) => ({ 
    isSidebarOpen: !state.isSidebarOpen 
  })),
  setActivePanel: (panel) => set({ activePanel: panel }),
}))
```

Keep local component state for transient UI like dropdown open states and tooltip visibility. Don't over-architect state management for simple interactions.

## Step-by-step build order

### Phase 1: Foundation (Day 1)

**Step 1: Initialize project** with Vite, install core dependencies, configure TypeScript, ESLint, Prettier, and Tailwind CSS. Initialize shadcn/ui and add basic UI components. Verify development server starts successfully with hot reload.

**Step 2: Configure routing** in `router.tsx` with React Router v7. Define routes for landing, login, documents, and editor pages. Implement basic page components returning placeholder content. Test navigation between routes.

**Step 3: Create mock data services** with authentication and document CRUD operations. Implement localStorage persistence. Create 8-10 sample documents with varied content and formatting. Test mock APIs in browser console.

**Step 4: Set up TanStack Query** provider and basic configuration. Create query hooks for fetching current user and document list. Test query caching behavior.

### Phase 2: Authentication and navigation (Day 1-2)

**Step 5: Build landing page** with hero section, feature cards, and footer. Implement responsive layout using Tailwind CSS utilities. Add navigation header with logo and login button. Test visual polish and mobile responsiveness.

**Step 6: Implement login page** with LoginForm component using react-hook-form. Wire up mock authentication service with TanStack Query mutation. Handle success/error states and loading indicators. Test various input scenarios and navigation after successful login.

**Step 7: Create protected route wrapper** that checks authentication status and redirects to login. Apply to documents and editor routes. Test authentication flow from landing → login → documents.

**Step 8: Add logout functionality** to header with user dropdown menu. Clear authentication state and redirect to landing page on logout.

### Phase 3: Document management (Day 2-3)

**Step 9: Build document list page** with DocumentGrid and DocumentCard components. Wire up TanStack Query to fetch mock documents. Implement loading skeletons during data fetch.

**Step 10: Add document creation** with NewDocumentDialog component. Implement optimistic updates when creating new document. Navigate to editor after successful creation.

**Step 11: Implement search and filtering** on document list. Add sort options and view toggle (grid/list). Store filter preferences in URL query parameters using nuqs.

**Step 12: Add document actions** (duplicate, delete) with confirmation dialogs. Implement optimistic updates for delete operation with rollback on error.

### Phase 4: Editor foundation (Day 3-4)

**Step 13: Initialize TipTap editor** with StarterKit extensions. Create TipTapEditor component that loads document content from mock API. Verify basic text input and formatting works.

**Step 14: Build editor toolbar** with formatting buttons. Implement active state indicators reading from TipTap's `isActive()` method. Test all formatting options apply correctly.

**Step 15: Add extended formatting** with additional TipTap extensions: TextAlign, Underline, Link, Image, Table, CodeBlock with syntax highlighting. Verify each extension renders and edits correctly.

**Step 16: Implement auto-save functionality** using useAutoSave hook. Debounce content changes and persist to localStorage via mock API. Show save status indicator in toolbar.

### Phase 5: Editor enhancement (Day 4-5)

**Step 17: Create EditorLayout** with full-screen design and sticky toolbar. Remove traditional header/footer, add back button to return to document list. Test layout on various screen sizes.

**Step 18: Build document title editing** inline in toolbar. Update document object on blur or enter key. Sync title changes with auto-save.

**Step 19: Add editor sidebar** (optional) with outline generation from heading tags. Implement click-to-scroll navigation within document. Add word/character count display.

**Step 20: Implement keyboard shortcuts** for common operations. Add help dialog (? key) listing available shortcuts. Test shortcuts don't conflict with browser defaults.

### Phase 6: Polish and optimization (Day 5)

**Step 21: Apply Tailwind CSS styling** consistently across all pages. Ensure color scheme, spacing, and typography create cohesive visual design. Implement dark mode support using Tailwind's dark: variants.

**Step 22: Add loading states and error boundaries** throughout application. Create custom error fallback components with retry buttons. Test error scenarios like failed API calls.

**Step 23: Implement route transitions** and loading indicators when navigating between pages. Use React.Suspense for lazy-loaded routes.

**Step 24: Optimize bundle size** by code-splitting large dependencies. Analyze bundle with Vite's build command and rollup-plugin-visualizer. Lazy load TipTap extensions not needed on initial load.

**Step 25: Test entire user flow** from landing page through document creation and editing. Verify localStorage persistence across browser sessions. Test on multiple browsers and devices for compatibility.

### Phase 7: Documentation and deployment (Day 5)

**Step 26: Create README.md** with setup instructions, architecture overview, and feature list. Document component structure and state management patterns.

**Step 27: Build production bundle** and test deployment. Configure Vite for production optimizations. Verify all routes work in production build.

**Step 28: Add meta tags** for SEO and social sharing on landing page. Include Open Graph tags and favicon.

This build order prioritizes establishing foundation early (routing, state management, mock data) before building features incrementally. Each phase produces working functionality that can be tested independently. The typical timeline spans 5 days for a single developer working full-time, with days 1-2 completing infrastructure, days 3-4 building core features, and day 5 polishing the experience.

## Additional recommendations

### Extensions for future enhancement

**Collaborative editing** integrates smoothly via TipTap's Yjs extension when backend websocket support becomes available. The current architecture requires minimal changes to support real-time collaboration beyond adding `@tiptap/extension-collaboration` and websocket provider.

**Export functionality** can leverage TipTap's built-in HTML output combined with libraries like html-docx-js for Word format or jsPDF for PDF generation. Add export buttons to editor toolbar or sidebar.

**Commenting and suggestions** implements through TipTap's mark-based extension system. Create custom marks for highlights and comments that store metadata without modifying underlying content.

**Version history** stores document snapshots on auto-save, creating timeline of changes. Implement diff viewer using diff-match-patch library to show changes between versions.

**Templates and blocks** provide starting points for common document types. Create library of reusable content blocks (call-out boxes, tables of contents, code examples) that insert pre-formatted content.

### Testing strategy

Unit test custom hooks (useAutoSave, useDocuments) with Vitest and @testing-library/react-hooks. Mock TanStack Query client for isolated testing.

Component test React components using Vitest and React Testing Library. Focus on user interactions and state changes rather than implementation details.

Integration test complete user flows (login → create document → edit → save) using Playwright or Cypress. Verify localStorage persistence and navigation between routes.

Accessibility test with axe-core integration and manual keyboard navigation verification. Ensure screen readers announce editor changes appropriately.

### Deployment options

**Vercel** provides zero-configuration deployment for Vite projects with automatic preview deployments on pull requests. Connect GitHub repository for continuous deployment.

**Netlify** offers similar simplicity with drag-and-drop deployment option. Configure build command as `pnpm build` and publish directory as `dist`.

**GitHub Pages** hosts static sites free for public repositories. Requires configuring base path in Vite config and manual deployment workflow.

**Cloudflare Pages** delivers excellent performance with global CDN and unlimited bandwidth. Automatic HTTPS and preview deployments included.

All hosting options support single-page application routing by configuring fallback to index.html for 404 responses. Add `_redirects` file (Netlify) or configure vercel.json to handle client-side routing.

### Resource optimization

Compress images in `/assets` using imagemin or similar tools before committing. Use modern formats like WebP with JPEG fallbacks for browser compatibility.

Enable Brotli compression in production builds through Vite plugins. Reduces bundle size by additional 15-25% beyond gzip.

Implement service worker for offline editing capability using Workbox. Cache editor assets and enable document access without network connection.

Use dynamic imports for large dependencies like syntax highlighters loaded only when code blocks are inserted. Reduces initial bundle by 50-100KB.

### Security considerations

Sanitize HTML content from TipTap editor before displaying to prevent XSS attacks when real backend is added. Use DOMPurify library for HTML sanitization.

Implement Content Security Policy headers in production restricting script sources and inline styles. Configure CSP to allow TipTap's necessary inline styles.

Validate all user inputs on form submission even though current implementation uses mock authentication. Prepare for future backend integration with proper validation.

Store authentication tokens securely when replacing mock auth with real backend. Use httpOnly cookies rather than localStorage for sensitive tokens.

This architecture guide provides comprehensive foundation for building a production-ready WYSIWYG editor application using modern React best practices and actively maintained open-source libraries. The technology stack minimizes custom code through extensive ecosystem reuse while maintaining flexibility for future enhancements.