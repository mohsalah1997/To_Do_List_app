import React from 'react';
import './style.css';

const TextInput = ({ type, value, change, placeholder }) => {
  return (
    <>
      <input
        type={type || 'text'}
        placeholder={placeholder || 'Please Enter Data'}
        value={value}
        onChange={({ target: { value } }) => change(value)}
        className='form__input'
      ></input>
    </>
  );
};

export default TextInput;
