import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { sliderActions } from '../_actions/slider.action';

function SliderList() {
    const sliders = useSelector(state => state.sliders);
    const slider = useSelector(state => state.authentication.slider);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(sliderActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(sliderActions.delete(id));
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            {/* <h1>Hi {slider.title}!</h1> */}
            <p>You're logged in with React Hooks!!</p>
            <h3>All registered sliders:</h3>
            {sliders.loading && <em>Loading sliders...</em>}
            {sliders.error && <span className="text-danger">ERROR: {sliders.error}</span>}
            {sliders.items &&
                <ul>
                    {sliders.items.data.map((slider, index) =>
                        <li key={slider.id}>
                            {slider.title}
                            {
                                slider.deleting ? <em> - Deleting...</em>
                                : slider.deleteError ? <span className="text-danger"> - ERROR: {slider.deleteError}</span>
                                : <span> - <a onClick={() => handleDeleteUser(slider.id)} className="text-primary">Delete</a></span>
                            }
                        </li>
                    )}
                </ul>
            }
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { SliderList };