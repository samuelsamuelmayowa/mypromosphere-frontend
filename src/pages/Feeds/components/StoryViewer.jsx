import React from "react";

const StoryViewer = ({ story, onClose }) => {
  const placeholderStory = {
    name: story?.name || "Placeholder Seller",
    image: story?.image || "https://via.placeholder.com/300x200",
    caption: story?.caption || "This is a sample caption for the story.",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="relative w-full max-w-lg">
        <img
          src={placeholderStory.image}
          alt={placeholderStory.name}
          className="w-full rounded-md"
        />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-lg font-bold">{placeholderStory.name}</h3>
          <p>{placeholderStory.caption}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-gray-800 p-2 rounded-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StoryViewer;
