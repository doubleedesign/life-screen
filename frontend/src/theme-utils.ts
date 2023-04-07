import { meetsContrastGuidelines } from 'polished';
import { ContrastScores } from 'polished/lib/types/color';

type WCAGLevel = keyof ContrastScores;

export function contrastTextColour(color: string, wcag: WCAGLevel = 'AA') {
	const scores = meetsContrastGuidelines(color, '#fff');
	if(scores[wcag]) {
		return '#fff';
	}
	else {
		return '#000';
	}
}
