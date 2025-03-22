export default function InputFile({
  type = "text",
  label,
  placeholder,
  name,
  icon,
  id,
  onChange,
  required = false,
  error,
  isView = true,
  isReadOnly = false,
  value,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 flex items-center"
      >
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative group flex-1">
        <div className="flex items-center border-2 border-pink-200 rounded-lg overflow-hidden transition-all focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-100 flex-1">
          <span className=" text-gray-500 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </span>
          <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            className={`${icon ? "pl-12" : "pl-4"} w-full h-12 px-4 py-3  ${
              isView && "border bg-gray-50"
            } ${error ? "border-red-500" : "border-gray-300"} ${
              isReadOnly ? "bg-gray-100 cursor-not-allowed" : ""
            } rounded-lg text-base text-gray-700 focus:ring-2 ${
              error
                ? "focus:ring-red-200 focus:border-red-400"
                : "focus:ring-blue-200 focus:border-blue-400"
            } outline-none transition-all duration-300`}
            onChange={onChange}
            value={value}
            required
          />
        </div>
      </div>
    </div>
  );
}
