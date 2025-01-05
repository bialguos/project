import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  items: string[];
  onBreadcrumbClick: (index: number) => void;
}

const Breadcrumbs = ({ items, onBreadcrumbClick }: BreadcrumbsProps) => {
  return (
    <div className="flex items-center space-x-2 px-4 py-2 bg-[#E6EEF9]">
      {items.map((item, index) => (
        <React.Fragment key={item}>
          <span 
            className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={() => onBreadcrumbClick(index)}
          >
            {item}
          </span>
          {index < items.length - 1 && (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;