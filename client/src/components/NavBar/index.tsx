import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ButtonsNavBar } from "../ButtonsNavBar";

export function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const navigate = useNavigate();
  return (
    <div className="bg-dark shadow-sm mb-2 d-flex align-items-center justify-content-between px-3">
      <img
        src="https://www.araquariev.com.br/wp-content/uploads/sites/445/2015/10/Logo-teste.jpg"
        width="60"
        alt="Logo"
        onClick={() => navigate(`/`)}
        style={{ cursor: "pointer" }}
      />
      <ButtonsNavBar />
    </div>
  );
}
