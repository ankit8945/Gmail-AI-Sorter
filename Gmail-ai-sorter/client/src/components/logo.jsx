export default function Logo({
  src = "/logo.svg",
  size = 40,
  alt = "Logo"
}) {
  return (
    <div
      className="flex items-center justify-center overflow-hidden rounded-full bg-white"
      style={{
        width: size,
        height: size
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        onError={(e) => {
          // fallback if svg/png fails
          e.target.style.display = "none";
        }}
      />
    </div>
  );
}
