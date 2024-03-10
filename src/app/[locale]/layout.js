import Header from "@/components/Header";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "../../../i18n";
import i18nConfig from "../../../i18nConfig";

//+ const languages = ["en", "ur"];
export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params: { locale } }) {
  const { t, resources } = initTranslations(locale, ["home"]);

  return (
    <html>
      <body>
        <TranslationsProvider resources={resources} locale={locale} namespaces={["home"]}>
          <Header />
          {children}
        </TranslationsProvider>
      </body>
    </html>
  );
}
