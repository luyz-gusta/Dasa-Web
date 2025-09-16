import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 w-full min-h-screen">
      {/* <div className="w-full max-w-sm">
        <form className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <section className="flex flex-col gap-6">
                <div className="gap-3 grid">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="gap-3 grid">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="inline-block ml-auto text-sm hover:underline underline-offset-4"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
              </section>
            </CardContent>
          </Card>
        </form>
      </div> */}

      <section className="hidden md:block bg-primary-60 w-full h-full"></section>
      <section className="flex justify-center items-center w-full h-full">
        <form className="flex flex-col w-full max-w-md">
          <h1>Sistema gerenciador de estoque</h1>
          <div className="grid">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="gap-3 grid">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="inline-block ml-auto text-sm hover:underline underline-offset-4"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required />
          </div>
        </form>
      </section>
    </main>
  );
}
