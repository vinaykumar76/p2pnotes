
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import { User, Branch, Semester, Note } from '../types';
import { Icons, MAX_FILE_SIZE } from '../constants';

interface UploadProps {
  user: User | null;
}

const Upload: React.FC<UploadProps> = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
    branch: Branch.CSE,
    semester: Semester.SEM1,
  });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError('File size exceeds 10MB limit.');
        setFile(null);
      } else {
        setError('');
        setFile(selectedFile);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newNote: Note = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        subject: formData.subject,
        description: formData.description,
        branch: formData.branch,
        semester: formData.semester,
        uploaderId: user.id,
        uploaderName: user.name,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        downloadCount: 0,
        createdAt: new Date().toISOString()
      };

      db.saveNote(newNote);
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-indigo-600 px-8 py-10 text-white">
          <h1 className="text-3xl font-bold mb-2">Share Your Knowledge</h1>
          <p className="text-indigo-100">Help your peers by uploading high-quality study notes.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Note Title</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Unit 1: Operating Systems"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Subject</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Computer Architecture"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Short Description</label>
            <textarea 
              required
              rows={3}
              placeholder="What topics does this cover?"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Target Branch</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.branch}
                onChange={e => setFormData({...formData, branch: e.target.value as Branch})}
              >
                {Object.values(Branch).map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Semester</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.semester}
                onChange={e => setFormData({...formData, semester: e.target.value as Semester})}
              >
                {Object.values(Semester).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">File Attachment (PDF, DOC, PPT)</label>
            <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-8 transition-colors hover:border-indigo-400">
              <input 
                required
                type="file" 
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <div className="text-center">
                <Icons.Upload className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 font-medium">
                  {file ? file.name : "Click to select or drag and drop"}
                </p>
                <p className="text-xs text-slate-400 mt-1">Maximum file size: 10MB</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 px-6 py-4 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              disabled={loading}
              type="submit"
              className="flex-1 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                'Upload Note'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
