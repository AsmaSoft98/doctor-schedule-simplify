
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from 'recharts';
import { CalendarClock, Users, UserCheck, ClipboardList, ArrowUpRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ControlPanel = () => {
  return (
    <PageLayout className="bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-2 mb-8">
          <h1 className="text-3xl font-bold">Control Panel</h1>
          <p className="text-muted-foreground">Monitor and manage your practice</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex flex-row items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Appointments</p>
                <h3 className="text-2xl font-bold mt-1">1,284</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>12% from last month</span>
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
                <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                <h3 className="text-2xl font-bold mt-1">846</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>8% from last month</span>
                </p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-row items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Doctors</p>
                <h3 className="text-2xl font-bold mt-1">32</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>2 new this month</span>
                </p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-full">
                <UserCheck className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-row items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming Appointments</p>
                <h3 className="text-2xl font-bold mt-1">64</h3>
                <p className="text-xs text-amber-500 flex items-center mt-1">
                  <ClipboardList className="h-3 w-3 mr-1" />
                  <span>Next 7 days</span>
                </p>
              </div>
              <div className="bg-amber-500/10 p-3 rounded-full">
                <CalendarClock className="h-6 w-6 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
          </TabsList>

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

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Management</CardTitle>
                <CardDescription>This section is under development. Check back soon for appointment management tools.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Appointment management features coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Patient Management</CardTitle>
                <CardDescription>This section is under development. Check back soon for patient management tools.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Patient management features coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctors">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Management</CardTitle>
                <CardDescription>This section is under development. Check back soon for doctor management tools.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Doctor management features coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default ControlPanel;
