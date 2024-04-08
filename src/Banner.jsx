import  { useState, useEffect } from 'react';
import './Banner.css';

function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`banner ${isVisible ? '' : 'hidden'}`}>
      <h2>TodoList</h2>
      <p>Mario Perez Quintero</p>
    </div>
  );
}

export default Banner;
