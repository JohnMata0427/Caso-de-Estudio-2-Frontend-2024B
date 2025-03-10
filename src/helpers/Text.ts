export const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const separateAndCapitalize = (text: string) =>
  text.split('_').map(capitalize).join(' ');

export const formatDateToEC = (date: string) => {
  return new Date(date).toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
