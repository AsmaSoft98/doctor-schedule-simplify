
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
