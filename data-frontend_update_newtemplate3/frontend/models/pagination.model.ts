export interface PaginationQuery {
  page: number;
  size: number;
  // order: string;
}

export interface PagedList<T> {
  items: T[];
  totalCount: number;
  page: number;
  size: number;
  hasPrevious: boolean;
  hasNext: boolean;
  totalPage: number;
}
