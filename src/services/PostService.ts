import {
  PaginatedPosts,
  Post,
  PostUpdateFields,
} from '../interfaces/models/PostModels';
import axios from 'axios';
import { ProcessError } from '../utils/Request';
import ErrorModel from '../interfaces/models/ErrorModel';

const API_URL: string | undefined = process.env.REACT_APP_API_URL;

class PostService {
  createPost(body: PostUpdateFields): Promise<boolean | ErrorModel> {
    return axios
      .post(`${API_URL}/post`, body)
      .then((res) => res.status === 204)
      .catch(ProcessError);
  }

  getPostById(id: number): Promise<Post | ErrorModel> {
    return axios
      .get(`${API_URL}/post/${id}`)
      .then((res) => res.data as Post)
      .catch(ProcessError);
  }

  putPostById(
    id: number,
    body: PostUpdateFields
  ): Promise<boolean | ErrorModel> {
    return axios
      .put(`${API_URL}/post/${id}`, body)
      .then((res) => res.status === 204)
      .catch(ProcessError);
  }

  deletePostById(id: number): Promise<boolean | ErrorModel> {
    return axios
      .delete(`${API_URL}/post/${id}`)
      .then((res) => res.status === 204)
      .catch(ProcessError);
  }

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
