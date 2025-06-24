import {
    Inter
} from 'next/font/google'

export const InterFont = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})