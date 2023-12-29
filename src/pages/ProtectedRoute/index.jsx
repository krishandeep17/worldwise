import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/FakeAuthContext/useAuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}
