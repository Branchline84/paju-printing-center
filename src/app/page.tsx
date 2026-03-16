import Header from "@/components/Header";
import Banner from "@/components/Banner";
import QuickService from "@/components/QuickService";
import Notice from "@/components/Notice";
import SupportProjects from "@/components/SupportProjects";
import Greetings from "@/components/Greetings";
import BackgroundDecor from "@/components/BackgroundDecor";

export default function Home() {
  return (
    <>
      <BackgroundDecor />
      <Header />
      <main>
        <Banner />
        <Notice />
        <QuickService />
        <SupportProjects />
        <Greetings />
      </main>
      <footer style={{ padding: '60px 0', background: '#222', color: '#888', textAlign: 'center', fontSize: '14px', borderTop: '1px solid #333' }}>
        <div className="container">
          <p>© 2024 Paju Printing Micro-Enterprise Specialization Support Center. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}
