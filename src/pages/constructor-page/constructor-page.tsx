import { useSelector } from '../../services/store';
import { ingredientsSelector } from '../../services/slices/ingredientSlice';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect, useState } from 'react';

export const ConstructorPage: FC = () => {
  const [isIngredientsLoading, setisIngredientsLoading] = useState(true);
  const ingredients = useSelector(ingredientsSelector);

  useEffect(() => {
    if (ingredients) {
      setisIngredientsLoading(false);
    }
  }, [ingredients]);
  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
