export type ThemeType = {
  background: string;
  card: string;
  text: string;
  subText: string;
  primary: string;
  border: string;
  inputBackground: string;
  buttonText: string;
};

export const LightTheme: ThemeType = {
  background: "#f5f7fa",
  card: "#ffffff",
  text: "#1e1e1e",
  subText: "#555555",
  primary: "#2563eb",
  border: "#e5e7eb",
  inputBackground: "#ffffff",
  buttonText: "#ffffff",
};

export const DarkTheme: ThemeType = {
  background: "#121212",
  card: "#1e1e1e",
  text: "#ffffff",
  subText: "#aaaaaa",
  primary: "#3b82f6",
  border: "#2c2c2c",
  inputBackground: "#1f1f1f",
  buttonText: "#ffffff",
};
