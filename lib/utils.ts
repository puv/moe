import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

erxport function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}