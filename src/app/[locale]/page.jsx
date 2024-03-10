"use client";

import initTranslations from "../../../i18n";

export default function Home({ params: { locale } }) {
  const { t } = initTranslations(locale, ["home"]);

  return (
    <>
      <div className="w-100 h-100 flex justify-center items-center flex-col mt-72 gap-10">
        <h2 className="text-4xl text-cyan-700">[Local] Home</h2>
      </div>
    </>
  );
}
