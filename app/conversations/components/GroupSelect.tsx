"use client";

import ReactSelect from "react-select";

interface Props {
  label: string;
  id: string;
  value?: Record<string, any>;
  onChange: (value: any) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}

const GroupSelect: React.FC<Props> = ({
  label,
  id,
  value,
  onChange,
  options,
  disabled,
}) => {
  return (
    <div className="z-[100] ">
      <label
        htmlFor={id}
        className="
          block text-sm
          font-medium
          leading-6
          text-gray-900
        "
      >
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 999,
            }),
          }}
          classNames={{
            control: () => "text-sm",
          }}
        />
      </div>
    </div>
  );
};

export default GroupSelect;
