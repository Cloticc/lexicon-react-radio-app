import '../styles/LoginForm.css'

export const LoginForm = () => {
  return (
    <div className="login-form">
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" autoComplete='' placeholder="example@example.com" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" autoComplete='' placeholder="Password" />

        <button type="submit">Login</button>

        <label htmlFor="show-password">Show Password:</label>
        <input type="checkbox" id="show-password" />

        <p>Don't have an account? <a href="/register">Create an account</a></p>
      </form>
    </div>
  )
}
