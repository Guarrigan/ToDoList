import { useSpring, animated } from 'react-spring';

const Bounce = ({ element: Element, children }) => {
  const props = useSpring({
    to: { transform: 'scale(1.2)' },
    from: { transform: 'scale(0.8)' },
    config: { tension: 500, friction: 25 },
    reset: false,
  });

  return (
    <animated.div style={props}>
      <Element>{children}</Element>
    </animated.div>
  );
};

export default Bounce;
