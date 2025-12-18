export type Story = {
  title: string;
  slug: string;
  subtitle: string;
  coverPublicId: string;
  photoIds: string[];
};

export const stories: Story[] = [
  { title: "Night Cities", slug: "night-cities", subtitle: "A short walk through neon, reflections, and late light.", coverPublicId: "demo/cityscapes-cover", photoIds: ["c1","c3","c2"] },
  { title: "Quiet Landscapes", slug: "quiet-landscapes", subtitle: "Calm textures and soft horizons.", coverPublicId: "demo/landscapes-cover", photoIds: ["l2","l1","l3"] }
];
