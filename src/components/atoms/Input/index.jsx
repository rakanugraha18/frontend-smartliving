import InputText from "./InputText";
import Label from "./Label";

const InputForm = (props) => {
  const {
    label,
    name,
    type,
    placeholder,
    onChange,
    value,
    id,
    htmlFor,
    disabled,
  } = props;
  return (
    <div className="mb-3">
      <Label htmlFor={htmlFor}>{label}</Label>
      <InputText
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        id={id}
        name={name}
        type={type}
        disabled={disabled}
      />
    </div>
  );
};

export default InputForm;
