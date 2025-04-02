
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { specialties } from '@/data/mockData';

interface DoctorFilterProps {
  onSearch: (query: string) => void;
  onSpecialtyChange: (specialty: string) => void;
  selectedSpecialty: string;
  searchQuery: string;
}

const DoctorFilter: React.FC<DoctorFilterProps> = ({
  onSearch,
  onSpecialtyChange,
  selectedSpecialty,
  searchQuery
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Find Your Doctor</h2>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or specialty"
            className="pl-9"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div>
          <Select
            value={selectedSpecialty}
            onValueChange={onSpecialtyChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty, index) => (
                <SelectItem key={index} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button className="w-full">Search Doctors</Button>
      </div>
    </div>
  );
};

export default DoctorFilter;
