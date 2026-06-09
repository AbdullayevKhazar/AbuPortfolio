export interface Work {
  _id: string;
  projectName: string;
  shortDescription?: string;
  projectDetails: string;
  mainImage: string;
  usingTech: string[];
  category?: string;
  projectLink?: string;
  githubLink?: string;
  isLive?: boolean;
  isFeatured?: boolean;
  displayOrder?: number;
}

export interface WorkFormValues {
  projectName: string;
  shortDescription: string;
  projectDetails: string;
  usingTech: string;
  category: string;
  projectLink: string;
  githubLink: string;
  isLive: boolean;
  isFeatured: boolean;
  displayOrder: number;
}
