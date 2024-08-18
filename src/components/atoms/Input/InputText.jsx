const InputText = (props) => {
  const { type, name, value, onChange, placeholder, required, id, disabled } =
    props;
  return (
    <input
      type={type}
      name={name}
      id={id}
      className="border border-[#16697A] sm:text-sm focus:ring-[#16697A] focus:outline-none rounded-[15px] block w-full p-2.5 disabled:focus-ring-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
    />
  );
};

export default InputText;
