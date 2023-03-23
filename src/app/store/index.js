import { QueryClientProvider, QueryClient } from "react-query";

import { AppModeProvider } from "./AppModeProvider";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";

// re export all the providers
export * from "./AppModeProvider";
export * from "./ThemeProvider";
export * from "./AuthProvider";

const queryClient = new QueryClient();

export const AllProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppModeProvider>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </AppModeProvider>
    </QueryClientProvider>
  );
};
