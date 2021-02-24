import { validateEmail } from "./emailValidatingRegExp";

test('regex test on @knu.ua', () => {
    expect(validateEmail("andrew@knu.ua")).toBe(true);
    expect(validateEmail("andrew.kl@knu.ua")).toBe(true);
    expect(validateEmail("derevianchenko......@knu.ua")).toBe(true);
    expect(validateEmail("@knu.ua")).toBe(false);
  });

test('regex test on not @knu.ua', () => {
    expect(validateEmail("andrew@gmail.com")).toBe(false);
  });