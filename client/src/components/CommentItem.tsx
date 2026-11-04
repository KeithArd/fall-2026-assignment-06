import { useState, type FormEvent } from "react";
import type { Comment } from "../types";

type CommentItemProps = {
  comment: Comment;
  onUpdate: (updatedComment: Comment) => void;
  onDelete: (commentId: number) => void;
};

function CommentItem({ comment, onUpdate, onDelete }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState("");
  const [error, setError] = useState("");

  const commentUrl = `http://localhost:8080/articles/${comment.articleId}/comments/${comment.commentId}`;

  function handleEdit() {
    setEditBody(comment.body);
    setError("");
    setIsEditing(true);
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();

    if (!editBody.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    const response = await fetch(commentUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: editBody }),
    });
    const updatedComment = await response.json();
    onUpdate(updatedComment);
    setIsEditing(false);
  }

  async function handleDelete() {
    await fetch(commentUrl, { method: "DELETE" });
    onDelete(comment.commentId);
  }

  if (isEditing) {
    return (
      <li>
        <form onSubmit={handleSave}>
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
          {error && <p>{error}</p>}
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      </li>
    );
  }

  return (
    <li>
      <p>{comment.body}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default CommentItem;
