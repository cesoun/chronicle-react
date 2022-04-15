import { PostUpdateFields } from '../interfaces/models/PostModels';

const API_URL: string | undefined = process.env.REACT_APP_API_URL;

// TODO: PostService
// https://github.com/cesoun/chronicle-angular/blob/main/src/app/services/post/post.service.ts
class PostService {
  createPost(body: PostUpdateFields): void {}

  getPostById(id: number): void {}

  putPostById(id: number): void {}

  deletePostById(id: number): void {}

  getPosts(limit: number, offset: number): void {}

  getPostsByAuthorId(id: number, limit: number, offset: number): void {}

  getPostsByQuery(query: string, limit: number, offset: number): void {}
}

export default new PostService();
