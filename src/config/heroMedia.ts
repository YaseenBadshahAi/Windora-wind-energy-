export interface HeroMediaSlots {
  /** Morning / Day mode background video (--k: 0) */
  morningVideo: string;
  /** Night mode background video (--k: 1) */
  nightVideo: string;
  /** Morning / Day fallback poster image */
  morningPoster: string;
  /** Night fallback poster image */
  nightPoster: string;
}

const base = import.meta.env.BASE_URL;

export const HERO_MEDIA: HeroMediaSlots = {
  morningVideo:
    `${base}assets/aistudio/Smooth_rotating_solar_panels_ani__def0fbd6_f03406ae.mp4`,
  nightVideo:
    `${base}assets/aistudio/Animate_wind_solar_panel_image_d078f940_84317fbb.mp4`,
  morningPoster:
    `${base}assets/aistudio/Teal-Tinted_Wind_Farm_Panorama_a7484e49.png`,
  nightPoster:
    `${base}assets/aistudio/Moonlit_Wind_Farm_Over_Mountain_Fields_82d2e735.png`,
};
