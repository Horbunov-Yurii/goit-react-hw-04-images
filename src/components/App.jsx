import { useEffect, useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from '../service/galleryService';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { AppContainer } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [hits, setHits] = useState([]);
  const [query, setQueru] = useState('');
  const [page, setPage] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }
    getImages(query, page)
      .then(({ hits, totalHits }) => {
        if (!totalHits) {
          setIsEmpty(true);
          return;
        }
        setHits(prevState => [...prevState, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / 12));
      })
      .catch(isError => {
        setIsError(isError.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const changeQuery = query => {
    setQueru(query);
    setHits([]);
    setPage(1);
    setIsEmpty(false);
    setIsError('');
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleOpenModal = ({ src, alt }) => {
    setSrc(src);
    setAlt(alt);
  };

  return (
    <AppContainer>
      <Searchbar onChangeQuery={changeQuery} />
      <ImageGallery hits={hits} openModal={handleOpenModal} />
      {showBtn && <Button handleClick={loadMore} text="Load more" />}
      {isEmpty && <p>Enter a valid request</p>}
      {isError && <p>{isError}</p>}
      {src && <Modal closeModal={handleOpenModal} src={src} alt={alt} />}
      {isLoading && <Loader />}
    </AppContainer>
  );
};
