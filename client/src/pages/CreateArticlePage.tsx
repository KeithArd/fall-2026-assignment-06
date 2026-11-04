import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

function CreateArticlePage() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!title.trim() || !contents.trim()) {
      setError("Title and contents are required.");
      return;
    }

    const response = await fetch("http://localhost:8080/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, contents }),
    });
    const newArticle = await response.json();
    navigate(`/articles/${newArticle.articleId}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Article</h1>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Contents"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button type="submit">Create Article</button>
    </form>
  );
}

export default CreateArticlePage;
