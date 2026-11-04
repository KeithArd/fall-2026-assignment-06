export type Article = {
  articleId: number;
  title: string;
  contents: string;
};

export type Comment = {
  commentId: number;
  articleId: number;
  body: string;
};
