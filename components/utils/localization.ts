export const removeLocaleFromPath = ({ path, newSubPath='/' }) => {
  const regex = new RegExp('\/[A-Za-z]{2}\-[A-Za-z]{2}\/?'); 
  path = path.replace(regex, `${newSubPath}`);
  return path;
} 