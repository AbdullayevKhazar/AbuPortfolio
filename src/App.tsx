import { Route, Routes } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { Suspense, lazy } from "react";

// Layouts
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const AdminLayout = lazy(() => import("./layouts/AdminLayouts"));

// Main pages
const Home = lazy(() => import("./pages/main/Home"));
const ProjectDetails = lazy(() => import("./pages/main/ProjectDetails"));
const MyProject = lazy(() => import("./pages/main/MyProject"));
const About = lazy(() => import("./pages/main/About"));
const ErrorPage = lazy(() => import("./pages/main/ErrorPage"));

// Admin pages
const AllSkills = lazy(() => import("./pages/admin/AllSkills"));
const AddSkill = lazy(() => import("./pages/admin/AddSkill"));
const EditSkill = lazy(() => import("./pages/admin/EditSkill"));
const AllWorks = lazy(() => import("./pages/admin/AllWorks"));
const AddWorks = lazy(() => import("./pages/admin/AddWorks"));
const EditWork = lazy(() => import("./pages/admin/EditWork"));
const AddExperience = lazy(() => import("./pages/admin/AddExperience"));
const Experiences = lazy(() => import("./pages/admin/Experiences"));
const EditExperience = lazy(() => import("./pages/admin/EditExperience"));
const AddEducation = lazy(() => import("./pages/admin/AddEducation"));
const Education = lazy(() => import("./pages/admin/Education"));

function App() {
  return (
    <>
      <ReactLenis root options={{ wheelMultiplier: 0.4, duration: 1.1 }} />

      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="work" element={<ProjectDetails />} />
            <Route path="projects" element={<MyProject />} />
            <Route path="project/:id" element={<ProjectDetails />} />
            <Route path="skills" element={<About />} />
          </Route>

          <Route path="admin/*" element={<AdminLayout />}>
            <Route index element={<AllSkills />} />
            <Route path="add-skill" element={<AddSkill />} />
            <Route path="edit-skill/:id" element={<EditSkill />} />
            <Route path="all-works" element={<AllWorks />} />
            <Route path="add-works" element={<AddWorks />} />
            <Route path="add-experience" element={<AddExperience />} />
            <Route path="experience" element={<Experiences />} />
            <Route path="educations" element={<Education />} />
            <Route path="add-educations" element={<AddEducation />} />
            <Route path="edit-work/:id" element={<EditWork />} />
            <Route path="edit-experience/:id" element={<EditExperience />} />
          </Route>

          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
