export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="font-body antialiased">{children}</div>;
}

export const metadata = {
  title: "MUFAT Yönetim Paneli",
  robots: { index: false, follow: false },
};
