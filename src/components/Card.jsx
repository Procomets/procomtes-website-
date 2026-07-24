export default function Card({ title, image, index, rotation = 0, hoveredIndex, onHover, onLeave }) {
  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <div
      className="flex-shrink-0 cursor-pointer relative"
      style={{
        zIndex: isHovered ? 100 : 1,
        transform: `
          rotate(${isHovered ? 0 : rotation}deg)
        `,
        opacity: isOtherHovered ? 0.8 : 1,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
        willChange: 'transform, opacity',
      }}
      onMouseEnter={() => onHover && onHover(index)}
      onMouseLeave={() => onLeave && onLeave()}
    >
      {/* Tooltip Bubble (Outside overflow-hidden so it can pop out) */}
      <div
        style={{
          position: 'absolute',
          top: '-45px', /* Popping up above the card */
          left: '50%',
          transform: `translate(-50%, ${isHovered ? '0px' : '15px'}) scale(${isHovered ? 1 : 0.8})`,
          backgroundColor: '#c8ff00ff',
          color: 'black',
          padding: '8px 18px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          opacity: isHovered ? 1 : 0,
          pointerEvents: 'none',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          zIndex: 110,
          boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
        }}
      >
        {title}
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '25%',
            borderWidth: '6px',
            borderStyle: 'solid',
            borderColor: '#c8ff00ff transparent transparent transparent',
          }}
        />
      </div>

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
