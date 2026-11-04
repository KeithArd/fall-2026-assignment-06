import { useEffect, useState, type FormEvent } from "react";

type Comment = {
  commentId: number;
  articleId: number;
  body: string;
};

type CommentsSectionProps = {
  articleId: string;
};

function CommentsSection({ articleId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newBody, setNewBody] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch(
        `http://localhost:8080/articles/${articleId}/comments`,
      );
      const data = await response.json();
      setComments(data);
    }
    fetchComments();
  }, [articleId]);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();

    if (!newBody.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    const response = await fetch(
      `http://localhost:8080/articles/${articleId}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: newBody }),
      },
    );
    const newComment = await response.json();
    setComments([...comments, newComment]);
    setNewBody("");
    setError("");
  }

  return (
    <section>
      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.commentId}>{comment.body}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleAdd}>
        <textarea
          placeholder="Write a comment"
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button type="submit">Add Comment</button>
      </form>
    </section>
  );
}

export default CommentsSection;
