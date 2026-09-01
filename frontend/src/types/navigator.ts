export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type LicenseType = 'Open Source' | 'Proprietary / SaaS' | 'Freemium' | 'Commercial';
export type DeploymentType = 'Cloud (SaaS)' | 'Self-Hosted' | 'Hybrid (Cloud & Self-Hosted)';

export type UserRole = 'student' | 'developer' | 'architect' | 'jobseeker';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarText: string;
  joinedDate: string;
  bio: string;
  title: string;
}

export interface QuizQuestion {
  id: string;
  topicId: string; // Map to lesson id (e.g. 'topic-1', 'topic-2' or 'all')
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  conceptKey: string;
}

export interface LearningTopic {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: 'Fundamentals' | 'CI/CD' | 'Pipelines' | 'Infrastructure' | 'Security';
  difficulty: DifficultyLevel;
  estimatedTime: string;
  order: number;
  overview: string;
  keyTakeaways: string[];
  prerequisites?: string[];
  sections: Array<{
    heading: string;
    body: string;
    codeSnippet?: {
      language: string;
      filename?: string;
      code: string;
    };
    tipOrNote?: string;
  }>;
}

export interface Platform {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  category: 'CI/CD' | 'GitOps' | 'Automation';
  difficulty: DifficultyLevel;
  licenseType: LicenseType;
  deploymentType: DeploymentType;
  officialUrl: string;
  documentationUrl: string;
  releaseYear: number;
  primaryLanguage: string;
  isOpenSource: boolean;
  isCloudBased: boolean;
  isSelfHosted: boolean;
  hasYamlSupport: boolean;
  hasDockerSupport: boolean;
  hasK8sSupport: boolean;
  features: string[];
  pros: string[];
  cons: string[];
  sampleYaml: {
    filename: string;
    code: string;
    explanation: string;
  };
  bestFor: string;
  rating: number;
}

export interface InterviewQuestion {
  id: string;
  category: 'CI/CD' | 'Kubernetes' | 'Architecture' | 'GitOps' | 'Monitoring';
  question: string;
  difficulty: 'Junior' | 'Mid' | 'Senior';
  answer: string;
  keyKeywords: string[];
}
