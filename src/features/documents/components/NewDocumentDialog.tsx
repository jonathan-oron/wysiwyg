import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Input,
  Label,
} from '@/components/ui'
import { Plus } from 'lucide-react'
import { useCreateDocument } from '../hooks/useDocuments'

const newDocumentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
})

type NewDocumentFormData = z.infer<typeof newDocumentSchema>

export const NewDocumentDialog = () => {
  const [open, setOpen] = useState(false)
  const createDocument = useCreateDocument()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewDocumentFormData>({
    resolver: zodResolver(newDocumentSchema),
  })

  const onSubmit = (data: NewDocumentFormData) => {
    createDocument.mutate(
      {
        title: data.title,
        content: '<p>Start writing...</p>',
      },
      {
        onSuccess: () => {
          setOpen(false)
          reset()
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Document</DialogTitle>
          <DialogDescription>
            Give your document a title to get started
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Untitled Document"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-error">{errors.title.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createDocument.isPending}>
              {createDocument.isPending ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
