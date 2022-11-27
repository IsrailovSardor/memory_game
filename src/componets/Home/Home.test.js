import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import Home from "./Home";
import Game from "../Game/Game";



describe('Home', () => {

    test('FindText', () => {
        render(<MemoryRouter>
            <Home />
        </MemoryRouter>
        );
        expect(screen.getByText(/Welcome to Memory game/i)).toBeInTheDocument()
        expect(screen.getByText(/Click to me!!!/i)).toBeInTheDocument()
        expect(screen.getByText(/leaderboard/i)).toBeInTheDocument()
        expect(screen.getByText(/5x4/i)).toBeInTheDocument()
        expect(screen.getByText(/4x4/i)).toBeInTheDocument()
        expect(screen.getByText(/4x3/i)).toBeInTheDocument()
        expect(screen.getByText(/Play/i)).toBeInTheDocument()
        expect(screen.queryByText(/Ведите больше 2 букв/i)).toBeNull()
    })

    test('Input Event', async () => {
        render(<MemoryRouter>
            <Home />
            <Game />
        </MemoryRouter>
        );
        const input = screen.getByPlaceholderText(/enter your name/i)
        const btn = screen.getByTestId('btn-submit')
        expect(screen.queryByText(/Ведите больше 2 букв/i)).toBeNull()
        userEvent.type(input, {
            target: { value: "Sa" }
        })
        fireEvent.click(btn)
        expect(screen.getByText(/Ведите больше 2 букв/i)).toBeInTheDocument()
        // fireEvent.input(input, "Sardor")
        // userEvent.click(btn)
        // expect(window.localStorage.getItem).;
        // expect(screen.getByText(/Sardor/i)).toBeInTheDocument()
        // expect( await screen.findByText(/Sardor/i)).toBeInTheDocument()
        // screen.debug()
    })
    test("Open Rules", () => {
        render(<MemoryRouter>
            <Home />
        </MemoryRouter>
        );
        expect(screen.queryByText(/1 step/i)).toBeNull()
        expect(screen.queryByText(/2 step/i)).toBeNull()
        expect(screen.queryByText(/3 step/i)).toBeNull()
        fireEvent.click(screen.getByTestId('rules-test'))
        expect(screen.getByText(/1 step/i)).toBeInTheDocument()
        expect(screen.getByText(/2 step/i)).toBeInTheDocument()
        expect(screen.getByText(/3 step/i)).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('close-rules'))
        expect(screen.queryByText(/1 step/i)).toBeNull()
        expect(screen.queryByText(/2 step/i)).toBeNull()
        expect(screen.queryByText(/3 step/i)).toBeNull()
    })
})