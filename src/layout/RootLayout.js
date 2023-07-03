 
import { Outlet } from "react-router-dom";
function RootLayout() {
  return (
    <>
      <main className="  bg-neutral-900      ">
        <div className="App pt-10 container max-w-6xl   min-h-screen mx-auto px-2 sm:px-20  ">
         <div>
            <nav>
              <ul className="flex justify-center">
                <li className="mr-6">
                  <a className="text-blue-500 hover:text-blue-800" href="/">
                    Home
                  </a>
                </li>
                <li className="mr-6">
                  <a className="text-blue-500 hover:text-blue-800" href="/polls">
                    Polls
                  </a>
                </li>
                <li className="mr-6">
                  <a className="text-blue-500 hover:text-blue-800" href="/create-poll">
                    Create
                  </a>
                </li>
              </ul>
            </nav>
            

         </div>
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default RootLayout;