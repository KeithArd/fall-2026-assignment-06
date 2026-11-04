import { Route, Routes } from "react-router";
import ArticleListPage from "./pages/ArticleListPage.tsx";
import CreateArticlePage from "./pages/CreateArticlePage.tsx";
import ArticleDetailPage from "./pages/ArticleDetailPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ArticleListPage />} />
      <Route path="/articles/new" element={<CreateArticlePage />} />
      <Route path="/articles/:articleId" element={<ArticleDetailPage />} />
    </Routes>
  );
}

export default App;
