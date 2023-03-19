import React, { FC } from 'react';
import { GlobalHeaderWrapper } from './GlobalHeader.styled';

interface GlobalHeaderProps {}

const GlobalHeader: FC<GlobalHeaderProps> = () => (
 <GlobalHeaderWrapper data-testid="GlobalHeader">
    GlobalHeader Component
 </GlobalHeaderWrapper>
);

export default GlobalHeader;
