import { useState } from 'react';
import { Switch, Route } from 'wouter';
import { ContentProvider } from './context/ContentContext';
import Portfolio from './pages/Portfolio';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import WorkPage from './pages/WorkPage';

function AdminRoute() {
  const [authed, setAuthed] = useState(false);

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;
  return <AdminDashboard onLogout={() => setAuthed(false)} />;
}

export default function App() {
  return (
    <ContentProvider>
      <Switch>
        <Route path="/admin" component={AdminRoute} />
        <Route path="/works/:id" component={WorkPage} />
        <Route path="/" component={Portfolio} />
        <Route component={Portfolio} />
      </Switch>
    </ContentProvider>
  );
}
