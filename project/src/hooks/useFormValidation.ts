import { useState, useCallback } from 'react';
import { AuthFormData } from '../types';

interface ValidationErrors {
  email?: string;
  password?: string;
  name?: string;
}

export const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return undefined;
  };

  const validateName = (name: string): string | undefined => {
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    return undefined;
  };

  const validateForm = useCallback((data: AuthFormData, isRegister: boolean = false): boolean => {
    const newErrors: ValidationErrors = {};

    // Validate email
    const emailError = validateEmail(data.email);
    if (emailError) newErrors.email = emailError;

    // Validate password
    const passwordError = validatePassword(data.password);
    if (passwordError) newErrors.password = passwordError;

    // Validate name for registration
    if (isRegister && data.name) {
      const nameError = validateName(data.name);
      if (nameError) newErrors.name = nameError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateForm,
    clearErrors
  };
};