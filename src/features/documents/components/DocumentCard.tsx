import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Document } from '@/types'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui'
import { MoreVertical, Edit, Copy, Trash } from 'lucide-react'
import { useDeleteDocument, useDuplicateDocument } from '../hooks/useDocuments'

interface DocumentCardProps {
  document: Document
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
  const deleteDocument = useDeleteDocument()
  const duplicateDocument = useDuplicateDocument()

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete this document?')) {
      deleteDocument.mutate(document.id)
    }
  }

  const handleDuplicate = (e: React.MouseEvent) => {
    e.preventDefault()
    duplicateDocument.mutate(document.id)
  }

  return (
    <Link to={`/editor/${document.id}`}>
      <Card
        variant="terminal"
        className="group hover:shadow-glow-cyan transition-all cursor-pointer h-full"
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="truncate">{document.title}</CardTitle>
              <CardDescription className="mt-2 line-clamp-2">
                {document.excerpt}
              </CardDescription>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicate}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-error">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{format(new Date(document.updatedAt), 'MMM d, yyyy')}</span>
            <div className="flex gap-2">
              <Badge variant="outline">{document.wordCount} words</Badge>
              {document.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
