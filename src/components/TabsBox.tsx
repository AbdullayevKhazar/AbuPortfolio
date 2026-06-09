import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../lib/api";
import { Skeleton } from "./ui/skeleton";

interface Experience {
  _id: string;
  companyName: string;
  position: string;
  companyImage: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean;
  myContributions: string[];
}

interface Education {
  _id: string;
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  description?: string;
  schoolImage?: string;
  isCurrent?: boolean;
}

const LoadingList = () => (
  <div className="space-y-8">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="flex flex-col items-center gap-6 md:flex-row md:items-start"
      >
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="w-full flex-1 space-y-3">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-3 w-1/5" />
          <div className="mt-3 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const TabsBox = ({ tab }: { tab: string }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<Education[] | Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`${API_BASE_URL}/${tab}`);
        setData(response.data);
      } catch {
        setError(t("about.loadError"));
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [tab, t]);

  const formatDate = (date?: string) => {
    if (!date) return t("common.present");

    return new Date(date).toLocaleDateString(
      i18n.resolvedLanguage === "az" ? "az-AZ" : "en-US",
      { year: "numeric", month: "short" },
    );
  };

  return (
    <div className="relative z-10 min-h-[300px] rounded-xl border border-ink/10 bg-white p-4 shadow backdrop-blur-md dark:border-soft/10 dark:bg-soft/5 md:p-8">
      {loading && <LoadingList />}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && data.length === 0 && (
        <p className="text-muted-foreground">{t("about.empty")}</p>
      )}

      {!loading && !error && tab === "experience" && (
        <div className="space-y-8 text-ink dark:text-soft">
          {(data as Experience[]).map((job) => (
            <div
              key={job._id}
              className="flex flex-col items-center gap-6 md:flex-row md:items-start"
            >
              <img
                src={job.companyImage}
                alt={t("about.logoAlt", { name: job.companyName })}
                className="mt-1 h-12 w-12 rounded-lg border border-ink/10 object-cover dark:border-soft/10"
              />
              <div className="flex-1">
                <h3 className="text-sm font-bold md:text-xl">{job.position}</h3>
                <p className="font-medium text-ink/80 dark:text-soft/80">
                  {job.companyName}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-ink/60 dark:text-soft/60">
                  {formatDate(job.startDate)} -{" "}
                  {job.isCurrentJob
                    ? t("common.present")
                    : formatDate(job.endDate)}
                </p>
                <ul className="mt-3 list-inside list-disc space-y-2 text-xs md:text-sm">
                  {job.myContributions?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && tab === "education" && (
        <div className="space-y-8 text-ink dark:text-soft">
          {(data as Education[]).map((education) => (
            <div key={education._id} className="flex items-start gap-4">
              <img
                src={education.schoolImage}
                alt={t("about.logoAlt", { name: education.schoolName })}
                className="mt-1 h-12 w-12 rounded-full border border-ink/10 object-contain dark:border-soft/10"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold md:text-xl">
                  {education.schoolName}
                </h3>
                <p className="font-medium text-ink/80 dark:text-soft/80">
                  {education.degree && `${education.degree} - `}
                  {education.fieldOfStudy}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider">
                  {formatDate(education.startDate)} -{" "}
                  {education.isCurrent
                    ? t("common.present")
                    : formatDate(education.endDate)}
                </p>
                {education.description && (
                  <p className="mt-3 text-sm opacity-90">
                    {education.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TabsBox;
