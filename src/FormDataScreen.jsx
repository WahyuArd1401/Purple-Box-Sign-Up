import React from "react";
import { useFormData } from "./FormDataContext";

function FormDataScreen() {
  const { formData } = useFormData();

  if (!formData) {
    return <p>No data available.</p>;
  }

  return (
    <div className="w-full h-screen bg-center bg-cover bg-[url(/background.png)] flex justify-center items-center overflow-hidden">
      <div className="w-11/12 bg-white rounded-xl p-9">
        <h1 className="text-center">My Data</h1>
        <div className="flex">
          <div className="mr-4">
            <p>Name</p>
            <p>Phone Number</p>
            <p>Email</p>
            <p>Password</p>
          </div>
          <div>
            <p>
              : {formData.name} {formData.lastName}
            </p>
            <p>: {formData.phoneNumber}</p>
            <p>: {formData.email}</p>
            <p>: {formData.password}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormDataScreen;
