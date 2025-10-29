import { useEffect, useMemo, useState } from 'react';
import { DataUpload } from './components/DataUpload';
import { SpiralVisualization } from './components/SpiralVisualization';
import { TopicPanel } from './components/TopicPanel';
import { TopicList } from './components/TopicList';
import { useDatasetLoader } from './hooks/useDatasetLoader';
import { CurriculumDataset, TopicNode } from './types';
import { acceleratedCurriculum, sampleCurriculum } from './sampleData';
import './styles/app.css';

const DATASET_OPTIONS: { label: string; dataset: CurriculumDataset }[] = [
  { label: sampleCurriculum.title, dataset: sampleCurriculum },
  { label: acceleratedCurriculum.title, dataset: acceleratedCurriculum },
];

const buildTopicColors = (topics: TopicNode[]) => {
  const semesters = Array.from(new Set(topics.map((topic) => topic.semester)));
  const palette = ['#8ecae6', '#ffb703', '#fb8500', '#219ebc', '#b5179e', '#72efdd'];

  return topics.map((topic) => ({
    ...topic,
    color: palette[semesters.indexOf(topic.semester) % palette.length],
  }));
};

function useDataset(initial: CurriculumDataset) {
  const [dataset, setDataset] = useState<CurriculumDataset>(initial);
  const { dataset: importedDataset, status, errorMessage, loadFromFile, reset } =
    useDatasetLoader();

  const topics = useMemo(() => {
    const baseTopics = importedDataset?.topics ?? dataset.topics;
    return buildTopicColors(baseTopics);
  }, [dataset.topics, importedDataset]);

  const currentTitle = importedDataset?.title ?? dataset.title;

  const handleDatasetSelect = (nextDataset: CurriculumDataset) => {
    setDataset(nextDataset);
    reset();
  };

  return {
    title: currentTitle,
    topics,
    status,
    errorMessage,
    setDataset: handleDatasetSelect,
    loadFromFile,
  };
}

function App() {
  const { title, topics, status, errorMessage, setDataset, loadFromFile } = useDataset(
    sampleCurriculum,
  );
  const [activeTopic, setActiveTopic] = useState<TopicNode | null>(topics[0] ?? null);
  const [hoveredTopic, setHoveredTopic] = useState<TopicNode | null>(null);

  useEffect(() => {
    setActiveTopic((current) => current && topics.some((topic) => topic.id === current.id)
      ? current
      : topics[0] ?? null);
  }, [topics]);

  const handleTopicSelect = (topic: TopicNode) => {
    setActiveTopic(topic);
  };

  const activeOrHovered = hoveredTopic ?? activeTopic;

  return (
    <div className="app-shell">
      <header>
        <h1>Learning Spiral Visualizer</h1>
        <p className="subtitle">{title}</p>
      </header>

      <main>
        <div className="layout">
          <div className="left-column">
            <DataUpload
              status={status}
              errorMessage={errorMessage}
              onFileSelected={loadFromFile}
              onDatasetSelected={setDataset}
              datasetOptions={DATASET_OPTIONS}
            />
            <TopicList topics={topics} activeTopicId={activeTopic?.id ?? null} onSelect={handleTopicSelect} />
          </div>
          <div className="center-column">
            <SpiralVisualization
              topics={topics}
              activeTopicId={activeOrHovered?.id ?? null}
              onTopicHover={setHoveredTopic}
              onTopicSelect={handleTopicSelect}
            />
          </div>
          <div className="right-column">
            <TopicPanel topic={activeOrHovered} />
          </div>
        </div>
      </main>

      <footer>
        <p>
          Keyboard navigation: Use the topic list to focus items and press Enter to display details.
          Orbit controls support mouse drag, scroll, and touch gestures for rotation and zoom.
        </p>
      </footer>
    </div>
  );
}

export default App;
