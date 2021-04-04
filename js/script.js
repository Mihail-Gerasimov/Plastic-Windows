document.addEventListener('DOMContentLoaded', () => {

    // Функция слайдера
    function slider(window, field, cards, cardWidth, margin, dotsWrap, dotClass, dotClassActive, arrowPrev, arrowNext, arrowClass) {
        const window_ = document.querySelector(window),
            field_ = document.querySelector(field),
            cards_ = document.querySelectorAll(cards),
            arrowPrev_ = document.querySelector(arrowPrev),
            arrowNext_ = document.querySelector(arrowNext);

        let startPoint,
            sliderCounter = 0,
            swipeAction,
            endPoint,
            dots_ = [];

        // Устанавливаем фиксированную ширину поля слайдов

        field_.style.width = `${cardWidth * cards_.length + (margin * (cards_.length - 1))}px`;
        field_.style.marginLeft = 'auto';
        field_.style.marginRight = 'auto';

        // Слайд следующий

        function slideNext() {
            sliderCounter++;
            arrowNext_.classList.remove(arrowClass);
            arrowPrev_.classList.remove(arrowClass);
            if (sliderCounter >= cards_.length) {
                sliderCounter = cards_.length - 1;
            }
            if ((sliderCounter + 1) == cards_.length) {
                arrowNext_.classList.add(arrowClass);
            }
            if (dotsWrap) {
                dots_.forEach((item, index) => {
                    item.classList.remove(dotClassActive);
                    if (index == sliderCounter) {
                        item.classList.add(dotClassActive);
                    }
                });
            }
            field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
        }

        // Слайд предыдущий

        function slidePrev() {
            sliderCounter--;
            arrowNext_.classList.remove(arrowClass);
            arrowPrev_.classList.remove(arrowClass);
            if (sliderCounter <= 0) {
                sliderCounter = 0;
            }
            if (sliderCounter == 0) {
                arrowPrev_.classList.add(arrowClass);
            }
            if (dotsWrap) {
                dots_.forEach((item, index) => {
                    item.classList.remove(dotClassActive);
                    if (index == sliderCounter) {
                        item.classList.add(dotClassActive);
                    }
                });
            }
            field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
        }

        // Рендер точек

        if (dotsWrap) {
            const dotsWrap_ = document.querySelector(dotsWrap);

            cards_.forEach(() => {
                const dot = document.createElement('div');
                dot.classList.add(dotClass);
                dotsWrap_.appendChild(dot);
                dots_.push(dot);
            });
            dots_[0].classList.add(dotClassActive);
            dots_.forEach((item, index) => {
                item.addEventListener('click', () => {
                    sliderCounter = index;
                    arrowNext_.classList.remove(arrowClass);
                    arrowPrev_.classList.remove(arrowClass);
                    if (sliderCounter == 0) {
                        arrowPrev_.classList.add(arrowClass);
                    }
                    if ((sliderCounter + 1) == cards_.length) {
                        arrowNext_.classList.add(arrowClass);
                    }
                    dots_.forEach(item_ => {
                        item_.classList.remove(dotClassActive);
                    });
                    item.classList.add(dotClassActive);
                    field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
                });
            });
        }

        // Переключение на стрелки

        arrowPrev_.addEventListener('click', () => {
            slidePrev();
        });

        arrowNext_.addEventListener('click', () => {
            slideNext();
        });

        // Свайп слайдов тач-событиями

        window_.addEventListener('touchstart', (e) => {
            startPoint = e.changedTouches[0].pageX;
        });

        window_.addEventListener('touchmove', (e) => {
            swipeAction = e.changedTouches[0].pageX - startPoint;
            field_.style.transform = `translateX(${swipeAction + (-(cardWidth + margin) * sliderCounter)}px)`;
        });

        window_.addEventListener('touchend', (e) => {
            endPoint = e.changedTouches[0].pageX;
            if (Math.abs(startPoint - endPoint) > 50) {
                arrowNext_.classList.remove(arrowClass);
                arrowPrev_.classList.remove(arrowClass);
                if (endPoint < startPoint) {
                    slideNext();
                } else {
                    slidePrev();
                }
            } else {
                field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
            }
        });
    }

    slider('.services__window--mobile',
        '.services__field--mobile',
        '.services__card--mobile',
        205,
        20,
        '.slider__dots',
        'slider__dot',
        'slider__dot--active',
        '.services__slider__arrow--prev',
        '.services__slider__arrow--next',
        'slider__arrow--inactive'
    );

    slider('.rev__window--desc',
        '.rev__field--desc',
        '.rev__card--desc',
        380,
        50,
        false,
        false,
        false,
        '.rev__arrow--desc--prev',
        '.rev__arrow--desc--next',
        'rev__arrow--desc--inactive'
    );

    slider('.rev__window--mobile',
        '.rev__field--mobile',
        '.rev__card--mobile',
        280,
        20,
        '.rev__dots',
        'slider__dot',
        'slider__dot--active',
        '.rev__arrow--mobile--prev',
        '.rev__arrow--mobile--next',
        'rev__arrow--mobile--inactive'
    );

    slider('.cert__window',
        '.cert__field',
        '.cert__card--mobile',
        190,
        20,
        '.cert__dots',
        'slider__dot',
        'slider__dot--active',
        '.cert__arrow--mobile--prev',
        '.cert__arrow--mobile--next',
        'rev__arrow--mobile--inactive'
    );

});