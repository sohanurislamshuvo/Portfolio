import Header from '@/components/Header';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';

const SkillsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <Skills />
      </main>
      <Footer />
    </div>
  );
};

export default SkillsPage;
