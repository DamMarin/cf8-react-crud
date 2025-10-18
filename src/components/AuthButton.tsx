import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/hooks/useAuth.ts";
import {useNavigate} from "react-router";

export function AuthButton() {
  const { isAuthenticated, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  }

  const handleLogout = () => {
    logoutUser();
  }

  return isAuthenticated ? (
    <Button onClick={handleLogout}>
      Logout
    </Button>
    ) : (
    <Button onClick={handleLogin}>
      Login
    </Button>
  )
}