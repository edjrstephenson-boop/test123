import { CurriculumDataset } from './types';

export const sampleCurriculum: CurriculumDataset = {
  title: 'Computer Science Foundations',
  topics: [
    {
      id: 'spring-1-intro-programming',
      title: 'Intro to Programming',
      semester: 'Spring',
      sequence: 1,
      depth: 1,
      outcomes: [
        { id: 'sp1-1', description: 'Write basic control flow statements.' },
        { id: 'sp1-2', description: 'Understand variables and data types.' },
      ],
    },
    {
      id: 'spring-2-structures',
      title: 'Data Structures I',
      semester: 'Spring',
      sequence: 2,
      depth: 2,
      outcomes: [
        { id: 'sp2-1', description: 'Implement linked lists and stacks.' },
        { id: 'sp2-2', description: 'Analyze algorithmic complexity.' },
      ],
    },
    {
      id: 'summer-3-web',
      title: 'Web Development',
      semester: 'Summer',
      sequence: 3,
      depth: 2,
      outcomes: [
        { id: 'su3-1', description: 'Build responsive web interfaces.' },
        { id: 'su3-2', description: 'Consume RESTful APIs.' },
      ],
    },
    {
      id: 'fall-4-algorithms',
      title: 'Algorithms',
      semester: 'Fall',
      sequence: 4,
      depth: 3,
      outcomes: [
        { id: 'fa4-1', description: 'Design algorithms using divide and conquer.' },
        { id: 'fa4-2', description: 'Apply graph traversal strategies.' },
      ],
    },
    {
      id: 'winter-5-ai',
      title: 'Intro to AI',
      semester: 'Winter',
      sequence: 5,
      depth: 4,
      outcomes: [
        { id: 'wi5-1', description: 'Model agents that act in environments.' },
        { id: 'wi5-2', description: 'Compare supervised learning techniques.' },
      ],
    },
  ],
};

export const acceleratedCurriculum: CurriculumDataset = {
  title: 'Accelerated STEM Cohort',
  topics: [
    {
      id: 'spring-1-math-bootcamp',
      title: 'Mathematics Bootcamp',
      semester: 'Spring',
      sequence: 1,
      depth: 2,
      outcomes: [
        { id: 'ab1-1', description: 'Review calculus fundamentals.' },
        { id: 'ab1-2', description: 'Solve systems of linear equations.' },
      ],
    },
    {
      id: 'spring-2-physics',
      title: 'Physics Foundations',
      semester: 'Spring',
      sequence: 2,
      depth: 3,
      outcomes: [
        { id: 'ab2-1', description: 'Apply Newtonian mechanics.' },
        { id: 'ab2-2', description: 'Explain energy conservation principles.' },
      ],
    },
    {
      id: 'summer-3-research',
      title: 'Research Methods',
      semester: 'Summer',
      sequence: 3,
      depth: 2,
      outcomes: [
        { id: 'ab3-1', description: 'Design experimental studies.' },
        { id: 'ab3-2', description: 'Interpret statistical results.' },
      ],
    },
    {
      id: 'fall-4-capstone',
      title: 'Capstone Project',
      semester: 'Fall',
      sequence: 4,
      depth: 4,
      outcomes: [
        { id: 'ab4-1', description: 'Integrate interdisciplinary knowledge.' },
        { id: 'ab4-2', description: 'Present research findings to stakeholders.' },
      ],
    },
  ],
};
