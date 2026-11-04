import { useEffect, useState } from "react";
import { useParams } from "react-router";

type Article = {
  articleId: number;
  title: string;
  contents: string;
};

function ArticleDetailPage() {
  const { articleId } = useParams();
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

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.contents}</p>
    </div>
  );
}

export default ArticleDetailPage;
