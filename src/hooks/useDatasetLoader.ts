import { useCallback, useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { CurriculumDataset, TopicNode } from '../types';

const EXPECTED_COLUMNS = ['Semester', 'Topic', 'Sequence', 'Depth', 'Outcomes'];

type LoaderStatus = 'idle' | 'loading' | 'error' | 'success';

interface UseDatasetLoaderResult {
  dataset: CurriculumDataset | null;
  status: LoaderStatus;
  errorMessage: string | null;
  loadFromFile: (file: File) => Promise<void>;
  reset: () => void;
}

const toNumber = (value: unknown, fallback: number) => {
  const parsed = typeof value === 'string' ? parseFloat(value) : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeOutcome = (text: string, index: number) => ({
  id: `outcome-${index}`,
  description: text.trim(),
});

const parseTopicRecord = (row: Record<string, unknown>, rowIndex: number): TopicNode | null => {
  const semester = String(row.Semester ?? '').trim();
  const title = String(row.Topic ?? '').trim();
  if (!semester || !title) {
    return null;
  }

  const sequence = toNumber(row.Sequence, rowIndex + 1);
  const depth = toNumber(row.Depth, 1);
  const outcomesRaw = String(row.Outcomes ?? '').split(/[;\n]/);
  const outcomes = outcomesRaw
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0)
    .map((entry, outcomeIndex) => normalizeOutcome(entry, outcomeIndex));

  return {
    id: `${semester}-${sequence}-${title}`.replace(/\s+/g, '-').toLowerCase(),
    semester,
    title,
    sequence,
    depth,
    outcomes,
  };
};

const parseRecords = (records: Record<string, unknown>[]): TopicNode[] =>
  records
    .map((row, index) => parseTopicRecord(row, index))
    .filter((node): node is TopicNode => Boolean(node))
    .sort((a, b) => a.sequence - b.sequence);

const buildDataset = (topics: TopicNode[]): CurriculumDataset => ({
  title: 'Imported Curriculum',
  topics,
});

const validateColumns = (columns: readonly string[]) =>
  EXPECTED_COLUMNS.every((column) => columns.includes(column));

const readSheet = async (file: File): Promise<Record<string, unknown>[]> => {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: '',
  });
  return json;
};

const readCsv = (file: File): Promise<Record<string, unknown>[]> =>
  new Promise((resolve, reject) => {
    Papa.parse<Record<string, unknown>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });

const inferReader = (file: File) => {
  if (file.name.endsWith('.csv')) {
    return readCsv(file);
  }

  return readSheet(file);
};

export const useDatasetLoader = (): UseDatasetLoaderResult => {
  const [dataset, setDataset] = useState<CurriculumDataset | null>(null);
  const [status, setStatus] = useState<LoaderStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadFromFile = useCallback(async (file: File) => {
    setStatus('loading');
    setErrorMessage(null);

    try {
      const rows = await inferReader(file);
      if (rows.length === 0) {
        throw new Error('The selected file is empty.');
      }

      const columns = Object.keys(rows[0]);
      if (!validateColumns(columns)) {
        throw new Error(
          `Unexpected columns. Please include ${EXPECTED_COLUMNS.join(', ')}.`,
        );
      }

      const topics = parseRecords(rows);
      if (topics.length === 0) {
        throw new Error('No valid topics were found in the file.');
      }

      setDataset(buildDataset(topics));
      setStatus('success');
    } catch (error) {
      console.error('Failed to load dataset', error);
      setDataset(null);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }, []);

  const reset = useCallback(() => {
    setDataset(null);
    setStatus('idle');
    setErrorMessage(null);
  }, []);

  return { dataset, status, errorMessage, loadFromFile, reset };
};
