import { useEffect, useState } from "react";

// Original idea for infinity scroll
// https://dev.to/elhamnajeebullah/react-create-infinite-scrolling-with-intersection-observer-api-4mm8
// Additional info: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const useInfiniteScroll = (elementRef, initial) => {
    const [page, setPage] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {                                        // Create new IntersectionObserver to observe changes in the intersection of a target element
            if (entries[0].isIntersecting) {                                                            // Check if the bottom element is intersecting with the viewport
                setPage(prevPage => prevPage + 1);                                                      // If intersecting, update the page state to trigger loading of the next page
                initial && initial();                                                                   // If have some initial function to be executed
            }
        }, { threshold: 0.5 });                                                                         // Set threshold to trigger event

        if (elementRef.current) {                                                                       // If the bottom element exists in the DOM
            observer.observe(elementRef.current);                                                       // Start observing the bottom element for intersection with the viewport
        }

        return () => {                                                                                  // Clean up function to stop observing the bottom element
            if (elementRef.current) {                                                                   // If the bottom element exists in the DOM
                observer.unobserve(elementRef.current);                                                 // Stop observing the bottom element
            }
        };

    }, []);

    return { page };
};

export { useInfiniteScroll };