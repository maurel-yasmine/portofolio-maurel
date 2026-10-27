// ============================================================
// ✏️ EDIT YOUR SOCIAL LINKS HERE
// The URLs themselves live in src/config/Identity.ts (SOCIAL_LINKS).
// This file only decides which ones appear and in what order.
// ============================================================

import { SOCIAL_LINKS, whatsappUrl } from "@/config/Identity";
import type { IconComponent } from "./icons";
import {
  GithubFilled,
  InstagramFilled,
  LinkedinFilled,
  Mail,
  WhatsappFilled,
} from "./icons";

export interface SocialItem {
  id: string;
  label: string;
  url: string;
  SvgIcon: IconComponent;
}

export const Socials: SocialItem[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    url: SOCIAL_LINKS.linkedin,
    SvgIcon: LinkedinFilled,
  },
  {
    id: "github",
    label: "GitHub",
    url: SOCIAL_LINKS.github,
    SvgIcon: GithubFilled,
  },
  {
    id: "instagram",
    label: "Instagram",
    url: SOCIAL_LINKS.instagram,
    SvgIcon: InstagramFilled,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    url: whatsappUrl(),
    SvgIcon: WhatsappFilled,
  },
  {
    id: "email",
    label: "Email",
    url: SOCIAL_LINKS.email,
    SvgIcon: Mail,
  },
];
