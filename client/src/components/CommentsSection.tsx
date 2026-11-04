import { useEffect, useState, type FormEvent } from "react";
import CommentItem from "./CommentItem";
import type { Comment } from "../types";

type CommentsSectionProps = {
  articleId: string;
};

function CommentsSection({ articleId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newBody, setNewBody] = useState("");
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(
          `http://localhost:8080/articles/${articleId}/comments`,
        );
        if (!response.ok) {
          throw new Error("Request failed");
        }
        setComments(await response.json());
      } catch {
        setLoadError("Could not load comments.");
      }
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

  function handleUpdate(updatedComment: Comment) {
    setComments(
      comments.map((comment) =>
        comment.commentId === updatedComment.commentId
          ? updatedComment
          : comment,
      ),
    );
  }

  function handleDelete(commentId: number) {
    setComments(
      comments.filter((comment) => comment.commentId !== commentId),
    );
  }

  return (
    <section>
      <h2>Comments</h2>
      {loadError && <p className="error">{loadError}</p>}
      {!loadError && comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <CommentItem
              key={comment.commentId}
              comment={comment}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
      <form onSubmit={handleAdd}>
        <textarea
          placeholder="Write a comment"
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Add Comment</button>
      </form>
    </section>
  );
}

export default CommentsSection;
