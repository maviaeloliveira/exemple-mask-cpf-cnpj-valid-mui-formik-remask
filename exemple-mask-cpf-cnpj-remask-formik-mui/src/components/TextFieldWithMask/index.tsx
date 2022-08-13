import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import {mask as masker, unMask} from 'remask'

export function TextFieldWithMask({mask, onChange, value, ...props }){

    const handleChange = ev => {
        const originalValue = unMask(ev.target.value);
        // const maskedValue = masker(originalValue, mask);
        onChange(ev.target.name)(originalValue);
      };

      const handleValue = masker(value, mask);

  return <TextField {...props} onChange={handleChange} value={handleValue} />;
};