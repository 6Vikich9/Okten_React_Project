import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Pagination } from "../components/movies/Pagination";

test("перемикає сторінки і блокує «назад» на першій", () => {
    const onChange = vi.fn();
    render(<Pagination page={1} totalPages={10} onChange={onChange} />);
    expect((screen.getByText("←") as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByText("→"));
    expect(onChange).toHaveBeenCalledWith(2);
});

test("не показується, якщо сторінка одна", () => {
    const { container } = render(<Pagination page={1} totalPages={1} onChange={() => {}} />);
    expect(container.firstChild).toBeNull();
});
