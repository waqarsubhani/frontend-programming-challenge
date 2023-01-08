import { render, fireEvent, waitFor } from "@testing-library/react";
import LogOutButton from "../components/Home/logOutButton";


test("should clear the access token from local storage when clicked", async () => {
    localStorage.setItem("jwt", "abc123");
    const { getByText } = render(<LogOutButton redirect={jest.fn()} />);
    const logoutButton = getByText("Log Out");

    // Act
    fireEvent.click(logoutButton);

    // Assert
    await waitFor(() => {
      expect(localStorage.getItem("jwt")).toBeNull();
    });
});
  