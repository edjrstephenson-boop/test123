export interface LearningOutcome {
  id: string;
  description: string;
}

export interface TopicNode {
  id: string;
  title: string;
  semester: string;
  sequence: number;
  depth: number;
  outcomes: LearningOutcome[];
  color?: string;
}

export interface CurriculumDataset {
  title: string;
  topics: TopicNode[];
}
