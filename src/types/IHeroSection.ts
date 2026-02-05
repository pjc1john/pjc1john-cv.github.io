import { ResumeData, HeroVariant, ColorPalette } from '@/types/portfolio';
import { getThemeColors } from '@/utils/theme';

export interface IHeroProps {
	data: ResumeData;
	theme: ReturnType<typeof getThemeColors>;
}

export interface IHeroSectionProps {
	data: ResumeData;
	variant: HeroVariant;
	palette: ColorPalette;
}
