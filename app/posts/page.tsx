import SignIn from "@/components/sign-in";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";

export default async function page() {
  const session = await auth();

  return (
    <div>
      {session?.user ? (
        <div>
          {JSON.stringify(session?.user)}
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
