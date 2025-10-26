import AuthForm from '../AuthForm';

export default function AuthFormExample() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground mb-4">Форма входа:</p>
        <AuthForm mode="login" />
      </div>
    </div>
  );
}
