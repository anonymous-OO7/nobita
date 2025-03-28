/* eslint-disable react/jsx-key */
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
    <AppContainer className=" w-screen overflow-hidden">
      <Wrapper>
        {/* <Text>With Great Outcomes.</Text> */}
        {/* <Note>Our customers have gotten offers from awesome companies.</Note> */}
        <Marquee className=" w-[1300px] sm:w-[2000px]">
          <MarqueeGroup>
            {row1.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup>
          <MarqueeGroup>
            {row1.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup>
        </Marquee>
        <Marquee className=" w-[1300px] sm:w-[2000px]">
          <MarqueeGroup2>
            {row2.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup2>
          <MarqueeGroup2>
            {row2.map((el) => (
              <ImageGroup>
                <Image src={el} />
              </ImageGroup>
            ))}
          </MarqueeGroup2>
        </Marquee>
      </Wrapper>
    </AppContainer>
  );
}

export default ClientsAnimation;

const AppContainer = styled.div`
  //   width: 100vw;
  height: 30vh;
  color: #000000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #02203c;
`;

const Note = styled.div`
  font-size: 18px;
  font-weight: 200;
  margin-bottom: 40px;
  color: #7c8e9a;
`;

const Marquee = styled.div`
  display: flex;
  // width: 1200px;
  overflow: hidden;
  user-select: none;

  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
  );
`;

const scrollX = keyframes`
  from {
    left: translateX(0);
  }
  to {
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
  width: clamp(10rem, 1rem + 40vmin, 30rem);
  padding: calc(clamp(10rem, 1rem + 30vmin, 30rem) / 10);
`;

const Image = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
  /* border: 1px solid black; */
  border-radius: 0.5rem;
  aspect-ratio: 16/9;
  padding: 5px 20px;
  // box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
