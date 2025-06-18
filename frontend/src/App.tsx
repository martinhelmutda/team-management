import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotificationProvider, useNotification } from "./context/NotificationContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import './App.css'
import List from './pages/List';
import Add from './pages/Add';
import Edit from './pages/Edit';

function NotificationBar() {
  const { notification, setNotification } = useNotification();
  if (!notification) return null;
  return (
    <Snackbar
      open={true}
      autoHideDuration={notification.type === "success" ? 4000 : 6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={() => setNotification(null)}
    >
      <Alert severity={notification.type} onClose={() => setNotification(null)}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
}

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <NotificationBar />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
}
export default App;
