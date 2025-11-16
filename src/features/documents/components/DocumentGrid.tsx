import { Document } from '@/types'
import { DocumentCard } from './DocumentCard'
import { Card, CardContent, Text } from '@/components/ui'
import { FileText } from 'lucide-react'

interface DocumentGridProps {
  documents: Document[]
  isLoading?: boolean
}

export const DocumentGrid = ({ documents, isLoading }: DocumentGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="h-48 animate-pulse bg-card" />
        ))}
      </div>
    )
  }

  if (documents.length === 0) {
    return (
      <Card variant="highlighted" className="p-12 text-center">
        <CardContent>
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <Text className="text-muted-foreground mb-2">No documents yet</Text>
          <Text size="sm" className="text-muted-foreground">
            Create your first document to get started
          </Text>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((document) => (
        <DocumentCard key={document.id} document={document} />
      ))}
    </div>
  )
}
