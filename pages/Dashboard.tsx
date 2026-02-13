
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import { Note, User } from '../types';
import NoteCard from '../components/NoteCard';
import { Icons } from '../constants';

interface DashboardProps {
  user: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const navigate = useNavigate();
  const [myNotes, setMyNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const allNotes = db.getNotes();
    setMyNotes(allNotes.filter(n => n.uploaderId === user.id));
  }, [user, navigate]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      db.deleteNote(id);
      setMyNotes(prev => prev.filter(n => n.id !== id));
    }
  };

  const handleDownload = (note: Note) => {
    alert(`Simulating download of your own file: ${note.fileName}`);
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Dashboard</h1>
          <p className="text-slate-500">Manage your contributions and track your performance.</p>
        </div>
        <button 
          onClick={() => navigate('/upload')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-md transition-all"
        >
          <Icons.Upload className="w-5 h-5" />
          Upload New Note
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Total Uploads</div>
          <div className="text-4xl font-bold text-slate-900">{myNotes.length}</div>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Total Reach (Downloads)</div>
          <div className="text-4xl font-bold text-indigo-600">
            {myNotes.reduce((sum, n) => sum + n.downloadCount, 0)}
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Popularity Rank</div>
          <div className="text-4xl font-bold text-amber-500">#4</div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Icons.FileText className="w-5 h-5 text-indigo-500" />
        My Shared Notes
      </h2>

      {myNotes.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-16 text-center">
          <Icons.FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800">No notes uploaded yet</h3>
          <p className="text-slate-500 mb-6">Start helping your peers by sharing your valuable study materials.</p>
          <button 
            onClick={() => navigate('/upload')}
            className="text-indigo-600 font-bold hover:underline"
          >
            Upload your first note →
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myNotes.map(note => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onDownload={handleDownload}
              isOwner={true}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
