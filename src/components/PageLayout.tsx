
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children,
  className
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={cn("flex-grow", className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
