import React, { useContext, useMemo } from 'react';
import { Text, Flex, Heading, Image } from '@pancakeswap-libs/uikit'
import Styled from 'styled-components';

const Container = Styled.div`
    background: linear-gradient(139.73deg, rgb(230, 253, 255) 0%, rgb(243, 239, 255) 100%);
    width: 100%;
    padding: 32px;
`

const MigrationHeadlineCard = function() {
    return <Container>
        <Heading mb="30px" size="xxl" >LP Token Migration</Heading>
        <Text fontSize="24px">MilkshakeSwap is being upgraded! <br/> Migrate your LP tokens to continue earning.</Text>
    </Container>
};

export default MigrationHeadlineCard;