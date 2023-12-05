let token: any = localStorage.getItem("token");

export const getRequestOptions: any = {
  method: "GET",
  headers: { "authorization": `Bearer ${token}` }
};

export const authPostRequestOptions: any = {
  method: "POST",
  "Content-Type": "application/json",
};
export const postRequestOptions: any = {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` }
};

export const handleAuth = (status: number) => {
  if (status != 200) {
    window.location.href = "/login";
  }
};


export default {};
