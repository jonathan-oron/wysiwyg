import { useEffect, useState } from 'react'
import { Editor } from '@tiptap/react'
import { useUpdateDocument } from '@/features/documents/hooks/useDocuments'

export const useAutoSave = (documentId: string, editor: Editor | null) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const updateDocument = useUpdateDocument()

  useEffect(() => {
    if (!editor || !documentId) return

    const saveTimer = setTimeout(() => {
      const content = editor.getHTML()
      updateDocument.mutate(
        { id: documentId, input: { content } },
        {
          onSuccess: () => {
            setLastSaved(new Date())
          },
        }
      )
    }, 2000)

    return () => clearTimeout(saveTimer)
  }, [editor?.getHTML(), documentId])

  return {
    isSaving: updateDocument.isPending,
    lastSaved,
    error: updateDocument.error,
  }
}
