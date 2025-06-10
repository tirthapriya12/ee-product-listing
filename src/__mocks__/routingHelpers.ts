export const mockReactRouterDom = (options?: unknown) => {
  const mockOptions = options ?? { useNavigate: () => jest.fn() };
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"), // Import and retain all actual exports
    ...mockOptions,
  }));
};
