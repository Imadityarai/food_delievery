import { useContext } from "react";
import { StoreContext } from "../../context/store_context";
import "./CravingPicker.css";

const cravings = [
  { id: "fresh", label: "Fresh & light", categories: ["Salad", "Pure Veg"] },
  { id: "comfort", label: "Cozy & filling", categories: ["Rolls", "Sandwich", "Pasta", "Noodles"] },
  { id: "sweet", label: "Something sweet", categories: ["Desserts", "Deserts", "Cake"] },
];

const CravingPicker = ({ activeCraving, onPickCraving, onSurpriseMe }) => {
  const { food_list } = useContext(StoreContext);

  const pickCraving = (craving) => {
    const available = food_list.some((food) => craving.categories.includes(food.category));
    if (available) onPickCraving(craving);
  };

  return (
    <section className="craving-picker" aria-labelledby="craving-picker-title">
      <div className="craving-picker-copy">
        <p className="craving-picker-eyebrow">A little inspiration</p>
        <h2 id="craving-picker-title">What sounds good right now?</h2>
        <p>Pick a mood and we&apos;ll find something delicious for it.</p>
      </div>
      <div className="craving-picker-actions">
        {cravings.map((craving) => {
          const available = food_list.some((food) => craving.categories.includes(food.category));
          return (
            <button
              className={`craving-chip${activeCraving === craving.id ? " active" : ""}`}
              type="button"
              key={craving.id}
              disabled={!available}
              aria-pressed={activeCraving === craving.id}
              onClick={() => pickCraving(craving)}
            >
              {craving.label}
            </button>
          );
        })}
        <button
          className="craving-surprise"
          type="button"
          disabled={food_list.length === 0}
          onClick={() => onSurpriseMe(food_list)}
        >
          Surprise me
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </section>
  );
};

export default CravingPicker;
