
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { CalendarClock, Clock, Check, X } from "lucide-react";
import PageLayout from '@/components/PageLayout';
import { Appointment } from '@/lib/types';

// These would come from a database in a real application
const availableTimeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", 
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"
];

const PatientDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [reason, setReason] = useState<string>("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  const handleBookAppointment = () => {
    if (!date || !time || !reason) {
      toast({
        title: "Missing Information",
        description: "Please select a date, time, and provide a reason for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would send this to a backend to save to database
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substring(2, 11),
      patientId: "user123", // Normally from auth
      patientName: "John Doe", // Normally from auth
      patientEmail: "john@example.com", // Normally from auth
      patientPhone: "123-456-7890", // Normally from auth
      date: date.toISOString().split('T')[0],
      time: time,
      reason: reason,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    // Add to local state - in a real app we'd fetch from backend
    setAppointments([...appointments, newAppointment]);
    
    // Reset form
    setDate(undefined);
    setTime(undefined);
    setReason("");
    
    toast({
      title: "Appointment Requested",
      description: "Your appointment request has been submitted and is awaiting doctor approval.",
    });
  };
  
  return (
    <PageLayout>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>
        
        <Tabs defaultValue="book" className="space-y-6">
          <TabsList>
            <TabsTrigger value="book">Book Appointment</TabsTrigger>
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="book" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Date & Time</CardTitle>
                  <CardDescription>
                    Choose your preferred appointment date and time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-2">Date</p>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        // Disable past dates and weekends
                        return (
                          date < today ||
                          date.getDay() === 0 || // Sunday
                          date.getDay() === 6    // Saturday
                        );
                      }}
                      className="border rounded-md pointer-events-auto"
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Time</p>
                    <Select
                      value={time}
                      onValueChange={setTime}
                      disabled={!date}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select appointment time" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTimeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Details</CardTitle>
                  <CardDescription>
                    Provide additional information about your visit
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-2">Reason for Visit</p>
                    <Textarea
                      placeholder="Please briefly describe your symptoms or reason for the appointment"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="h-32"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleBookAppointment}
                    disabled={!date || !time || !reason}
                    className="w-full"
                  >
                    <CalendarClock className="mr-2 h-4 w-4" />
                    Request Appointment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>My Appointments</CardTitle>
                <CardDescription>
                  View and manage your upcoming appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">
                    You don't have any appointments yet. Book your first appointment to get started.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div 
                        key={appointment.id} 
                        className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between"
                      >
                        <div>
                          <div className="flex items-center mb-1">
                            <CalendarClock className="h-4 w-4 mr-2 text-primary" />
                            <span className="font-medium">
                              {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Reason: {appointment.reason}
                          </p>
                          <div className="inline-flex items-center">
                            <span 
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                appointment.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : appointment.status === 'approved' 
                                  ? 'bg-green-100 text-green-800'
                                  : appointment.status === 'rejected'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        {appointment.status === 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="mt-3 sm:mt-0"
                            onClick={() => {
                              // In a real app, we'd call the backend
                              const updatedAppointments = appointments.filter(
                                (app) => app.id !== appointment.id
                              );
                              setAppointments(updatedAppointments);
                              toast({
                                title: "Appointment Canceled",
                                description: "Your appointment request has been canceled.",
                              });
                            }}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default PatientDashboard;
