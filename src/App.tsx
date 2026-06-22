import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { NewsPage } from './pages/news/NewsPage';
import { NewsDetailPage } from './pages/news/NewsDetailPage';
import { DepartmentPage } from './pages/DepartmentPage';
import { EventsPage } from './pages/EventsPage';
import { ScrollToTop } from './components/layout/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:id" element={<NewsDetailPage />} />
          <Route path="department" element={<DepartmentPage />} />
          <Route path="events" element={<EventsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
