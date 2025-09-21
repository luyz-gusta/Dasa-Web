"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const mockUser = {
      email: "teste@teste.com",
      password: "123456",
    };
    if (email === mockUser.email && password === mockUser.password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      setError("");
      toast.success("Login realizado com sucesso!");
      setTimeout(() => {
        router.push("/configuracoes");
      }, 1200);
    } else {
      setError("Email ou senha inválidos.");
      setLoading(false);
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen w-full bg-background px-4">
      <Toaster />
      <div className={cn("flex flex-col gap-6 w-full max-w-3xl")}>
        <Card className="overflow-hidden p-0 border-0 shadow-none rounded-none md:border md:shadow md:rounded-xl">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8 w-full" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Seja Bem Vindo</h1>
                  <p className="text-muted-foreground text-balance">
                    Faça login na sua conta do StockExpress
                  </p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Esqueceu sua senha?
                    </a>
                  </div>
                  <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} disabled={loading} />
                </div>
                {error && (
                  <div className="text-red-500 text-sm text-center">{error}</div>
                )}
                <Button type="submit" className="w-full" disabled={loading} aria-busy={loading}>
                  {loading ? (
                    <span className="inline-flex items-center">
                      <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      Entrando...
                    </span>
                  ) : (
                    "Login"
                  )}
                </Button>
            
               
                <div className="text-center text-sm">
                  Não possui conta?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Cadastre-se
                  </a>
                </div>
              </div>
            </form>
            <div className="bg-muted relative hidden md:block">
              <img
                src="/placeholder.svg"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          Ao clicar em continuar, você concorda com nossos <a href="#">Termos de Serviço</a>{" "}
          e <a href="#">Política de Privacidade</a>.
        </div>
      </div>
    </main>
  );
}
