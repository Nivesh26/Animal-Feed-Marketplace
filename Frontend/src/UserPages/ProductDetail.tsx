import Topbar from "../UserComponents/Topbar";
import Header from "../UserComponents/Header";
import ProductDetailContent from "../UserComponents/ProductDetailContent";
import ProductReview from "../UserComponents/ProductReview";
import Footer from "../UserComponents/Footer";
import Copyright from "../UserComponents/Copyright";

const ProductDetail = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Topbar />
      <Header />
      <main className="flex-1">
        <ProductDetailContent />
        <ProductReview />
      </main>
      <Footer />
      <Copyright />
    </div>
  );
};

export default ProductDetail;
