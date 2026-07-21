export default function SubtleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* The grid pattern has been removed to match the reference image */}

      {/* Very soft radial glow at top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[800px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(216, 255, 0, 0.035) 0%, transparent 70%)',
        }}
      />

      {/* Soft glow at bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 w-[600px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(216, 255, 0, 0.02) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
