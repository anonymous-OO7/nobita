const applySwiperStyles = () => {
  const prevButton = document.querySelector(".swiper-button-prev:after");
  const nextButton = document.querySelector(".swiper-button-next:after");
  const nextButtonElement = document.querySelector(".swiper-button-next");
  const prevButtonElement = document.querySelector(".swiper-button-prev");

  if (prevButton) {
    prevButton.style.content = "";
    prevButton.style.width = "24px";
    prevButton.style.height = "24px";
  }

  if (nextButton) {
    nextButton.style.width = "24px";
    nextButton.style.height = "24px";
  }

  if (nextButtonElement) {
    nextButtonElement.style.position = "relative";
  }

  if (prevButtonElement) {
    prevButtonElement.style.position = "relative";
  }

  const activeSlide = document.querySelector(
    ".swiper-slide.swiper-slide-active",
  );

  if (activeSlide) {
    activeSlide.style.borderColor = "rgb(79 70 229 / var(--tw-border-opacity))";
    const activeIndigoText = activeSlide.querySelector(
      ".swiper-slide-active\\:text-indigo-600",
    );
    const activeFlexGridIndigoText = activeSlide.querySelector(
      ".flex .grid .swiper-slide-active\\:text-indigo-600",
    );
    if (activeIndigoText) {
      activeIndigoText.style.color = "rgb(79 70 229 / var(--tw-text-opacity))";
    }
    if (activeFlexGridIndigoText) {
      activeFlexGridIndigoText.style.color =
        "rgb(79 70 229 / var(--tw-text-opacity))";
    }
  }
};

export default applySwiperStyles;
