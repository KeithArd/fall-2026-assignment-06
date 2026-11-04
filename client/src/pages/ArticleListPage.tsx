import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router";

type Article = {
  articleId: number;
  title: string;
  contents: string;
};

// helper functions

// Converts JSON article data to JSX elements
// Returns a list item with a link to the article detail page
// truncates the article contents to display a preview of the article
function renderArticle(article: Article) {
  return (
    <li key={article.articleId}>
      <Link to={`/articles/${article.articleId}`}>{article.title}</Link>
      <p>{article.contents.substring(0, 100)}...</p>
    </li>
  );
}

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
      <ul>{articles.map(renderArticle)}</ul>
    </div>
  );
}

export default ArticleListPage;
