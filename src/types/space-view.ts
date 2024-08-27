export interface categoryItem {
  categoryId: number;
  categoryName: string;
}

export enum SubCategoryOrArticleItemType {
  Category,
  FAQ,
  Article,
  Link,
}

export interface ArticleOrCatrgoryItem {
  id: number; // kb Category id 或者 weee_cs.desk_kb_article表主键id
  type: SubCategoryOrArticleItemType;
  title: string;
  content: string;
}

export interface ArticleDetail extends ArticleOrCatrgoryItem {}
