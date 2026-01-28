// src/components/Modals/RegisterModal/RegisterModal.jsx

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onOpenLogin }) {
  return (
    <ModalWithForm title="Sign Up" isOpen={isOpen} onClose={onClose}>
      <label className="auth__label">
        Email
        <input className="auth__input" type="email" placeholder="Email" />
      </label>

      <label className="auth__label">
        Password
        <input className="auth__input" type="password" placeholder="Password" />
      </label>

      <button className="auth__submit" type="button" onClick={onClose}>
        Create Account (later)
      </button>

      <button className="auth__link" type="button" onClick={onOpenLogin}>
        or Sign In
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
