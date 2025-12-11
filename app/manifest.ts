import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fields Of Green Studios',
    short_name: 'FOG Studios',
    description: "Nico Landaverde's portfolio website",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
  };
}
