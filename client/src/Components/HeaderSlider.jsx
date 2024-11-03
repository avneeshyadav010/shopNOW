import { useEffect, useState } from "react";

const HeaderSlider = () => {
   const [slideIndex, setSlideIndex] = useState(0);
    const src1 = "https://spacingtech.com/shopify/ubone/image/main-slide1.jpg";
    const src2 = "https://spacingtech.com/shopify/ubone/image/main-slide2.jpg";
    const src3 = "https://spacingtech.com/shopify/ubone/image/main-slide3.jpg";

    const src4 = "https://spacingtech.com/shopify/ubone/image/demo3.jpg";
    const src5 = "https://velatheme.com/demo/rubix/images/demo4.jpg";
    const src6 = "https://cdn.pixabay.com/photo/2021/07/10/15/45/online-shop-6401739_1280.png";

    const src7 = "https://spacingtech.com/shopify/ubone/image/demo8.jpg";
    const src8 = "https://spacingtech.com/shopify/ubone/image/demo10.jpg";
    const src9 = "https://spacingtech.com/shopify/ubone/image/demo14.jpg";

    const srcArray = [src1, src2, src3, src4, src5, src6, src7, src8, src9];

    useEffect(() => {
        const interval = setInterval(() => {
            if (slideIndex < srcArray.length - 3)
                {   
                    setSlideIndex((slideIndex) => slideIndex + 3);
                }
            else
                setSlideIndex(0)
        }, 4000);
        return () => clearInterval(interval);
    }, [slideIndex]);


    return (
        <>
            <div className="slider">
                <img src={srcArray[slideIndex]} alt="Header Image" />
                <img src={srcArray[slideIndex + 1]} alt="Header Image" />
                <img src={srcArray[slideIndex + 2]} alt="Header Image" />
                {/* { <div className="dots">
                    <button onClick={()=>setSlideIndex(0)} className={`dot ${slideIndex === 0 ? "active": ""}`}></button>
                    <button onClick={()=>setSlideIndex(1)} className={`dot ${slideIndex === 1 ? "active": ""}`}></button>
                    <button onClick={()=>setSlideIndex(2)} className={`dot ${slideIndex === 2 ? "active": ""}`}></button>
                </div> }
                */}
            </div>
        </>
    )
}

export default HeaderSlider;