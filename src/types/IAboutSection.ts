import { ResumeData, AboutVariant, ColorPalette } from './portfolio';
import { getThemeColors } from '@/utils/theme';

export interface AboutProps {
  data: ResumeData;
  theme: ReturnType<typeof getThemeColors>;
}

export interface AboutSectionProps {
  data: ResumeData;
  variant: AboutVariant;
  palette: ColorPalette;
}
