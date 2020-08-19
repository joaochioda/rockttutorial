import React from 'react';
import './styles.css';

const Textarea = ({ label, name, onChange, value }) => {
  return (
    <div className="textarea-block" data-testid="textarea-test">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} onChange={e => onChange(e.target.value)} value={console.log(value)} />
    </div>
  );
}

export default Textarea;