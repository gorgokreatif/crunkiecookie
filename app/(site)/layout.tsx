import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { LangProvider } from '../../components/LangContext';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </LangProvider>
  );
}
