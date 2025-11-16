import { Document } from '@/types'

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Getting Started with Rich Text Editing',
    content: `<h1>Welcome to the Editor</h1><p>This is a <strong>rich text editor</strong> built with <em>TipTap</em> and <u>React</u>. It supports various formatting options including:</p><ul><li>Bold, italic, and underline text</li><li>Multiple heading levels</li><li>Lists (ordered and unordered)</li><li>Links and images</li><li>Code blocks with syntax highlighting</li><li>Tables for structured data</li></ul><p>Try exploring the toolbar to discover all the available features!</p>`,
    excerpt: 'Welcome to the Editor. This is a rich text editor built with TipTap and React. It supports various formatting options including: Bold, italic, and underline text Multiple heading levels...',
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-12'),
    wordCount: 68,
    tags: ['tutorial', 'getting-started'],
    userId: '1',
  },
  {
    id: '2',
    title: 'Terminal-Themed Design System',
    content: `<h1>Terminal Aesthetic</h1><p>This application features a <mark>terminal-inspired design system</mark> with a retro phosphor green color scheme.</p><h2>Design Principles</h2><p>The design system is built on DTCG-compliant design tokens and follows these key principles:</p><ol><li>Monospace typography for code-like aesthetics</li><li>Green phosphor glow effects</li><li>Dark backgrounds reminiscent of CRT monitors</li><li>High contrast for readability</li></ol><blockquote><p>"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs</p></blockquote><h3>Component Library</h3><p>All components are built with Radix UI primitives and styled with Tailwind CSS using our custom design tokens.</p>`,
    excerpt: 'Terminal Aesthetic. This application features a terminal-inspired design system with a retro phosphor green color scheme. Design Principles The design system is built on DTCG-compliant design...',
    createdAt: new Date('2025-01-11'),
    updatedAt: new Date('2025-01-13'),
    wordCount: 92,
    tags: ['design', 'theme'],
    userId: '1',
  },
  {
    id: '3',
    title: 'Code Examples and Syntax Highlighting',
    content: `<h1>Working with Code</h1><p>The editor supports code blocks with syntax highlighting powered by Lowlight.</p><h2>Example: React Component</h2><pre><code class="language-tsx">import React from 'react'

export const Button = ({ children, onClick }) => {
  return (
    &lt;button
      onClick={onClick}
      className="bg-primary text-white px-4 py-2"
    &gt;
      {children}
    &lt;/button&gt;
  )
}</code></pre><h2>Inline Code</h2><p>You can also use <code>inline code</code> for short snippets like <code>const x = 42</code> or <code>npm install</code>.</p>`,
    excerpt: 'Working with Code. The editor supports code blocks with syntax highlighting powered by Lowlight. Example: React Component import React from react export const Button = ({ children, onClick...',
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date('2025-01-14'),
    wordCount: 65,
    tags: ['code', 'examples'],
    userId: '1',
  },
  {
    id: '4',
    title: 'Project Planning Template',
    content: `<h1>Project Planning Template</h1><h2>Project Overview</h2><p><strong>Project Name:</strong> WYSIWYG Editor Application<br><strong>Start Date:</strong> January 2025<br><strong>Status:</strong> In Progress</p><h2>Milestones</h2><table><thead><tr><th>Phase</th><th>Task</th><th>Status</th><th>Due Date</th></tr></thead><tbody><tr><td>1</td><td>Setup and Dependencies</td><td>✅ Complete</td><td>Jan 10</td></tr><tr><td>2</td><td>UI Components</td><td>✅ Complete</td><td>Jan 12</td></tr><tr><td>3</td><td>Core Features</td><td>🟡 In Progress</td><td>Jan 15</td></tr><tr><td>4</td><td>Polish & Testing</td><td>⬜ Pending</td><td>Jan 18</td></tr></tbody></table><h2>Next Steps</h2><ul><li>Complete editor implementation</li><li>Add auto-save functionality</li><li>Implement document management</li><li>User testing and feedback</li></ul>`,
    excerpt: 'Project Planning Template. Project Overview Project Name: WYSIWYG Editor Application Start Date: January 2025 Status: In Progress Milestones Phase Task Status Due Date 1 Setup and Dependencies...',
    createdAt: new Date('2025-01-09'),
    updatedAt: new Date('2025-01-15'),
    wordCount: 95,
    tags: ['planning', 'project-management'],
    userId: '1',
  },
  {
    id: '5',
    title: 'Meeting Notes - Product Review',
    content: `<h1>Product Review Meeting</h1><p><strong>Date:</strong> January 15, 2025<br><strong>Attendees:</strong> Product Team, Engineering Team, Design Team</p><h2>Agenda</h2><ol><li>Review current progress</li><li>Discuss user feedback</li><li>Plan next sprint</li><li>Address blockers</li></ol><h2>Discussion Points</h2><h3>User Feedback</h3><p>Users are loving the <mark>terminal aesthetic</mark> and find the interface intuitive. Some requested features:</p><ul><li>Dark mode toggle (already terminal-themed, but lighter variant requested)</li><li>Export to PDF functionality</li><li>Collaborative editing support</li><li>Mobile-responsive design</li></ul><h3>Technical Considerations</h3><p>The team discussed implementing real-time collaboration using Yjs and WebSockets. This would require backend infrastructure.</p><h2>Action Items</h2><ul><li>Research Yjs integration - <em>@engineering</em></li><li>Design mobile layouts - <em>@design</em></li><li>User interview sessions - <em>@product</em></li></ul>`,
    excerpt: 'Product Review Meeting. Date: January 15, 2025 Attendees: Product Team, Engineering Team, Design Team Agenda Review current progress Discuss user feedback Plan next sprint Address blockers...',
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
    wordCount: 118,
    tags: ['meetings', 'notes'],
    userId: '1',
  },
  {
    id: '6',
    title: 'Quick Notes',
    content: `<h2>Random Thoughts and Ideas</h2><p>Just a collection of quick notes and thoughts:</p><ul><li>Consider adding a command palette (Cmd+K)</li><li>Keyboard shortcuts need documentation</li><li>Consider adding a "Focus Mode" that hides the toolbar</li><li>Auto-save indicator could be more prominent</li></ul><p>Remember to test on different browsers!</p>`,
    excerpt: 'Random Thoughts and Ideas. Just a collection of quick notes and thoughts: Consider adding a command palette (Cmd+K) Keyboard shortcuts need documentation Consider adding a "Focus Mode" that...',
    createdAt: new Date('2025-01-14'),
    updatedAt: new Date('2025-01-16'),
    wordCount: 42,
    tags: ['notes', 'ideas'],
    userId: '1',
  },
  {
    id: '7',
    title: 'Technical Architecture Overview',
    content: `<h1>System Architecture</h1><h2>Frontend Stack</h2><ul><li><strong>Framework:</strong> React 18 with TypeScript</li><li><strong>Build Tool:</strong> Vite 5</li><li><strong>Styling:</strong> Tailwind CSS with custom design tokens</li><li><strong>Components:</strong> Radix UI primitives</li><li><strong>Editor:</strong> TipTap v3</li><li><strong>State Management:</strong> TanStack Query + Zustand</li><li><strong>Routing:</strong> React Router v7</li></ul><h2>Design System</h2><p>The design system uses DTCG-compliant tokens stored in JSON and compiled to CSS variables. This allows for:</p><ul><li>Type-safe design token access</li><li>Easy theme customization</li><li>Consistent styling across components</li><li>Automatic documentation via Storybook</li></ul><h2>Development Workflow</h2><pre><code class="language-bash"># Install dependencies
npm install

# Start development server
npm run dev

# Run Storybook
npm run storybook

# Build for production
npm run build</code></pre>`,
    excerpt: 'System Architecture. Frontend Stack Framework: React 18 with TypeScript Build Tool: Vite 5 Styling: Tailwind CSS with custom design tokens Components: Radix UI primitives Editor: TipTap v3 State...',
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date('2025-01-16'),
    wordCount: 108,
    tags: ['architecture', 'technical'],
    userId: '1',
  },
  {
    id: '8',
    title: 'Feature Roadmap',
    content: `<h1>Feature Roadmap 2025</h1><h2>Q1 2025</h2><ul><li>✅ Basic rich text editing</li><li>✅ Document management (CRUD)</li><li>✅ Auto-save functionality</li><li>🟡 Export to multiple formats</li><li>⬜ Mobile responsive design</li></ul><h2>Q2 2025</h2><ul><li>⬜ Real-time collaboration</li><li>⬜ Comments and suggestions</li><li>⬜ Version history</li><li>⬜ Template library</li></ul><h2>Q3 2025</h2><ul><li>⬜ AI writing assistance</li><li>⬜ Advanced formatting options</li><li>⬜ Custom plugins API</li></ul><h2>Q4 2025</h2><ul><li>⬜ Enterprise features</li><li>⬜ Advanced permissions</li><li>⬜ Analytics dashboard</li></ul>`,
    excerpt: 'Feature Roadmap 2025. Q1 2025 ✅ Basic rich text editing ✅ Document management (CRUD) ✅ Auto-save functionality 🟡 Export to multiple formats ⬜ Mobile responsive design Q2 2025 ⬜ Real-time...',
    createdAt: new Date('2025-01-07'),
    updatedAt: new Date('2025-01-16'),
    wordCount: 72,
    tags: ['roadmap', 'planning'],
    userId: '1',
  },
]

const countWords = (html: string): number => {
  const text = html.replace(/<[^>]*>/g, ' ')
  const words = text.trim().split(/\s+/).filter(word => word.length > 0)
  return words.length
}

const getExcerpt = (html: string, maxLength = 150): string => {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export { countWords, getExcerpt }
