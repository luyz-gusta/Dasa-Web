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
      email: "leticia@dasa.com",
      password: "123456",
    };
    if (email === mockUser.email && password === mockUser.password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      setError("");
      toast.success("Login realizado com sucesso!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 400);
    } else {
      setError("Email ou senha inválidos.");
      setLoading(false);
    }
  }

  return (
    <main className="flex justify-center items-center bg-background px-4 w-full min-h-screen">
      <Toaster />
      <div className={cn("flex flex-col gap-6 w-full max-w-3xl")}> 
        <Card className="shadow-none md:shadow p-0 md:border border-0 rounded-none md:rounded-xl overflow-hidden">
          <CardContent className="grid md:grid-cols-2 p-0">
            <form className="p-6 md:p-8 w-full" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="font-bold text-2xl">Seja Bem Vindo</h1>
                  <p className="text-muted-foreground text-balance">
                    Faça login na sua conta do StockExpress
                  </p>
                </div>
                <div className="gap-3 grid">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="gap-3 grid">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm hover:underline underline-offset-2"
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
                      <svg className="mr-2 w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      Entrando...
                    </span>
                  ) : (
                    "Login"
                  )}
                </Button>
                <div className="after:top-1/2 after:z-0 after:absolute relative after:inset-0 after:flex after:items-center after:border-t after:border-border text-sm text-center">
                  <span className="z-10 relative bg-card px-2 text-muted-foreground">
                    Ou continue com
                  </span>
                </div>
                <div className="gap-4 grid grid-cols-2">
                  <Button variant="outline" type="button" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Login com Apple</span>
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Login com Google</span>
                  </Button>
                
                </div>
                <div className="text-sm text-center">
                  Não possui conta?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Cadastre-se
                  </a>
                </div>
              </div>
            </form>
            <div className="hidden md:block relative bg-muted">
              <img
                src="/placeholder.svg"
                alt="Image"
                className="absolute inset-0 dark:brightness-[0.2] dark:grayscale w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-xs text-center *:[a]:underline *:[a]:underline-offset-4 text-balance">
          Ao clicar em continuar, você concorda com nossos <a href="#">Termos de Serviço</a>{" "}
          e <a href="#">Política de Privacidade</a>.
        </div>
      </div>
    </main>
  );
}
