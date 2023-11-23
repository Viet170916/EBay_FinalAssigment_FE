import { ToastContainer } from 'react-toastify'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import UserProvider from './context/user'
import CartProvider from './context/cart'
export const metadata = {
  title: 'eBay Clone',
  description: 'eBay Clone',
}
export const revalidate = 60
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <UserProvider> {/* useContext */}
        <CartProvider>
          {children}
        </CartProvider>
        </UserProvider>
      </body>
    </html>
  )
}
