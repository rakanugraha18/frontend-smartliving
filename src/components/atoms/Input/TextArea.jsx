import InputTextArea from "./InputTextArea";
import Label from "./Label";

const TextArea = (props) => {
  const {
    type,
    name,
    value,
    onChange,
    placeholder,
    required,
    id,
    label,
    htmlFor,
  } = props;
  return (
    <div className="mb-3">
      <Label htmlFor={htmlFor}>{label}</Label>
      <InputTextArea
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        id={id}
        name={name}
        type={type}
        required={required}
      />
    </div>
  );
};

export default TextArea;
