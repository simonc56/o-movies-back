import { ZodError } from 'zod';

const validateData = (data, schema) => {
    try {
        const parsedData = schema.parse(data);
        console.log(parsedData);
        return { parsedData };
    } catch (error) {
        if (error instanceof ZodError) {
            return { errors: error.errors.map(err => err.message) };
        }
        throw error;
    }
};

export default validateData;
