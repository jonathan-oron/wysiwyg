import { Editor } from '@tiptap/react'
import { Button, Separator, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, Input } from '@/components/ui'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Table,
  Highlighter,
  Undo,
  Redo,
  ArrowLeft,
  Save,
  Check,
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface EditorToolbarProps {
  editor: Editor | null
  title: string
  onTitleChange: (title: string) => void
  isSaving?: boolean
  lastSaved?: Date | null
}

export const EditorToolbar = ({
  editor,
  title,
  onTitleChange,
  isSaving,
  lastSaved,
}: EditorToolbarProps) => {
  if (!editor) return null

  const addLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  return (
    <TooltipProvider>
      <div className="border-b border-border bg-background sticky top-0 z-10 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4 flex-1">
            <Link to="/documents">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>

            <Input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="text-lg font-semibold font-mono max-w-md border-none shadow-none focus-visible:ring-0 px-2"
              placeholder="Untitled Document"
            />
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            {isSaving && (
              <>
                <Save className="h-4 w-4 animate-pulse" />
                <span>Saving...</span>
              </>
            )}
            {!isSaving && lastSaved && (
              <>
                <Check className="h-4 w-4 text-primary" />
                <span>Saved</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          {/* Text Formatting */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('bold') ? 'default' : 'ghost'}
                size="icon"
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold (Cmd+B)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('italic') ? 'default' : 'ghost'}
                size="icon"
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic (Cmd+I)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('underline') ? 'default' : 'ghost'}
                size="icon"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <UnderlineIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Underline (Cmd+U)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('strike') ? 'default' : 'ghost'}
                size="icon"
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <Strikethrough className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Strikethrough</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('code') ? 'default' : 'ghost'}
                size="icon"
                onClick={() => editor.chain().focus().toggleCode().run()}
              >
                <Code className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Inline Code</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Headings */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
                size="icon"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              >
                <Heading1 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 1</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'}
                size="icon"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              >
                <Heading2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 2</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'}
                size="icon"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              >
                <Heading3 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Heading 3</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Lists */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
                size="icon"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
                size="icon"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Numbered List</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Alignment */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
                size="icon"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Left</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'}
                size="icon"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Center</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'}
                size="icon"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Right</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'ghost'}
                size="icon"
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              >
                <AlignJustify className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Justify</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Insert */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={addLink}>
                <LinkIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Link</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={addImage}>
                <ImageIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Image</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={addTable}>
                <Table className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert Table</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('highlight') ? 'default' : 'ghost'}
                size="icon"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
              >
                <Highlighter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Highlight</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* History */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo (Cmd+Z)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo (Cmd+Shift+Z)</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
