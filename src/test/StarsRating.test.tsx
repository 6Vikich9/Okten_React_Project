import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { StarsRating } from "../components/movies/StarsRating";

test("показує рейтинг і заповнює зірки пропорційно", () =>
{
    const { container } = render(<StarsRating value={7.5} votes={120} />);
    expect(screen.getByLabelText("Рейтинг 7.5 з 10")).toBeTruthy();
    expect(container.querySelector<HTMLElement>(".stars-fill")?.style.width).toBe("75%");
});

test("без onRate зірки статичні (кнопок немає)", () =>
{
    render(<StarsRating value={5} />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
});

test("з onRate: 5 кнопок, наведення підсвічує зірки, клік викликає onRate", () =>
{
    const onRate = vi.fn();
    const { container } = render(<StarsRating value={5} onRate={onRate} />);
    const fill = () => container.querySelector<HTMLElement>(".stars-fill")?.style.width;
    expect(screen.getAllByRole("button")).toHaveLength(5);
    expect(fill()).toBe("50%");

    fireEvent.mouseEnter(screen.getByLabelText("Оцінити на 4 з 5"));
    expect(fill()).toBe("80%");
    fireEvent.mouseLeave(container.querySelector(".stars-fill")!.parentElement!);
    expect(fill()).toBe("50%");

    fireEvent.click(screen.getByLabelText("Оцінити на 4 з 5"));
    expect(onRate).toHaveBeenCalledWith(4);
});

test("показує оцінку користувача й заповнює зірки за нею", () =>
{
    const { container } = render(<StarsRating value={9} myRating={2} onRate={() => {}} />);
    expect(screen.getByText("· ваша: 2★")).toBeTruthy();
    expect(container.querySelector<HTMLElement>(".stars-fill")?.style.width).toBe("40%");
    expect(screen.getByLabelText("Оцінити на 2 з 5").getAttribute("aria-pressed")).toBe("true");
});
