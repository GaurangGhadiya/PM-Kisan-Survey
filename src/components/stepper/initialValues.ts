import { ValidationSchema } from './Context'

export const initialValues: ValidationSchema = {


    headOfFamily: {
        value: '',
        error: '',
        required: true,
        validate: 'text',
        minLength: 2,
        maxLength: 20,
        helperText: 'Custom error message'
    },

    bonafide: {
        value: '',
        error: '',
        required: true,
        validate: 'text',
        minLength: 2,
        maxLength: 20,
        helperText: 'Custom error message'
    },

    economicLevel: {
        value: '',
        error: '',
        required: true,
        validate: 'text',
        minLength: 2,
        maxLength: 20,
        helperText: 'Custom error message'
    },


    religion: {
        value: '',
        error: '',
        required: true,
        validate: 'text',
        minLength: 2,
        maxLength: 20,
        helperText: 'Custom error message'
    },

    category: {
        value: '',
        error: '',
        required: true,
        validate: 'text',
        minLength: 2,
        maxLength: 20,
        helperText: 'Custom error message'
    },

    resident: {
        value: '',
        error: '',
        required: true,
        validate: 'text',
        minLength: 2,
        maxLength: 20,
        helperText: 'Custom error message'
    },

    district: {
        value: '',
        error: '',
        required: true,
        validate: 'text',
        minLength: 2,
        maxLength: 20,
        helperText: 'Custom error message'
    },

    municipality: {
        value: '',
        error: '',
        required: true,
        validate: 'text',
        minLength: 2,
        maxLength: 20,
        helperText: 'Custom error message'
    },

    ward: {
        value: '',
        error: '',
        required: true,
        validate: 'text',
        minLength: 2,
        maxLength: 20,
        helperText: 'Custom error message'
    },

    address: {
        value: '',
        error: '',
        required: true,
        validate: 'text',
        minLength: 2,
        maxLength: 20,
        helperText: 'Custom error message'
    },




    // firstName: {
    //     value: '',
    //     error: '',
    //     required: true,
    //     validate: 'text',
    //     minLength: 2,
    //     maxLength: 20,
    //     helperText: 'Custom error message'
    // },
    // lastName: {
    //     value: '',
    //     error: '',
    //     required: true,
    //     validate: 'text',
    //     minLength: 2,
    //     maxLength: 20
    // },
    // email: {
    //     value: '',
    //     error: '',
    //     validate: 'email'
    // },
    // gender: {
    //     value: '',
    //     error: '',
    //     validate: 'select'
    // },
    // date: {
    //     value: '',
    //     error: '',
    //     validate: 'text',
    // },
    // city: {
    //     value: '',
    //     error: '',
    //     validate: 'text',
    //     minLength: 3,
    //     maxLength: 20
    // },
    // agreenemt: {
    //     value: false,
    //     error: '',
    //     required: true,
    //     validate: 'checkbox',
    //     helperText: 'Please accept our terms and conditions'
    // },
    // phone: {
    //     value: '',
    //     error: '',
    //     validate: 'phone',
    //     maxLength: 15
    // }
}
