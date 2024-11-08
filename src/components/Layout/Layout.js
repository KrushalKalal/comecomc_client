import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
const Layout = ({ children, title, description, keyword, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keyword" content={keyword} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>

      <Footer />
    </div>
  );
};

//default props for all the meta tags set default for all the page otherwise pass inside page using props name
Layout.defaultProps = {
  title: "ComEcom - Shop Now",
  description: "Mern Stack Ecom App",
  keywords: "mern,react,node,mongodb,js",
  author: "krushal",
};

export default Layout;
