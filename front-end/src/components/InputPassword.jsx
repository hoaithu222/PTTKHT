import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function InputPassword({
  label,
  placeholder,
  name,
  id,
  onChange,
  icon,
  required = false,
  error,
  isView = true,
  isReadOnly = false,
}) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 flex items-center"
      >
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative group flex-1">
        <div className="flex items-center border-2 border-pink-200 rounded-lg overflow-hidden transition-all focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-100">
          <span className=" text-gray-500 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </span>
          <input
            type={isShowPassword ? "text" : "password"}
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
            required
          />
          <button
            type="button"
            className="p-2  hover:text-gray-700 focus:outline-none  text-gray-500 absolute inset-y-0 right-0 top-2.5 pr-5 flex items-center pointer-events-none"
            onClick={() => setIsShowPassword(!isShowPassword)}
            aria-label={isShowPassword ? "Hide password" : "Show password"}
          >
            {isShowPassword ? (
              <EyeOff className="w-8 h-8" />
            ) : (
              <Eye className="w-8 h-8 text-gray-600 absolute inset-y-0 left-0 pr-3 flex items-center pointer-events-none" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
