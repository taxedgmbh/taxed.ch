import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Select = ({ children, value, onValueChange, ...props }) => {
  return (
    <div {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === SelectTrigger) {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = React.forwardRef(({ className, children, value, onValueChange, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const triggerRef = useRef(null);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newValue) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  return (
    <div ref={triggerRef} className="relative">
      <button
        ref={ref}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-steel-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-gray-400 transition-colors",
          className
        )}
        {...props}
      >
        <span className="truncate text-left">
          {React.Children.map(children, child => {
            if (React.isValidElement(child) && child.type === SelectValue) {
              return React.cloneElement(child, { value: selectedValue });
            }
            return child;
          })}
        </span>
        <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-xl">
          <div className="max-h-60 overflow-auto p-1">
            {React.Children.map(children, child => {
              if (React.isValidElement(child) && child.type === SelectContent) {
                return React.cloneElement(child, { onSelect: handleSelect });
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
});

const SelectValue = ({ value, placeholder, children }) => {
  if (children) {
    return children;
  }
  return value || placeholder || "Select an option";
};

const SelectContent = ({ children, onSelect }) => {
  return (
    <div>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === SelectItem) {
          return React.cloneElement(child, { onSelect });
        }
        return child;
      })}
    </div>
  );
};

const SelectItem = React.forwardRef(({ className, children, value, onSelect, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onSelect?.(value)}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-md py-3 px-4 text-sm outline-none hover:bg-steel-blue/10 focus:bg-steel-blue/10 transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-3 flex h-4 w-4 items-center justify-center">
        {/* Check icon would go here if needed */}
      </span>
      <span className="ml-2">{children}</span>
    </button>
  );
});

const SelectGroup = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold text-gray-500", className)}
    {...props}
  />
));

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-gray-200", className)}
    {...props}
  />
));

// Placeholder components for compatibility
const SelectScrollUpButton = () => null;
const SelectScrollDownButton = () => null;

SelectTrigger.displayName = "SelectTrigger";
SelectItem.displayName = "SelectItem";

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
