import {
  PaginatedPosts,
  PostModel,
  PostUpdate,
  PostUpdateFields,
} from '../interfaces/models/PostModels';
import axios from 'axios';
import { ProcessError } from '../utils/Request';
import ErrorModel from '../interfaces/models/ErrorModel';

const API_URL: string | undefined = process.env.REACT_APP_API_URL;

class PostService {
  /**
   * Create a Post
   * @param body Post to create
   */
  createPost(body: PostUpdateFields): Promise<boolean | ErrorModel> {
    return axios
      .post(`${API_URL}/post`, body)
      .then((res) => res.status === 204)
      .catch(ProcessError);
  }

  /**
   * Get a Post by Id
   * @param id Id of the Post
   */
  getPostById(id: number): Promise<PostModel | ErrorModel> {
    return axios
      .get(`${API_URL}/post/${id}`)
      .then((res) => res.data as PostModel)
      .catch(ProcessError);
  }

  /**
   * Update a Post by Id
   * @param id Id of the Post
   * @param body Fields to update on the Post
   */
  putPostById(id: number, body: PostUpdate): Promise<boolean | ErrorModel> {
    console.log(body, { ...body });

    return axios
      .put(`${API_URL}/post/${id}`, { ...body })
      .then((res) => res.status === 204)
      .catch(ProcessError);
  }

  /**
   * Delete a Post by Id
   * @param id Id of the Post
   */
  deletePostById(id: number): Promise<boolean | ErrorModel> {
    return axios
      .delete(`${API_URL}/post/${id}`)
      .then((res) => res.status === 204)
      .catch(ProcessError);
  }

  /**
   * Get All Posts
   * @param limit Number of Posts to return 1 - 100
   * @param offset The page offset
   */
  getPosts(
    limit: number,
    offset: number
  ): Promise<null | PaginatedPosts | ErrorModel> {
    const params = new URLSearchParams([
      ['limit', limit.toString()],
      ['offset', offset.toString()],
    ]);

    return axios
      .get(`${API_URL}/posts`, { params })
      .then((res) => {
        if (res.status === 204) return null;

        return res.data as PaginatedPosts;
      })
      .catch(ProcessError);
  }

  /**
   * Get the Posts given an Author Id
   * @param id Id of the Author
   * @param limit Number of Posts to return 1 - 100
   * @param offset The page offset
   */
  getPostsByAuthorId(
    id: number,
    limit: number,
    offset: number
  ): Promise<null | PaginatedPosts | ErrorModel> {
    const params = new URLSearchParams([
      ['limit', limit.toString()],
      ['offset', offset.toString()],
    ]);

    return axios
      .get(`${API_URL}/posts/author/${id}`, { params })
      .then((res) => {
        if (res.status === 204) return null;

        return res.data as PaginatedPosts;
      })
      .catch(ProcessError);
  }

  /**
   * Get the Posts given a Query string
   * @param query Query to look for in the title and content
   * @param limit Number of Posts to return 1 - 100
   * @param offset The page offset
   */
  getPostsByQuery(
    query: string,
    limit: number,
    offset: number
  ): Promise<null | PaginatedPosts | ErrorModel> {
    const params = new URLSearchParams([
      ['limit', limit.toString()],
      ['offset', offset.toString()],
    ]);

    return axios
      .get(`${API_URL}/posts/search/${query}`, { params })
      .then((res) => {
        if (res.status === 204) return null;

        return res.data as PaginatedPosts;
      })
      .catch(ProcessError);
  }
}

export default new PostService();
