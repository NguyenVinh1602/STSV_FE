import {
  Zap,
  LayoutGrid,
  Settings,
  HelpCircle,
  BookOpen,
  FileText,
  LucideIcon 
} from 'lucide-react';

interface MenuItem {
  icon: LucideIcon; 
  text: string;
  href: string;
  type: 'item';
}

interface MenuSeparator {
  type: 'separator';
}

export type MenuData = MenuItem | MenuSeparator;

export const menuUserItems: MenuData[] = [
  {
    icon: Zap,
    text: 'Upgrade Plan',
    href: '/upgrade-plan',
    type: 'item',
  },
  {
    icon: LayoutGrid,
    text: 'Customize ChatGPT',
    href: '/customize-chatgpt',
    type: 'item',
  },
  {
    icon: Settings,
    text: 'Settings',
    href: '/settings',
    type: 'item',
  },
  {
    type: 'separator',
  },
  {
    icon: HelpCircle,
    text: 'Help & FAQ',
    href: '/help-faq',
    type: 'item',
  },
  {
    icon: BookOpen,
    text: 'Release notes',
    href: '/release-notes',
    type: 'item',
  },
  {
    icon: FileText,
    text: 'Terms & policies',
    href: '/terms-policies',
    type: 'item',
  },
];