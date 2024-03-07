import { FC } from 'react';
import { TemplateNameWrapper } from './TemplateName.style';

type TemplateNameProps = {}

const TemplateName: FC<TemplateNameProps> = () => {
	return (
		<TemplateNameWrapper data-testid="TemplateName">
			TemplateName Component
		</TemplateNameWrapper>
	);
};

export default TemplateName;

