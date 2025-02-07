import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFavoritesAction } from '../../store/favorite-data/api-actions';
import { getAuthCheckedStatus } from '../../store/user-process/selectors';
import cn from 'classnames';

type BookmarkButtonProps = {
  offerId: number;
  isFavorite: boolean;
  isBigSize: boolean;
}

export default function BookmarkButton({offerId, isFavorite, isBigSize}: BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getAuthCheckedStatus);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isAuth) {
      dispatch(setFavoritesAction({
        id: offerId,
        status: Number(!isFavorite)
      }));
    } else {
      navigate(AppRoute.Login);
    }
  };
  return (
    <button
      className={cn({
        'property__bookmark-button': isBigSize,
        'property__bookmark-button--active': isBigSize && isFavorite,
        'place-card__bookmark-button': !isBigSize,
        'place-card__bookmark-button--active': !isBigSize && isFavorite,
      }, 'button')}
      type="button"
      onClick={handleButtonClick}
      data-testid="to-bookmarks"
    >
      <svg
        className={isBigSize ? 'property__bookmark-icon' : 'place-card__bookmark-icon'}
        width={isBigSize ? '31' : '18'}
        height={isBigSize ? '33' : '19'}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}

