import React from "react";
import "./LoginAdmin.scss";
import { LoginForm } from "../../../components/Admin/LoginForm/LoginForm";

export function LoginAdmin() {
  return (
    <div className="login-admin">
      <div className="login-admin__content">
        <h1>Entrar al Panel</h1>
        <LoginForm />
      </div>
    </div>
  );
}
