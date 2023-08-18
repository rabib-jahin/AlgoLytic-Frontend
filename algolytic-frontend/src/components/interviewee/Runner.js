import { useState } from 'react';
import Top from "./Top.js"
import "./Runner.css"
import Editor from "@monaco-editor/react";
import { Button, CircularProgress } from "@mui/material";

import Axios from 'axios';

const languages = { "c": 75,"cpp":76,"python":71,"java":91 }



function Runner() {



	// State variable to set users source code
	const [userCode, setUserCode] = useState(``);

	// State variable to set editors default language
	const [userLang, setUserLang] = useState("cpp");

	// State variable to set editors default theme
	const [userTheme, setUserTheme] = useState("vs-dark");

	// State variable to set editors default font size
	const [fontSize, setFontSize] = useState(20);

	// State variable to set users input
	const [userInput, setUserInput] = useState("");

	// State variable to set users output
	const [userOutput, setUserOutput] = useState("");
	const [expectedOutput, setExpectedOutput] = useState("");
	// Loading state variable to show spinner
	// while fetching data
	const [loading, setLoading] = useState(false);

	const options = {
		fontSize: fontSize
	}

	// Function to call the compile endpoint
async	function compile() {
		setLoading(true);
		if (userCode === ``) {
			return
		}

		const options = {
			method: 'POST',
			url: 'https://judge0-ce.p.rapidapi.com/submissions',
			params: {
			  base64_encoded: 'false',
			  fields: '*',
			  wait:'true'
			},
			headers: {
			  'content-type': 'application/json',
			  'Content-Type': 'application/json',
			//   'X-RapidAPI-Key': '42ab40d041mshd450343e6f5a3d6p19d919jsn156ff826ef0c',
			'X-RapidAPI-Key':'6d1b311116mshc7d00200fa62399p1afe3fjsn6cf3594ddea6',
			'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
			},
			data: {
			  language_id: languages[userLang],
			  source_code:userCode ,
			  stdin: userInput,
			  expected_output:expectedOutput?expectedOutput:null
			}
		  };
		  console.log(options)
		  try {
			const response = await Axios.request(options);
			setLoading(false);
			console.log(response.data)
			setUserOutput(response.data);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}

		// Post request to compile endpoint
		// Axios.post(``, {
		// 	code: userCode,
		// 	language: userLang,
		// 	input: userInput
		// }).then((res) => {
		// 	setUserOutput(res.data.output);
		// }).then(() => {
		// 	setLoading(false);
		// })
	}

	// Function to clear the output screen
	function clearOutput() {
		setUserOutput("");
	}

	return (
		<div className="App">
			<Top
				userLang={userLang} setUserLang={setUserLang}
				userTheme={userTheme} setUserTheme={setUserTheme}
				fontSize={fontSize} setFontSize={setFontSize}
			/>
			<div className="main">
				<div className="left-container">
					<Editor
						options={options}
						height="calc(100vh - 50px)"
						width="100%"
						theme={userTheme}
						language={userLang}
						defaultLanguage="python"
						defaultValue="# Enter your code here"
						onChange={(value) => { setUserCode(value) }}
					/>
					<button className="run-btn" onClick={() => compile()}>
						Run
					</button>
				</div>
				<div className="right-container">
					<h4>Input:</h4>
					<div className="input-box">
						<textarea id="code-inp" onChange=
							{(e) => setUserInput(e.target.value)}>
						</textarea>
						<h4>Expected Output</h4>
						<textarea id="exp-output" onChange=
							{(e) => setExpectedOutput(e.target.value)}>
						</textarea>
					
					</div>
			
					<h4 style={{marginTop:"50px"}}>Output:</h4>
					{loading ? (
						<div className="spinner-box">
						        <CircularProgress style={{marginLeft:"10%"}}/>
						</div>
					) : (
						<div className="output-box">
							{userOutput.stdout?<>
							<pre>{userOutput.stdout}</pre>

							<pre>Time taken: {userOutput.time} sec</pre>
							</>:""

							}
							{userOutput.message?<>
							<pre style={{color:"yellow"}}>{userOutput.message}</pre>

							<pre>Time taken: {userOutput.time} sec</pre>
							</>:""

							}
							{userOutput.stderr?<>
							<pre style={{color:"red"}}>{userOutput.stderr}</pre>

							<pre>Time taken: {userOutput.time} sec</pre>
							</>:""

							}
							{
								userOutput.expected_output!=null?(
<>
<pre>Verdict: <span style={{color:"orange"}}>{userOutput.status.description}</span> </pre>
</>
								):""
							}
							{userOutput.compile_output!=null?<pre style={{color:"red"}}>{userOutput.compile_output}</pre>:""}
							<button onClick={() => { clearOutput() }}
								className="clear-btn">
								Clear
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Runner;
