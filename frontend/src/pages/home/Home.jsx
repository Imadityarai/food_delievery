import React from 'react'
import './Home.css'
import './Home.css'
import Header from '../../components/header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Footer from '../../components/footer/footer'
const Home=()=> {
  const[category,setcategory]=React.useState("All");  
  return (
    <>
    <div>
      <Header/>
      <ExploreMenu category={category} setcategory={setcategory}/>
<FoodDisplay category={category}/>
    </div>
    <Footer/>
  </>)
}

export default Home
