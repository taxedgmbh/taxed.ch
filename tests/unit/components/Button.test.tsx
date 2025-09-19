import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  const defaultProps = {
    children: 'Click me',
  };

  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  test('renders correctly with default props', () => {
    render(<Button {...defaultProps} />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('handles click events', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    
    render(<Button {...defaultProps} onClick={mockOnClick} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('displays loading state', () => {
    render(<Button {...defaultProps} loading={true} />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('displays disabled state', () => {
    render(<Button {...defaultProps} disabled={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  test('applies correct variant classes', () => {
    const { rerender } = render(<Button {...defaultProps} variant="primary" />);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600');
    
    rerender(<Button {...defaultProps} variant="secondary" />);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-600');
    
    rerender(<Button {...defaultProps} variant="outline" />);
    expect(screen.getByRole('button')).toHaveClass('border', 'border-gray-300');
    
    rerender(<Button {...defaultProps} variant="ghost" />);
    expect(screen.getByRole('button')).toHaveClass('text-gray-700');
  });

  test('applies correct size classes', () => {
    const { rerender } = render(<Button {...defaultProps} size="sm" />);
    expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5', 'text-sm');
    
    rerender(<Button {...defaultProps} size="md" />);
    expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2', 'text-sm');
    
    rerender(<Button {...defaultProps} size="lg" />);
    expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3', 'text-base');
  });

  test('is accessible', () => {
    render(<Button {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  test('supports custom className', () => {
    render(<Button {...defaultProps} className="custom-class" />);
    
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  test('prevents click when disabled', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    
    render(<Button {...defaultProps} onClick={mockOnClick} disabled={true} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test('prevents click when loading', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    
    render(<Button {...defaultProps} onClick={mockOnClick} loading={true} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
