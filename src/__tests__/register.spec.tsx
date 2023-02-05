import { render, userEvent, waitForLoadingToFinish, screen, waitFor } from '../test/test-utils'
import * as UsersDB from '../test/data/users'
import Signup from '../pages/signup'
import { mockArticle } from '../test/data/mockData'

// mock out articleContext
jest.mock('../context/articleContext', () => ({
	__esModule: true,
	useArticleContext: jest.fn(() => mockArticle),
	ArticleProvider: ({ children }: { children: React.ReactNode }) => children
}))

afterEach(async () => await UsersDB.resetDatabase())

describe('Signup component tests', () => {
	test('register form displays error message if fields are empty', async () => {
		await render(<Signup />)

		const submitButton = screen.getByRole('button', { name: /sign up/i })

		userEvent.click(submitButton)

		expect(screen.getByText(/email is required/i)).toBeInTheDocument()
		expect(screen.getByText(/password is required/i)).toBeInTheDocument()
		expect(screen.getByText(/username is required/i)).toBeInTheDocument()
	})

	test('register component should create user and return to initial component state', async () => {
		await render(<Signup />)

		const emailInput = screen.getByRole('textbox', { name: /email/i })
		const passwordInput = screen.getByRole('textbox', { name: /password/i })
		const usernameInput = screen.getByRole('textbox', { name: /username/i })

		userEvent.type(emailInput, 'test@gmail.com')
		userEvent.type(passwordInput, '123')
		userEvent.type(usernameInput, 'test')

		const submitButton = screen.getByRole('button', { name: /sign up/i })

		userEvent.click(submitButton)

		await waitFor(() => expect(screen.queryByText(/email is required/i)).toBeNull())
		await waitFor(() => expect(screen.queryByText(/password is required/i)).toBeNull())
		await waitFor(() => expect(screen.queryByText(/username is required/i)).toBeNull())

		await waitForLoadingToFinish()

		expect(await screen.findByRole('heading', { name: /sign up/i })).toBeInTheDocument()
	})

	test('registration with already registered user should render error message', async () => {
		await render(<Signup />)

		const emailInput = screen.getByRole('textbox', { name: /email/i })
		const passwordInput = screen.getByRole('textbox', { name: /password/i })
		const usernameInput = screen.getByRole('textbox', { name: /username/i })

		await UsersDB.createUser({
			username: 'testUser',
			email: 'TestUser@gmail.com',
			password: '1234'
		})

		userEvent.type(emailInput, 'TestUser@gmail.com')
		userEvent.type(passwordInput, '1234')
		userEvent.type(usernameInput, 'TestUser')

		const submitButton = screen.getByRole('button', { name: /sign up/i })

		userEvent.click(submitButton)

		await waitFor(() => expect(screen.queryByText(/email is required/i)).toBeNull())
		await waitFor(() => expect(screen.queryByText(/password is required/i)).toBeNull())
		await waitFor(() => expect(screen.queryByText(/username is required/i)).toBeNull())

		await waitForLoadingToFinish()

		expect(await screen.findByText(/user testuser already exists/i)).toBeInTheDocument()
	})
})
