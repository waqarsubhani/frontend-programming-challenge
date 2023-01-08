import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../components/Login/loginForm";

test("login form is initially rendered with empty fields", () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText("Email Address");
    expect(emailInput.value).toBe("");

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput.value).toBe("");
});

test("displays error message if email or password is blank", async () => {
    const { getByLabelText, getByText } = render(<LoginForm />);
  
    const emailInput = getByLabelText("Email Address");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByText("Sign In");
  
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "simple123" } });
    fireEvent.click(submitButton);
  
    expect(await screen.findByText("email is a required field")).toBeInTheDocument();
  
    fireEvent.change(emailInput, { target: { value: "user@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(submitButton);
  
    expect(await screen.findByText("password is a required field")).toBeInTheDocument();
});

test("displays error message if login fails", async () => {
    const { getByLabelText, getByText } = render(<LoginForm />);
  
    const emailInput = getByLabelText("Email Address");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByText("Sign In");
  
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "check123" } });
    fireEvent.click(submitButton);
  
    expect(await screen.findByText("Password or email is incorrect")).toBeInTheDocument();
});

test("should store the access token in the local storage upon successful login", async () => {
    const { getByLabelText, getByText } = render(<LoginForm />);
    const emailInput = getByLabelText("Email Address");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByText("Sign In");

    fireEvent.change(emailInput, { target: { value: "test@zyax.se" } });
    fireEvent.change(passwordInput, { target: { value: "!zyaxSe981" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(localStorage.getItem("jwt")).toBeTruthy();
    });
});
  
  
  
  