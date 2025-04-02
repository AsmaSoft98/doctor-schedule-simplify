
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, ArrowLeft } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import PageLayout from '@/components/PageLayout';
import TimeSlotPicker from '@/components/TimeSlotPicker';
import AppointmentForm from '@/components/AppointmentForm';
import { Doctor, TimeSlot, AppointmentFormData } from '@/lib/types';
import { doctors, generateTimeSlots } from '@/data/mockData';

const BookingPage = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [currentTab, setCurrentTab] = useState('date-time');
  
  useEffect(() => {
    if (doctorId) {
      const foundDoctor = doctors.find(d => d.id === parseInt(doctorId));
      if (foundDoctor) {
        setDoctor(foundDoctor);
      } else {
        // Doctor not found, redirect to home
        navigate('/');
        toast({
          title: "Doctor not found",
          description: "The doctor you're looking for doesn't exist.",
          variant: "destructive"
        });
      }
    }
  }, [doctorId, navigate]);
  
  useEffect(() => {
    // Generate new time slots whenever date changes
    setTimeSlots(generateTimeSlots());
    setSelectedSlot(null);
  }, [date]);
  
  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };
  
  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
    }
  };
  
  const handleContinueToForm = () => {
    if (!selectedSlot) {
      toast({
        title: "Please select a time",
        description: "You need to select an available time slot to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentTab('patient-info');
  };
  
  const handleFormSubmit = (data: AppointmentFormData) => {
    // In a real app, we would send this data to the server
    console.log("Appointment data:", { 
      doctor: doctor?.name,
      date: format(date, 'yyyy-MM-dd'),
      time: selectedSlot?.time,
      patientInfo: data
    });
    
    // Show success message
    toast({
      title: "Appointment scheduled!",
      description: `Your appointment with ${doctor?.name} on ${format(date, 'MMM dd, yyyy')} at ${selectedSlot?.time} has been confirmed.`
    });
    
    // Navigate to confirmation page
    navigate('/booking/confirmation');
  };
  
  if (!doctor) {
    return (
      <PageLayout>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">
            <p>Loading doctor information...</p>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <Button 
          variant="ghost" 
          className="mb-6 -ml-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to doctors
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Details</CardTitle>
                <CardDescription>Appointment with</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-sm">{doctor.rating} ★</span>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{doctor.experience} years exp</span>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <h4 className="font-medium">About</h4>
                  <p className="text-sm text-muted-foreground">{doctor.about}</p>
                </div>
              </CardContent>
            </Card>
            
            {selectedSlot && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Appointment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start">
                    <CalendarIcon className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-sm text-muted-foreground">{format(date, 'EEEE, MMMM d, yyyy')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-sm text-muted-foreground">{selectedSlot.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="lg:col-span-2">
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="date-time">Date & Time</TabsTrigger>
                <TabsTrigger value="patient-info" disabled={!selectedSlot}>Patient Information</TabsTrigger>
              </TabsList>
              
              <TabsContent value="date-time" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Date & Time</CardTitle>
                    <CardDescription>
                      Choose when you would like to schedule your appointment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/2">
                        <h3 className="font-medium mb-3">Select Date</h3>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateSelect}
                          className="border rounded-md p-3"
                          disabled={(date) => date < new Date()}
                        />
                      </div>
                      <div className="md:w-1/2">
                        <TimeSlotPicker
                          slots={timeSlots}
                          selectedSlot={selectedSlot}
                          onSelectSlot={handleTimeSlotSelect}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-6" 
                      onClick={handleContinueToForm}
                      disabled={!selectedSlot}
                    >
                      Continue to Patient Information
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="patient-info" className="pt-4">
                <AppointmentForm onSubmit={handleFormSubmit} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BookingPage;
