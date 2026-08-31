import {z} from "zod";
export const checkoutSchema = z.object({
    name:z.string().min(2,"The name is required"),
    address:z.string().min(5,"The Address must be filled"),
    city:z.string().min(2,"The city is required"),
    pincode:z.string().regex(/^\d{6}$/,"pincode must be required"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
 
})