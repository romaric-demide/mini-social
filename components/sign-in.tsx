import { auth, signIn } from "@/lib/auth";

export default async function SignIn() {
  const session = await auth();
  return (
    <div>
      {session?.user?.id ? (
        JSON.stringify(session.user)
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <button type="submit">Signin with Google</button>
        </form>
      )}
    </div>
  );
}
