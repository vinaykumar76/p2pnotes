
import { User, Note, Download, Branch, Semester } from '../types';

const USERS_KEY = 'noteshare_users';
const NOTES_KEY = 'noteshare_notes';
const DOWNLOADS_KEY = 'noteshare_downloads';
const REQUESTS_KEY = 'noteshare_requests';

// Initial Mock Data
const INITIAL_NOTES: Note[] = [
  {
    id: '1',
    title: 'Data Structures and Algorithms',
    subject: 'Computer Science',
    description: 'Comprehensive notes covering linked lists, trees, and sorting algorithms.',
    branch: Branch.CSE,
    semester: Semester.SEM3,
    uploaderId: 'u1',
    uploaderName: 'Alice Smith',
    fileName: 'dsa_notes.pdf',
    fileSize: 2500000,
    fileType: 'application/pdf',
    downloadCount: 12,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Microprocessors & Interfacing',
    subject: 'Digital Systems',
    description: 'Full semester 8085 architecture and instruction set details.',
    branch: Branch.ECE,
    semester: Semester.SEM4,
    uploaderId: 'u2',
    uploaderName: 'Bob Johnson',
    fileName: 'micro_notes.pdf',
    fileSize: 1800000,
    fileType: 'application/pdf',
    downloadCount: 5,
    createdAt: new Date().toISOString()
  }
];

export const db = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },
  
  saveUser: (user: User) => {
    const users = db.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  updateUser: (updatedUser: User) => {
    const users = db.getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      // Update local storage session if it's the current user
      const currentUser = localStorage.getItem('active_user');
      if (currentUser) {
        const parsed = JSON.parse(currentUser);
        if (parsed.id === updatedUser.id) {
          localStorage.setItem('active_user', JSON.stringify(updatedUser));
        }
      }
    }
  },

  getNotes: (): Note[] => {
    const data = localStorage.getItem(NOTES_KEY);
    if (!data) {
      localStorage.setItem(NOTES_KEY, JSON.stringify(INITIAL_NOTES));
      return INITIAL_NOTES;
    }
    return JSON.parse(data);
  },

  saveNote: (note: Note) => {
    const notes = db.getNotes();
    notes.unshift(note);
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  },

  updateNoteDownload: (noteId: string) => {
    const notes = db.getNotes();
    const index = notes.findIndex(n => n.id === noteId);
    if (index !== -1) {
      notes[index].downloadCount += 1;
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    }
  },

  deleteNote: (noteId: string) => {
    const notes = db.getNotes();
    const updated = notes.filter(n => n.id !== noteId);
    localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
  },

  getRequests: () => {
    const data = localStorage.getItem(REQUESTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  addRequest: (request: any) => {
    const requests = db.getRequests();
    requests.unshift(request);
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  }
};
