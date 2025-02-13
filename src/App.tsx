import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ListPage from './pages/ListPage'
import PostPage from './pages/PostPage'
import EditFormPage from './pages/editForm/EditFormPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<ListPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/post/:id/edit" element={<EditFormPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
