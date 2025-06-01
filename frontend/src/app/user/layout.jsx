import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import UserSidebar from './UserSidebar';

export default function UserLayout({ children }) {
  return (
    <>
      <Navbar />      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          <aside className="w-64 fixed left-0 top-0 mt-16">
            <UserSidebar />
          </aside>
          <main className="flex-1 ml-64">
            <div className="p-8 mt-16">
              {children}
            </div>
          </main>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}
