
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from 'recharts';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { CalendarClock, Users, UserCheck, ClipboardList, ArrowUpRight, Calendar, Check, X, MessageSquare } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Appointment } from '@/lib/types';

const appointmentData = [
  { month: 'Jan', appointments: 65 },
  { month: 'Feb', appointments: 75 },
  { month: 'Mar', appointments: 80 },
  { month: 'Apr', appointments: 90 },
  { month: 'May', appointments: 105 },
  { month: 'Jun', appointments: 95 },
];

const specialtyData = [
  { name: 'Cardiology', value: 35 },
  { name: 'Dermatology', value: 25 },
  { name: 'Family Medicine', value: 40 },
  { name: 'Neurology', value: 15 },
  { name: 'Pediatrics', value: 20 },
];

// These would come from a database in a real application
const mockAppointments: Appointment[] = [
  {
    id: "appt1",
    patientId: "patient1",
    patientName: "Sarah Johnson",
    patientEmail: "sarah@example.com",
    patientPhone: "555-123-4567",
    date: "2023-07-15",
    time: "10:00 AM",
    reason: "Annual physical exam",
    status: "pending",
    createdAt: "2023-07-10T14:30:00Z"
  },
  {
    id: "appt2",
    patientId: "patient2",
    patientName: "Michael Smith",
    patientEmail: "michael@example.com",
    patientPhone: "555-987-6543",
    date: "2023-07-16",
    time: "2:30 PM",
    reason: "Persistent cough and fever",
    status: "approved",
    createdAt: "2023-07-11T09:15:00Z"
  },
  {
    id: "appt3",
    patientId: "patient3",
    patientName: "Emma Davis",
    patientEmail: "emma@example.com",
    patientPhone: "555-456-7890",
    date: "2023-07-17",
    time: "11:30 AM",
    reason: "Follow-up on medication",
    status: "pending",
    createdAt: "2023-07-12T16:45:00Z"
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ControlPanel = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  
  const handleApproveAppointment = (id: string) => {
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: 'approved' as const } : appointment
    );
    setAppointments(updatedAppointments);
    toast({
      title: "Appointment Approved",
      description: "The patient will be notified of the approval.",
    });
  };
  
  const handleRejectAppointment = (id: string) => {
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: 'rejected' as const } : appointment
    );
    setAppointments(updatedAppointments);
    toast({
      title: "Appointment Rejected",
      description: "The patient will be notified of the rejection.",
    });
  };
  
  const pendingAppointments = appointments.filter(appointment => appointment.status === 'pending');
  const approvedAppointments = appointments.filter(appointment => appointment.status === 'approved');
  
  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-2 mb-8">
          <h1 className="text-3xl font-bold">Doctor Control Panel</h1>
          <p className="text-muted-foreground">Manage appointments and patient information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex flex-row items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Appointments</p>
                <h3 className="text-2xl font-bold mt-1">{appointments.length}</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>All time</span>
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <CalendarClock className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-row items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                <h3 className="text-2xl font-bold mt-1">{pendingAppointments.length}</h3>
                <p className="text-xs text-amber-500 flex items-center mt-1">
                  <ClipboardList className="h-3 w-3 mr-1" />
                  <span>Needs your attention</span>
                </p>
              </div>
              <div className="bg-amber-500/10 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-row items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <h3 className="text-2xl font-bold mt-1">{approvedAppointments.length}</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <Check className="h-3 w-3 mr-1" />
                  <span>Confirmed appointments</span>
                </p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-full">
                <Check className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-row items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                <h3 className="text-2xl font-bold mt-1">42</h3>
                <p className="text-xs text-blue-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>Active patients</span>
                </p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Management</CardTitle>
                <CardDescription>Review and manage patient appointment requests</CardDescription>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">
                    There are no appointments to display.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div 
                        key={appointment.id} 
                        className="border rounded-lg p-4"
                      >
                        <div className="flex flex-col md:flex-row justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{appointment.patientName}</h3>
                            <div className="text-sm text-muted-foreground">
                              <span>{appointment.patientEmail}</span>
                              <span className="mx-2">•</span>
                              <span>{appointment.patientPhone}</span>
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0 text-right">
                            <div className="text-sm font-medium">
                              {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                            </div>
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
                        
                        <div className="bg-muted p-3 rounded-md mb-3">
                          <p className="text-sm">
                            <span className="font-medium">Reason: </span>
                            {appointment.reason}
                          </p>
                        </div>
                        
                        {appointment.status === 'pending' && (
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <Button 
                              variant="default" 
                              size="sm"
                              className="sm:w-auto"
                              onClick={() => handleApproveAppointment(appointment.id)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="sm:w-auto"
                              onClick={() => handleRejectAppointment(appointment.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="sm:w-auto"
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message Patient
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appointments Trend</CardTitle>
                  <CardDescription>Monthly appointment volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={appointmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="appointments" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appointments by Specialty</CardTitle>
                  <CardDescription>Distribution across medical departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={specialtyData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {specialtyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Patient Records</CardTitle>
                <CardDescription>Access and manage your patient database</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  Patient management features would be displayed here, with access to patient records and medical history.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ControlPanel;
