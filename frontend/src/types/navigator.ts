export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type LicenseType = 'Open Source' | 'Proprietary / SaaS' | 'Freemium' | 'Commercial';
export type DeploymentType = 'Cloud (SaaS)' | 'Self-Hosted' | 'Hybrid (Cloud & Self-Hosted)';

export interface LearningTopic {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: 'Fundamentals' | 'CI/CD' | 'Pipelines' | 'Infrastructure' | 'Security';
  difficulty: DifficultyLevel;
  estimatedTime: string; // e.g. "12 mins"
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
  rating: number; // 1-5
}

export interface ComparisonDimension {
  key: keyof Platform | string;
  label: string;
  category: 'Overview' | 'Deployment & Cloud' | 'Ecosystem Integration' | 'Usability';
  renderType: 'text' | 'boolean' | 'badge' | 'list';
}
