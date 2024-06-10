export interface TagsDto {
    name: string,
    count: number
}

export interface CategoryDto {
    id: string
    name: string
    categoryParentId?: string
    status: 'active' | 'inactive'
    type: 'news' | 'raovat' | 'menu'
    styleShow?: 'news1' | 'news2' | 'news3'
    createdAt?: string
    slug?: string
}

export interface GetCategoryByIdResponse {
    data: CategoryDto
}

export interface GetCategoriesResponse {
    data: CategoryDto[]
}
