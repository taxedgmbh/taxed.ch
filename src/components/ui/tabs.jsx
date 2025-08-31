import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const Tabs = ({ children, value, onValueChange, ...props }) => {
  return (
    <div {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
};

const TabsList = React.forwardRef(({ className, children, value, onValueChange, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-xl bg-gray-100 p-1.5 text-gray-500 shadow-sm",
        className
      )}
      {...props}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === TabsTrigger) {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
});

const TabsTrigger = React.forwardRef(({ className, children, value, onValueChange, ...props }, ref) => {
  const isActive = value === props.value;
  
  return (
    <button
      ref={ref}
      onClick={() => onValueChange?.(props.value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive 
          ? "bg-white text-gray-900 shadow-md" 
          : "text-gray-600 hover:text-gray-900 hover:bg-white/50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

const TabsContent = React.forwardRef(({ className, children, value, ...props }, ref) => {
  const isActive = value === props.value;
  
  if (!isActive) return null;
  
  return (
    <div
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

TabsList.displayName = "TabsList";
TabsTrigger.displayName = "TabsTrigger";
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent }
