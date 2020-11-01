
import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from "./photos";
import { CCard, CCardHeader, CCardBody } from "@coreui/react";
import './Gallery.css'

  const GalleryPage = props => {

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
  
    const openLightbox = useCallback((event, { photo, index }) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    }, []);
  
    const closeLightbox = () => {
      setCurrentImage(0);
      setViewerIsOpen(false);
    };
  
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