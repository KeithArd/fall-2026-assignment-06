import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import CommentsSection from "../components/CommentsSection";
import type { Article } from "../types";

function ArticleDetailPage() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContents, setEditContents] = useState("");
  const [error, setError] = useState("");

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

  function handleEdit() {
    if (!article) return;
    setEditTitle(article.title);
    setEditContents(article.contents);
    setError("");
    setIsEditing(true);
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();

    if (!editTitle.trim() || !editContents.trim()) {
      setError("Title and contents are required.");
      return;
    }

    const response = await fetch(
      `http://localhost:8080/articles/${articleId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, contents: editContents }),
      },
    );
    const updatedArticle = await response.json();
    setArticle(updatedArticle);
    setIsEditing(false);
  }

  if (!article) {
    return <p>Loading...</p>;
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSave}>
        <h1>Edit Article</h1>
        <input
          placeholder="Title"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <textarea
          placeholder="Contents"
          value={editContents}
          onChange={(e) => setEditContents(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button type="submit">Save</button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </form>
    );
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.contents}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <CommentsSection articleId={articleId!} />
    </div>
  );
}

export default ArticleDetailPage;
