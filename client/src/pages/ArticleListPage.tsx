import { useEffect, useState } from "react";
import { Link } from "react-router";

type Article = {
  articleId: number;
  title: string;
  contents: string;
};

const previewLength = 100; // Number of characters to display in the article preview

// ** helper functions **

// Truncates the article contents if it exceeds the preview length and adds an ellipsis
function truncateContents(contents: string): string {
  if (contents.length <= previewLength) {
    return contents;
  }
  return contents.substring(0, previewLength) + "...";
}

// Converts JSON article data to JSX elements
// Returns a list item with a link to the article detail page
// truncates the article contents to display a preview of the article
function renderArticle(article: Article) {
  return (
    <li key={article.articleId}>
      <Link to={`/articles/${article.articleId}`}>{article.title}</Link>
      <p>{truncateContents(article.contents)}</p>
    </li>
  );
}

function ArticleListPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    async function fetchArticles() {
      const response = await fetch(
        `http://localhost:8080/articles?title_contains=${encodeURIComponent(searchTerm)}`,
      );
      const data = await response.json();
      setArticles(data);
    }
    fetchArticles();
  }, [searchTerm]);

  return (
    <div>
      <h1>Article List</h1>
      <input
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>{articles.map(renderArticle)}</ul>
    </div>
  );
}

export default ArticleListPage;
