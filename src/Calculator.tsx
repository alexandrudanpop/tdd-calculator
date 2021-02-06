import { Fragment, useState } from "react";

const rows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];
const calcOperators = ["+", "-", "×", "÷"];
const equalSign = "=";
const clear = "C";
const Calculator = () => {
  const [value, setValue] = useState("");
  return (
    <div className="calculator">
      <h1>Calculator</h1>
      <input
        type="text"
        defaultValue={value}
        placeholder="calculate"
        disabled
      />
      <div role="grid">
        {rows.map((row, i) => {
          return (
            <Fragment key={row.toString()}>
              <div role="row">
                {i === 3 && <button>{clear}</button>}
                {row.map((n) => (
                  <button
                    key={n}
                    onClick={() => setValue(value.concat(n.toString()))}
                  >
                    {n}
                  </button>
                ))}
                {i === 3 && <button>{equalSign}</button>}
              </div>
            </Fragment>
          );
        })}
        {calcOperators.map((c) => (
          <button key={c} onClick={() => setValue(value.concat(c))}>
            {c.toString()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
