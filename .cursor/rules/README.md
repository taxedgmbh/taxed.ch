# Cursor Rules Directory

This directory contains comprehensive rules and patterns for Cursor automation tools to help with code generation, debugging, and project management for the Taxed GmbH website.

## 📁 Rules Structure

### Core Rules
- **`project-overview.md`** - Project description, tech stack, and file structure
- **`coding-standards.md`** - TypeScript, React, and Tailwind CSS best practices
- **`component-patterns.md`** - Reusable component templates and patterns
- **`deployment-rules.md`** - Docker, environment, and production deployment guidelines
- **`testing-rules.md`** - Unit, integration, and E2E testing patterns
- **`automation-tools.md`** - Cursor-specific automation rules

## 🎯 How to Use These Rules

### For Code Generation
When using Cursor to generate code, reference these rules to ensure:
- Consistent coding standards
- Proper TypeScript typing
- React best practices
- Tailwind CSS patterns
- Accessibility compliance

### For Component Creation
Use the component patterns to generate:
- Page components with proper structure
- UI components with consistent styling
- Form components with validation
- Layout components with responsive design

### For Testing
Follow the testing rules to create:
- Unit tests for components and hooks
- Integration tests for API endpoints
- E2E tests for user workflows
- Mock patterns for external dependencies

### For Deployment
Use deployment rules for:
- Docker containerization
- Environment configuration
- Database migrations
- Security best practices
- Performance optimization

## 🔧 Cursor Integration

### Code Completion
These rules help Cursor provide better:
- TypeScript type suggestions
- React component patterns
- Tailwind CSS class recommendations
- API endpoint generation
- Test case creation

### Code Generation
Cursor can use these rules to generate:
- Consistent component structures
- Proper error handling
- Accessibility attributes
- Form validation
- API route handlers

### Debugging Assistance
The rules help with:
- Common error patterns
- Performance optimization
- Security vulnerabilities
- Testing strategies
- Deployment issues

## 📋 Quick Reference

### React Component Template
```typescript
interface ComponentProps {
  // Define props with proper typing
}

const Component: React.FC<ComponentProps> = ({ ...props }) => {
  // Use hooks for state management
  // Include error handling
  // Add accessibility attributes
  // Use Tailwind for styling
};
```

### API Route Template
```typescript
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate HTTP method
  // Validate input data
  // Handle errors gracefully
  // Return appropriate status codes
}
```

### Test Template
```typescript
describe('Component', () => {
  test('renders correctly', () => {
    // Test component rendering
  });
  
  test('handles user interaction', async () => {
    // Test user interactions
  });
  
  test('displays error state', () => {
    // Test error conditions
  });
});
```

## 🚀 Best Practices

### Code Quality
- Use TypeScript for all new code
- Follow React best practices
- Implement proper error handling
- Add accessibility attributes
- Use consistent naming conventions

### Testing
- Write tests for all components
- Test user interactions
- Test error conditions
- Maintain good test coverage
- Use proper mocking strategies

### Deployment
- Use Docker for containerization
- Implement proper environment variables
- Add health checks
- Configure security headers
- Monitor performance

## 🔄 Maintenance

### Updating Rules
- Keep rules current with project changes
- Add new patterns as they emerge
- Remove outdated practices
- Update examples regularly

### Rule Validation
- Test generated code against rules
- Validate component patterns
- Check deployment configurations
- Verify testing coverage

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Testing Library Docs](https://testing-library.com/)
- [Docker Documentation](https://docs.docker.com/)

---

**These rules ensure consistent, high-quality code generation and help maintain the professional standards of the Taxed GmbH website project.**
