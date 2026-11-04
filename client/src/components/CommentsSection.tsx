import { useEffect, useState } from "react";

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
    </section>
  );
}

export default CommentsSection;
