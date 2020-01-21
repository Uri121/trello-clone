import React from "react";

export const required = value => {
  if (!value || value === "") return "this filed is required";
  return undefined;
};

export const renderInput = ({
  type,
  input,
  meta,
  disabled,
  label,
  className
}) => (
  <div className="mb-2">
    <input
      {...input}
      type={type}
      disabled={disabled}
      placeholder={label}
      className={className}
    />
    {meta.error && meta.touched && (
      <span style={{ color: "red" }}>{meta.error}</span>
    )}
  </div>
);

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

export const phone = value =>
  value && (value.length > 10 || value.length < 9)
    ? "invaild phone number"
    : undefined;

export const password = value =>
  value && value.length < 5 ? "password must be bigger then 5" : undefined;

export const name = value => {
  const checkname = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])+$/;
  if (value && value.length < 2) {
    return "name must be bigger the 2";
  } else if (!value.match(checkname)) {
    return "name cant contain digits";
  } else {
    return undefined;
  }
};
