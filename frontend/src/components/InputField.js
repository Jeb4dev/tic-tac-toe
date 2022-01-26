const InputField = ({ placeholder, type }) => {
  return (
    <input
      className="focus:outline-none focus:translate-x-5 focus:border-green-500 block my-5 border border-black rounded w-5/6 px-1 py-1"
      type={type}
      placeholder={placeholder}
    />
  );
};
export default InputField;
