import Footer from "./fruits/footer";
import Navbar from "./fruits/navbar";
import Beranda from "./fruits/pages/beranda";
import Kontak from "./fruits/pages/kontak";
import Produk from "./fruits/pages/produk";
import Promo from "./fruits/pages/promo";


export default function Home() {
  return (
   <>
   <Navbar />
    <Beranda />
    <Produk />
    <Promo />
    <Kontak />
   <Footer />
   </>
  );
}
