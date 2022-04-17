import { useEffect, useState } from 'react';
import { PaginatedPosts } from '../interfaces/models/PostModels';
import ErrorModel, {
  InstanceOfErrorModel,
} from '../interfaces/models/ErrorModel';
import PostService from '../services/PostService';

export default function UseRecentPosts() {
  const [posts, setPosts] = useState<null | PaginatedPosts>(null);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [error, setError] = useState<null | ErrorModel>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [hasPrev, setHasPrev] = useState<boolean>(false);

  useEffect(() => {
    getRecentPosts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRecentPosts = async (p: number) => {
    setLoading(true);
    setPosts(null);

    const res = await PostService.getPosts(limit, p * limit);
    if (InstanceOfErrorModel(res)) {
      setPosts(null);
      setError(res as ErrorModel);
    } else if (res) {
      const pp = res as PaginatedPosts;

      setHasNext(pp.offset < pp.count);
      setHasPrev(p > 0);

      setPosts(pp);
    } else {
      setPosts(null);
      setError({ error: true, msg: 'no posts found' });
    }

    setLoading(false);
  };

  const nextFunc = async () => {
    if (!hasNext) return;

    setPage(page + 1);
    await getRecentPosts(page + 1);
  };

  const prevFunc = async () => {
    if (!hasPrev) return;

    setPage(page - 1);
    await getRecentPosts(page - 1);
  };

  return {
    posts,
    error,
    loading,
    hasNext,
    hasPrev,
    setLimit,
    nextFunc,
    prevFunc,
  };
}
