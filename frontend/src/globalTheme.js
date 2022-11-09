import { createTheme } from "@mui/material/styles";


export const globalTheme = createTheme({
	palette: {
		primary: {
			main: "#A4C3B2",
		},
		secondary: {
			main: "#CCE3DE"
		}
	},
	typography: {
		"fontFamily": "\"Roboto Mono\", monospace",
		"fontWeightLight": 300,
		"fontWeightRegular": 400,
		"fontWeightMedium": 500
	}
	
});