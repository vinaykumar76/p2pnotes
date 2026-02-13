
import React, { useState } from 'react';
import { User, Branch } from '../types';
import { db } from '../services/db';
import { Icons } from '../constants';

interface ProfileProps {
  user: User | null;
  onUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    year: user?.year || 1,
    branch: user?.branch || Branch.CSE
  });

  if (!user) return null;

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    db.updateUser(updatedUser);
    onUpdate(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="h-32 bg-indigo-600 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-lg border-4 border-white flex items-center justify-center text-indigo-600">
              <Icons.User className="w-12 h-12" />
            </div>
          </div>
        </div>
        
        <div className="pt-16 pb-10 px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
              <p className="text-slate-500 font-medium">{user.email}</p>
            </div>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-800 border-b pb-2">Academic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Department / Branch</label>
                  {isEditing ? (
                    <select 
                      className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                      value={formData.branch}
                      onChange={e => setFormData({...formData, branch: e.target.value as Branch})}
                    >
                      {Object.values(Branch).map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  ) : (
                    <div className="text-slate-800 font-medium py-1">{user.branch}</div>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Academic Year</label>
                  {isEditing ? (
                    <select 
                      className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                      value={formData.year}
                      onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
                    >
                      {[1, 2, 3, 4].map(y => <option key={y} value={y}>Year {y}</option>)}
                    </select>
                  ) : (
                    <div className="text-slate-800 font-medium py-1">Year {user.year}</div>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Member Since</label>
                  <div className="text-slate-800 font-medium py-1">
                    {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="text-md font-bold text-slate-800 mb-4">Contribution Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Notes Uploaded</span>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Community Helpfuless</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Top 5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Member Status</span>
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Verified Peer</span>
                </div>
              </div>
              <div className="mt-8 p-4 bg-white rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500 italic">"Sharing is the best way to consolidate your own learning. Keep up the great work!"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
