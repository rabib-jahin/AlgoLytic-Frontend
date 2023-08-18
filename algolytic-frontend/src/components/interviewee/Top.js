import React from 'react';
import Select from "react-select"
import './Top.css';

const Top = ({ userLang, setUserLang, userTheme,
	setUserTheme, fontSize, setFontSize }) => {
	const languages = [
		{ value:"c",id: 75, label: "C" },
		{ value:"cpp",id: 76, label: "C++" },
		{ value:"python",id: 71, label: "Python" },
		{ value:"java",id: 91, label: "Java" },
	];
	const themes = [
		{ value: "vs-dark", label: "Dark" },
		{ value: "light", label: "Light" },
	]
	return (
		<div className="navbar">
			<h1>Algolytic Code Compiler</h1>
			<Select style={{color:"black"}} options={languages} value={userLang}
				onChange={(e) => setUserLang(e.value)}
				placeholder={userLang} />
			<Select style={{color:"black"}} options={themes} value={userTheme}
				onChange={(e) => setUserTheme(e.value)}
				placeholder={userTheme} />
			<label>Font Size</label>
			<input type="range" min="18" max="30"
				value={fontSize} step="2"
				onChange={(e) => { setFontSize(e.target.value) }} />
		</div>
	)
}

export default Top
