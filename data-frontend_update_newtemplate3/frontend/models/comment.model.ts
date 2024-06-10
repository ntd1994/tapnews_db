export interface CommentDto {
    name: string
    content: string
    email: string
    userId: string
    avatar: string
    createdAt: string
}

export type PagedCommentDto = Omit<
    CommentDto,
    "content" | "updateAt" | "updatedBy" | "createdAt" | "createdBy"
>;