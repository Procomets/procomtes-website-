export default function Card({ title, image, index, rotation = 0, hoveredIndex, onHover, onLeave }) {
  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <div
      className="flex-shrink-0 cursor-pointer relative"
      style={{
        zIndex: isHovered ? 100 : 1,
        transform: `
          translateY(${isHovered ? -25 : 0}px)
          scale(${isHovered ? 1.08 : 1})
          rotate(${isHovered ? 0 : rotation}deg)
        `,
        opacity: isOtherHovered ? 0.8 : 1,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
        willChange: 'transform, opacity',
      }}
      onMouseEnter={() => onHover && onHover(index)}
      onMouseLeave={() => onLeave && onLeave()}
    >
      <div
        className={[
          'card-glow',
          'relative overflow-hidden rounded-2xl',
          'w-[155px] h-[215px] sm:w-[170px] sm:h-[240px] lg:w-[190px] lg:h-[260px]',
          'border bg-bg-secondary',
          isHovered
            ? 'border-accent/50'
            : 'border-border-primary/50',
        ].join(' ')}
        style={{
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          boxShadow: isHovered
            ? '0 35px 90px rgba(0,0,0,0.28), 0 0 40px rgba(216,255,0,0.18)'
            : '0 15px 40px rgba(0,0,0,0.15)',
        }}
      >
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
          draggable="false"
        />

        {/* Hover Overlay with Service Name (Glassmorphism) */}
        <div
          className="absolute inset-x-0 bottom-0 px-4 py-3"
          style={{
            backgroundColor: 'rgba(15, 15, 15, 0.55)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            opacity: isHovered ? 1 : 0,
            transform: `translateY(${isHovered ? 0 : 8}px)`,
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
          }}
        >
          <p className="text-text-white text-[13px] font-semibold tracking-wide leading-snug text-center">
            {title}
          </p>
        </div>

        {/* Subtle accent glow border on hover */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: isHovered
              ? 'inset 0 0 30px rgba(216, 255, 0, 0.06)'
              : 'none',
            transition: 'box-shadow 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}
