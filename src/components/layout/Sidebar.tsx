import React from 'react';
import { BaseComponentProps } from '@/types/common';

interface SidebarProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  position?: 'left' | 'right';
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  title,
  position = 'left',
  children,
  className = '',
}) => {
  if (!isOpen) return null;

  const positionClasses = position === 'left' ? 'left-0' : 'right-0';
  const transformClasses = position === 'left' ? '-translate-x-full' : 'translate-x-full';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 ${positionClasses} z-50 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${transformClasses} ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {title && (
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
