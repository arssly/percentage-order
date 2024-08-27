"use client";
import Error from "@src/components/ErrorComponent";

export default function ErrorPage() {
  const errorMessage = "مشکلی در دریافت داده پیش امده است لطفا بعدا دوباره تلاش کنید";
  return <Error message={errorMessage} />;
}
