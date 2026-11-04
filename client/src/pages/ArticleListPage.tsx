import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { Article } from "../types";

const previewLength = 100; // Number of characters to display in the article preview

//                         ***** HELPER FUNCTIONS **
// truncates the article contents if it exceeds the preview length
function truncateContents(contents: string): string {
  if (contents.length <= previewLength) {
    return contents;
  }
  return contents.substring(0, previewLength) + "...";
}

// renders ArticleListPage component
//      returns a list item with a link to the article detail page
//      truncates the article contents to display a preview of the article
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
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArticles() {
      setLoadError("");
      try {
        const response = await fetch(
          `http://localhost:8080/articles?title_contains=${encodeURIComponent(searchTerm)}`,
        );
        if (!response.ok) {
          throw new Error("Request failed");
        }
        setArticles(await response.json());
      } catch {
        setLoadError("Could not load articles.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles();
  }, [searchTerm]);

  return (
    <div>
      <h1>Article List</h1>
      <button onClick={() => navigate("/articles/new")}>Create Article</button>
      <input
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading && <p>Loading...</p>}
      {loadError && <p className="error">{loadError}</p>}
      {!isLoading && !loadError && articles.length === 0 && (
        <p>No articles found.</p>
      )}
      <ul>{articles.map(renderArticle)}</ul>
    </div>
  );
}

export default ArticleListPage;
