import { useState } from 'react';
import './App.css';

function App() {
	const [bill, setBill] = useState("")
	const [cashGiven, setCashGiven] = useState("")
	const [showCash, setShowCash] = useState(false)
	const [showdenomination, setShowDenomination] = useState(false)
	const noteValues = [2000, 500, 100, 20, 10, 5, 1]
	const [msg, setMsg] = useState("")
	const notes = {
		1: "0",
		5: "0",
		10: "0",
		20: "0",
		100: "0",
		500: "0",
		2000: "0"
	}
	const [denomination, setDenomation] = useState(notes)

	function changeHandlerBill(event) {
		event.preventDefault();
		const inputBill = event.target.value;
		setBill(inputBill);
		if (inputBill !== "") setShowCash(true);
		else if (inputBill === "") setShowCash(false);
	}

	function changeHandlerCash(event) {
		event.preventDefault();
		const inputCash = event.target.value;
		setCashGiven(inputCash);
	}

	function getDenomination(event) {
		event.preventDefault();
		let amount = parseInt(cashGiven) - parseInt(bill);
		if (amount < 0) {
			setMsg("⚠️🚨 Cash given is less than the bill amount 🚨⚠️")
			setShowDenomination(false)
		} else if (amount === 0) {
			setMsg("No amount should be returned")
			setShowDenomination(false)
		} else if (amount > 0) {
			setMsg(`Amount to be returned is ${amount}`)
			const returnNotes = {...notes}
			for (let key of noteValues) {
				returnNotes[key] = parseInt(amount / parseInt(key));
				amount = amount % parseInt(key)
			}
			setDenomation(returnNotes)
			setShowDenomination(true)
		}
	}

	return (
		<div className="App">
			<div className="header">
				<h1>Cash Register</h1>
			</div>
			<div className="register">
				<h3>Enter the bill amount and cash given by the customer and know minimum number of notes to return.</h3>
				<hr/>
				<form>
					<p>Bill Amount</p>
					<input
						className="bill"
						type="number"
						placeholder="Enter the bill amount"
						onChange={changeHandlerBill}
						value={bill}
						required
					/>
					<br/>
					{ showCash && <p>Cash Given</p> }
					{ showCash && <input
						className="cash"
						type="number"
						placeholder="Enter the cash given"
						onChange={changeHandlerCash}
						value={cashGiven}
						required
					/> }
					<br/>
					{showCash && <button onClick={getDenomination} type='submit'>Check</button>}
				</form>
				{showCash && <hr/>}
				<div className="output">
					{msg !== "" && <h4>{msg}</h4> }
					{showdenomination && <table>
						<tr>
							<th> No. of Notes</th>
							<td>{denomination[1]}</td>
							<td>{denomination[5]}</td>
							<td>{denomination[10]}</td>
							<td>{denomination[20]}</td>
							<td>{denomination[100]}</td>
							<td>{denomination[500]}</td>
							<td>{denomination[2000]}</td>
						</tr>
						<tr>
							<th>Value of Note</th>
							<th>1</th>
							<th>5</th>
							<th>10</th>
							<th>20</th>
							<th>100</th>
							<th>500</th>
							<th>2000</th>
						</tr>
					</table>}
				</div>
			</div>
		</div>
  	);
}

export default App;
