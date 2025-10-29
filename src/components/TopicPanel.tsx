import { TopicNode } from '../types';

interface TopicPanelProps {
  topic: TopicNode | null;
}

export function TopicPanel({ topic }: TopicPanelProps) {
  if (!topic) {
    return (
      <aside className="topic-panel" aria-live="polite">
        <p>Select a topic to see details.</p>
      </aside>
    );
  }

  return (
    <aside className="topic-panel" aria-live="polite">
      <h2 tabIndex={0}>{topic.title}</h2>
      <dl>
        <div>
          <dt>Semester</dt>
          <dd>{topic.semester}</dd>
        </div>
        <div>
          <dt>Sequence</dt>
          <dd>{topic.sequence}</dd>
        </div>
        <div>
          <dt>Depth</dt>
          <dd>{topic.depth}</dd>
        </div>
      </dl>

      <h3>Learning outcomes</h3>
      {topic.outcomes.length === 0 ? (
        <p>Outcomes not provided.</p>
      ) : (
        <ol>
          {topic.outcomes.map((outcome) => (
            <li key={outcome.id}>{outcome.description}</li>
          ))}
        </ol>
      )}
    </aside>
  );
}
