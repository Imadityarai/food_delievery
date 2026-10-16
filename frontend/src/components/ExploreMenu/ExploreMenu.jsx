import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'

const ExploreMenu = ({ category, setcategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p>Choose from a diverse menu featuring a wide range of delicious dishes.</p>
      <div className="explore-menu-list">
        <button
          type="button"
          className={`explore-menu-all ${category === "All" ? "active" : ""}`}
          onClick={() => setcategory("All")}
          aria-pressed={category === "All"}
        >
          All
        </button>
        {menu_list.map((item) => (
          <button
            type="button"
            key={item.menu_name}
            onClick={() => setcategory(item.menu_name)}
            className="explore-menu-list-item"
            aria-pressed={item.menu_name === category}
          >
            <img
              src={item.menu_image}
              alt={`${item.menu_name} category`}
              loading="lazy"
              decoding="async"
              width={item.width}
              height={item.height}
              className={item.menu_name === category ? "active" : ""}
            />
            <span>{item.menu_name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ExploreMenu
