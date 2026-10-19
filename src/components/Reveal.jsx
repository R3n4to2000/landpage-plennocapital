import { useInView } from '../hooks/useInView.js';

export function Reveal({ as: Tag = 'div', children, className = '', group = false, ...props }) {
  const { ref, visible } = useInView();

  return (
    <Tag
      {...props}
      ref={ref}
      className={`${className} ${group ? 'reveal-group' : 'reveal'}${visible ? ' is-visible' : ''}`}
    >
      {children}
    </Tag>
  );
}
