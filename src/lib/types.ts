
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  experience: number;
  about: string;
}

export interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

export interface AppointmentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  reason: string;
  insurance: string;
  isNewPatient: boolean;
}

export interface AppointmentStatistics {
  total: number;
  upcoming: number;
  completed: number;
  canceled: number;
  bySpecialty: {
    name: string;
    count: number;
  }[];
}

export interface PatientStatistics {
  total: number;
  new: number;
  returning: number;
  byAge: {
    range: string;
    count: number;
  }[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'doctor' | 'admin';
  dateOfBirth?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'canceled';
  notes?: string;
  createdAt: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
}
