export const getImagePath = (path) => {
    const prefix = "/farmer-database"; // For staging
    // const prefix = "/"; // For local
    return `${prefix}${path}`;
  };
  