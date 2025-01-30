import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { postUser } from "@/actions/user";

const AuthCallback = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    console.error("No session found");
    redirect("/sign-in");
  }

  try {
    await postUser(session.user.id);
  } catch (error) {
    console.error("An error occurred while creating user", error);
  }

  redirect("/");
};

export default AuthCallback;
