import { ChangeEvent, useId } from 'react';
import { CurriculumDataset } from '../types';

interface DatasetOption {
  label: string;
  dataset: CurriculumDataset;
}

interface DataUploadProps {
  status: 'idle' | 'loading' | 'error' | 'success';
  errorMessage: string | null;
  onFileSelected: (file: File) => void;
  onDatasetSelected: (dataset: CurriculumDataset) => void;
  datasetOptions: DatasetOption[];
}

export function DataUpload({
  status,
  errorMessage,
  onFileSelected,
  onDatasetSelected,
  datasetOptions,
}: DataUploadProps) {
  const inputId = useId();
  const selectId = useId();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelected(file);
      event.target.value = '';
    }
  };

  const handleDatasetChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = Number(event.target.value);
    const option = Number.isInteger(selectedIndex) ? datasetOptions[selectedIndex] : undefined;
    if (option) {
      onDatasetSelected(option.dataset);
    }
  };

  return (
    <section className="control-panel" aria-label="Dataset controls">
      <div className="control-row">
        <label htmlFor={selectId}>Sample dataset</label>
        <select id={selectId} onChange={handleDatasetChange} defaultValue="">
          <option value="" disabled>
            Choose…
          </option>
          {datasetOptions.map((option, index) => (
            <option key={option.label} value={index}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="control-row">
        <label htmlFor={inputId}>Upload CSV or XLSX</label>
        <input
          id={inputId}
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
        />
      </div>

      <p role="status" aria-live="polite" className={`status status-${status}`}>
        {status === 'idle' && 'Select a dataset to begin.'}
        {status === 'loading' && 'Loading dataset…'}
        {status === 'success' && 'Dataset loaded successfully.'}
        {status === 'error' && errorMessage}
      </p>

      <details>
        <summary>Required columns</summary>
        <ul>
          <li>Semester</li>
          <li>Topic</li>
          <li>Sequence (numeric order of topics)</li>
          <li>Depth (numeric depth level)</li>
          <li>Outcomes (semicolon- or newline-separated list)</li>
        </ul>
      </details>
    </section>
  );
}
