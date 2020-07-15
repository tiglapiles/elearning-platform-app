import React from "react";
import Helmet from "react-helmet";
import { ThemeProvider } from "@material-ui/core/styles";

import config from "../../../../data/SiteConfig";
import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import ScrollTop from "../../../layout/ScrollTop";
import theme from "../../../layout/theme";
import '../../../assets/css/container.css';
import '../../../assets/css/tootls.css';

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Helmet>
            <meta name="description" content={config.siteDescription} />
            
            <html lang="en" />
          </Helmet>
         <section className=' bg-f9' style={{minHeight:'100vh'}}>
         
            <header  style={{height:64}}>
          
              <NavBar  />
            </header>
            <main className='profile-main ma-main'  >
         
              {children}
              
              
              <ScrollTop />
            </main>
            
            <Footer config={config} />
             
            
         
         </section>
    </ThemeProvider>
    );
  }
}
