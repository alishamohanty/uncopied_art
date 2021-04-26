import {Navbar, Button, Nav} from 'react-bootstrap';
import React from 'react';
import './style.css';
import { LinkContainer } from "react-router-bootstrap";
import logo from './assets/logo.svg';
import LangLib from "../../../libs/langLib";

export default function NavBar({isAuthenticated, handleLogout ,t}){
  return (
    <Navbar collapseOnSelect bg="light" expand="md" className="nav-spacing">
			<LinkContainer to="/">
				<Navbar.Brand className="font-weight-bold text-muted">
					<img className="logo" src={logo} alt="logo" width="150px" />
				</Navbar.Brand>
			</LinkContainer>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav activeKey={window.location.pathname}>
          {isAuthenticated ? (
            <>
            <Button className="Nav-but" onClick={handleLogout}>{t('navbar.logout')}</Button>
            </>
          ) : (
              <>
                <LinkContainer to="/login">
                  <Button className="Nav-but">{t('navbar.login')}</Button>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Button className="Nav-but">{t('navbar.signup')}</Button>
                </LinkContainer>
              </>
            )}
        </Nav>
        <LangLib />
        </Navbar.Collapse>
			</Navbar>
  );
}