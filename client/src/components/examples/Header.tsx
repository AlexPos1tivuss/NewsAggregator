import Header from '../Header';

export default function HeaderExample() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Не авторизован:</p>
        <Header />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Авторизован (пользователь):</p>
        <Header isAuthenticated username="Алексей" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Авторизован (администратор):</p>
        <Header isAuthenticated isAdmin username="Админ" />
      </div>
    </div>
  );
}
