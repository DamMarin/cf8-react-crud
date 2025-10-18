const API_URL = import.meta.env.VITE_API_URL;

export async function login(
  username: string,
  password: string){

  const form = new URLSearchParams();
  form.append("username", username);
  form.append("password", password);

  const res = await fetch(API_URL + "/login/access-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  })
  if (!res.ok){
    let detail = "Login failed";
    try {
      const data =  await res.json();
      if ( typeof data?.detail === "string" ) detail = data.detail;
    } catch (error){
      console.log(error);
    }
    throw new Error(detail);
  }
  return await res.json();
}