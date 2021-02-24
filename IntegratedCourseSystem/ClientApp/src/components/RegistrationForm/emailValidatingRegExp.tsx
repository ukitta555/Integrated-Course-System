export const EMAIL_VALIDATOR = "^[^\n\r\s]+@knu\.ua$"

export const validateEmail: (email: string) => boolean
= email => email.search(EMAIL_VALIDATOR) !== -1
