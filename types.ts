
export enum Branch {
  CSE = 'Computer Science',
  ECE = 'Electronics',
  MECH = 'Mechanical',
  CIVIL = 'Civil',
  IT = 'Information Technology',
  OTHER = 'Other'
}

export enum Semester {
  SEM1 = 'Semester 1',
  SEM2 = 'Semester 2',
  SEM3 = 'Semester 3',
  SEM4 = 'Semester 4',
  SEM5 = 'Semester 5',
  SEM6 = 'Semester 6',
  SEM7 = 'Semester 7',
  SEM8 = 'Semester 8'
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  branch: Branch;
  year: number;
  avatar?: string;
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  subject: string;
  description: string;
  branch: Branch;
  semester: Semester;
  uploaderId: string;
  uploaderName: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  fileData?: string; // Base64 simulated storage
  downloadCount: number;
  createdAt: string;
}

export interface Download {
  id: string;
  noteId: string;
  userId: string;
  downloadedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
