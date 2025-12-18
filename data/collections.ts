export type Collection = {
  title: string;
  slug: string;
  description: string;
  cloudinaryFolder: string;
  coverPublicId?: string;
};
export const collections: Collection[] = [
  { title: "Cityscapes", slug: "cityscapes", description: "Architecture, streets, skylines — from travels near and far.", cloudinaryFolder: "portfolio/cityscapes"},
  { title: "Landscapes", slug: "landscapes", description: "Light, texture and calm places — mountains, forests, coastlines.", cloudinaryFolder: "portfolio/landscapes"},
  { title: "Wildlife", slug: "wildlife", description: "Animals and moments that don’t repeat.", cloudinaryFolder: "portfolio/wildlife"},
  { title: "Abstract", slug: "abstract", description: "Patterns, reflections and experiments.", cloudinaryFolder: "portfolio/abstract" },
  { title: "Portraits", slug: "portraits", description: "Capturing personalities and expressions.", cloudinaryFolder: "portfolio/portraits" },
  { title: "Miscellaneous", slug: "miscellaneous", description: "A collection of various photographic styles and subjects.", cloudinaryFolder: "portfolio/miscellaneous" },
];
