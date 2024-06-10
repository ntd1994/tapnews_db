
export interface NewsDto {
  id?: string
  title?: string
  description?: string
  content?: string
  publishDate?: Date | string
  userId?: string
  categoryId?: string
  categoryName?: string
  parentCategoryId?: string;
  parentCategoryName?: string;
  imageUrl?: string
  slug?: string
  author?: string
  authorAvatar?: string
  createdBy?: string
  updatedBy?: string
  isOutStanding?: boolean
  isRaoVat?: boolean
  view?: string
}

export interface RaoVatDto extends NewsDto {
  extraImages?: string[],
  facebook?: string
  phoneNumber?: string
  contactName?: string
  websiteUrl?: string
  email?: string
  address?: string
}

export interface News1Dto extends NewsDto {
  subNews: NewsDto[]
}

export type PagedNewsItemDto = Omit<
  NewsDto,
  "content" | "updateAt" | "updatedBy" | "createdAt" | "createdBy"
>;

export type PagedRaoVatItemDto = Omit<
    NewsDto,
    "content" | "updateAt" | "updatedBy" | "createdAt" | "createdBy"
>;