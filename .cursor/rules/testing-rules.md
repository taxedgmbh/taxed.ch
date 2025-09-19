# Testing Rules & Patterns

## Unit Testing Guidelines

### Component Testing with React Testing Library
```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProfile } from './UserProfile';

describe('UserProfile Component', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'client' as const,
  };

  beforeEach(() => {
    // Reset any mocks before each test
    jest.clearAllMocks();
  });

  test('renders user information correctly', () => {
    render(<UserProfile user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  test('handles edit mode toggle', async () => {
    const user = userEvent.setup();
    render(<UserProfile user={mockUser} />);
    
    const editButton = screen.getByText('Edit');
    await user.click(editButton);
    
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('validates form inputs', async () => {
    const user = userEvent.setup();
    render(<UserProfile user={mockUser} />);
    
    const editButton = screen.getByText('Edit');
    await user.click(editButton);
    
    const nameInput = screen.getByDisplayValue('John Doe');
    await user.clear(nameInput);
    await user.type(nameInput, '');
    
    const saveButton = screen.getByText('Save');
    await user.click(saveButton);
    
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    // Mock API error
    global.fetch = jest.fn().mockRejectedValue(new Error('API Error'));
    
    render(<UserProfile user={mockUser} />);
    
    const editButton = screen.getByText('Edit');
    await userEvent.click(editButton);
    
    const saveButton = screen.getByText('Save');
    await userEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to update profile')).toBeInTheDocument();
    });
  });
});
```

### Hook Testing
```typescript
import { renderHook, act } from '@testing-library/react';
import { useApi } from './useApi';

describe('useApi Hook', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('fetches data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useApi('/api/test'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('handles API errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useApi('/api/test'));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Network error');
  });
});
```

## Integration Testing

### API Integration Tests
```typescript
import request from 'supertest';
import app from '../app';
import { db } from '../database';

describe('API Integration Tests', () => {
  beforeEach(async () => {
    // Clean database before each test
    await db.query('DELETE FROM users');
    await db.query('DELETE FROM documents');
  });

  describe('POST /api/users', () => {
    test('creates a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'securepassword123',
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(String),
        name: userData.name,
        email: userData.email,
        role: 'client',
      });

      // Verify user was created in database
      const [users] = await db.query('SELECT * FROM users WHERE email = ?', [userData.email]);
      expect(users).toHaveLength(1);
    });

    test('validates required fields', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toContain('Name is required');
      expect(response.body.errors).toContain('Email is required');
    });

    test('prevents duplicate emails', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'securepassword123',
      };

      // Create first user
      await request(app).post('/api/users').send(userData).expect(201);

      // Try to create user with same email
      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(409);

      expect(response.body).toHaveProperty('message', 'Email already exists');
    });
  });

  describe('GET /api/users/:id', () => {
    test('returns user by id', async () => {
      // Create test user
      const [result] = await db.query(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        ['John Doe', 'john@example.com', 'hashedpassword']
      );

      const response = await request(app)
        .get(`/api/users/${result.insertId}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: result.insertId,
        name: 'John Doe',
        email: 'john@example.com',
      });
    });

    test('returns 404 for non-existent user', async () => {
      await request(app)
        .get('/api/users/99999')
        .expect(404);
    });
  });
});
```

## End-to-End Testing

### Playwright E2E Tests
```typescript
import { test, expect } from '@playwright/test';

test.describe('Taxed GmbH Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Taxed GmbH/);
    await expect(page.locator('h1')).toContainText('Professional Swiss Tax Services');
  });

  test('navigation works', async ({ page }) => {
    // Test navigation to services page
    await page.click('text=Services');
    await expect(page).toHaveURL('/services');
    await expect(page.locator('h1')).toContainText('Tax Services');

    // Test navigation to about page
    await page.click('text=About');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toContainText('About Us');
  });

  test('contact form submission', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill out contact form
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.selectOption('select[name="service"]', 'consultation');
    await page.fill('textarea[name="message"]', 'I need help with my taxes.');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check for success message
    await expect(page.locator('.success-message')).toBeVisible();
  });

  test('client portal login', async ({ page }) => {
    await page.goto('/client-portal');
    
    // Fill login form
    await page.fill('input[name="email"]', 'client@example.com');
    await page.fill('input[name="password"]', 'password123');
    
    // Submit login
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/client-portal/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('document download', async ({ page }) => {
    await page.goto('/documents');
    
    // Click on a document link
    const downloadPromise = page.waitForEvent('download');
    await page.click('a[href*=".pdf"]');
    const download = await downloadPromise;
    
    expect(download.suggestedFilename()).toMatch(/\.pdf$/);
  });
});
```

## Test Configuration

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/reportWebVitals.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{ts,tsx}',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
```

### Test Setup File
```typescript
// src/setupTests.ts
import '@testing-library/jest-dom';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

## Mock Patterns

### API Mocking
```typescript
// __mocks__/api.ts
export const mockApi = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

// Mock successful responses
mockApi.get.mockResolvedValue({
  data: { id: 1, name: 'Test User' },
  status: 200,
});

mockApi.post.mockResolvedValue({
  data: { id: 2, name: 'New User' },
  status: 201,
});

// Mock error responses
mockApi.get.mockRejectedValueOnce(new Error('Network error'));
```

### Database Mocking
```typescript
// __mocks__/database.ts
export const mockDb = {
  query: jest.fn(),
  transaction: jest.fn(),
};

// Mock successful queries
mockDb.query.mockResolvedValue([
  { id: 1, name: 'John Doe', email: 'john@example.com' }
]);

// Mock transaction
mockDb.transaction.mockImplementation(async (callback) => {
  return await callback(mockDb);
});
```

## Performance Testing

### Load Testing with Artillery
```yaml
# artillery-config.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
    - duration: 120
      arrivalRate: 20
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: 'Homepage Load Test'
    weight: 40
    flow:
      - get:
          url: '/'
      - think: 2
      - get:
          url: '/services'
      - think: 1

  - name: 'API Load Test'
    weight: 30
    flow:
      - get:
          url: '/api/health'
      - think: 1
      - post:
          url: '/api/contact'
          json:
            name: 'Test User'
            email: 'test@example.com'
            message: 'Load test message'

  - name: 'Document Download Test'
    weight: 30
    flow:
      - get:
          url: '/documents'
      - think: 1
      - get:
          url: '/documents/sample.pdf'
```

## Test Data Management

### Test Data Factories
```typescript
// test/factories/UserFactory.ts
import { faker } from '@faker-js/faker';

export class UserFactory {
  static create(overrides: Partial<User> = {}): User {
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: 'client',
      createdAt: faker.date.past(),
      ...overrides,
    };
  }

  static createMany(count: number, overrides: Partial<User> = {}): User[] {
    return Array.from({ length: count }, () => this.create(overrides));
  }

  static createAdmin(overrides: Partial<User> = {}): User {
    return this.create({ ...overrides, role: 'admin' });
  }
}

// Usage in tests
const user = UserFactory.create({ name: 'John Doe' });
const admin = UserFactory.createAdmin();
const users = UserFactory.createMany(5);
```

### Database Seeding
```typescript
// test/seed.ts
import { db } from '../database';
import { UserFactory } from './factories/UserFactory';

export async function seedTestData() {
  // Create test users
  const users = UserFactory.createMany(10);
  for (const user of users) {
    await db.query(
      'INSERT INTO users (id, name, email, role) VALUES (?, ?, ?, ?)',
      [user.id, user.name, user.email, user.role]
    );
  }

  // Create test documents
  const documents = [
    { id: '1', userId: users[0].id, name: 'Tax Return 2023', type: 'tax_return' },
    { id: '2', userId: users[1].id, name: 'Invoice Template', type: 'template' },
  ];

  for (const doc of documents) {
    await db.query(
      'INSERT INTO documents (id, user_id, name, type) VALUES (?, ?, ?, ?)',
      [doc.id, doc.userId, doc.name, doc.type]
    );
  }
}
```
