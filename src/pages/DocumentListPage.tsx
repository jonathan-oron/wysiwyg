import { useState } from 'react'
import { MainLayout } from '@/layouts/MainLayout'
import { DocumentGrid } from '@/features/documents/components/DocumentGrid'
import { NewDocumentDialog } from '@/features/documents/components/NewDocumentDialog'
import { useDocuments } from '@/features/documents/hooks/useDocuments'
import { Input, Heading } from '@/components/ui'
import { Search } from 'lucide-react'

export const DocumentListPage = () => {
  const { data: documents = [], isLoading } = useDocuments()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDocuments = documents.filter((doc) => {
    const query = searchQuery.toLowerCase()
    return (
      doc.title.toLowerCase().includes(query) ||
      doc.excerpt.toLowerCase().includes(query) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  })

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Heading level="h1">Your Documents</Heading>
          <NewDocumentDialog />
        </div>

        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <DocumentGrid documents={filteredDocuments} isLoading={isLoading} />
      </div>
    </MainLayout>
  )
}
