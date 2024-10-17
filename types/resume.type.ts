export type ExperienceType = {
  id: number;
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  workSummery: string;
};

export type EducationType = {
  id: number;
  universityName: string;
  startDate: string;
  endDate: string;
  degree: string;
  major: string;
  description: string;
};

export type SkillType = {
  id: number;
  name: string;
  rating: number;
};

export type ResumeDataType = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  themeColor: string;
  summery: string;
  experience: ExperienceType[];
  education: EducationType[];
  skills: SkillType[];
};
