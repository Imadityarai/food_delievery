import './Home.css'
import Header from '../../components/header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Footer from '../../components/footer/Footer'
import CravingPicker from '../../components/CravingPicker/CravingPicker'
import { useState } from 'react'

const Home=({searchQuery, setSearchQuery})=> {
  const [category,setcategory]=useState("All");
  const [activeCraving,setActiveCraving]=useState("");
  const [cravingCategories,setCravingCategories]=useState(null);
  const [surpriseFoodId,setSurpriseFoodId]=useState("");
  const chooseCategory=(nextCategory)=>{
    setcategory(nextCategory);
    setActiveCraving("");
    setCravingCategories(null);
    setSurpriseFoodId("");
  };

  const chooseCraving=(craving)=>{
    setcategory("All");
    setActiveCraving(craving.id);
    setCravingCategories(craving.categories);
    setSurpriseFoodId("");
  };

  const surpriseMe=(foods)=>{
    if (!foods.length) return;
    const candidates=foods.length > 1
      ? foods.filter((food)=>food._id !== surpriseFoodId)
      : foods;
    const pick=candidates[Math.floor(Math.random()*candidates.length)];
    setcategory("All");
    setActiveCraving("");
    setCravingCategories(null);
    setSearchQuery("");
    setSurpriseFoodId(pick._id);
  };

  return (
    <>
    <div>
      <Header/>
      <CravingPicker
        activeCraving={activeCraving}
        onPickCraving={chooseCraving}
        onSurpriseMe={surpriseMe}
      />
      <ExploreMenu category={category} setcategory={chooseCategory}/>
      <FoodDisplay
        category={category}
        searchQuery={searchQuery}
        filterCategories={cravingCategories}
        highlightedFoodId={surpriseFoodId}
      />
    </div>
    <Footer/>
  </>)
}

export default Home
