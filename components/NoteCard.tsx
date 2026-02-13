
import React, { useState } from 'react';
import { Icons } from '../constants';
import { Note } from '../types';
import { generateNoteSummary } from '../services/geminiService';

interface NoteCardProps {
  note: Note;
  onDownload: (note: Note) => void;
  isOwner?: boolean;
  onDelete?: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDownload, isOwner, onDelete }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState<string[]>([]);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleAiSummary = async () => {
    if (showSummary) {
      setShowSummary(false);
      return;
    }
    
    setLoadingSummary(true);
    setShowSummary(true);
    const result = await generateNoteSummary(note.title, note.description, note.subject);
    setSummary(result.highlights);
    setLoadingSummary(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
          <Icons.FileText className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{note.branch}</span>
          <span className="text-xs text-slate-400">{note.semester}</span>
        </div>
      </div>
      
      <h3 className="font-bold text-lg text-slate-800 mb-1 leading-tight">{note.title}</h3>
      <p className="text-sm text-slate-500 mb-3 flex-grow">{note.description}</p>
      
      <div className="flex items-center gap-2 mb-4 text-xs font-medium text-slate-400">
        <div className="flex items-center gap-1">
          <Icons.User className="w-3 h-3" />
          <span>{note.uploaderName}</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1">
          <Icons.Download className="w-3 h-3" />
          <span>{note.downloadCount} downloads</span>
        </div>
      </div>

      <div className="space-y-2">
        {showSummary && (
          <div className="bg-slate-50 rounded-lg p-3 mb-2 animate-pulse-slow">
            <h4 className="text-xs font-bold text-indigo-600 mb-2 uppercase flex items-center gap-1">
              <span className="animate-bounce">✨</span> AI Insights
            </h4>
            {loadingSummary ? (
              <div className="space-y-2">
                <div className="h-2 bg-slate-200 rounded w-full"></div>
                <div className="h-2 bg-slate-200 rounded w-3/4"></div>
              </div>
            ) : (
              <ul className="text-xs text-slate-600 space-y-1">
                {summary.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-indigo-400">•</span> {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => onDownload(note)}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-indigo-700"
          >
            <Icons.Download className="w-4 h-4" />
            Download
          </button>
          
          <button 
            onClick={handleAiSummary}
            className="flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 text-sm font-semibold py-2 rounded-lg hover:bg-indigo-100 border border-indigo-100"
          >
            {showSummary ? 'Hide AI' : 'AI Summary'}
          </button>
        </div>

        {isOwner && onDelete && (
          <button 
            onClick={() => onDelete(note.id)}
            className="w-full flex items-center justify-center gap-2 text-red-500 text-xs font-semibold py-1 mt-2 hover:bg-red-50 rounded"
          >
            <Icons.Trash className="w-3 h-3" />
            Delete Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
