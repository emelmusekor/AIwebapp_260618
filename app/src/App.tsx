import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/Layout/Layout'
import { Home } from '@/routes/Home'
import { ModulePage } from '@/routes/ModulePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="module/:moduleId" element={<ModulePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
