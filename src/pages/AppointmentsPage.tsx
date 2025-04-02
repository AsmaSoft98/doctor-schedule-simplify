
import React from 'react';
import { CalendarClock, Clock, MapPin, MoreVertical, FileText, Video, Phone } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PageLayout from '@/components/PageLayout';

const AppointmentsPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Appointments</h1>
            <p className="text-muted-foreground">Manage your upcoming and past medical appointments</p>
          </div>
          <Button className="mt-4 md:mt-0">
            <CalendarClock className="mr-2 h-4 w-4" />
            Book New Appointment
          </Button>
        </div>
        
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Appointment Card 1 */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-medical-500 hover:bg-medical-600">Upcoming</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>Cancel Appointment</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-xl mt-2">Cardiology Checkup</CardTitle>
                  <CardDescription>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>May 15, 2023 at 10:30 AM</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Virtual Appointment</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop" alt="Dr. Sarah Johnson" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">Dr. Sarah Johnson</h3>
                      <p className="text-sm text-muted-foreground">Cardiology</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-3">
                  <Button variant="outline" size="sm" className="w-full mr-2">
                    <FileText className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  <Button size="sm" className="w-full">
                    <Video className="mr-2 h-4 w-4" />
                    Join Video
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Appointment Card 2 */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-medical-500 hover:bg-medical-600">Upcoming</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>Cancel Appointment</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-xl mt-2">Annual Physical</CardTitle>
                  <CardDescription>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>May 22, 2023 at 9:00 AM</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Main Street Medical Center</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=200&h=200&auto=format&fit=crop" alt="Dr. Robert Kim" />
                      <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">Dr. Robert Kim</h3>
                      <p className="text-sm text-muted-foreground">Family Medicine</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-3">
                  <Button variant="outline" size="sm" className="w-full mr-2">
                    <FileText className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  <Button size="sm" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Office
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Past Appointment Example */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline">Completed</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Summary</DropdownMenuItem>
                        <DropdownMenuItem>Book Follow-up</DropdownMenuItem>
                        <DropdownMenuItem>Download Records</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-xl mt-2">Dermatology Consultation</CardTitle>
                  <CardDescription>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>April 10, 2023 at 2:30 PM</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Virtual Appointment</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop" alt="Dr. Michael Chen" />
                      <AvatarFallback>MC</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">Dr. Michael Chen</h3>
                      <p className="text-sm text-muted-foreground">Dermatology</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-3">
                  <Button variant="outline" size="sm" className="w-full mr-2">
                    <FileText className="mr-2 h-4 w-4" />
                    View Summary
                  </Button>
                  <Button size="sm" className="w-full">
                    Book Follow-up
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="canceled">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No canceled appointments</h3>
              <p className="text-muted-foreground">
                You don't have any canceled appointments at the moment.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AppointmentsPage;
