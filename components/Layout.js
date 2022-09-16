import Header from './Header';
import Footer from './Footer';

function Layout({children}) {
  return (
    <>
      <div className="w-sreen h-screen">
        <Header></Header>
        <main className="mt-20 p-5 w-screen .main">{children}</main>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Layout;
