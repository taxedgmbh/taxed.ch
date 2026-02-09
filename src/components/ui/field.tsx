import React from 'react';
import { BaseComponentProps } from '@/types/common';

interface FieldProps extends BaseComponentProps {
  label: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({
  label,
  error,
  required = false,
  helpText,
  children,
  className = '',
}) => {
  const fieldId = React.useId();

  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={fieldId}
        className="block text-base font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {React.cloneElement(children as React.ReactElement, {
          id: fieldId,
          'aria-invalid': error ? 'true' : 'false',
          'aria-describedby': error ? `${fieldId}-error` : helpText ? `${fieldId}-help` : undefined,
        })}
      </div>
      
      {helpText && !error && (
        <p id={`${fieldId}-help`} className="text-base text-gray-500">
          {helpText}
        </p>
      )}
      
      {error && (
        <p id={`${fieldId}-error`} className="text-base text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Field;
