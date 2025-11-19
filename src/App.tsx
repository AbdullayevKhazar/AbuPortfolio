import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { ReactLenis } from "lenis/react";
import Home from "./pages/main/Home";
import AllSkills from "./pages/admin/AllSkills";
import AdminLayout from "./layouts/AdminLayouts";
import AddSkill from "./pages/admin/AddSkill";
import AllWorks from "./pages/admin/AllWorks";
import AddWorks from "./pages/admin/AddWorks";
import ProjectDetails from "./pages/main/ProjectDetails";
import MyProject from "./pages/main/MyProject";
import EditSkill from "./pages/admin/EditSkill";
import EditWork from "./pages/admin/EditWork";
import About from "./pages/main/About";
import AddExperience from "./pages/admin/AddExperience";
import Experiences from "./pages/admin/Experiences";
import EditExperience from "./pages/admin/EditExperience";

function App() {
  return (
    <>
      <ReactLenis root options={{ wheelMultiplier: 0.4, duration: 1.1 }} />
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<ProjectDetails />} />
          <Route path="projects" element={<MyProject />} />
          <Route path="project/:id" element={<ProjectDetails />} />
          <Route path="skills" element={<About />} />
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
          <Route path="edit-work/:id" element={<EditWork />} />
          <Route path="edit-experience/:id" element={<EditExperience />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
