"use client";
import React from "react";
import styled, { keyframes, css } from "styled-components";

function ClientsAnimation() {
  const row1 = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyiHR51obalVq8EbqnD_-fjlOVl41vmAHdUA&s",
    "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg",
    "https://cdn.logojoy.com/wp-content/uploads/20230629132639/current-logo-600x338.png",
    "https://upload.wikimedia.org/wikipedia/commons/e/e4/Meta_Inc._logo.jpg",
    "https://cdn.logojoy.com/wp-content/uploads/20240110154233/Tesla-wordmark-logo--600x319.png",
    "https://logos-world.net/wp-content/uploads/2021/02/JP-Morgan-Chase-Logo.png",
    "https://www.pngall.com/wp-content/uploads/15/Goldman-Sachs-Logo-PNG.png",
    "https://storage.googleapis.com/connectrpl_images/companywebsite/logo/Samsung_Orig_Wordmark_BLUE_RGB.jpg",
    "https://storage.googleapis.com/connectrpl_images/companywebsite/logo/airtel-red.svg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpOIExes7SkKMj61zdgksPGqTv-mIEPVod6w&s",
  ];

  const row2 = [
    "https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/logo-and-brand/01-nvidia-logo-horiz-500x200-2c50-p@2x.png",
    "https://www.theadvertisingclub.org/wp-content/uploads/2022/12/Walmart-Logo-PNG-Transparent.png-scaled.webp",
    "https://storage.googleapis.com/connectrpl_images/companywebsite/logo/johnson%20controls.png",
    "https://blog.logomaster.ai/hs-fs/hubfs/intel-logo-3.jpg?width=672&height=448&name=intel-logo-3.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKNPRQuLPpKrjO5bdFPgVGRoAbysq635o6ZQ&s",
    "https://storage.googleapis.com/connectrpl_images/companywebsite/logo/titan-logo.svg",
    "https://storage.googleapis.com/connectrpl_images/companywebsite/logo/welspun.png",
    "https://storage.googleapis.com/connectrpl_images/companywebsite/logo/wework.jpg",
  ];

  return (
    <AppContainer>
      <Wrapper>
        <Marquee>
          <MarqueeGroup>
            {row1.map((el, index) => (
              <ImageGroup key={`row1-${index}`}>
                <Image src={el} alt={`Company ${index + 1}`} />
              </ImageGroup>
            ))}
          </MarqueeGroup>
          <MarqueeGroup>
            {row1.map((el, index) => (
              <ImageGroup key={`row1-repeat-${index}`}>
                <Image src={el} alt={`Company repeat ${index + 1}`} />
              </ImageGroup>
            ))}
          </MarqueeGroup>
        </Marquee>
        <Marquee>
          <MarqueeGroup2>
            {row2.map((el, index) => (
              <ImageGroup key={`row2-${index}`}>
                <Image src={el} alt={`Company ${index + 1}`} />
              </ImageGroup>
            ))}
          </MarqueeGroup2>
          <MarqueeGroup2>
            {row2.map((el, index) => (
              <ImageGroup key={`row2-repeat-${index}`}>
                <Image src={el} alt={`Company repeat ${index + 1}`} />
              </ImageGroup>
            ))}
          </MarqueeGroup2>
        </Marquee>
      </Wrapper>
    </AppContainer>
  );
}

export default ClientsAnimation;

// STYLES

const AppContainer = styled.div`
  width: 100vw;
  height: auto;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 2rem 0;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Marquee = styled.div`
  display: flex;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1) 10%,
    rgba(0, 0, 0, 1) 90%,
    rgba(0, 0, 0, 0)
  );
  width: 100%;
`;

const scrollX = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const common = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
  width: 100%;
  animation: ${scrollX} 30s linear infinite;
`;

const MarqueeGroup = styled.div`
  ${common}
`;

const MarqueeGroup2 = styled.div`
  ${common}
  animation-direction: reverse;
  animation-delay: -3s;
`;

const ImageGroup = styled.div`
  display: grid;
  place-items: center;
  width: clamp(10rem, 20vw, 18rem);
  padding: 1rem;

  @media (max-width: 768px) {
    width: clamp(12rem, 40vw, 20rem);
  }

  @media (max-width: 480px) {
    width: clamp(14rem, 60vw, 22rem);
  }
`;

const Image = styled.img`
  object-fit: contain;
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
  aspect-ratio: 16/9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
