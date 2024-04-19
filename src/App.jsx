import React, { useState } from "react";
import InputField from "./components/InputField";
import { useNavigate } from 'react-router-dom';
import { useFormData } from './FormDataContext';

function App() {
  const navigate = useNavigate();
  const { saveFormData } = useFormData();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    const namePattern = /^[A-Za-z\s]+$/;
    if (!formData.firstName) {
      newErrors.firstName = "First name is required.";
    } else if (!namePattern.test(formData.firstName)) {
      newErrors.firstName = "First name should not contain numbers.";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required.";
    } else if (!namePattern.test(formData.lastName)) {
      newErrors.lastName = "Last name should not contain numbers.";
    }

    const phonePattern = /^\d{1,13}$/; // Hanya angka, maksimal 13 karakter
    if (!phonePattern.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be numeric";
    } else if (
      formData.phoneNumber.length !== 12 &&
      formData.phoneNumber.length !== 13
    ) {
      newErrors.phoneNumber = "Phone number must be 12 or 13 digits.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Format email
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the Terms of Service.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      // Save form data in context
      saveFormData(formData);

      // Navigate to form data screen
      navigate('/form-data');
    }
  };

  return (
    <div className="w-full h-screen bg-center bg-cover bg-[url(/background.png)] flex justify-center items-center overflow-hidden">
      <div className="w-11/12 md:w-1/2 lg:1/3 bg-white rounded-xl p-9">
        <h1 className="text-3xl font-bold mb-3">Let's create an account.</h1>
        <h3 className="text-sm font-medium mb-3">
          Get started by creating your account
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-3 mb-5">
            <div className="w-1/2">
              <InputField
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && (
                <span className="text-sm text-red-500">{errors.firstName}</span>
              )}
            </div>
            <div className="w-1/2">
              <InputField
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && (
                <span className="text-sm text-red-500">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="mb-5">
            <InputField
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              pattern="^\d{1,13}$"
              title="Phone number should be numeric and up to 13 digits long."
            />
            {errors.phoneNumber && (
              <span className="text-sm text-red-500">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="mb-5">
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email}</span>
            )}
          </div>

          <div className="mb-5">
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password}</span>
            )}
          </div>

          <div className="mb-5">
            <InputField
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <div className="flex mb-6">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="w-4 h-4 mr-2"
            />
            <p className="text-sm">
              By checking this box, I agree to the{" "}
              <span className="text-blue-500">Terms of Service</span>.
            </p>
          </div>
          {errors.agreeToTerms && (
            <span className="text-sm text-red-500">{errors.agreeToTerms}</span>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-xl hover:bg-[#073858]"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
