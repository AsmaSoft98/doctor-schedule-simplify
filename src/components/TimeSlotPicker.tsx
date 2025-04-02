
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TimeSlot } from '@/lib/types';

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
  className?: string;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  slots,
  selectedSlot,
  onSelectSlot,
  className
}) => {
  return (
    <div className={cn("mt-6", className)}>
      <h3 className="font-medium mb-3">Available Time Slots</h3>
      
      {slots.length === 0 ? (
        <p className="text-muted-foreground">No available time slots for the selected date.</p>
      ) : (
        <div className="grid-booking-slots">
          {slots.map((slot) => (
            <Button
              key={slot.id}
              variant={selectedSlot?.id === slot.id ? "default" : "outline"}
              className={cn(
                "w-full",
                !slot.available && "opacity-50 cursor-not-allowed"
              )}
              disabled={!slot.available}
              onClick={() => slot.available && onSelectSlot(slot)}
            >
              {slot.time}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeSlotPicker;
