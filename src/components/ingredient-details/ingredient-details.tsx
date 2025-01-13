import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { ingredientsSelector, getIngredientsThunk } from '@slices';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const params = useParams();
  const dispatch = useDispatch();
  const ingredients = useSelector(ingredientsSelector);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === params.id
  );

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, []);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
