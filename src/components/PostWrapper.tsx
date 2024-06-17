import React from 'react';
import { useParams } from 'react-router-dom';
import Post from './Posts';

// https://react.dev/reference/react/Component#component
// Basicamente o meu  <Route path="/post/:id" element={<PostWrapper />} /> estava a dar erro mais uma vez o react-router-dom estava-me dar problemas
// e nem o solução do MainContent.tsx estava a funcionar, então decidi fazer um wrapper para o App.tsx. sem duvida que não é a melhor solução.
// https://stackoverflow.com/questions/75706357/react-useparams-returns-string-undefined


const PostWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <Post postId={Number(id)} />;
};

export default PostWrapper;
