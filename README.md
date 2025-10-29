# Learning Spiral Visualizer

An interactive React + Three.js experience for exploring curriculum progressions along a 3D spiral. The app renders topics grouped by semester, visualizes their increasing depth over time, and provides accessible controls for reviewing learning outcomes.

## Features

- **Responsive layout** for desktop, tablet, and mobile screens with dedicated panels for controls, visualization, and details.
- **Spreadsheet importer** that accepts CSV and XLSX files with the following columns:
  - `Semester`
  - `Topic`
  - `Sequence`
  - `Depth`
  - `Outcomes` (semicolon- or newline-delimited list)
- **3D spiral visualization** built with `@react-three/fiber` and Three.js orbit controls for zoom, pan, and rotate.
- **Interactive nodes** that highlight on hover and reveal outcome details on click or via the keyboard-accessible topic list.
- **Dataset management UI** for switching between bundled sample curricula or uploading a custom spreadsheet.
- **Accessibility enhancements** including semantic regions, reduced-motion support, focus outlines, keyboard navigation, and color palette tuned for contrast.

## Getting started

```bash
npm install
npm run dev
```

The development server listens on port `4173` by default (configured in `vite.config.ts`).

To build the project for production:

```bash
npm run build
```

## Spreadsheet format

| Semester | Topic | Sequence | Depth | Outcomes |
|----------|-------|----------|-------|----------|
| Spring   | Intro to Programming | 1 | 1 | Write basic control flow statements; Understand variables and data types |

- `Sequence` should be numeric and represents chronological ordering across the spiral.
- `Depth` is numeric and increases the spiral radius to reflect deeper exploration.
- `Outcomes` entries can be separated by semicolons or newline characters.

## Accessibility and testing checklist

- Navigate the **Curriculum outline** list with the keyboard and press <kbd>Enter</kbd> or <kbd>Space</kbd> to focus a topic.
- Use mouse or touch gestures over the spiral to orbit, zoom, and inspect highlighted nodes.
- Confirm text contrast with dark backgrounds meets WCAG AA guidelines and that focus outlines remain visible across devices.
- Test on both desktop and mobile breakpoints (≤768px) to verify responsive layout and touch interactions.

## Sample datasets

Two representative curricula are bundled in `src/sampleData.ts` and can be selected via the **Sample dataset** dropdown for quick exploration.
