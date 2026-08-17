import { Container } from "react-bootstrap"
import Header from "@components/common/header/Header"
import styles from "./styles.module.css"
import Footer from "@components/common/footer/Footer"
import { Outlet } from "react-router-dom"


const  {container, wrapper} = styles

const MainLayout = () => {
  return (
    <Container className={container} fluid>
       <Header/>
        <div className={wrapper}>
           <Outlet/>
        </div>
        <Footer/>
    </Container>
  )
}

export default MainLayout