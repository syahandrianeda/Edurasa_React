import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { ReduxProvider } from "./context-reduct/redux-provider";
import { Toaster } from "sonner";

import OnlineStatus from "./components/system/online-status";


export const links: Route.LinksFunction = () => [
   {
    rel: "manifest",
    href: "/manifest.webmanifest",
  },
    {
    rel: "icon",
    href: "/favicon.ico",
  },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: Route.MetaFunction = ({matches})=>{
  
  return [
    {
      title: 'Edurasa ' 
    }
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans antialiased scrol-h-custom">
        {children}
        <ScrollRestoration />
        <Scripts/>
        
      </body>
    </html>
  );
}

export default function App() {
 
  return (
    <>
      <ReduxProvider>
          <OnlineStatus/>
          <Outlet />
          <Toaster/>
      </ReduxProvider>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }
  let navigate = useNavigate();
  return (
    <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0" role="main">
      <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center pt-8 sm:justify-start sm:pt-0">
          <h1 className="px-4 text-lg dark:text-gray-300 text-gray-700 border-r border-gray-400 tracking-wider">{message}</h1>
          <div className="ml-4 text-lg dark:text-gray-300 text-gray-700 uppercase tracking-wider">
            {details}
            {stack && (
              <pre className="w-full p-4 overflow-x-auto">
                <code>{stack}</code>
              </pre>
            )}
            </div>
        </div>
            <button onClick={() => navigate(-1)}>
              Kembali
            </button>
      </div>
    </div>
  );
}

export function HydrateFallback() {
  return (<div className="bg-sky-200/10 h-screen w-full flex justify-center items-center">
      <h1>Mohon tunggu sebentar</h1>
      
  </div>
      );
}


// This will set light / dark mode on load...
// initializeTheme();