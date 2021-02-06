import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Calculator, { calculateExpression } from "./Calculator";

describe("<Calculator />", () => {
  it("shows numbers", () => {
    render(<Calculator />);
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    numbers.forEach((n) => {
      expect(screen.getByText(n.toString())).toBeInTheDocument();
    });
  });

  it("shows 4 rows", () => {
    render(<Calculator />);
    const rows = screen.getAllByRole("row");

    expect(rows).toHaveLength(4);
  });

  it("shows calculation operators", () => {
    render(<Calculator />);
    const calcOperators = ["+", "-", "×", "÷"];

    calcOperators.forEach((operator) => {
      expect(screen.getByText(operator.toString())).toBeInTheDocument();
    });
  });

  it("renders equal", () => {
    render(<Calculator />);
    const equalSign = "=";
    expect(screen.getByText(equalSign)).toBeInTheDocument();
  });

  it("renders clear sign", () => {
    render(<Calculator />);
    const clear = "C";
    expect(screen.getByText(clear)).toBeInTheDocument();
  });

  it("renders an input", () => {
    render(<Calculator />);
    expect(screen.getByPlaceholderText("calculate")).toBeInTheDocument();
  });

  it("calculator input is disabled", () => {
    render(<Calculator />);
    expect(screen.getByPlaceholderText("calculate")).toBeDisabled();
  });

  it("displays users inputs", async () => {
    render(<Calculator />);
    const one = screen.getByText("1");
    const two = screen.getByText("2");
    const plus = screen.getByText("+");
    fireEvent.click(one);
    fireEvent.click(plus);
    fireEvent.click(two);

    const result = await screen.findByPlaceholderText("calculate");
    // @ts-ignore
    expect(result.value).toBe("1+2");
  });

  it("displays multiple users inputs", async () => {
    render(<Calculator />);
    const one = screen.getByText("1");
    const two = screen.getByText("2");
    const three = screen.getByText("3");
    const five = screen.getByText("5");
    const divide = screen.getByText("÷");
    const mul = screen.getByText("×");
    const minus = screen.getByText("-");
    fireEvent.click(three);
    fireEvent.click(mul);
    fireEvent.click(two);
    fireEvent.click(minus);
    fireEvent.click(one);
    fireEvent.click(divide);
    fireEvent.click(five);

    const result = await screen.findByPlaceholderText("calculate");
    // @ts-ignore
    expect(result.value).toBe("3×2-1÷5");
  });

  it("calculate based on users inputs", async () => {
    render(<Calculator />);
    const one = screen.getByText("1");
    const two = screen.getByText("2");
    const plus = screen.getByText("+");
    const equal = screen.getByText("=");
    fireEvent.click(one);
    fireEvent.click(plus);
    fireEvent.click(two);
    fireEvent.click(equal);

    const result = await screen.findByPlaceholderText("calculate");

    expect(
      (result as HTMLElement & {
        value: string;
      }).value
    ).toBe("3");
  });

  it("calculate based on multiple users inputs", async () => {
    render(<Calculator />);
    const one = screen.getByText("1");
    const two = screen.getByText("2");
    const three = screen.getByText("3");
    const five = screen.getByText("5");
    const divide = screen.getByText("÷");
    const mul = screen.getByText("×");
    const minus = screen.getByText("-");
    const equal = screen.getByText("=");

    fireEvent.click(three);
    fireEvent.click(mul);
    fireEvent.click(two);
    fireEvent.click(minus);
    fireEvent.click(one);
    fireEvent.click(divide);
    fireEvent.click(five);
    fireEvent.click(equal);

    const result = await screen.findByPlaceholderText("calculate");
    expect(
      (result as HTMLElement & {
        value: string;
      }).value
    ).toBe("5.8");
  });

  it("can clear results", async () => {
    render(<Calculator />);
    const one = screen.getByText("1");
    const two = screen.getByText("2");
    const plus = screen.getByText("+");
    const clear = screen.getByText("C");
    fireEvent.click(one);
    fireEvent.click(plus);
    fireEvent.click(two);

    fireEvent.click(clear);

    const result = await screen.findByPlaceholderText("calculate");
    expect(
      (result as HTMLElement & {
        value: string;
      }).value
    ).toBe("");
  });
});

describe("calculateExpression", () => {
  it("correctly computes for 2 numbers with +", () => {
    expect(calculateExpression("1+1")).toBe(2);
    expect(calculateExpression("10+10")).toBe(20);
    expect(calculateExpression("11+345")).toBe(356);
  });

  it("correctly substracts 2 numbers", () => {
    expect(calculateExpression("1-1")).toBe(0);
    expect(calculateExpression("10-1")).toBe(9);
    expect(calculateExpression("11-12")).toBe(-1);
  });

  it("correctly multiples 2 numbers", () => {
    expect(calculateExpression("1×1")).toBe(1);
    expect(calculateExpression("10×0")).toBe(0);
    expect(calculateExpression("11×-12")).toBe(-132);
  });

  it("correctly divides 2 numbers", () => {
    expect(calculateExpression("1÷1")).toBe(1);
    expect(calculateExpression("10÷2")).toBe(5);
    expect(calculateExpression("144÷12")).toBe(12);
  });

  it("division by 0 returns undefined and logs exception", () => {
    const errorSpy = jest.spyOn(console, "error");
    expect(calculateExpression("1÷0")).toBe(undefined);
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it("handles multiple operations", () => {
    expect(calculateExpression("1÷1×2×2+3×22")).toBe(70);
  });

  it("handles trailing operator", () => {
    expect(calculateExpression("1÷1×2×2+3×22+")).toBe(70);
  });

  it("handles empty expression", () => {
    expect(calculateExpression("")).toBe("");
  });
});
