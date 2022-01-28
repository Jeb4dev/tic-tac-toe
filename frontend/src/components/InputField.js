const InputField = ({ placeholder, type }) => (
  // input field component
  // desiriable customization
  <input
    className="
      block 
      focus:outline-none focus:translate-x-5 
      focus:ring-green-500 
      border rounded 
      w-5/6 my-5 
      px-1 py-1"
    type={type}
    placeholder={placeholder}
  />
);

export default InputField;
