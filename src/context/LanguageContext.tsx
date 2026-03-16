"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ko" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ko: {
    home: "HOME",
    intro: "센터소개",
    notice: "알립니다",
    projects: "지원사업소개",
    contact: "문의하기",
    signup: "센터회원가입",
    searchPlaceholder: "Search",
    greetings: "센터장 인사말",
    news: "센터소식",
    officialNotice: "공지사항",
    centerName: "파주인쇄소공인특화지원센터",
    centerSubtitle: "Paju Printing Micro-enterprise Specialized Support Center",
  },
  en: {
    home: "HOME",
    intro: "About Center",
    notice: "News & Notices",
    projects: "Support Projects",
    contact: "Contact Us",
    signup: "Register",
    searchPlaceholder: "Search...",
    greetings: "Greetings",
    news: "Center News",
    officialNotice: "Notices",
    centerName: "Paju Printing Center",
    centerSubtitle: "Paju Printing Micro-enterprise Specialized Support Center",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ko");

  const t = (key: string) => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
