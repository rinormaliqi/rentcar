import React from "react";
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/footer";

export const metadata = {
  title: "ZENTO Rent",
  description: "Rent a Car",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />

        {children}
        <Footer/>
      </body>
    </html>
  );
}
