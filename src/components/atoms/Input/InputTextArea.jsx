const InputTextArea = (props) => {
  const { type, name, value, onChange, placeholder, required, id } = props;
  return (
    <textarea
      type={type}
      name={name}
      id={id}
      className="border border-[#16697A] sm:text-sm h-[100px] focus:ring-[#16697A] focus:outline-none rounded-[15px] w-full block  p-2.5 "
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default InputTextArea;
