export const EMAIL_VALIDATOR = "^[^\\s\n\r]+@knu\.ua$"

export const validateEmail: (email: string) => boolean
= email => email.search(EMAIL_VALIDATOR) !== -1
