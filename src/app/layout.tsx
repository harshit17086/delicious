import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

export const metadata: Metadata = {
  title: "Simple Recipe Finder",
  description: "Discover delicious recipes from around the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getInitialTheme() {
                  const persistedTheme = localStorage.getItem('recipe-finder-theme');
                  if (persistedTheme) {
                    return persistedTheme;
                  }
                  const mql = window.matchMedia('(prefers-color-scheme: dark)');
                  return mql.matches ? 'dark' : 'light';
                }
                
                const theme = getInitialTheme();
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
