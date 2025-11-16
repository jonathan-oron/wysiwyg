import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { documentService } from '../services/documentService'
import { CreateDocumentInput, UpdateDocumentInput } from '@/types'

export const useDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: documentService.getAllDocuments,
  })
}

export const useDocument = (id: string) => {
  return useQuery({
    queryKey: ['document', id],
    queryFn: () => documentService.getDocumentById(id),
    enabled: !!id,
  })
}

export const useCreateDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateDocumentInput) => documentService.createDocument(input),
    onSuccess: (newDocument) => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      window.location.href = `/editor/${newDocument.id}`
    },
  })
}

export const useUpdateDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateDocumentInput }) =>
      documentService.updateDocument(id, input),
    onMutate: async ({ id, input }) => {
      await queryClient.cancelQueries({ queryKey: ['document', id] })
      const previousDocument = queryClient.getQueryData(['document', id])

      queryClient.setQueryData(['document', id], (old: any) => ({
        ...old,
        ...input,
        updatedAt: new Date(),
      }))

      return { previousDocument }
    },
    onError: (_err, { id }, context) => {
      if (context?.previousDocument) {
        queryClient.setQueryData(['document', id], context.previousDocument)
      }
    },
    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['document', id] })
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })
}

export const useDeleteDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => documentService.deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })
}

export const useDuplicateDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => documentService.duplicateDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })
}
