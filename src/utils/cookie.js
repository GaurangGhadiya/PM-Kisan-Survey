import Cookies from "js-cookie";

// Save the token in localStorage
export const saveToken = (data) => {
  Cookies.set("farmer_database_userName", JSON.stringify(data.userName)); // expires in 1 days
  Cookies.set("farmer_database_block", JSON.stringify(data.block)); // expires in 1 days
  Cookies.set("farmer_database_district", JSON.stringify(data.district)); // expires in 1 days
  Cookies.set("farmer_database_panchayat", JSON.stringify(data.panchayat)); // expires in 1 days
  Cookies.set("farmer_database_village", JSON.stringify(data?.village));
  Cookies.set("farmer_database_name", JSON.stringify(data.name));
  Cookies.set("farmer_database_roles", JSON.stringify(data.roles));
  Cookies.set('farmer_database_authToken', data.token, { expires: 1 }); // Set the token to expire in 7 days, adjust as needed
  Cookies.set('farmer_database_ulb', data.id, { expires: 1 }); // Set the token to expire in 7 days, adjust as needed
};

// Retrieve the token from localStorage
export const getToken = () => {
  return Cookies.get("farmer_database_authToken");
};

export const getUserName = () => {
  return Cookies.get("farmer_database_userName");
};
export const getName = () => {
  return Cookies.get("farmer_database_name");
};

export const getRoles = () => {
  return Cookies.get("farmer_database_roles");
};
export const getBlock = () => {
  return Cookies.get("farmer_database_block");
};
export const getDistrict = () => {
  return Cookies.get("farmer_database_district");
};
export const getPanchayat = () => {
  return Cookies.get("farmer_database_panchayat");
};
export const getVillage = () => {
  return Cookies.get("farmer_database_village");
};
export const getUlb = () => {
  return Cookies.get("farmer_database_id");
};

// Remove the token from localStorage
export const removeToken = () => {
  // Cookies.set('userName', null, { expires: 1 }); // expires in 1 days
  // Cookies.set('authToken', null, { expires: 1 });
  // Cookies.set('ulb', null, { expires: 1 }); // expires in 1 days

  Cookies.remove("farmer_database_authToken");
  Cookies.remove("farmer_database_userName");
  Cookies.remove("farmer_database_name");
  Cookies.remove("farmer_database_roles");
  Cookies.remove("farmer_database_block");
  Cookies.remove("farmer_database_district");
  Cookies.remove("farmer_database_panchayat");
  Cookies.remove("farmer_database_village");

  // Cookies.remove('authToken', { path: '' })
  // Cookies.remove('userName', { path: '' })
  // Cookies.remove('ulb', { path: '' })

  const cookies = Cookies.get(); // Get all cookies

  for (const cookie in cookies) {
    if (cookies.hasOwnProperty(cookie)) {
      Cookies.remove(cookie); // Remove each cookie
    }
  }
};
