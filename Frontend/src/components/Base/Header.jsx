import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Header.module.css";
import React from "react";

function Header() {
  return (
    <>
      <Navbar>
        <Container className={styles.header}>
          <Navbar.Brand href="/" className={styles.header_navbar}>
            <img alt="logo" src="/logo.png" className={styles.header_logo} />
            <img alt="title" src="/title.png" className={styles.header_title} />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
