export interface BookFilterDto {
  title: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  orderBy: string;
  orderDirection: string;
  page: number;
  size: number;
}
