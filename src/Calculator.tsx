const rows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];

const Calculator = () => {
  return (
    <div className="calculator">
      <h1>Calculator</h1>
      <div role="grid">
        {rows.map((row) => {
          return (
            <div key={row.toString()} role="row">
              {row.map((n) => (
                <button key={n}>{n.toString()}</button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calculator;
