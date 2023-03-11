import React from 'react';
import {Link} from 'react-router-dom';
import Icon404 from '../../components/icon/icon404';
import styles from './page-404.module.scss';
function Page404() {
  return (
    <div className={styles.wrapper}>
      <h1>404 Not Found</h1>
      <div className={styles.icon404}>
        <Link to="/">Вернёмся на главную страницу!</Link>
        <Icon404 />
      </div>
    </div>
  );
}

export default Page404;
