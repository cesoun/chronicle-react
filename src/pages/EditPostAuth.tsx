import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import PostService from '../services/PostService';
import { PostModel } from '../interfaces/models/PostModels';
import { InstanceOfErrorModel } from '../interfaces/models/ErrorModel';
import EditPost from './EditPost';
import UserService from '../services/UserService';
import { User } from '../interfaces/models/UserModels';

function EditPostAuth() {
  const { user, isLoading } = useContext(UserContext);
  const { id } = useParams();

  let navigate = useNavigate();

  const [post, setPost] = useState<null | PostModel>(null);
  const [dbUser, setDbUser] = useState<null | User>(null);

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPost = async () => {
    if (!id || !parseInt(id)) return;

    const postRes = await PostService.getPostById(parseInt(id));
    if (InstanceOfErrorModel(postRes)) {
      navigate('/posts');
      return;
    }

    let post = postRes as PostModel;

    const userRes = await UserService.getUserById(post.author_id);
    if (InstanceOfErrorModel(userRes)) {
      navigate('/posts');
      return;
    }

    setDbUser(userRes as User);
    setPost(post);
  };

  if (!user) {
    if (isLoading) {
      return <p className="btn btn-ghost loading">Loading Context...</p>;
    }

    return <Navigate to={'/posts'} />;
  }

  if (!dbUser || !post) {
    return <p className="btn btn-ghost loading">Loading Post...</p>;
  }

  if (dbUser.username !== user.sub) {
    return <Navigate to={'/posts'} />;
  }

  return <EditPost post={post!} />;
}

export default EditPostAuth;
