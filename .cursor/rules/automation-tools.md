# Cursor Automation Tools & Rules

## Code Generation Patterns

### React Component Generation
```typescript
// When generating React components, follow this pattern:
// 1. Use TypeScript interfaces for props
// 2. Include proper error handling
// 3. Add accessibility attributes
// 4. Use Tailwind CSS for styling
// 5. Include loading and error states

interface ComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const GeneratedComponent: React.FC<ComponentProps> = ({
  title,
  description,
  onAction,
  isLoading = false,
  error = null,
}) => {
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-800">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      {description && (
        <p className="text-gray-600 mb-4">{description}</p>
      )}
      {onAction && (
        <button
          onClick={onAction}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          aria-label={`${title} action`}
        >
          {isLoading ? 'Loading...' : 'Action'}
        </button>
      )}
    </div>
  );
};

export default GeneratedComponent;
```

### API Route Generation
```typescript
// When generating API routes, follow this pattern:
// 1. Include proper error handling
// 2. Add input validation
// 3. Use appropriate HTTP status codes
// 4. Include logging
// 5. Add rate limiting considerations

import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate input
    const validatedData = schema.parse(req.body);

    // Process the request
    const result = await processRequest(validatedData);

    // Log successful request
    console.log('API request processed successfully:', {
      endpoint: req.url,
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    // Log error
    console.error('API error:', {
      endpoint: req.url,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
      });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}
```

## Database Schema Generation

### Table Creation Patterns
```sql
-- When generating database tables, follow this pattern:
-- 1. Include proper indexes
-- 2. Add foreign key constraints
-- 3. Use appropriate data types
-- 4. Include audit fields
-- 5. Add comments for documentation

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'client', 'guest') NOT NULL DEFAULT 'guest',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    email_verified_at TIMESTAMP NULL,
    last_login_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for performance
    INDEX idx_users_email (email),
    INDEX idx_users_role (role),
    INDEX idx_users_created_at (created_at),
    INDEX idx_users_is_active (is_active),
    
    -- Comments for documentation
    COMMENT 'User accounts for the tax consulting platform'
);

CREATE TABLE documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    document_type ENUM('tax_return', 'invoice', 'receipt', 'other') NOT NULL,
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Indexes for performance
    INDEX idx_documents_user_id (user_id),
    INDEX idx_documents_type (document_type),
    INDEX idx_documents_created_at (created_at),
    
    -- Comments for documentation
    COMMENT 'Document storage for tax-related files'
);
```

## Form Generation Patterns

### React Hook Form Integration
```typescript
// When generating forms, follow this pattern:
// 1. Use react-hook-form for form management
// 2. Include Zod validation schema
// 3. Add proper error handling
// 4. Include loading states
// 5. Add accessibility attributes

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  service: z.enum(['consultation', 'tax_preparation', 'audit', 'other']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reset();
        // Show success message
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name *
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">
          Service *
        </label>
        <select
          {...register('service')}
          id="service"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          aria-invalid={errors.service ? 'true' : 'false'}
          aria-describedby={errors.service ? 'service-error' : undefined}
        >
          <option value="">Select a service</option>
          <option value="consultation">Tax Consultation</option>
          <option value="tax_preparation">Tax Preparation</option>
          <option value="audit">Tax Audit</option>
          <option value="other">Other</option>
        </select>
        {errors.service && (
          <p id="service-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.service.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message *
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="flex items-center">
        <input
          {...register('agreeToTerms')}
          type="checkbox"
          id="agreeToTerms"
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          aria-invalid={errors.agreeToTerms ? 'true' : 'false'}
          aria-describedby={errors.agreeToTerms ? 'terms-error' : undefined}
        />
        <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
          I agree to the{' '}
          <a href="/terms" className="text-indigo-600 hover:text-indigo-500">
            terms and conditions
          </a>
        </label>
        {errors.agreeToTerms && (
          <p id="terms-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.agreeToTerms.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default ContactForm;
```

## Utility Function Generation

### Data Processing Utilities
```typescript
// When generating utility functions, follow this pattern:
// 1. Include proper TypeScript types
// 2. Add JSDoc comments
// 3. Include error handling
// 4. Add unit tests
// 5. Use functional programming principles

/**
 * Formats a currency value for display
 * @param amount - The amount to format
 * @param currency - The currency code (default: 'CHF')
 * @param locale - The locale for formatting (default: 'de-CH')
 * @returns Formatted currency string
 * @example
 * formatCurrency(1234.56) // "CHF 1'234.56"
 * formatCurrency(1234.56, 'EUR', 'en-US') // "€1,234.56"
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'CHF',
  locale: string = 'de-CH'
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return `${currency} ${amount.toFixed(2)}`;
  }
};

/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns True if valid, false otherwise
 * @example
 * isValidEmail('user@example.com') // true
 * isValidEmail('invalid-email') // false
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Debounces a function call
 * @param func - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns Debounced function
 * @example
 * const debouncedSearch = debounce(searchFunction, 300);
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Generates a random ID
 * @param length - The length of the ID (default: 8)
 * @returns Random alphanumeric ID
 * @example
 * generateId() // "a1b2c3d4"
 * generateId(12) // "a1b2c3d4e5f6"
 */
export const generateId = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};
```

## Test Generation Patterns

### Component Test Generation
```typescript
// When generating component tests, follow this pattern:
// 1. Test happy path scenarios
// 2. Test error conditions
// 3. Test user interactions
// 4. Test accessibility
// 5. Include proper cleanup

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  const defaultProps = {
    // Define default props here
  };

  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  test('renders correctly with default props', () => {
    render(<ComponentName {...defaultProps} />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('handles user interaction', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    
    render(<ComponentName {...defaultProps} onClick={mockOnClick} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('displays error state', () => {
    render(<ComponentName {...defaultProps} error="Something went wrong" />);
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  test('is accessible', () => {
    render(<ComponentName {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
  });
});
```

## Documentation Generation

### API Documentation
```typescript
/**
 * @api {post} /api/contact Submit Contact Form
 * @apiName SubmitContact
 * @apiGroup Contact
 * @apiVersion 1.0.0
 * 
 * @apiDescription Submit a contact form with user information and message
 * 
 * @apiParam {String} name User's full name
 * @apiParam {String} email User's email address
 * @apiParam {String} [phone] User's phone number (optional)
 * @apiParam {String} service Type of service requested
 * @apiParam {String} message User's message
 * @apiParam {Boolean} agreeToTerms Agreement to terms and conditions
 * 
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Response data
 * 
 * @apiError {String} error Error message
 * @apiError {Array} details Validation error details
 * 
 * @apiExample {json} Request:
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "phone": "+41 44 123 4567",
 *   "service": "consultation",
 *   "message": "I need help with my taxes",
 *   "agreeToTerms": true
 * }
 * 
 * @apiExample {json} Success Response:
 * {
 *   "success": true,
 *   "message": "Contact form submitted successfully",
 *   "data": {
 *     "id": "123",
 *     "submittedAt": "2024-01-15T10:30:00Z"
 *   }
 * }
 * 
 * @apiExample {json} Error Response:
 * {
 *   "error": "Validation failed",
 *   "details": [
 *     {
 *       "field": "email",
 *       "message": "Invalid email address"
 *     }
 *   ]
 * }
 */
```
