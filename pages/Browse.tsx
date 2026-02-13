
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Note, Branch, Semester } from '../types';
import NoteCard from '../components/NoteCard';
import { Icons } from '../constants';

const Browse: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState<string>('');
  const [semesterFilter, setSemesterFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestSubject, setRequestSubject] = useState('');

  useEffect(() => {
    const allNotes = db.getNotes();
    setNotes(allNotes);
    setFilteredNotes(allNotes);
  }, []);

  useEffect(() => {
    let result = notes;

    if (searchTerm) {
      result = result.filter(n => 
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (branchFilter) {
      result = result.filter(n => n.branch === branchFilter);
    }

    if (semesterFilter) {
      result = result.filter(n => n.semester === semesterFilter);
    }

    if (sortBy === 'newest') {
      result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      result = [...result].sort((a, b) => b.downloadCount - a.downloadCount);
    }

    setFilteredNotes(result);
  }, [searchTerm, branchFilter, semesterFilter, sortBy, notes]);

  const handleDownload = (note: Note) => {
    alert(`Starting download for: ${note.fileName}`);
    db.updateNoteDownload(note.id);
    setNotes(db.getNotes());
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestSubject) return;
    db.addRequest({ subject: requestSubject, timestamp: new Date().toISOString() });
    alert(`Your request for "${requestSubject}" has been broadcast to your peers!`);
    setRequestSubject('');
    setShowRequestModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Discover Study Notes</h1>
          <p className="text-slate-500">Find materials shared by your peers from across the campus.</p>
        </div>
        <button 
          onClick={() => setShowRequestModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-indigo-600 font-bold rounded-xl hover:bg-slate-50 shadow-sm"
        >
          <Icons.Share className="w-5 h-5 rotate-180" />
          Request a Note
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Icons.Search className="w-4 h-4" /> Filters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Search Keywords</label>
                <div className="relative">
                  <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Subject, topic, etc."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Branch</label>
                <select 
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">All Branches</option>
                  {Object.values(Branch).map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Semester</label>
                <select 
                  value={semesterFilter}
                  onChange={(e) => setSemesterFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">All Semesters</option>
                  {Object.values(Semester).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sort By</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Downloaded</option>
                </select>
              </div>

              <button 
                onClick={() => {setSearchTerm(''); setBranchFilter(''); setSemesterFilter('');}}
                className="w-full text-sm text-indigo-600 font-medium hover:underline pt-2"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {filteredNotes.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-20 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icons.FileText className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No notes found</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-6">Can't find what you need? Ask your peers to upload it!</p>
              <button 
                onClick={() => setShowRequestModal(true)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
              >
                Request a Note
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredNotes.map(note => (
                <NoteCard key={note.id} note={note} onDownload={handleDownload} />
              ))}
            </div>
          )}
        </div>
      </div>

      {showRequestModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Study Materials</h2>
            <p className="text-slate-500 mb-6">Enter the subject or topic you're looking for. We'll notify other students in your branch.</p>
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <input 
                autoFocus
                type="text" 
                placeholder="e.g. Advanced Discrete Math Notes"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                value={requestSubject}
                onChange={e => setRequestSubject(e.target.value)}
                required
              />
              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700"
                >
                  Post Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Browse;
