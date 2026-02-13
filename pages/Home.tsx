
import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-700 to-indigo-900 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Share Smarter, <br />
            <span className="text-indigo-300">Learn Better.</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            The ultimate peer-to-peer platform for students to share, organize, and discover high-quality study materials for every branch and semester.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse" className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all shadow-lg">
              Browse Notes
            </Link>
            <Link to="/register" className="bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-400 transition-all border border-indigo-400/50 shadow-lg">
              Join for Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Built for Every Student</h2>
            <p className="text-slate-500">Simplify your academic journey with our core features.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <Icons.Upload className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Uploads</h3>
              <p className="text-slate-600 leading-relaxed">Share your handwritten or typed notes in PDF, DOC, or PPT formats with a few clicks.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <Icons.Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Discovery</h3>
              <p className="text-slate-600 leading-relaxed">Filter notes by branch, subject, or semester. Find exactly what you need for exams.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <Icons.FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Highlights</h3>
              <p className="text-slate-600 leading-relaxed">Get AI-generated summaries of complex notes to quickly grasp key concepts before downloading.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">5K+</div>
              <div className="text-slate-500 font-medium">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">12K+</div>
              <div className="text-slate-500 font-medium">Notes Uploaded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
              <div className="text-slate-500 font-medium">Subjects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">8</div>
              <div className="text-slate-500 font-medium">Major Branches</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Simulation */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-white font-bold text-2xl">
            <Icons.FileText className="text-indigo-500" />
            NoteShare
          </div>
          <div className="flex gap-8 text-sm">
            <Link to="/" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <div className="text-sm">
            © 2024 NoteShare P2P. For Student Projects.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
