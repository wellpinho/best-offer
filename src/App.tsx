import { FormEvent, useState } from 'react'
import './App.css'

import logoImg from './assets/logo.png'

interface IOption {
  gasoline: number
  ethanol: number
}

export function App() {
  const [option, setOption] = useState<IOption>({
    gasoline: 0,
    ethanol: 0
  });

  const [bestOption, setBestOption] = useState('');
  const [ethanol, setEthanol] = useState('');
  const [gasoline, setGasoline] = useState('');

  const calculate = (event: FormEvent) => {
    event.preventDefault();

    const count = option.ethanol / option.gasoline;

    count <= 0.7 ? setBestOption('Alcohol') : setBestOption('Gasoline');

    setEthanol(setCurrency(option.ethanol));
    setGasoline(setCurrency(option.gasoline));
  }

  const setCurrency = (value: number) => {
    let currencyFormater = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    return currencyFormater.format(value);
  }

  return (
    <main className="container">
      <img
        className="logo"
        src={logoImg}
        alt="Logo da calculadora de gasolina ou alcool"
      />
      <h1 className="title">Flex-Fuel car?</h1>
      <h2 className="sub-title">Which is a better option?</h2>

      <form className="form">
        <div className="inputs">
          <div className="label">
            <label>Ethanol</label>
            <input
              className="input"
              type="number"
              placeholder="4,90"
              min="1"
              step="0.01"
              required
              value={option.ethanol}
              onChange={(e) => setOption({ ethanol: parseFloat(e.target.value), gasoline: option.gasoline })}
            />
          </div>

          <div className="label">
            <label>Gasoline</label>
            <input
              className="input"
              type="number"
              placeholder="4,90"
              min="1"
              step="0.01"
              required
              value={option.gasoline}
              onChange={(e) => setOption({ ethanol: option.ethanol, gasoline: parseFloat(e.target.value) })}
            />
          </div>

        </div>

        <input
          className='button'
          type="submit"
          value="Calculate"
          onClick={calculate}
        />
      </form>

      {!bestOption ? (
        <section className='result'>
          <h2>Please, insert the values</h2>
        </section>
      ) : (
        <section className='result'>
          <h2>Best option: <strong>{bestOption}</strong></h2>
          <span>you entered <br /><strong>Ethanol {ethanol}</strong> <br /> <strong>Gasoline {gasoline}</strong></span>
        </section>
      )}

    </main>
  )
}

