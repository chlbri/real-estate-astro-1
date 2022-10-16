export function safeParseFloat(value?: string) {
  if (!value) return;

  const trimmedValue = ('' + value).trim();
  const test = /\d+/.test(trimmedValue);
  if (!test) return;

  return parseFloat(trimmedValue);
}

export function isInputNumber(value?: string) {
  if (!value) return true;

  const trimmedValue = ('' + value).trim();
  return /\d+/.test(trimmedValue);
}
