"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const Faq = () => {
  const { t } = useTranslation();
  return (
    <div className="w-100 h-100 flex justify-center items-center flex-col mt-72 gap-10">
      <h2 className="text-4xl text-pink-700">Faq</h2>
      <p>{t("welcome")}</p>
    </div>
  );
};

export default Faq;
