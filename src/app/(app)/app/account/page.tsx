import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/H1";
import SignOutBtn from "@/components/SignOutBtn";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();

  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>
      <ContentBlock className="h-[500px] flex justify-center items-center flex-col gap-3">
        <p>Logged in as {session?.user?.email}</p>
        <SignOutBtn />
      </ContentBlock>
    </main>
  )
}
