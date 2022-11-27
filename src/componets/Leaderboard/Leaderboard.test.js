import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import LeaderBoard from "./LeaderBoard"
import App from '../../App'
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import Home from "../Home/Home";



describe('LeaderBoard', () => {

    test('FindText', () => {
        render(<MemoryRouter>
            <LeaderBoard />
        </MemoryRouter>
        );
        expect(screen.getByText(/Your results/i)).toBeInTheDocument()
        expect(screen.getByText(/Leaderboards/i)).toBeInTheDocument()
        expect(screen.getByText(/Home/i)).toBeInTheDocument()
        expect(screen.getByText(/No results/i)).toBeInTheDocument()
    })
    test('Link Router', () => {
        render(<MemoryRouter>
            <LeaderBoard />
            <Home />
        </MemoryRouter>
        );
        userEvent.click(screen.getByTestId('main-link'))
        expect(screen.getByText(/Welcome to Memory game/i)).toBeInTheDocument()
    })

})