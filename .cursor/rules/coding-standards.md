# Coding Standards & Best Practices

## TypeScript Guidelines

### Type Definitions
```typescript
// Use interfaces for object shapes
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client' | 'guest';
}

// Use type aliases for unions and primitives
type Status = 'pending' | 'approved' | 'rejected';
type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};
```

### Component Patterns
```typescript
// Use functional components with hooks
const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="user-profile">
      {/* Component content */}
    </div>
  );
};

// Use proper prop typing
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick: () => void;
  children: React.ReactNode;
}
```

## React Best Practices

### Hooks Usage
```typescript
// Custom hooks for reusable logic
const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // API logic
  }, [url]);
  
  return { data, loading, error };
};

// Use proper dependency arrays
useEffect(() => {
  fetchData();
}, [userId, filters]); // Include all dependencies
```

### State Management
```typescript
// Use useReducer for complex state
const initialState = {
  users: [],
  loading: false,
  error: null,
  filters: {}
};

const userReducer = (state: typeof initialState, action: UserAction) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload, loading: false };
    default:
      return state;
  }
};
```

## Tailwind CSS Guidelines

### Class Organization
```typescript
// Group related classes together
const buttonClasses = `
  px-4 py-2 rounded-lg
  bg-blue-600 hover:bg-blue-700
  text-white font-medium
  transition-colors duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
`;

// Use conditional classes
const getButtonVariant = (variant: 'primary' | 'secondary') => {
  return variant === 'primary' 
    ? 'bg-blue-600 hover:bg-blue-700 text-white'
    : 'bg-gray-200 hover:bg-gray-300 text-gray-800';
};
```

### Responsive Design
```typescript
// Mobile-first approach
<div className="
  grid grid-cols-1 gap-4
  md:grid-cols-2 lg:grid-cols-3
  p-4 md:p-6 lg:p-8
">
  {/* Content */}
</div>
```

## File Naming Conventions

### Components
- Use PascalCase: `UserProfile.tsx`
- Use descriptive names: `TaxCalculator.tsx`
- Group related components: `forms/ContactForm.tsx`

### Utilities
- Use camelCase: `formatCurrency.ts`
- Use descriptive names: `validateEmail.ts`
- Group by functionality: `utils/validation.ts`

### Types
- Use descriptive names: `UserTypes.ts`
- Group related types: `types/api.ts`

## Error Handling

### API Error Handling
```typescript
const handleApiError = (error: unknown) => {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Use try-catch in async functions
const fetchUserData = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
```

### Component Error Boundaries
```typescript
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}
```

## Performance Optimization

### Memoization
```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }: { data: ComplexData }) => {
  return <div>{/* Expensive rendering */}</div>;
});

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return data.reduce((acc, item) => acc + item.value, 0);
}, [data]);

// Use useCallback for stable function references
const handleClick = useCallback(() => {
  onItemClick(item.id);
}, [item.id, onItemClick]);
```

### Code Splitting
```typescript
// Lazy load components
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Use Suspense for loading states
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

## Testing Guidelines

### Component Testing
```typescript
// Test component rendering and interactions
import { render, screen, fireEvent } from '@testing-library/react';
import { UserProfile } from './UserProfile';

test('renders user information', () => {
  const user = { id: '1', name: 'John Doe', email: 'john@example.com' };
  render(<UserProfile user={user} />);
  
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
});

test('handles edit mode toggle', () => {
  const user = { id: '1', name: 'John Doe', email: 'john@example.com' };
  render(<UserProfile user={user} />);
  
  fireEvent.click(screen.getByText('Edit'));
  expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
});
```

## Security Guidelines

### Input Validation
```typescript
// Validate all user inputs
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize HTML content
const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html);
};
```

### API Security
```typescript
// Use proper error handling to avoid information leakage
const handleApiResponse = (response: ApiResponse<any>) => {
  if (!response.success) {
    // Log error for debugging
    console.error('API Error:', response.message);
    // Show generic error to user
    throw new Error('An error occurred. Please try again.');
  }
  return response.data;
};
```
