const InputField = ({ placeholder, type }) => (
  <input
    className="
      block 
      focus:outline-none focus:translate-x-5 
      focus:border-green-500 
      border-black border rounded 
      w-5/6 my-5 
      px-1 py-1"
    type={type}
    placeholder={placeholder}
  />
);

export default InputField;
