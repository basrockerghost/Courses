import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserProvider } from './components/api/UserProvider.tsx'
import { CourseProvider } from './components/api/CourseProvider.tsx'
import { CatProvider } from './components/api/CatProvider.tsx'
import { GroupProvider } from './components/api/GroupProvider.tsx'
import { SubjectProvider } from './components/api/SubjectProvider.tsx'
import { CurriculumProvider } from './components/api/Curriculum.tsx'
import { StructureProvider } from './components/api/StructureProvider.tsx'

const router = createBrowserRouter([
  {
    path: '*',
    element: <App/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <CurriculumProvider>
        <StructureProvider>
          <CourseProvider>
            <CatProvider>
              <GroupProvider>
                <SubjectProvider>
                  <RouterProvider router={router} />
                </SubjectProvider>
              </GroupProvider>
            </CatProvider>
          </CourseProvider>
        </StructureProvider>
      </CurriculumProvider>
    </UserProvider>
  </StrictMode>,
)
