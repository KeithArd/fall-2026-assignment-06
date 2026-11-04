import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Article = {
  articleId: number;
  title: string;
  contents: string;
};

function ArticleDetailPage() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      const response = await fetch(
        `http://localhost:8080/articles/${articleId}`,
      );
      const data = await response.json();
      setArticle(data);
    }
    fetchArticle();
  }, [articleId]);

  async function handleDelete() {
    await fetch(`http://localhost:8080/articles/${articleId}`, {
      method: "DELETE",
    });
    navigate("/");
  }

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.contents}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ArticleDetailPage;
