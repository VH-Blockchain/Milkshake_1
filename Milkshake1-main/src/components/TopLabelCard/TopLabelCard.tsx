/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { Button } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { AlertCircle, ChevronUp, ChevronDown } from 'react-feather'

const TopLabelCardContainer = styled.div`
  background: rgb(69, 42, 122);
  box-shadow: rgb(0 0 0 / 25%) 0px -4px 4px inset;
  padding: 32px;
  width: 100%;
`
const LabelText = styled.p`
  color: white;
  margin-left: 20px;
  font-weight: 600;
  line-height: 1.5;
  font-size: 24px;
`

const WarningText = styled.p`
  color: rgb(255, 178, 55);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
`
const SubText = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 16px;
`
const ShowHideTextContainer = styled.span`
  -webkit-box-align: center;
  align-items: center;
  border: 0px;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: transparent;
  color: rgb(31, 199, 212);
  box-shadow: none;
`
interface TopLabelProps {
  text?: string
}

export default function TopLabelCard(props: TopLabelProps) {
  const [showDetails, toggleDetails] = React.useState(true)
  console.log(props.text)
  return (
    <TopLabelCardContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AlertCircle color="white" fontSize="24px" />
          <LabelText>ACTION REQUIRED for all LP token holders </LabelText>
        </div>
        <ShowHideTextContainer onClick={() => toggleDetails(!showDetails)}>
          <span style={{ marginRight: '5px' }}>{showDetails ? 'Hide' : 'Details'}</span>
          {showDetails ? <ChevronDown color="rgb(31, 199, 212)" /> : <ChevronUp color="rgb(31, 199, 212)" />}
        </ShowHideTextContainer>
      </div>
      {showDetails && (
        <div style={{ marginLeft: '44px' }}>
          <WarningText>ACTION REQUIRED for all LP token holders</WarningText>
          <SubText>
            All LPs will be migrated to a new, upgraded contract, over several hours starting at{' '}
            <strong>05:00 on April 23 (UTC).</strong>
          </SubText>
          <Button as="button" variant="primary" href="https://exchange.milkshakeswap.finance/#/pool">
            Migrate Now
          </Button>
        </div>
      )}
    </TopLabelCardContainer>
  )
}
