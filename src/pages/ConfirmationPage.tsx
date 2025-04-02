
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="max-w-md mx-auto">
          <div className="rounded-full bg-green-100 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600 h-8 w-8" />
          </div>
          
          <h1 className="text-2xl font-bold mb-3">Appointment Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Your appointment has been successfully scheduled. A confirmation email has been sent to your inbox.
          </p>
          
          <div className="bg-accent p-6 rounded-lg mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="text-primary h-5 w-5 mr-2" />
              <h2 className="font-medium">Appointment Details</h2>
            </div>
            
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Doctor:</span>
                <span className="font-medium">Dr. Sarah Johnson</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">May 15, 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">10:30 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">Virtual Appointment</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/')}
              variant="default"
              className="gap-2"
            >
              Book Another Appointment
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button 
              onClick={() => navigate('/appointments')}
              variant="outline"
            >
              View My Appointments
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ConfirmationPage;
