import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h2 className="text-danger mb-3">Oops! You're not logged in.</h2>
        <p className="text-muted mb-4">To access this page, please log in to your account.</p>
        <div className="d-flex justify-content-center">
          <Link className="btn btn-primary mx-2" to="/login">
            Login
          </Link>
          <Link className="btn btn-secondary mx-2" to="/">
            Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
