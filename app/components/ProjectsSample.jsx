import React from "react";
import Image from "next/image";

const imageList = [
  { src: "/client_works/health camp happy dog.webp", alt: "Image 1" },
  {
    src: "/client_works/panchakanya happy dashain.webp",
    alt: "Project 2",
  },
  { src: "/client_works/losar.webp", alt: "Project 3" },
  { src: "/client_works/nabin.webp", alt: "Project 4" },
  { src: "/client_works/savedogs.webp", alt: "project 5" },
  { src: "/movie_posters/rockstar.webp", alt: "Project 6" },
  { src: "/client_works/nepal furn sofa.webp", alt: "Image 7" },
  { src: "/personal_projects/tesla 0.5@0.5x.webp", alt: "image 8" },
  { src: "/client_works/ronit fashions.webp", alt: "image 9" },
  { src: "/music_albums/suja mr p cover.webp", alt: "image 11" },
  { src: "/client_works/again bean bags.webp", alt: "image 12" },
  { src: "/movie_posters/gajni.webp", alt: "image 13" },
  { src: "/personal_projects/honeysingh.webp", alt: "image 14" },
  { src: "/movie_posters/kaminye.webp", alt: "image 15" },
];

const ProjectsSample = () => {
  return (
    <div className="text-center ">
      {/* <h1 className="text-2xl text-white mb-5">Work Samples</h1> */}
      <div className="columns-1 sm:columns-1 md:columns-2 lg:columns-2 gap-3">
        {imageList.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            loading="lazy"
            alt={image.alt}
            className="h-auto mb-3"
            width={500}
            height={500}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSample;
