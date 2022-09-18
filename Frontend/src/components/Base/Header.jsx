import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Header.module.css";
import React from "react";

function Header() {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <div
        onClick={() => {
          navigate("/");
        }}
        className={styles.header_navbar}>
        <img alt="logo" src="/logo.png" className={styles.header_logo} />
        <img alt="title" src="/title.png" className={styles.header_title} />
      </div>
    </div>
  );
}

export default Header;
