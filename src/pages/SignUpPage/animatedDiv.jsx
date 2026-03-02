import { useState, useEffect } from 'react';
import signup from "../../assets/images/signup-image.png";

const AnimatedDivs = () => {
    return (
        <div className='flex-1 relative bg-black hidden md:flex items-center rounded-tr-lg rounded-br-lg'>
            <img src={signup} alt="Sign Up" className="max-w-full rounded-tr-3xl" />
        </div>
    );
};

export default AnimatedDivs;