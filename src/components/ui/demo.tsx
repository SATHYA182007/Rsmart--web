import { ImageAutoSlider } from './image-auto-slider';

export default function Demo() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* 
        This is a demo wrapper to showcase the placement slider component.
        In your actual application, you can import and use <ImageAutoSlider /> 
        anywhere you need.
      */}
      <div className="w-full max-w-7xl">
        <ImageAutoSlider />
      </div>
    </div>
  );
}
