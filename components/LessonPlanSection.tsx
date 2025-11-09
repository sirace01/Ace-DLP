
import React from 'react';
import { DisplayItem } from '../types'; 

interface LessonPlanSectionProps {
  title: string;
  content: string | (string | DisplayItem)[];
  className?: string;
  isSubSection?: boolean;
}

const LessonPlanSection: React.FC<LessonPlanSectionProps> = ({ title, content, className = '', isSubSection = false }) => {
  const titleClass = isSubSection ? 'text-md font-semibold text-gray-700' : 'text-lg font-bold text-gray-800';
  const contentClass = 'text-gray-600 mt-1';

  const renderContent = () => {
    if (typeof content === 'string') {
      return <p className={contentClass}>{content}</p>;
    } else if (Array.isArray(content)) {
      // Check if it's an array of DisplayItem
      const isDisplayItemArray = content.every(item => typeof item === 'object' && item !== null && 'name' in item);

      if (isDisplayItemArray) {
        return (
          <ul className={`${contentClass} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ml-0 list-none`}> 
            {(content as DisplayItem[]).map((item, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition-colors duration-150">
                <span title={item.description || item.name} className="block text-sm font-medium text-gray-700 cursor-help">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        );
      } else {
        // Assume it's an array of strings
        return (
          <ul className={`${contentClass} list-disc ml-5`}>
            {(content as string[]).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      }
    }
    return null;
  };

  return (
    <div className={`mb-4 p-2 border-b border-gray-200 last:border-b-0 ${className}`}>
      <h3 className={`${titleClass} mb-1`}>{title}</h3>
      {renderContent()}
    </div>
  );
};

export default LessonPlanSection;
