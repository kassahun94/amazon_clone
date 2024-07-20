// tailwind.config.js
export default {
	mode: "jit",
	content: [
		"./src/**/*.{js,jsx,ts,tsx}", 
		"./public/index.html", 
	],
	theme: {
		extend: {
			colors: {
				amazon_blue: {
					light: "#232F3E",
					DEFAULT: "#131921",
				},
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
};
