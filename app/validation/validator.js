import { ZodError } from 'zod';

// A function to validate data against a schema using Zod and return the parsed data or errors
const validateData = (data, schema) => {
    try {
        const parsedData = schema.parse(data);
        return { parsedData };
    } catch (error) {
        if (error instanceof ZodError) {
            return { errors: error.errors.map(err => err.message) };
        }
        throw error;
    }
};

export default validateData;
