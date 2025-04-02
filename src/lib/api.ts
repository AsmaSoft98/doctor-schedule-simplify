
import { 
  API_BASE_URL, 
  ApiResponse, 
  User, 
  Doctor, 
  Appointment, 
  LoginFormData, 
  RegisterFormData,
  AppointmentFormData,
  AppointmentStatistics,
  PatientStatistics
} from './types';

// Generic fetch function
async function fetchApi<T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any,
  token?: string
): Promise<ApiResponse<T>> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      method,
      headers,
      credentials: 'include',
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'An error occurred' };
    }

    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}

// Auth API
export const authApi = {
  login: (credentials: LoginFormData) => 
    fetchApi<{ user: User; token: string }>('/auth/login', 'POST', credentials),
  
  register: (userData: RegisterFormData) => 
    fetchApi<{ user: User; token: string }>('/auth/register', 'POST', userData),
  
  logout: (token: string) => 
    fetchApi('/auth/logout', 'POST', undefined, token),
  
  getCurrentUser: (token: string) => 
    fetchApi<User>('/auth/me', 'GET', undefined, token),
};

// Doctors API
export const doctorsApi = {
  getAllDoctors: () => 
    fetchApi<Doctor[]>('/doctors'),
  
  getDoctorById: (id: number) => 
    fetchApi<Doctor>(`/doctors/${id}`),
  
  getDoctorsBySpecialty: (specialty: string) => 
    fetchApi<Doctor[]>(`/doctors/specialty/${specialty}`),
};

// Appointments API
export const appointmentsApi = {
  getAppointments: (token: string, status?: string) => {
    const endpoint = status ? `/appointments?status=${status}` : '/appointments';
    return fetchApi<Appointment[]>(endpoint, 'GET', undefined, token);
  },
  
  getAppointmentById: (id: string, token: string) => 
    fetchApi<Appointment>(`/appointments/${id}`, 'GET', undefined, token),
  
  createAppointment: (appointment: AppointmentFormData, doctorId: number, date: string, time: string, token: string) => 
    fetchApi<Appointment>('/appointments', 'POST', { ...appointment, doctorId, date, time }, token),
  
  updateAppointmentStatus: (id: string, status: Appointment['status'], notes: string = '', token: string) => 
    fetchApi<Appointment>(`/appointments/${id}/status`, 'PUT', { status, notes }, token),
  
  cancelAppointment: (id: string, token: string) => 
    fetchApi<void>(`/appointments/${id}/cancel`, 'PUT', undefined, token),
};

// Statistics API
export const statisticsApi = {
  getAppointmentStatistics: (token: string) => 
    fetchApi<AppointmentStatistics>('/statistics/appointments', 'GET', undefined, token),
  
  getPatientStatistics: (token: string) => 
    fetchApi<PatientStatistics>('/statistics/patients', 'GET', undefined, token),
};

export default {
  auth: authApi,
  doctors: doctorsApi,
  appointments: appointmentsApi,
  statistics: statisticsApi,
};
