import "./globals.css";
import Header from "./Components/Header";
import Visibilityprovider from "./Components/Visibilityprovider";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Visibilityprovider>
        <Header />
        {children}
        </Visibilityprovider>
          
      
      </body>
    </html>
  );
}
