/**
 * Form-related type definitions
 * Defines types for form handling, validation, and submission
 */

// Form field configuration
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'file';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  options?: FormFieldOption[];
  validation?: FieldValidation;
  helpText?: string;
  order?: number;
  group?: string;
  conditional?: ConditionalLogic;
}

// Form field option
export interface FormFieldOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

// Field validation rules
export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
  message?: string;
  async?: (value: any) => Promise<string | null>;
}

// Conditional logic
export interface ConditionalLogic {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';
  value: any;
  action: 'show' | 'hide' | 'enable' | 'disable' | 'require' | 'optional';
}

// Form state
export interface FormState<T = any> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  submitCount: number;
}

// Form submission
export interface FormSubmission<T = any> {
  data: T;
  isValid: boolean;
  errors: Record<string, string>;
  submitCount: number;
  timestamp: string;
}

// Form validation result
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings?: Record<string, string>;
}

// Form step (for multi-step forms)
export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: string[];
  isCompleted: boolean;
  isRequired: boolean;
  validation?: (values: any) => ValidationResult;
}

// Form configuration
export interface FormConfig<T = any> {
  initialValues: T;
  validationSchema?: any;
  onSubmit: (data: T) => void | Promise<void>;
  onValidate?: (values: T) => ValidationResult | Promise<ValidationResult>;
  steps?: FormStep[];
  autoSave?: boolean;
  autoSaveInterval?: number;
  preventLeave?: boolean;
}

// Form error
export interface FormError {
  field?: string;
  message: string;
  code?: string;
  type?: 'validation' | 'server' | 'network';
}

// File upload field
export interface FileUploadField {
  name: string;
  label: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  required?: boolean;
  helpText?: string;
}

// Form analytics
export interface FormAnalytics {
  formId: string;
  startTime: string;
  endTime?: string;
  timeSpent: number;
  stepsCompleted: number;
  totalSteps: number;
  fieldsInteracted: string[];
  errors: FormError[];
  abandoned: boolean;
  completed: boolean;
}

// Dynamic form
export interface DynamicForm {
  id: string;
  name: string;
  description?: string;
  fields: FormField[];
  steps?: FormStep[];
  settings: FormSettings;
  createdAt: string;
  updatedAt: string;
}

// Form settings
export interface FormSettings {
  theme: 'default' | 'minimal' | 'modern';
  layout: 'single' | 'multi-step' | 'wizard';
  submitButtonText: string;
  resetButtonText?: string;
  showProgress: boolean;
  allowSave: boolean;
  requireAllFields: boolean;
  autoAdvance: boolean;
  showFieldNumbers: boolean;
}
