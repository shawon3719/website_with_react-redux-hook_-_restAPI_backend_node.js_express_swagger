
import React, { useState, useEffect, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from "./photos";
import { CCard, CCardHeader, CCardBody } from "@coreui/react";
import './Gallery.css'
import { useDispatch, useSelector } from 'react-redux';
import { galleryActions } from 'src/_actions';

  const GalleryPage = props => {

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const galleries = useSelector(state => state.galleries);
    const dispatch = useDispatch();

    const photos = [
      // {
      //   galleries.map
      // }
      {
        src: "assets/images/banner/g1.jpg",
        width: 4,
        height: 3
      }
    ];
  
    const openLightbox = useCallback((event, { photo, index }) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    }, []);
  
    const closeLightbox = () => {
      setCurrentImage(0);
      setViewerIsOpen(false);
    };

    useEffect(() => {
      dispatch(galleryActions.getAll());  
   }, []);
  
    // render
    return (
      <div className="page-content">
      <CCard>
        <CCardHeader><h3>Gallery Content</h3></CCardHeader>
        <CCardBody>
        <Gallery photos={photos} onClick={openLightbox} />
        </CCardBody>
      </CCard>
      <div style={{marginTop:"100px"}}>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    
      </div>
      </div>
    )
  }
  
  export default GalleryPage