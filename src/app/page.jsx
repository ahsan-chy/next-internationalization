"use client";

import Header from "@/components/Header";
import initTranslations from "../../i18n";

export default function Page({ params }) {
  // const { t } = await initTranslations(locale, ["home"]);
  return (
    <>
      <Header />
      {/* {console.log('t', t)} */}
      <div className="w-100 h-100 flex justify-center items-center flex-col mt-72 gap-10">
        <h2 className="text-4xl text-amber-500">Home Page</h2>
        {/* <p>{t("welcome")}</p> */}
      </div>
    </>
  );
}
