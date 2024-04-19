import React, { createContext, useState } from 'react';

const FormDataContext = createContext(null);

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState(null);

  const saveFormData = (data) => {
    setFormData(data);
  };

  return (
    <FormDataContext.Provider value={{ formData, saveFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  return React.useContext(FormDataContext);
};
