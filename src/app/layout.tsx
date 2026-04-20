import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "파주인쇄소공인특화지원센터",
  description: "파주 인쇄 소공인의 경쟁력을 높이는 동반자, 파주인쇄소공인특화지원센터입니다. 맞춤형 지원사업, 교육, 마케팅 정보를 제공합니다.",
  keywords: ["파주인쇄", "소공인지원", "인쇄소공인", "파주지원센터", "인쇄센터"],
  authors: [{ name: "파주인쇄소공인특화지원센터" }],
  openGraph: {
    title: "파주인쇄소공인특화지원센터",
    description: "파주 인쇄 소공인을 위한 맞춤형 지원 및 정보 제공",
    url: "https://pajuprint.co.kr",
    siteName: "파주인쇄소공인특화지원센터",
    locale: "ko_KR",
    type: "website",
  },
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body style={{ margin: 0 }}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
