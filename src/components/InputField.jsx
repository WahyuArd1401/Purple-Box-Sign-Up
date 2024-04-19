/* eslint-disable react/prop-types */
export default function InputField({
  type,
  placeholder,
  className = "",
  ...props
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={
          `bg-gray-200 border-none text-gray-900 text-sm rounded-xl block w-full p-3 ` +
          className
        }
        {...props}
      />
    </>
  );
}
