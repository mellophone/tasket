"use client";
import { useRouter } from "next/navigation";

const HomeRedirect = () => {
  const router = useRouter();
  router.push("/home");

  return <main></main>;
};

export default HomeRedirect;
