import React, { useRef, useEffect, useState, forceUpdate } from 'react';

function Slider() {
    // set up a reference for the slider container
    const sliderRef = useRef(null);
    // get the width of a single slide item
    const itemWidth = useRef(0);

    // find the width of the slide item and re-render when done
    useEffect(() => {
        itemWidth.current = sliderRef.current.querySelector('.item2').offsetWidth;
        // re-render the component with the new `itemWidth`
        forceUpdate();
    }, []);

    // initialize the position of the slider item
    const [position, setPosition] = useState(0);

    // calculate the maximum position of the slider item
    const maxPosition = sliderRef.current
        ? sliderRef.current.scrollWidth - sliderRef.current.offsetWidth
        : 0;

    // handle advancing to the next slide item
    const handleNext = () => {
        setPosition(prevPosition => {
            const newPosition = prevPosition + itemWidth.current;
            return newPosition > maxPosition ? 0 : newPosition;
        });
    };

    // handle going back to the previous slide item
    const handlePrev = () => {
        setPosition(prevPosition => {
            const newPosition = prevPosition - itemWidth.current;
            return newPosition < 0 ? maxPosition : newPosition;
        });
    };

    return (
        <div>
            <button onClick={handlePrev}>Prev</button>
            <div
                id="formlist2"
                ref={sliderRef}
                style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    transform: `translateX(-${position}px)`,
                    transition: 'transform .2s ease-out'
                }}
                onTransitionEnd={event => {
                    if (position === maxPosition) {
                        // reset position to 0 when reaching the end of the slider
                        setPosition(0);
                    }
                }}
            >
                {[1, 2, 3, 4].map(i => (
                    <div className="item2" key={i}>
                        Item {i}
                    </div>
                ))}
            </div>
            <button onClick={handleNext}>Next</button>
        </div>
    );
}
export default Slider