
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import DoctorCard from '@/components/DoctorCard';
import DoctorFilter from '@/components/DoctorFilter';
import { Button } from '@/components/ui/button';
import { doctors } from '@/data/mockData';
import DoctorHero from '@/components/DoctorHero';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || doctor.specialty === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });
  
  // We'll display the first doctor as the main doctor (you)
  const mainDoctor = doctors[0];
  
  return (
    <PageLayout>
      {/* Doctor Hero Section */}
      <DoctorHero doctor={mainDoctor} />
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Book your medical appointment in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-semibold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Register/Login</h3>
              <p className="text-muted-foreground">
                Create an account or log in to access your patient dashboard and appointment booking.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-semibold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Schedule An Appointment</h3>
              <p className="text-muted-foreground">
                Select a convenient date and time from my available slots.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-semibold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Receive Confirmation</h3>
              <p className="text-muted-foreground">
                Get instant confirmation after I approve your appointment request.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
