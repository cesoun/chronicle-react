export interface PostModel {
  id: number;
  author_id: number;
  title: string;
  content: string;
  created_at: Date;
  modified_at: Date;
}

export interface PaginatedPosts {
  items: PostModel[];
  limit: number;
  offset: number;
  count: number;
}

export interface PostUpdateFields {
  title?: string;
  content?: string;
}

export interface PostUpdate {
  new: PostUpdateFields;
}
