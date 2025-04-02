
import { Doctor, TimeSlot } from '@/lib/types';

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop",
    rating: 4.8,
    experience: 12,
    about: "Dr. Johnson is a board-certified cardiologist with over 12 years of experience in treating heart conditions. She specializes in preventive cardiology and heart failure management."
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop",
    rating: 4.7,
    experience: 8,
    about: "Dr. Chen is a dermatologist who focuses on skin cancer detection and treatment, as well as cosmetic procedures. He's known for his gentle approach and thorough examinations."
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&auto=format&fit=crop",
    rating: 4.9,
    experience: 15,
    about: "Dr. Rodriguez has been caring for children for over 15 years. She's passionate about preventive care and helping parents navigate the challenges of raising healthy kids."
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&h=200&auto=format&fit=crop",
    rating: 4.6,
    experience: 10,
    about: "Dr. Wilson specializes in sports medicine and joint replacement surgery. He works with patients of all ages to improve mobility and reduce pain through both surgical and non-surgical approaches."
  },
  {
    id: 5,
    name: "Dr. Amara Patel",
    specialty: "Neurology",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d3f?q=80&w=200&h=200&auto=format&fit=crop",
    rating: 4.9,
    experience: 14,
    about: "Dr. Patel is a neurologist specializing in headache disorders and multiple sclerosis. She combines the latest research with a compassionate approach to patient care."
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    specialty: "Family Medicine",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=200&h=200&auto=format&fit=crop",
    rating: 4.8,
    experience: 20,
    about: "Dr. Kim has been practicing family medicine for over two decades. He provides comprehensive care for patients of all ages and emphasizes preventive health strategies."
  }
];

export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 8; // 8 AM
  const endHour = 17; // 5 PM
  
  for (let id = 1, hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
      const period = hour >= 12 ? 'PM' : 'AM';
      const minuteFormatted = minute === 0 ? '00' : minute;
      const time = `${hourFormatted}:${minuteFormatted} ${period}`;
      
      // Randomly make some slots unavailable
      const available = Math.random() > 0.3;
      
      slots.push({ id: id++, time, available });
    }
  }
  
  return slots;
};

export const specialties = [
  "All Specialties",
  "Cardiology",
  "Dermatology",
  "Family Medicine",
  "Gastroenterology",
  "Neurology",
  "Obstetrics & Gynecology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Urology"
];
