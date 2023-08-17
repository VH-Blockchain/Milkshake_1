import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@pancakeswap-libs/uikit'
import TranslatedText from '../TranslatedText'



const StyledNav = styled.div`
  margin-bottom: 40px;
  margin-top: 32px;
`

const Nav = ({ activeIndex = 0 }: { activeIndex?: number }) => (

  
  <StyledNav>
    <div className="lottery">
      <ButtonMenu activeIndex={activeIndex} size="md" variant="subtle">
        <ButtonMenuItem id="pool-nav-link" className="lottery-link" to="/swap" as={Link}>
          <TranslatedText translationId={8}>Swap</TranslatedText>
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" className="lottery-link" to="/pool" as={Link}>
          <TranslatedText translationId={74}>Liquidity</TranslatedText>
        </ButtonMenuItem>
        <ButtonMenuItem
          id="pool-nav-link"
          className="lottery-link"
          as="a"
          href="https://www.binance.org/en/panama"
          target="_blank"
          rel="noreferrer noopener"
        >
          Bridge
        </ButtonMenuItem>
      </ButtonMenu>
    </div>
  </StyledNav>
)

export default Nav
