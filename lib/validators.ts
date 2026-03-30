/**
 * Validate an email address format.
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return re.test(email.trim());
}

interface PasswordValidation {
  valid: boolean;
  errors: string[];
}

/**
 * Check whether a password meets strength requirements.
 * Returns a list of unmet criteria.
 */
export function isStrongPassword(password: string): PasswordValidation {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate a phone number (international or Vietnamese format).
 */
export function isValidPhoneNumber(phone: string): boolean {
  // Accepts: +84xxxxxxxxx, 0xxxxxxxxx, or generic international format
  const re =
    /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,5}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}$/;

  return re.test(phone.trim());
}
