export interface Document {
  id: string
  title: string
  content: string
  excerpt: string
  createdAt: Date
  updatedAt: Date
  wordCount: number
  tags: string[]
  userId: string
}

export interface CreateDocumentInput {
  title: string
  content?: string
  tags?: string[]
}

export interface UpdateDocumentInput {
  title?: string
  content?: string
  tags?: string[]
}
