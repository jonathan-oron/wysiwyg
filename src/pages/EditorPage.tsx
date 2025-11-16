import { useParams } from 'react-router-dom'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import Highlight from '@tiptap/extension-highlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import { EditorContent } from '@tiptap/react'
import { EditorLayout } from '@/layouts/EditorLayout'
import { EditorToolbar } from '@/features/editor/components/EditorToolbar'
import { useDocument, useUpdateDocument } from '@/features/documents/hooks/useDocuments'
import { useAutoSave } from '@/features/editor/hooks/useAutoSave'
import { useEffect } from 'react'

const lowlight = createLowlight(common)

export const EditorPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data: document, isLoading } = useDocument(id!)
  const updateDocument = useUpdateDocument()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer hover:text-primary-hover',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full my-4',
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-border bg-card p-2 font-bold text-left',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-border p-2',
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: 'bg-warning/30 px-1 rounded',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-card border border-border rounded p-4 font-mono text-sm overflow-x-auto my-4',
        },
      }),
    ],
    content: document?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[calc(100vh-140px)]',
      },
    },
  })

  const { isSaving, lastSaved } = useAutoSave(id!, editor)

  useEffect(() => {
    if (document && editor && !editor.isDestroyed) {
      const currentContent = editor.getHTML()
      if (currentContent !== document.content) {
        editor.commands.setContent(document.content)
      }
    }
  }, [document, editor])

  const handleTitleChange = (newTitle: string) => {
    if (id) {
      updateDocument.mutate({
        id,
        input: { title: newTitle },
      })
    }
  }

  if (isLoading) {
    return (
      <EditorLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-primary font-mono terminal-glow">Loading document...</div>
        </div>
      </EditorLayout>
    )
  }

  if (!document) {
    return (
      <EditorLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-error font-mono">Document not found</div>
        </div>
      </EditorLayout>
    )
  }

  return (
    <EditorLayout>
      <EditorToolbar
        editor={editor}
        title={document.title}
        onTitleChange={handleTitleChange}
        isSaving={isSaving}
        lastSaved={lastSaved}
      />

      <div className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <EditorContent editor={editor} />
        </div>
      </div>
    </EditorLayout>
  )
}
