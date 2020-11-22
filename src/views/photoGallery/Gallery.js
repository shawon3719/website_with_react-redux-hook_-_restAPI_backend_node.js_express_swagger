
import React, { useState, useEffect, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
// import { photos } from "./photos";
import { CCard, CCardHeader, CCardBody } from "@coreui/react";
import './Gallery.css'
import { useDispatch, useSelector } from 'react-redux';
import { galleryActions } from 'src/_actions';

  const GalleryPage = props => {

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const galleries = useSelector(state => state.galleries);
    const dispatch = useDispatch();


    const openLightbox = useCallback((event, index) => {
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
        <CCardHeader><h3>Gallery</h3></CCardHeader>
        {
          galleries.items?
          <CCardBody>
       
        <div className="row">

        {galleries.items && galleries.items.map(( gallery, index ) => (
              gallery.active_status == 1? 

          <div className="col-md-3 mt-4" >
          <a key={index} type="button" onClick={openLightbox} >
            
              <img src={gallery.image} alt={gallery.title}/>
              
            </a>
          </div>
          : ''
            
        ) )}
        
          
        </div>
        </CCardBody>
        :
          <div className="pt-3 text-center" style={ {height:"500px"}}>
            <div className=" spinner-border spinner-border-lg mr-1"></div>
          </div>
        }
      </CCard>
      <div style={{marginTop:"100px"}}>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={galleries.items.map(( gallery ) => ({ src: gallery.active_status==1? gallery.image : '' }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    
      </div>
      </div>
    )
  }
  
  export default GalleryPage