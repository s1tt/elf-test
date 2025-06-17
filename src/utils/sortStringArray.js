export const sortStringArray = (array) => {
  return [...array].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
};
