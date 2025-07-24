// import { useController,  FieldValues,type UseControllerProps } from "react-hook-form";
// import { TextField, type SelectProps } from "@mui/material";

// type Props<T extends FieldValues> ={items: {text:string,value: string}[]} UseControllerProps<T> & SelectProps;

// export default function SelectInput<T extends FieldValues>(props: Props<T>) {
//  const { field, fieldState } = useController<T>({...props});
//   return (
//     <TextField
//       {...props}
//       {...field}
//       fullWidth
//       variant="outlined"
//       error={!!fieldState.error}
//       helperText={fieldState.error?.message}
//     />
//   );
// }

import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import {
  MenuItem,
  // type TextFieldProps,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import type { SelectInputProps } from "@mui/material/Select/SelectInput";

type SelectItem = {
  text: string;
  value: string;
};

type Props<T extends FieldValues> = {
  items: SelectItem[];
  label: string
} & UseControllerProps<T> & Partial<SelectInputProps>;

export default function SelectInput<T extends FieldValues>(props: Props<T>) {
  const { items, ...controllerProps } = props;
  const { field, fieldState } = useController<T>(controllerProps);

  return (
    <FormControl fullWidth error={!!fieldState.error}> 
      <InputLabel>{props.label}</InputLabel>
      <Select value={field.value || ''} label={props.label} onChange={field.onChange}>
          {items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.text}
        </MenuItem>
      ))}
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
