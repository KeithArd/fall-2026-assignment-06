import { useState } from "react";
import { useEffect } from "react";

type Article = {
  articleId: number;
  title: string;
  contents: string;
};

function ArticleListPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      const response = await fetch("http://localhost:8080/articles");
      const data = await response.json();
      setArticles(data);
    }
    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Article List</h1>
      <p>{articles.length} articles</p>
    </div>
  );
}

export default ArticleListPage;
