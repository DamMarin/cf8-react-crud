import {useEffect, useState} from "react";
import type {LoginFields} from "@/schemas/login.ts";
import {login} from "@/services/api.login.ts";
import {deleteCookie, getCookie, setCookie} from "@/utils/cookies.ts";
import {jwtDecode} from "jwt-decode";
import {AuthContext} from "@/context/AuthContext.ts";

type JwtPayload = {
  email?: string;
  tenant_id?: string;
}

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("access_token");
    setAccessToken(token ?? null);
    if (token){
      try{
        const decoded = jwtDecode<JwtPayload>(token);
        setTenantId(decoded.tenant_id ?? null)
      } catch {
        setTenantId(null);
      }
    } else {
      setTenantId(null);
    }
    setLoading(false);
  }, []);

  const loginUser = async (fields: LoginFields) => {
    const res = await login(fields);

    setCookie( "access_token", res.access_token, {
      expires: 1,
      sameSite: "Lax", // Strict on production env
      secure: false, // true (HTTPS)
      path: "/",
    });

    setAccessToken(res.access_token);

    try{
      const decoded = jwtDecode<JwtPayload>(res.access_token);
      setTenantId(decoded.tenant_id ?? null)
    } catch {
      setTenantId(null);
    }
  };

  const logoutUser = () => {
    deleteCookie("access_token");
    setAccessToken(null);
    setTenantId(null);
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuthenticated: !!accessToken,
          accessToken,
          tenantId,
          loginUser,
          logoutUser,
          loading,
        }}>
        { loading ? null : children }
        </AuthContext.Provider>
    </>
  )
}

