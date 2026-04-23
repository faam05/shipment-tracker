import clsx from "clsx";

const Button = ({ children, ...props }) => {
  return (
    <button {...props} className={clsx("transition-colors sm:hover:cursor-pointer", props.className)}>
      {children}
    </button>
  );
};

export default Button;
