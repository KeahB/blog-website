import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Bookmarks from './pages/Bookmarks';
import CreatePost from './pages/CreatePost';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white transition-colors duration-300">
        <Navbar />
        <main className="pt-24 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
