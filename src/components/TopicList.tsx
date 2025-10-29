import { KeyboardEvent } from 'react';
import { TopicNode } from '../types';

interface TopicListProps {
  topics: TopicNode[];
  activeTopicId: string | null;
  onSelect: (topic: TopicNode) => void;
}

export function TopicList({ topics, activeTopicId, onSelect }: TopicListProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, topic: TopicNode) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(topic);
    }
  };

  return (
    <section className="topic-list" aria-label="Curriculum topics">
      <h2>Curriculum outline</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            <button
              type="button"
              className={topic.id === activeTopicId ? 'active' : ''}
              onClick={() => onSelect(topic)}
              onKeyDown={(event) => handleKeyDown(event, topic)}
            >
              <span className="topic-title">{topic.title}</span>
              <span className="topic-meta">
                {topic.semester} · Depth {topic.depth}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
