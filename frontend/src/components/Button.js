// Custom button component to use in entire app
// allows for desired tweaking
const Button = function ({
  label,
  width,
  height,
  bgcolor,
  margin,
  color,
  reset,
  setSignUpLabel,
  signUpLabel,
  setLoginLabel,
  loginLabel,
  fieldIsHidden,
  setFieldIsHidden,
  id,
  type,
}) {
  return (
    <button
      style={{
        width: width,
        height: height,
        backgroundColor: bgcolor,
        color: color,
        margin: margin,
      }}
      className="
      focus:ring focus:ring-yellow-200
      text-xl 
      rounded border-black
      active:translate-x-1
      px-2 py-2 mx-2 my-5
       "
      id={id}
      type={type}
      // things to do when button is clicked
      // button label is used to target particular buttons
      onClick={(e) => {
        if (label === "sign up" || label === "Done") {
          setLoginLabel(!loginLabel);
          setSignUpLabel(!signUpLabel);
          setFieldIsHidden(!fieldIsHidden);
        }

        if (label === "reset") {
          reset();
          window.location.reload();
          e.prevenDefault();

          // window.location.reload();
        }
      }}
    >
      {label}
    </button>
  );
};
export default Button;
