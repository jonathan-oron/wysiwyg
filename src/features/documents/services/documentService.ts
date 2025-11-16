import { Document, CreateDocumentInput, UpdateDocumentInput } from '@/types'
import { MOCK_DOCUMENTS, countWords, getExcerpt } from '@/services/mockData'

const STORAGE_KEY = 'documents'
const DELAY_MS = 300

const getDocumentsFromStorage = (): Document[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_DOCUMENTS))
    return MOCK_DOCUMENTS
  }

  try {
    const documents = JSON.parse(stored)
    return documents.map((doc: any) => ({
      ...doc,
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt),
    }))
  } catch {
    return MOCK_DOCUMENTS
  }
}

const saveDocumentsToStorage = (documents: Document[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(documents))
}

export const documentService = {
  getAllDocuments: async (): Promise<Document[]> => {
    await new Promise(resolve => setTimeout(resolve, DELAY_MS))
    return getDocumentsFromStorage()
  },

  getDocumentById: async (id: string): Promise<Document> => {
    await new Promise(resolve => setTimeout(resolve, DELAY_MS))
    const documents = getDocumentsFromStorage()
    const document = documents.find(doc => doc.id === id)

    if (!document) {
      throw new Error(`Document with id ${id} not found`)
    }

    return document
  },

  createDocument: async (input: CreateDocumentInput): Promise<Document> => {
    await new Promise(resolve => setTimeout(resolve, DELAY_MS))

    const documents = getDocumentsFromStorage()
    const content = input.content || '<p>Start writing...</p>'

    const newDocument: Document = {
      id: Date.now().toString(),
      title: input.title,
      content,
      excerpt: getExcerpt(content),
      wordCount: countWords(content),
      tags: input.tags || [],
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const updatedDocuments = [newDocument, ...documents]
    saveDocumentsToStorage(updatedDocuments)

    return newDocument
  },

  updateDocument: async (
    id: string,
    input: UpdateDocumentInput
  ): Promise<Document> => {
    await new Promise(resolve => setTimeout(resolve, DELAY_MS))

    const documents = getDocumentsFromStorage()
    const documentIndex = documents.findIndex(doc => doc.id === id)

    if (documentIndex === -1) {
      throw new Error(`Document with id ${id} not found`)
    }

    const updatedDocument: Document = {
      ...documents[documentIndex],
      ...input,
      updatedAt: new Date(),
    }

    if (input.content !== undefined) {
      updatedDocument.excerpt = getExcerpt(input.content)
      updatedDocument.wordCount = countWords(input.content)
    }

    documents[documentIndex] = updatedDocument
    saveDocumentsToStorage(documents)

    return updatedDocument
  },

  deleteDocument: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, DELAY_MS))

    const documents = getDocumentsFromStorage()
    const filteredDocuments = documents.filter(doc => doc.id !== id)

    if (filteredDocuments.length === documents.length) {
      throw new Error(`Document with id ${id} not found`)
    }

    saveDocumentsToStorage(filteredDocuments)
  },

  duplicateDocument: async (id: string): Promise<Document> => {
    await new Promise(resolve => setTimeout(resolve, DELAY_MS))

    const original = await documentService.getDocumentById(id)
    const documents = getDocumentsFromStorage()

    const duplicate: Document = {
      ...original,
      id: Date.now().toString(),
      title: `${original.title} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const updatedDocuments = [duplicate, ...documents]
    saveDocumentsToStorage(updatedDocuments)

    return duplicate
  },
}
