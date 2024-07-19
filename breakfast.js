const breakfastSlides = ['/Resources/Imgs/breakfast-slideshow/americanB.jpg',
                         './Resources/Imgs/breakfast-slideshow/chilaquilesB.jpg',
                         './Resources/Imgs/breakfast-slideshow/avocado.jpg',
                         './Resources/Imgs/breakfast-slideshow/japaneseB.jpg',
                         './Resources/Imgs/breakfast-slideshow/breakcoffee.jpeg', 
];

const nextSlideBtn = document.getElementById('next-slide');
let currImgIndex = 0;
const slide = document.getElementById('slide');

const slideImg = document.createElement('img');
slideImg.src = breakfastSlides[0];
slide.appendChild(slideImg);

nextSlideBtn.addEventListener('click', function(){
        slide.style.animation = 'fadeOut 0.3s';

        setTimeout(() =>{
            currImgIndex = (currImgIndex + 1) % breakfastSlides.length;
            slideImg.src = breakfastSlides[currImgIndex];
            slide.style.animation = 'fadeIn 0.3s';
        },200);
        
       
    
    
    
});