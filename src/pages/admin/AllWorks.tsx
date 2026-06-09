import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyWorksBox from "../../components/MyWorksBox";
import { apiClient, API_ENDPOINTS } from "../../lib/api";
import type { Work } from "../../types/work";

const AllWorks = () => {
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    apiClient
      .get<Work[]>(API_ENDPOINTS.works.list)
      .then((response) => setWorks(response.data));
  }, []);

  return (
    <div className="py-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-600">
            Portfolio
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Manage projects
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Edit project stories, ordering and Home page visibility.
          </p>
        </div>
        <Link
          to="/admin/add-works"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          <Plus className="size-4" />
          Add project
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {works.map((project) => (
          <MyWorksBox
            key={project._id}
            id={project._id}
            title={project.projectName}
            category={project.category}
            description={project.shortDescription || project.projectDetails}
            mainImage={project.mainImage}
            technologies={project.usingTech}
            liveUrl={project.projectLink}
            githubLink={project.githubLink}
            isFeatured={project.isFeatured}
            isAdmin
            onDelete={(deletedId) =>
              setWorks((current) =>
                current.filter((work) => work._id !== deletedId),
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AllWorks;
