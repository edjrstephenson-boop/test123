import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useCursor } from '@react-three/drei';
import { Suspense, useMemo, useState } from 'react';
import { TopicNode } from '../types';

interface SpiralVisualizationProps {
  topics: TopicNode[];
  activeTopicId: string | null;
  onTopicHover: (topic: TopicNode | null) => void;
  onTopicSelect: (topic: TopicNode) => void;
}

const SEMESTER_COLORS: Record<string, string> = {
  Spring: '#8ecae6',
  Summer: '#ffb703',
  Fall: '#fb8500',
  Winter: '#219ebc',
};

interface SpiralPoint {
  topic: TopicNode;
  position: [number, number, number];
  color: string;
}

const useSpiralPoints = (topics: TopicNode[]): SpiralPoint[] =>
  useMemo(() => {
    if (topics.length === 0) {
      return [];
    }

    const angleStep = (Math.PI * 2) / 6;
    const heightStep = 0.6;
    const radiusBase = 2;
    const depthMultiplier = 0.5;

    return topics.map((topic, index) => {
      const angle = index * angleStep;
      const depthOffset = topic.depth * depthMultiplier;
      const radius = radiusBase + depthOffset;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = index * heightStep;
      const color = topic.color ?? SEMESTER_COLORS[topic.semester] ?? '#90e0ef';

      return {
        topic,
        position: [x, y, z],
        color,
      };
    });
  }, [topics]);

const SpiralNode = ({
  point,
  isActive,
  onHover,
  onClick,
}: {
  point: SpiralPoint;
  isActive: boolean;
  onHover: (topic: TopicNode | null) => void;
  onClick: (topic: TopicNode) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <mesh
      position={point.position}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
        onHover(point.topic);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        setHovered(false);
        onHover(null);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onClick(point.topic);
      }}
    >
      <sphereGeometry args={[0.22, 32, 32]} />
      <meshStandardMaterial
        color={point.color}
        emissive={isActive || hovered ? '#ffffff' : '#000000'}
        emissiveIntensity={isActive ? 0.6 : hovered ? 0.3 : 0}
      />
    </mesh>
  );
};

const SpiralSegments = ({ points }: { points: SpiralPoint[] }) => {
  const positions = useMemo(() => {
    const coords: number[] = [];
    points.forEach((point) => {
      coords.push(...point.position);
    });
    return new Float32Array(coords);
  }, [points]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#adb5bd" linewidth={2} />
    </line>
  );
};

export function SpiralVisualization({
  topics,
  activeTopicId,
  onTopicHover,
  onTopicSelect,
}: SpiralVisualizationProps) {
  const points = useSpiralPoints(topics);

  return (
    <div className="visualization" role="application" aria-label="Spiral visualization">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[6, 8, 12]} fov={50} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-8, -10, -8]} intensity={0.4} />
          <SpiralSegments points={points} />
          {points.map((point) => (
            <SpiralNode
              key={point.topic.id}
              point={point}
              isActive={activeTopicId === point.topic.id}
              onHover={onTopicHover}
              onClick={onTopicSelect}
            />
          ))}
          <OrbitControls enablePan enableZoom enableRotate />
        </Suspense>
      </Canvas>
    </div>
  );
}
