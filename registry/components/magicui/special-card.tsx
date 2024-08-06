'use client';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const CardContainer = styled.a`
  width: var(--card-width);
  height: var(--card-height);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 36px;
  perspective: 2500px;
  margin: 0 10px; /* Reduced margin for testing */
  text-decoration: none;
  color: inherit;
  background: #192740; /* Debugging background color */
  border: 1px solid #ddd; /* Debugging border */
`;

const Wrapper = styled.div`
  transition: all 0.5s;
  position: absolute;
  width: 100%;
  z-index: -1;
  &::before,
  &::after {
    content: "";
    opacity: 0;
    width: 100%;
    height: 80px;
    transition: all 0.5s;
    position: absolute;
    left: 0;
  }
  &::before {
    top: 0;
    height: 100%;
    background-image: linear-gradient(to top, transparent 46%, rgba(12, 13, 19, 0.5) 68%, rgba(12, 13, 19) 97%);
  }
  &::after {
    bottom: 0;
    opacity: 1;
    background-image: linear-gradient(to bottom, transparent 46%, rgba(12, 13, 19, 0.5) 68%, rgba(12, 13, 19) 97%);
  }
`;

const CoverImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled(Image)`
  width: 100%;
  transition: transform 0.5s;
`;

const Character = styled(Image)`
  width: 100%;
  opacity: 0;
  transition: all 0.5s;
  position: absolute;
  z-index: -1;
`;

interface CardProps {
  coverImage: string;
  titleImage: string;
  characterImage: string;
}

const Card: React.FC<CardProps> = ({ coverImage, titleImage, characterImage }) => {
  return (
    <CardContainer>
      <Wrapper>
        <CoverImage
          src={coverImage}
          alt="Cover Image"
          width={500}
          height={500}
          loading='lazy'
        />
      </Wrapper>
      <Title
        src={titleImage}
        alt='title'
        width={500}
        height={500}
        loading='lazy'
      />
      <Character
        src={characterImage}
        alt="Character"
        width={500}
        height={500}
        loading='lazy'
      />
    </CardContainer>
  );
};

const GlobalStyles = styled.div`
  --card-height: 400px; /* Increased height */
  --card-width: calc(var(--card-height) / 1.5);
  * {
    box-sizing: border-box;
  }
  body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #192740;
    overflow: hidden;
  }

  ${CardContainer}:hover ${Wrapper} {
    transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
    box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  }

  ${CardContainer}:hover ${Wrapper}::before,
  ${Wrapper}::after {
    opacity: 1;
  }

  ${CardContainer}:hover ${Wrapper}::after {
    height: 120px;
  }

  ${CardContainer}:hover ${Title} {
    transform: translate3d(0%, -50px, 100px);
  }

  ${CardContainer}:hover ${Character} {
    opacity: 1;
    transform: translate3d(0%, -30%, 100px);
  }
`;

interface SpecialCardsProps {
  card: CardProps;
}

const SpecialCard: React.FC<SpecialCardsProps> = ({ card }) => {
  return (
    <GlobalStyles className='overflow-hidden bg-bg1 py-12'>
      <Card
        coverImage={card.coverImage}
        titleImage={card.titleImage}
        characterImage={card.characterImage}
      />
    </GlobalStyles>
  );
};

export default SpecialCard;
