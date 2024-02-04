import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from './App'
import { NotifyContextProvider } from './context/NotifyContext';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotifyContextProvider>
      <App />
    </NotifyContextProvider>
  </QueryClientProvider>
)