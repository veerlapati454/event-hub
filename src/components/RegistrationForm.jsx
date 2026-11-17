import { useState } from "react";

const validate = ({ name, email, phone }) => {
  const errors = {};
  if (!name.trim()) errors.name = "Enter your full name.";
  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email, like name@example.com.";
  if (!phone.trim()) errors.phone = "Enter your phone number.";
  else if (!/^\d{10}$/.test(phone.replace(/[\s-]/g, ""))) errors.phone = "Enter a 10-digit phone number.";
  return errors;
};

export default function RegistrationForm({ onSubmit, onCancel }) {
  const [values, setValues] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});

  const change = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(values);
  };

  const field = (name, label, type) => (
    <label className="field">
      {label}
      <input name={name} type={type} value={values[name]} onChange={change} aria-invalid={!!errors[name]} />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </label>
  );

  return (
    <form className="form" onSubmit={submit} noValidate>
      {field("name", "Full name", "text")}
      {field("email", "Email", "email")}
      {field("phone", "Phone number", "tel")}
      <div className="row">
        <button type="submit" className="btn">Confirm registration</button>
        <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
