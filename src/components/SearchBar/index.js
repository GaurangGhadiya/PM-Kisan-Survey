import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

import TextField from '@mui/material/TextField';



const SearchBar = (props) => {
    return (
        <FormControl style={{ width: '100%' }}>
            <InputLabel
                htmlFor='outlined-adornment-amount'>Search Ration Card</InputLabel>
            <OutlinedInput
                onChange={(e) => props.onSearch(e.target.value)}
                value={props.value}
                startAdornment={
                    <InputAdornment position='end'>
                        <SearchIcon color='primary' />
                    </InputAdornment>
                }
                label='Search Ration Card'
            />
        </FormControl>
    );
};

export default SearchBar;