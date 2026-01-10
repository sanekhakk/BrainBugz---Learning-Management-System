// src/components/FormFields.jsx
import React from "react";
import { ChevronDown } from "lucide-react";

// ADDED readOnly and disabled to props and JSX element
export const InputField = ({ label, name, value, onChange, type = 'text', required = false, placeholder = '', readOnly = false, disabled = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor={name}>
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      readOnly={readOnly} // <-- FIX: Prop passed down
      disabled={disabled} // <-- FIX: Prop passed down
      placeholder={placeholder}
      // ENHANCEMENT: Smoother look, better focus effect
      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/20 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
    />
  </div>
);

export const TextareaField = ({ label, name, value, onChange, required = false, placeholder = '', rows = 3 }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor={name}>
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      // ENHANCEMENT: Smoother look, better focus effect
      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/20"
    />
  </div>
);

export const SelectField = ({ label, name, value, onChange, options = [], required = false }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor={name}>
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <select
      id={name}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      // ENHANCEMENT: Smoother look, better focus effect
      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/20 appearance-none pr-8"
    >
      {(!value || value === "") && <option value="" disabled>Select an option</option>}
      {options.map(opt => (
        <option key={opt.value ?? opt} value={opt.value ?? opt}>
          {opt.label ?? opt}
        </option>
      ))}
    </select>
    {/* Corrected position of chevron icon */}
    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-[32px] pointer-events-none" /> 
  </div>
);