export function load({ setHeaders }) {
  setHeaders({
    "Content-Security-Policy":
      "script-src https://accounts.google.com/gsi/client; style-src https://accounts.google.com/gsi/style; connect-src https://accounts.google.com/gsi/; frame-src https://accounts.google.com/gsi/;",
  });
}
