import React, { FC } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { Select, Option } from './TailwindComp';
import { InputOptions } from '@/lib/contracts/utils';
interface Props {
  selectOptions: any;
  name?: string;
  onChange?:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | any;
  label?: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  required?: boolean;
  labelClassName?: string;
  selectClassName?: string;
  boxClassName?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  inputRef?: any;
  onKeyPress?: () => void;
  onBlur?: Function;
  autoComplete?: string;
  autoCapitalize?: string;
  onFocus?: () => void;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  min?: number;
  max?: number;
  customRightElement?: React.ReactNode;
  altClassName?: string;
  [key: string]: any;
  readonly?: any;
  selected: string;
}
const SelectInput: FC<Props> = ({
  selectOptions,
  label,
  onChange,
  error,
  readonly,
  required,
  placeholder,
  disabled,
  onKeyPress,
  className,
  altClassName,
  labelClassName,
  selectClassName,
  boxClassName,
  selected,
}) => {
  return (
    <>
      <div className={altClassName || `${className}`}>
        <label className={labelClassName || `fw-400 block mb-1 text-[#606060]`}>
          {label}{required && <span className='text-red-600 fw-600 pl-1'>*</span>}
        </label>
        <div
          className={`${
            boxClassName ||
            'border border-[#AAAAAAAA] rounded-[14px] pr-2 pl-2 add-min'
          } ${disabled && 'bg-gray-200'}`}
        >
          <Select
            onChange={onChange}
            placeholder={''}
            className={selectClassName || 'text-black !border-b-0 relative pb-0 mb-0'}
            variant="standard"
            color="deep-orange"
            disabled={disabled}
            selected={() => {
              const selectedArr = selectOptions.filter(
                (where: InputOptions) => where.value === selected
              );
              return selectedArr[0]?.label || selectedArr[0]?.name;
            }}
          >
            <Option value={''}> </Option>
            {selectOptions?.map((item: any, i: number) => (
              <Option value={item.value} key={i} className="p-3">
                {item.name || item.label}
              </Option>
            ))}
          </Select>
        </div>
        {error && (
        <span className="fs-500 fw-500 text-red-500">{error.toString()}</span>
      )}
      </div>
    </>
  );
};

export default SelectInput;
