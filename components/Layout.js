import Header from './Header';
import Footer from './Footer';

function Layout({children}) {
  return (
    <>
      <div className="w-sreen h-screen">
        <Header></Header>
        <main className="p-5 w-screen h-4/5">{children}</main>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Layout;
