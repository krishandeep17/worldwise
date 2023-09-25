import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/FakeAuthContext";
import styles from "./User.module.css";

export default function User() {
  const { user, logout } = useAuthContext();

  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();

    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}
