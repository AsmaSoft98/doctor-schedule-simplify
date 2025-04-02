
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import DoctorCard from '@/components/DoctorCard';
import DoctorFilter from '@/components/DoctorFilter';
import { Button } from '@/components/ui/button';
import { doctors } from '@/data/mockData';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || doctor.specialty === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });
  
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-medical-50 to-blue-50 py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                Book Your Doctor Appointment in Minutes
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Find the right specialist, schedule your visit, and get back to focusing on your health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-medium">
                  Find Doctors Near You
                </Button>
                <Button size="lg" variant="outline" className="font-medium">
                  For Doctors
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop"
                alt="Doctor with patient" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Doctor Search Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Find The Right Doctor</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through our network of qualified healthcare professionals and book your next appointment with ease.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <DoctorFilter 
                onSearch={setSearchQuery}
                onSpecialtyChange={setSelectedSpecialty}
                selectedSpecialty={selectedSpecialty}
                searchQuery={searchQuery}
              />
            </div>
            
            <div className="md:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredDoctors.length} doctors
                </p>
                <Button variant="ghost" size="sm" className="text-primary">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
              <h3 className="text-xl font-semibold mb-3">Find Your Doctor</h3>
              <p className="text-muted-foreground">
                Search by specialty, name, or browse through our list of qualified healthcare professionals.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-semibold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Schedule An Appointment</h3>
              <p className="text-muted-foreground">
                Select a convenient date and time from the doctor's available slots.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-semibold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Receive Confirmation</h3>
              <p className="text-muted-foreground">
                Get instant confirmation and reminders for your upcoming appointment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
